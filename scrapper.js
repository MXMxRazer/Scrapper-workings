const { ifError } = require('assert');
const { time, clear } = require('console');
const { Resolver } = require('dns');
const { access } = require('fs');
const puppeteer = require('puppeteer'); 
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout,});  


let promise = new Promise( (resolve, reject) => {
        readline.question("Value (city): ", (name) => {
            resolve(name); 
        })
    }
)

const resulter = async () => {
    try {
    const result = await promise; 
    console.log("Result: " + result);
    await runner(result); 
    }
    catch (err) {
        console.log(err); 
    }  
}
resulter(); 

const runner = async (site) => { 
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage(); 
    await page.goto(`https://google.com/maps/search/schools+in+${site}`); 
    var counter = 0; 
    try {
        console.log('Parsing data...');
        page.evaluate( () => {
            let a = document.querySelectorAll('.ecceSd')[1] || document.querySelectorAll('.m6QErb')[4]; 
            a.scrollBy(0, 100); 
        }
        );  
        let resolver = await Scroller(page);
        let values = await Parser(page);
        console.log(`Values: \n${values}`);
        for (value in values) {
            counter++;
        }
        console.log(`Total Count: ${counter}`); 
    }
    catch (err) {
    console.log(err); 
    }  
}

const Parser = async (page) => {
    var schoolNames = [];  
    const places = await page.$$('.qBF1Pd span'); 
    for (const el of places) {
        const names = await el.evaluate(span => span.textContent); 
        schoolNames.push(names);   
    }
    return schoolNames;  
}

const Scroller = async (page) => {
    await page.evaluate( async () => {
        await new Promise((resolve, reject) => {
            var totalH = 0; 
            var traverse = 100; 
            var b, ultimateH;
            let a = document.querySelectorAll('.m6QErb')[4] || document.querySelectorAll('.ecceSd')[1]; 
            var counter = 0; 
            const timer = setInterval(() => {
                a.scrollBy(0, 60); 
                b = document.querySelector('.QjC7t');
                b.scrollBy(0, traverse);  
                ultimateH = b.scrollHeight+300;
                totalH += traverse + 80;
                counter++;
                    if (( totalH >= ultimateH*1.3)) {
                        clearInterval(timer); 
                        resolve(); 
                    }
                }
                , 450);
            })
        });
}

module.exports = {runner}; 
