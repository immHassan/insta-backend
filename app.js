const express = require("express");
const axios = require("axios");

const app = express();

// Define a route to fetch Instagram user info

// To get Data from instagram user Id
app.get("/api/instagram/user-pictures/:userId", (req, res) => {
  const { userId } = req.params; // Get the userId from the request parameters
  axios
    .get(`https://i.instagram.com/api/v1/users/${userId}/info/`, {
      headers: {
        authority: "i.instagram.com",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        cookie:
          'mid=ZcPjRgALAAHLVmnHQIxVqe1zxKDX; ig_did=2BDBD27A-E676-4176-AF10-5022D896AD4F; ig_nrcb=1; ps_l=0; ps_n=0; datr=TOPDZYjoIan2799ltR9LkV_I; csrftoken=K8zIkvsTmvIe3agqQtHnbEEfCaPQ3kC8; ds_user_id=59541738154; sessionid=59541738154%3AXqcnOafdo7126y%3A6%3AAYfvUE3Cjaf_E1u2TQZbpF-Zomq5Ac4gIDUwAqKRLw; rur="LDC\05459541738154\0541738872561:01f719dab35a860f64b1dee065b2fdf0e02a8fb84453eaf7d7fca33d37f3f2aabe0c106f"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)",
      },
    })
    .then((response) => {
      let data = [];

      data = response.data.user.hd_profile_pic_versions;
      data = [...data, response.data.user.hd_profile_pic_url_info];

      res.json({
        profile_pictures: data,
        message: "Data fetched successfully",
        success: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({ data: [], message: "something went wrong", success: false });
    });
});

// To get User Id from Username
app.get("/api/instagram/user-id/:userName", (req, res) => {
  const { userName } = req.params; // Get the userId from the request parameters
  axios
    .get(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`,
      {
        headers: {
          authority: "i.instagram.com",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          cookie:
            'mid=ZcPjRgALAAHLVmnHQIxVqe1zxKDX; ig_did=2BDBD27A-E676-4176-AF10-5022D896AD4F; ig_nrcb=1; ps_l=0; ps_n=0; datr=TOPDZYjoIan2799ltR9LkV_I; csrftoken=K8zIkvsTmvIe3agqQtHnbEEfCaPQ3kC8; ds_user_id=59541738154; sessionid=59541738154%3AXqcnOafdo7126y%3A6%3AAYfvUE3Cjaf_E1u2TQZbpF-Zomq5Ac4gIDUwAqKRLw; rur="LDC\05459541738154\0541738872561:01f719dab35a860f64b1dee065b2fdf0e02a8fb84453eaf7d7fca33d37f3f2aabe0c106f"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)",
        },
      }
    )
    .then((response) => {
      res.json({
        userId: response.data.data.user.id,
        message: "Data fetched successfully",
        success: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({ data: [], message: "something went wrong", success: false });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
