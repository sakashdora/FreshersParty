export function validateRegistration(payload) {
  const errors = {};
  const name = typeof payload?.name === 'string' ? payload.name.trim().replace(/\s+/g, ' ') : '';
  const rawMobile = typeof payload?.mobile === 'string' ? payload.mobile.replace(/[\s()-]/g, '') : '';
  const match = rawMobile.match(/^(?:\+?91)?([6-9]\d{9})$/);
  if (name.length < 2 || name.length > 80 || !/^[\p{L}\p{M} .’'\-]+$/u.test(name)) {
    errors.name = 'Please enter your name using 2–80 letters.';
  }
  if (!match) errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (payload?.consent !== true) errors.consent = 'Please agree to share your details with the organizing team.';
  return { errors, value: { name, mobile: match ? `+91${match[1]}` : '', consent: payload?.consent === true } };
}
