const cheerio = require('cheerio'); 
const request = require('request'); 
const express = require('express'); 
const app = express(); 

request.get('https://google.com/maps/search/schools+in+kathmandu', 
(err, res, data) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(data);
        const title = $('.qBF1Pd span').text(); 
        console.log(title); 
    }   
});

app.get('/', (res, req) => {
    console.log("connected to react!");
}
)

const PORT = process.env.PORT || 8080; 

app.listen(PORT, 
    console.log(`Server running on PORT: ${PORT}`));