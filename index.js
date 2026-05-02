const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

// 🔴 SAME DATA AS BEFORE
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

    console.log("✅ Token Received");
    return res.data.access_token;

  } catch (err) {
    console.error("❌ Token Error:", err.response?.data || err.message);
  }
}

async function fetchNotifications(token) {
  try {
    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.notifications;

  } catch (err) {
    console.error("❌ Fetch Error:", err.response?.data || err.message);
  }
}

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getPriority(n) {
  return (
    TYPE_WEIGHT[n.Type] * 1000000000000 +
    new Date(n.Timestamp).getTime()
  );
}

async function main() {
  const token = await getToken();

  const notifications = await fetchNotifications(token);

  const top10 = notifications
    .sort((a, b) => getPriority(b) - getPriority(a))
    .slice(0, 10);

  console.log("\n🔥 TOP 10 NOTIFICATIONS:\n");

  top10.forEach((n, i) => {
    console.log(
      `${i + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`
    );
  });
}

main();

