const express = require("express");
const axios = require("axios");

const app = express();

// Define the Instagram API endpoint URL and headers
const apiUrl = "https://i.instagram.com/api/v1/users/52864197/info/";
const headers = {
  cookie:
    'ig_did=144CB627-09B1-405F-9F0F-6D1ACFAA4428; ig_nrcb=1; mid=ZcJgqwALAAF7JhFWmyOTCiBbGBlq; datr=0WfCZefcFVhZ9nynnxPret6H; ps_l=0; ps_n=0; ds_user_id=59541738154; csrftoken=3zTizQvuO7tb5T17ht4j4NfLksGNBsqI; sessionid=59541738154%3A2jzoZYIywD0Vu9%3A17%3AAYf4QSv7gG9Sp1YjevLXjtMZnOa1FMRJYovgX9UXCA; rur="LDC\05459541738154\0541738833932:01f7491e829e3d566437f4d08c6ece540c7e4befadebb707e923578c41c7886ee2285927"',
  "user-agent":
    "Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)",
};

// Define a route to fetch Instagram user info
app.get("/instagram/user/info", (req, res) => {
  // Make the GET request to the Instagram API
  axios
    .get(apiUrl, { headers })
    .then((response) => {
      // Send the response data back to the client
      res.json(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching data:", error);
      res.status(500).json({
        error: "An error occurred while fetching data from Instagram API",
      });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
