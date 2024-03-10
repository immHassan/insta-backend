const express = require("express");
const axios = require("axios");

const app = express();

var cookie = 'mid=ZdborwAEAAEvFalZ2_gfYGlgRqol; ps_l=0; ps_n=0; ig_did=9B6B8A78-5902-4E34-BAF8-E2DF6535FEE9; datr=r-jWZbombvttNS-AA4qmB1GT; ig_nrcb=1; ig_lang=en-gb; fbm_124024574287414=base_domain=.instagram.com; csrftoken=5xrYDB6PEv0mWw7H5CGAA40gGbYruDZ3; ds_user_id=59541738154; sessionid=59541738154%3A1gZGuwMbCcpND8%3A18%3AAYfO_gQQS9cWCK2l2M_zEHIcosCOBwoRn47_3Zdl-w; dpr=2; rur="LDC\05459541738154\0541741598303:01f79643fe6da7ad8bd754c65334e45d3c23a4f4e634b36848772a816c415eb83abe6752"';

var userAgents = [
  "Mozilla/5.0 (Linux; Android 12; P60 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 Instagram 308.0.0.36.109 Android (31/12; 320dpi; 720x1468; CUBOT; P60; P60; mt6765; es_ES; 534961953)",
];

var requestCount = 0;

var totalRequestCount = 0;
var requestTimestamps = []; // Array to store timestamps of requests


// Define a route to fetch Instagram user info

// To get Data from instagram user Id
app.get("/api/instagram/user-pictures/:userId", async (req, res) => {

  
  const currentTime = Date.now();

// Remove timestamps older than 1 hour from the array
requestTimestamps = requestTimestamps.filter(timestamp => currentTime - timestamp <= 3600000);

// If request limit is reached, return error response
if (requestTimestamps.length >= 55) {
  return res.status(429).json({ message: "55 requests per hour rate limit exceeded. Please try again later." });
}


if (requestCount >= 20) {
      await new Promise(resolve => setTimeout(resolve, 60000));
      requestCount = 0;
}


requestCount++;
totalRequestCount++;

console.log("requestCount",requestCount);
console.log("totalRequestCount",totalRequestCount);



res.json({
  profile_pictures: data,
  message: "Data fetched successfully",
  success: true,
});


  const { userId } = req.params; // Get the userId from the request parameters
  axios
    .get(`https://i.instagram.com/api/v1/users/${userId}/info/`, {
      headers: {
        cookie: cookie,
        "user-agent": userAgents[0],
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

      res.json({ data: [], message: "something went wrong", success: false });
    });
});

// To get User Id from Username
app.get("/api/instagram/user-id/:userName", async (req, res) => {

  // const randomDelay = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
  // const delayInMilliseconds = randomDelay * 1000; // Convert seconds to milliseconds  
  // await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

  const { userName } = req.params; // Get the userId from the request parameters
  axios
    .get(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`,
      {
        headers: {
          cookie: cookie,
          "user-agent": userAgents[0],
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
