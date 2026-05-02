const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

// 🔴 Use SAME data you used during registration
const userData = {
  email: "manikarthik_karanam@srmap.edu.in",
  name: "karthik",
  rollNo: "ap23110011481",
  accessCode: "QkbpxH"
};

// 🔴 PASTE SAVED VALUES HERE
const clientID = "1451a764-1f31-4ca5-abfa-c03b80ca02d6";
const clientSecret = "QWrBfKYPJsBUUysD";

async function getToken() {
  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      ...userData,
      clientID,
      clientSecret
    });

    console.log("\n🔥 TOKEN:\n");
    console.log(res.data.access_token);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

getToken();