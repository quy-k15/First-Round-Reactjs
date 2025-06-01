const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');

const { db, ref, set, get, child } = require("./firebase");
const { sendSMS } = require("./twilio");
const { generateCode, storeAccessCode, checkVerificationCode } = require("./otp");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const dbRef = ref(db);

// Gửi mã OTP
app.post("/CreateNewAccessCode", async (req, res) => {
  const { phoneNumber } = req.body;
  const code = generateCode();
  try {
    await storeAccessCode(phoneNumber, code);
    await sendSMS(phoneNumber, `Your access code is: ${code}`);
    console.log(code);
    res.status(200).json({ message: "Verification code sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send verification code" });
  }
});

// Kiểm tra mã OTP
app.post("/ValidateAccessCode", async (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  try {
    await checkVerificationCode(phoneNumber, accessCode);

    const snapshot = await get(child(dbRef, `users/${phoneNumber}`));
    const existing = snapshot.exists() ? snapshot.val() : {};

    await set(ref(db, `users/${phoneNumber}`), {
      access_code: accessCode,
      favorite_github_users: existing.favorite_github_users || [],
    });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

app.get("/findGithubUserProfile", async (req, res) => {
  const { github_user_id } = req.query;
  const url = `https://api.github.com/user/${github_user_id}`;
  console.log("Fetching:", url);
console.log("GitHub Token (short):", process.env.GITHUB_TOKEN?.slice(0, 10));

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    res.json(result.data);
} catch (err) {
  console.error("Axios error:");
  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {

    console.error("Error message:", err.message);
  }
  res.status(500).json({ error: "Failed to fetch GitHub user profile" });
}

});


app.post("/likeGithubUser", async (req, res) => {
  const { phone_number, github_user_id } = req.body;

  try {
    const snapshot = await get(child(dbRef, `users/${phone_number}`));
    const data = snapshot.exists() ? snapshot.val() : {};

    const updatedFavorites = new Set(data.favorite_github_users || []);
    if(updatedFavorites.has(github_user_id)){
      updatedFavorites.delete(github_user_id);//unlike
    }
    else{
      updatedFavorites.add(github_user_id);// like
    }
    

    await set(ref(db, `users/${phone_number}`), {
      ...data,
      favorite_github_users: Array.from(updatedFavorites),
    });

    res.status(200).json({ message: "Liked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to like user" });
  }
});


app.get("/getUserProfile", async (req, res) => {
  const { phone_number } = req.query;
  try {
    const snapshot = await get(child(dbRef, `users/${phone_number}`));
    const data = snapshot.exists() ? snapshot.val() : { favorite_github_users: [] };

    // Lấy chi tiết từng github user đã like
    const promises = (data.favorite_github_users || []).map((id) =>
      axios.get(`https://api.github.com/user/${id}`).then((r) => r.data)
    );

    const users = await Promise.all(promises);
    res.json({ favorite_github_users: users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
