import { DatabaseSync } from 'node:sqlite';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defaultDatabasePath } from './registrations.mjs';
const destination = resolve(process.argv[2] || '.data/sangam-registrations.csv');
if (!existsSync(defaultDatabasePath)) throw new Error('No registrations database exists yet. Start the website first.');
const db = new DatabaseSync(defaultDatabasePath, { readOnly:true });
const rows = db.prepare('SELECT id,name,mobile,consent_at,created_at FROM registrations ORDER BY created_at').all();
function cell(value) {
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"','""') + '"';
}
const columns = ['id','name','mobile','consent_at','created_at'];
const csv = [columns.join(','), ...rows.map(row=>columns.map(col=>cell(row[col])).join(','))].join('\r\n');
writeFileSync(destination, '\uFEFF' + csv, {flag:'wx',mode:0o600});
db.close();
console.log(`Exported ${rows.length} registrations to ${destination}. Keep this file private.`);
