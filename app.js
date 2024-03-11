const express = require("express");
const axios = require("axios");

const app = express();

var cookie = 'mid=ZdborwAEAAEvFalZ2_gfYGlgRqol; ps_l=0; ps_n=0; ig_did=9B6B8A78-5902-4E34-BAF8-E2DF6535FEE9; datr=r-jWZbombvttNS-AA4qmB1GT; ig_nrcb=1; ig_lang=en-gb; fbm_124024574287414=base_domain=.instagram.com; dpr=2; fbsr_124024574287414=UsuiyvTJnnn7ubZ7kqEpiNpwH0jAwJ83Oos7aV5yKtM.eyJ1c2VyX2lkIjoiMTAwMDAwMDM5NDI5MDg0IiwiY29kZSI6IkFRRF80R1ZmR1d4QkZIQklPb2s3LVVNd2V0UkhRTFZzR0FpUG9KLXAxU3VZM2tHb3loU0N6LThJNXI2OFNoQjRKYmRVd0RGWkkzVlp3YmJwanBOcmhfaHZma1hHWXMzOXJEbVZBZjk2OFNFUl9lQmdLakRWX3cyeTlNUjN1UEdUVnRTYmpwTzB5ZFFROG5XU3luSzQ5Skh0eHdseksyZXpIazZOekZyZ0NUc3gtUVp0U25NSldNamF1UzZCM216UHZpRTNTY2ZJRmJsOWstMjRqMVRKeUNRSkp5MEYxYjl6SE45RGVtNDZZZEo1RUdkV3RGZnJieDI2MzdOUnZxUVE4Y3BsNktIWEZpQjdvRmRweDU5U2FpTVZDd2dOb0NycnJaWkFkbm1SN3lDMG5Rb2pzeXdpNlBCNmJPVmh1SlFNOEZZQTV0UmVqSHlLdUdlZUdnYnFIQjZvZEcxWlEwY0VIeUt0SFpBLUxsdFM3ZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQk82QzVTemhWRHpaQUNkWHZkaHAzYUlVM0ZaQ0JpZHRXeUp4eXIxN2tnWkNFUlA5N25JSW9xTWRMRlQ1M2Nnd0FIZVVNNjRkSTZlSXJFYmdseWM2RVV1SUVQUVVaQjlUMGNLWFB2Q0oxMjdnTFVmdDViQWVTdlcxZW9WWkIzQUc3Y3hoUTJFWkNQRGpaQnU0ZVJCZ0xiTXo2YWFaQWZycW82Q1h0TFpCbkFUeElZbDhBemp0MUtCTm4zY2tpalpDSmdXanFPczVqSWJLNDRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzEwMTgyNTI3fQ; csrftoken=BWhDoTlynUMwzDRrFMsQ3xVTWevoyVlT; ds_user_id=59541738154; sessionid=59541738154%3AdJGjLeSeeYZY1h%3A26%3AAYe8uLMjy0K_9_1z_iO4jYTKkOCuWaWeir8d3NrDHA; rur="LDC\05459541738154\0541741718562:01f7782da0874a8ff647646c80817adf7cb0696480fb46cebdb0da649646466106bb30c5"';

var userAgents = [
  "Mozilla/5.0 (Linux; Android 12; P60 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 Instagram 308.0.0.36.109 Android (31/12; 320dpi; 720x1468; CUBOT; P60; P60; mt6765; es_ES; 534961953)",
];

var requestCount = 0;

var totalRequestCount = 0;
var requestTimestamps = []; // Array to store timestamps of requests


// Define a route to fetch Instagram user info

// To get Data from instagram user Id
app.get("/api/instagram/user-pictures/:userId", async (req, res) => {


     const randomDelay = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
     const delayInMilliseconds = randomDelay * 1000; // Convert seconds to milliseconds  
     await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

  
  const currentTime = Date.now();


// Remove timestamps older than 1 hour from the array
requestTimestamps = await requestTimestamps.filter(timestamp => currentTime - timestamp <= 3600000);

// If request limit is reached, return error response
if (requestTimestamps.length >= 55) {
  return res.json({ data: [], message: "55 requests per hour rate limit exceeded. Please try again later.", success: false });
}

requestTimestamps.push(currentTime);
  

if (requestCount >= 20) {
      await new Promise(resolve => setTimeout(resolve, 60000));
      requestCount = 0;
}


requestCount++;
totalRequestCount++;

console.log("requestCount",requestCount);
console.log("totalRequestCount",totalRequestCount);
console.log("requestTimestamps",requestTimestamps);
console.log("requestTimestamps length",requestTimestamps.length);


// res.json({
//   profile_pictures: [],
//   message: "Data fetched successfully",
//   success: true,
// });




    const { userId } = req.params; // Get the userId from the request parameters
  await axios
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

      console.log("error",error);
      res.json({ data: [], message: "something went wrong", success: false });
    });

  
  //await trigger_api(req);


  
});



async function trigger_api(req){



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

      console.log("error",error);
      res.json({ data: [], message: "something went wrong", success: false });
    });

}



// To get User Id from Username
app.get("/api/instagram/user-id/:userName", async (req, res) => {


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
