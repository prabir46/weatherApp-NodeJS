const http = require('http');
const fs = require('fs');
var requests = require("requests");

const homefile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal, orgVal) =>{
    console.log(orgVal.weather[0].main);
    let temperature =tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature =temperature.replace("{%location%}",orgVal.name);
    temperature =temperature.replace("{%country%}",orgVal.sys.country);
    temperature =temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req,res)=>{
  if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Chandannagar&units=metric&appid=dcb953403a9c72daefd847549577b14d')
    .on('data', function (chunk) {

      const objdata= JSON.parse(chunk);
      const arrData =[objdata];
    //   console.log(arrData[0].main.temp);
    //   console.log(objdata);
    // //   console.log(chunk);
     const realTimeData = arrData.map((val) =>
     replaceVal(homefile,val)).join("");
      res.write(realTimeData);
      //console.log(realTimeData);
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
      res.end();
      console.log('end');
    });
     
  }
});


server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to port 8000");
});