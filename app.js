const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const request = require("request");
const countries = require("countries-list");
let totalCases = 0;
let newCases = 0;
let recoveredCases = 0;
let deathCases = 0;

// console.log(countries.countries);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render('home');
});
app.get("/stats",function(req,res){
  res.render('stats',{TotalCases: totalCases,NewCases:newCases,RecoveredCases:recoveredCases,DeceasedCases:deathCases});
});

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
    let jsonData = JSON.parse(body);
    if (error) throw new Error(error);
    // console.log(countryName);
    for (let i = 0; i < jsonData.response.length; i++) {
      if (jsonData.response[i].country == countryName) {
        // console.log(jsonData.response[i]);


        totalCases = jsonData.response[i].cases.total;
        newCases = jsonData.response[i].cases.new;
        recoveredCases = jsonData.response[i].cases.recovered;
        deathCases = jsonData.response[i].deaths.total;
        // res.send();
        res.redirect("/stats");
      }
    }
    // console.log(jsonData);
  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is started at port 3000");
});
