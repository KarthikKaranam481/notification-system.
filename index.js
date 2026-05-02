const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "http://20.207.122.201/evaluation-service";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYW5pa2FydGhpa19rYXJhbmFtQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNDk2MywiaWF0IjoxNzc3NzA0MDYzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMmY4YTA4NGItYmE0YS00MmMyLWFlZWItZDU5ZTBlMWZmYzc4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FydGhpayIsInN1YiI6IjE0NTFhNzY0LTFmMzEtNGNhNS1hYmZhLWMwM2I4MGNhMDJkNiJ9LCJlbWFpbCI6Im1hbmlrYXJ0aGlrX2thcmFuYW1Ac3JtYXAuZWR1LmluIiwibmFtZSI6ImthcnRoaWsiLCJyb2xsTm8iOiJhcDIzMTEwMDExNDgxIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMTQ1MWE3NjQtMWYzMS00Y2E1LWFiZmEtYzAzYjgwY2EwMmQ2IiwiY2xpZW50U2VjcmV0IjoiUVdyQmZLWVBKc0JVVXlzRCJ9.VcgaZT_wkY0u9TbBP06F6A6MhYB-3eL6Nhv6KFd8AXk"; // use your token

// Proxy route
app.get("/notifications", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("BACKEND ERROR:",
      err.response?.status,
      err.response?.data || err.message
    ); // 👈 ADD THIS
    res.status(500).json(err.response?.data || err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});