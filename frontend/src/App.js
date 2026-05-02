import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem
} from "@mui/material";

const BASE_URL = "http://localhost:5000";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications`);
      let data = res.data.notifications || res.data;

      if (type) {
        data = data.filter((n) => n.Type === type);
      }

      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Priority weights
  const TYPE_WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  // Get Top 10 Priority
  const getPrioritySorted = () => {
    return [...notifications]
      .sort((a, b) => {
        if (TYPE_WEIGHT[b.Type] !== TYPE_WEIGHT[a.Type]) {
          return TYPE_WEIGHT[b.Type] - TYPE_WEIGHT[a.Type];
        }
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 10);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        📢 Notifications
      </Typography>

      {/* FILTER */}
      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        displayEmpty
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>

      {/* ⭐ PRIORITY SECTION */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        ⭐ Priority Notifications (Top 10)
      </Typography>

      {getPrioritySorted().map((n) => (
        <Card
          key={"p" + n.ID}
          style={{ marginTop: "10px", background: "#ffe0b2" }}
        >
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography>{n.Message}</Typography>
            <Typography variant="caption">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* 📄 ALL NOTIFICATIONS */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        📄 All Notifications
      </Typography>

      {notifications.map((n) => (
        <Card
          key={n.ID}
          onClick={() => {
            if (!viewed.includes(n.ID)) {
              setViewed([...viewed, n.ID]);
            }
          }}
          style={{
            marginTop: "10px",
            background: viewed.includes(n.ID) ? "#e0e0e0" : "#ffffff",
            cursor: "pointer"
          }}
        >
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography>{n.Message}</Typography>
            <Typography variant="caption">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;