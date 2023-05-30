const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

/* Start Of Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
/* End Of Middleware*/

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: __dirname + "/.." });
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// Route to handle form submission
app.post("/analyze", async function (req, res) {
  try {
    const { article } = req.body;

    // Validate the URL input
    if (!article) {
      return res.status(400).json({ error: "article cannot be blank." });
    }
    // Make a request to the meaningcloud Sentiment Analysis API
    const response = await axios.get(
      `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.MEANINGCLOUD_API_KEY}&txt=${article}&lang=en`
    );
    const analysisResult = response.data;

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error("Error during API request:", error);
    return res.status(500).json({ error: "Failed to analyze the article." });
  }
});

// app.post('/analyze', async (req, res) => {
//     try {
//       const data = await meaningcloudAPI.analyzeSentiment(req.body.url);
//       res.send(data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: 'An error occurred' });
//     }
//   });
