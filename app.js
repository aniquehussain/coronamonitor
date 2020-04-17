const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
var request = require("request");
const countries = require("countries-list");
// console.log(countries.countries);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res) {
  const countryName = req.body.slct;
  const apiKey = "1fc1a156b8mshb01d5ed20621a31p1602c3jsnab438f067e3a";
  const options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  };

  // Stats
  request(options, function(error, response, body) {
    var jsonData = JSON.parse(body);
    if (error) throw new Error(error);
    // console.log(countryName);
    for (var i = 0; i < jsonData.response.length; i++) {
      if (jsonData.response[i].country == countryName) {
        console.log(jsonData.response[i]);


        const totalCases = jsonData.response[i].cases.total;
        const newCases = jsonData.response[i].cases.new;
        const recoveredCases = jsonData.response[i].cases.recovered;
        const deathCases = jsonData.response[i].deaths.total;
        res.write("<body style='border-width:0px;'><br><br><h1 style='text-align: center;color:#F20152;font-family: arial;font-weight:500'> STATISTICS </h1><br><br><br><br></body>");
        res.write("<h3 style='text-align: center; font-family: sans-serif;font-weight:500;'> New cases: " + newCases + "</h3>");
        res.write("<h3 style='text-align: center;font-family: sans-serif;font-weight:500;'>Total cases: " + totalCases + "</h3>");
        res.write("<h3 style='text-align: center;font-family: sans-serif;font-weight:500;'> Recovered: " + recoveredCases + "</h3>");
        res.write("<h3 style='text-align: center;font-family: sans-serif;font-weight:500;'>Total Deceased: " + deathCases + "</h3>");
        res.send();

      }
    }
    // console.log(jsonData);
  })

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is started at port 3000");
});
