const express = require("express");
const axios = require("axios");

const app = express();

var cookie =
  'mid=ZdborwAEAAEvFalZ2_gfYGlgRqol; ps_l=0; ps_n=0; ig_did=9B6B8A78-5902-4E34-BAF8-E2DF6535FEE9; datr=r-jWZbombvttNS-AA4qmB1GT; ig_nrcb=1; ig_lang=en-gb; ds_user_id=65290888848; fbm_124024574287414=base_domain=.instagram.com; csrftoken=PurkqXZEerykMJSyqk1I2HkQYXO3RVNL; sessionid=65290888848%3A6xELlWyqLjpldv%3A11%3AAYf3rMMPDhFsL5huWi2FROuK5qbAH6FSuc4xZ1-pHA; rur="LDC\05465290888848\0541740467128:01f79a920fd8e91e78ad6e567d02db6a677dbdb0567a79a663955af3f5ba916f06ca0407"';

var userAgents = [
  "Mozilla/5.0 (Linux; Android 12; P60 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 Instagram 308.0.0.36.109 Android (31/12; 320dpi; 720x1468; CUBOT; P60; P60; mt6765; es_ES; 534961953)",
  "Mozilla/5.0 (Linux; U; Android 4.3; ru-ru; Z10 Build/10.3.3.213) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 Instagram 9.1.0 Android (18/4.3; 320dpi; 768x1174; RIM/BlackBerry; Z10; Z10; STL100-3; ru_RU)",
  "Instagram 151.0.0.29.119(V20) Android (30/11; 480dpi; 1080x2139; OPPO; CPH2068; OP4C6BL1; qcom; en_US; 185203693)	",
  "Instagram 64.0.0.14.96 Android (29/10; 225dpi; 1080x2158; realme; RMX3122; RMX3122; mt6833; in_ID)	",
  "Instagram 153.0.0.45.122 Android (23/10; 420dpi; 1440x2560; LGE/lge; LG-K720; m922; m922; en_US; 250742103)	",
  "Instagram 284.0.0.22.85 Android (27/8.1.0; 480dpi; 1080x2102; Vargo; VX4; VX4; mt6763; pt_PT; 477443857)	",
  "Instagram 292.0.0.31.110 Android (31/12; 190dpi; 1080x2020; ZTE; mooncake; ZTE-LINK; qcom; ru_RU; 323503577)	",
  "Mozilla/5.0 (Linux; Android 11; 9080G Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.67 Safari/537.36 Instagram 309.0.0.40.113 Android (30/11; 320dpi; 1200x1824; TCL; 9080G; Odin; mt6762; es_ES; 536988434)	",
  "Mozilla/5.0 (Linux; Android 10; 9081X Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Safari/537.36 Instagram 309.0.0.40.113 Android (29/10; 320dpi; 1200x1824; TCL; 9081X; Odin; mt6762; el_GR; 536988434)	",
  "Mozilla/5.0 (Linux; Android 9; K9 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 Instagram 307.0.0.34.111 Android (28/9; 480dpi; 1080x2004; OUKITEL; K9; K9; mt6765; es_ES; 532277880)	",
  "Mozilla/5.0 (Linux; Android 12; T431D Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 Instagram 309.0.0.40.113 Android (31/12; 240dpi; 480x888; TCL; T431D; Rio; mt6761; it_IT; 536988415)	",
  "Mozilla/5.0 (Linux; Android 7.0; A140 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.66 Safari/537.36 Instagram 309.0.0.40.113 Android (24/7.0; 280dpi; 1200x1836; A140; A140; A140; mt6735; de_DE; 536988415)	",
  "Instagram 310.0.0.37.328 Android (31/12; 440dpi; 1080x2180; Xiaomi; M2007J3SG; apollo; qcom; de_DE; 543594164)	",
  "Mozilla/5.0 (Linux; Android 5.1.1; Z959 Build/LMY47V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 Instagram 278.0.0.22.117 Android (22/5.1.1; 320dpi; 720x1280; ZTE; Z959; abby; qcom; fr_FR; 471827227)	",
  "Mozilla/5.0 (Linux; Android 12; A202SH Build/SC263; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 Instagram 312.1.0.34.111 Android (31/12; 530dpi; 1260x2502; SHARP/SG; A202SH; Mineva; qcom; ja_JP; 548323757)	",
  "Mozilla/5.0 (Linux; Android 12; T431D Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 Instagram 312.1.0.34.111 Android (31/12; 240dpi; 480x888; TCL; T431D; Rio; mt6761; it_IT; 548323740)	",
  "Mozilla/5.0 (Linux; Android 12; T431D Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 Instagram 312.1.0.34.111 Android (31/12; 240dpi; 480x888; TCL; T431D; Rio; mt6761; it_IT; 548323740)	",
  "Mozilla/5.0 (Linux; Android 7.0; A140 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.193 Safari/537.36 Instagram 313.0.0.26.328 Android (24/7.0; 240dpi; 1200x1848; A140; A140; A140; mt6735; de_DE; 554218466)	",
  "Instagram 315.0.0.29.109 Android (33/13; 320dpi; 720x1459; TCL; T610K; Model_3; mt6765; es_ES; 558601268)	",
  "Mozilla/5.0 (Linux; Android 12; PEPM00 Build/OPPOPEPM00;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Safari/537.36 Instagram 312.1.0.34.111 Android (31/12; 300dpi; 1440x2200; OPPO; PEPM00; OP4ECB; qcom; ar_SA; 548323749)	",
];



/*
,
  
    */
var currentUserAgent = 0;

var userAgentLimit = userAgents.length;

let requestCount = 0;

// Define a route to fetch Instagram user info

// To get Data from instagram user Id
app.get("/api/instagram/user-pictures/:userId", async (req, res) => {
  requestCount++;

  console.log(requestCount);

  if (requestCount >= 20) {
    await new Promise(resolve => setTimeout(resolve, 60000)); // Sleep for 1 minute (60,000 milliseconds)
    requestCount = 0;
  }


  
  if (currentUserAgent == userAgentLimit) {
    currentUserAgent = 0;
  }




  const randomDelay = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
  const delayInMilliseconds = randomDelay * 1000; // Convert seconds to milliseconds
  
  await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));



  const { userId } = req.params; // Get the userId from the request parameters
  axios
    .get(`https://i.instagram.com/api/v1/users/${userId}/info/`, {
      headers: {
        cookie: cookie,
        "user-agent": userAgents[currentUserAgent],
      },
    })
    .then((response) => {
      console.log("userAgent", userAgents[currentUserAgent]);
      console.log("cookie", cookie);

      currentUserAgent++;

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
      console.log("userAgent", userAgents[currentUserAgent]);
      console.log("cookie", cookie);

      currentUserAgent++;

      console.error(error);
      res.json({ data: [], message: "something went wrong", success: false });
    });
});

// To get User Id from Username
app.get("/api/instagram/user-id/:userName", async (req, res) => {
  
  requestCount++;

  console.log(requestCount);

  if (requestCount >= 20) {
    await new Promise(resolve => setTimeout(resolve, 60000)); // Sleep for 1 minute (60,000 milliseconds)
    requestCount = 0;
  }


  if (currentUserAgent == userAgentLimit) {
    currentUserAgent = 0;
  }




  const randomDelay = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
  const delayInMilliseconds = randomDelay * 1000; // Convert seconds to milliseconds
  
  await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));



  const { userName } = req.params; // Get the userId from the request parameters
  axios
    .get(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`,
      {
        headers: {
          cookie: cookie,
          "user-agent": userAgents[currentUserAgent],
        },
      }
    )
    .then((response) => {
      console.log("userAgent", userAgents[currentUserAgent]);
      console.log("cookie", cookie);

      currentUserAgent++;

      res.json({
        userId: response.data.data.user.id,
        message: "Data fetched successfully",
        success: true,
      });
    })
    .catch((error) => {
      console.log("userAgent", userAgents[currentUserAgent]);
      console.log("cookie", cookie);

      currentUserAgent++;

      console.error(error);
      res.json({ data: [], message: "something went wrong", success: false });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
