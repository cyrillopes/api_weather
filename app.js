const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName; //readig data using body-parser npm package
  const apiKey = "d53b30e762e1e9d395a2c30f3e4cca52";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  //using the native node package to receive data from extrenal sources
  https.get(url, function (response) {
    // console.log(response.statusCode);

    //getting data from the url
    response.on("data", function (data) {
      console.log(data); //Returns hexadecimal code
      const weatherData = JSON.parse(data); //converting the hexadecimal code to json code and storing it in a weatherData object
      // console.log(weatherData);
      //   const object = {
      //     name: "Cyril",
      //     color: "red",
      //   };
      //converting JSON data to string just like toString() method in java
      //   console.log(JSON.stringify(object));
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(
        `<h1>The temperature in ${query} is ${temp} degreees celcius</h1>`
      );
      res.write(`<img src="${imgURL}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Started on port 3000");
});
