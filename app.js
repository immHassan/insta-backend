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
        cookie:
          'ig_did=144CB627-09B1-405F-9F0F-6D1ACFAA4428; ig_nrcb=1; mid=ZcJgqwALAAF7JhFWmyOTCiBbGBlq; datr=0WfCZefcFVhZ9nynnxPret6H; ps_l=0; ps_n=0; ds_user_id=59541738154; csrftoken=H5LfVe0Wgo2LZIfoQhIlCu1sZV0LYkNv; sessionid=59541738154%3AFmSZtw5UKG2tMZ%3A24%3AAYf93NH5BD8lEqsCBBqu5Jv79PFcm4ZN8hCJP4EC9w; rur="CLN\05459541738154\0541738890607:01f7481e97c5e9bfb5caec19213a252e88bb500ac65f202a22de7665e551a7ed95af79dd"',
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
          cookie:
            'mid=ZcPjRgALAAHLVmnHQIxVqe1zxKDX; ig_did=2BDBD27A-E676-4176-AF10-5022D896AD4F; ig_nrcb=1; ps_l=0; ps_n=0; datr=TOPDZYjoIan2799ltR9LkV_I; csrftoken=K8zIkvsTmvIe3agqQtHnbEEfCaPQ3kC8; ds_user_id=59541738154; sessionid=59541738154%3AXqcnOafdo7126y%3A6%3AAYfvUE3Cjaf_E1u2TQZbpF-Zomq5Ac4gIDUwAqKRLw; rur="LDC\05459541738154\0541738872561:01f719dab35a860f64b1dee065b2fdf0e02a8fb84453eaf7d7fca33d37f3f2aabe0c106f"',
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
