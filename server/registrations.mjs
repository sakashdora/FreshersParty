import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { validateRegistration } from '../src/registration.js';

export const defaultDatabasePath = resolve(process.env.SANGAM_DATA_DIR || '.data', 'sangam.sqlite');
export function createRegistrationService({ databasePath = defaultDatabasePath, limit = 60, windowMs = 60000, now = Date.now } = {}) {
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath, { timeout: 5000 });
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL UNIQUE,
      consent_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    ) STRICT;`);
  const insert = db.prepare('INSERT INTO registrations (id,name,mobile,consent_at,created_at) VALUES (?,?,?,?,?) ON CONFLICT(mobile) DO NOTHING');
  const attempts = new Map();
  let closed = false;
  function respond(res, status, body, extraHeaders = {}) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders });
    res.end(JSON.stringify(body));
  }
  async function handle(req, res, next = () => respond(res, 404, { error: 'Not found.' })) {
    const path = (req.url || '').split('?')[0];
    if (path !== '/api/registrations') return next();
    if (req.method !== 'POST') return respond(res, 405, { error: 'Use the registration form to send your details.' }, { Allow: 'POST' });
    if (req.headers.origin) {
      try {
        const origin = new URL(req.headers.origin);
        if (!['http:', 'https:'].includes(origin.protocol) || origin.host !== req.headers.host) return respond(res, 403, { error: 'Please submit from the Sangam website.' });
      } catch { return respond(res, 403, { error: 'Please submit from the Sangam website.' }); }
    }
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return respond(res, 415, { error: 'Please submit using the registration form.' });
    const time = now();
    for (const [key, bucket] of attempts) if (bucket.expires <= time) attempts.delete(key);
    const ip = req.socket?.remoteAddress || 'local';
    const bucket = attempts.get(ip) || { count: 0, expires: time + windowMs };
    bucket.count += 1; attempts.set(ip, bucket);
    if (bucket.count > limit) return respond(res, 429, { error: 'Too many attempts. Please wait a minute and try again.' }, { 'Retry-After': String(Math.max(1, Math.ceil((bucket.expires - time) / 1000))) });
    try {
      if (Number(req.headers['content-length']) > 2048) return respond(res, 413, { error: 'Your submission is too large.' });
      let bytes = 0;
      const chunks = [];
      for await (const chunk of req) {
        bytes += Buffer.byteLength(chunk);
        if (bytes > 2048) return respond(res, 413, { error: 'Your submission is too large.' });
        chunks.push(Buffer.from(chunk));
      }
      let payload;
      try { payload = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { return respond(res, 400, { error: 'We couldn’t read your details. Please try again.' }); }
      const { errors, value } = validateRegistration(payload);
      if (Object.keys(errors).length) return respond(res, 422, { error: 'Please check your details.', errors });
      const stamp = new Date(time).toISOString();
      insert.run(randomUUID(), value.name, value.mobile, stamp, stamp);
      // Identical public response for new and existing numbers; never expose another attendee's details.
      return respond(res, 200, { ok: true, message: 'Your registration has been received.' });
    } catch {
      return respond(res, 503, { error: 'Registration is temporarily unavailable. Your details have not been confirmed. Please try again.' });
    }
  }
  return { handle, close() { if (!closed) { closed = true; db.close(); } } };
}

export function registrationPlugin() {
  function configure(server) {
    const service = createRegistrationService();
    server.middlewares.use((req, res, next) => { void service.handle(req, res, next); });
    server.httpServer?.once('close', () => service.close());
  }
  return { name: 'sangam-registration-api', configureServer: configure, configurePreviewServer: configure };
}
