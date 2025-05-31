// // backend/twilio.js
// const twilio = require("twilio");

// const accountSid = "AC20499a1a09adcc700f63bc4d40383e2d";
// const authToken = "7da4e33e52b987f4c56e0622dc0e0e65";
// const twilioPhoneNumber = "+19786849899";

// const client = twilio(accountSid, authToken);

// async function sendSMS(to, body) {
//   if (to.startsWith("0")) {
//     to = "+84" + to.slice(1); // Chuyển về định dạng quốc tế
//   }

//   console.log(`Sending SMS to: ${to}`);
//   return await client.messages.create({
//     body,
//     from: twilioPhoneNumber,
//     to,
//   });
// }

// module.exports = { sendSMS };

// backend/twilio.js
const twilio = require("twilio");

const accountSid = "AC26966fe0d379e3fb2bf1efc6859f7db9";
const authToken = "75e192a1c0e3a2dd020a9bcdccf2fd33";
const messagingServiceSid = "MG501b0efcd06facea18f4d93cc56767dc"; // từ ảnh bạn gửi

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
