// backend/otp.js
const { db, ref, set, get } = require("./firebase");

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // mã 6 số
}

async function storeAccessCode(phoneNumber, code) {
  await set(ref(db, "access_codes/" + phoneNumber), {
    code,
    createdAt: Date.now()
  });
}

async function checkVerificationCode(phoneNumber, userCode) {
  const snapshot = await get(ref(db, "access_codes/" + phoneNumber));
  if (!snapshot.exists()) throw new Error("No code found");

  const { code, createdAt } = snapshot.val();
  const expired = Date.now() - createdAt > 5 * 60 * 1000;

  if (expired) throw new Error("Code expired");
  if (code !== userCode) throw new Error("Wrong code");

  return true;
}

module.exports = { generateCode, storeAccessCode, checkVerificationCode };
