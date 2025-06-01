const twilio = require("twilio");

const accountSid = "AC26966fe0d379e3fb2bf1efc6859f7db9";
const authToken = "75e192a1c0e3a2dd020a9bcdccf2fd33";
const messagingServiceSid = "MG501b0efcd06facea18f4d93cc56767dc"; 

const client = twilio(accountSid, authToken);

async function sendSMS(to, body) {
  if (to.startsWith("0")) {
    to = "+84" + to.slice(1); // Chuyển về định dạng quốc tế
  }

  console.log(`Sending SMS to: ${to}`);
  return await client.messages.create({
    body,
    messagingServiceSid,
    to,
  });
}

module.exports = { sendSMS };
