'use strict';

var path = require('path'),
    express = require('express'),
    fs = require('fs'),
    moment = require('moment'),
    momentTimezone = require('moment-timezone'),
    fs = require('fs'),
    dateFromat = 'dd/mm/yyyy hh:mm:ss',
    xml2js = require('xml2js'),
    xml2jsParser = xml2js.parseString;
    //util = require('util');

var currentScene,
    countdDownTimer = 0,
    nextNumbers,
    numbersInProgress,
    currentSelectedNumbers = [1,2,33,14,5,36,27,8,19,30,21,12,39,40,15,6,17,38,9,24];


// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

function promisesParser(string)
{
    return new Promise(function(resolve, reject)
    {
        xml2jsParser(string, function(err, result) {
            if (err) {
                return reject(err);
             } else {
                return resolve(result);
             }
        });
    });
}

var parser = new xml2js.Parser(),
    xmlBuilder = new xml2js.Builder();

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

var fileAnimationConfigs = staticPath + "XMLFiles\\animation-configs.xml"; 

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {    
    ReadConfigs();
    UpdateCurrentNumbersInProgress();
    //countdDownTimer = GetTimerRemaingTime();
    //console.log(countdDownTimer);
    
});

app.get("/api/GetNumbers", function (req, res) {
      res.json({ numbers: currentSelectedNumbers}) 
});

app.get("/api/GetRemainingTime", function (req, res) {

       let sec = GetTimerRemaingTime();
       console.log('/api/GetRemainingTime countdDownTimer: ' + countdDownTimer);
       res.json({seconds:sec});
});    

app.get("/api/GetLastThree", (req, res) => {

})

function ReadConfigs(){     
    //console.log(fileAnimationConfigs);
    try {
        fs.readFile(fileAnimationConfigs, 'utf-8', function (err, data){
            if(err) console.log(err);
            // we log out the readFile results    
            //console.log(data);
            // we then pass the data to our method here
            parser.parseString(data, function(err, result){
                if(err) console.log(err);

                let json = result;
                //console.log(result);
                
            });
        });         
    } catch (ex) {
        console.log("Unable to read file '" + filePath + "'.");
        console.log(ex);
    }
}
function UpdateCurrentNumbersInProgress(){
    try {
        fs.readFile(fileAnimationConfigs, 'utf-8', function (err, data){
            if(err) console.log(err);
            // we then pass the data to our method here
            parser.parseString(data, function(err, result){
                if(err) console.log(err);

                let json = result;
                if(json.root.NumbersInProgress == "")
                {
                    currentSelectedNumbers = JSON.parse("[" + json.root.NextNumbers + "]"); ;
                    //console.log(currentSelectedNumbers);
                    json.root.NumbersInProgress = currentSelectedNumbers;
        
                    // create a new builder object and then convert
                    // our json back to xml.
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(json);
        
                    fs.writeFile(fileAnimationConfigs, xml, function(err, data){
                        if (err) console.log(err);
            
                        console.log("successfully written update xml to file");
                    })
                }
            });
        });         
    } catch (ex) {
        console.log("Unable to read file '" + filePath + "'.");
        console.log(ex);
    }
}

function GetNumbers()
{
    try {
        
        /*fs.readFile(fileAnimationConfigs, 'utf-8', function (err, data){
            if(err) console.log(err);
            // we then pass the data to our method here
            parser.parseString(data, function(err, result){
                if(err) console.log(err);

                let json = result;
                if(json.root.NumbersInProgress == "")
                {
                    currentSelectedNumbers = json.root.NextNumbers;
                    console.log(currentSelectedNumbers);
                    json.root.NumbersInProgress = currentSelectedNumbers;
                }
            });
        });   */      
    } catch (ex) {
        console.log("Unable to read file '" + filePath + "'.");
        console.log(ex);
    }
}

function SetCountdDownTimer(value)
{
    countdDownTimer = value;
}

function ParseFileData(err, result)
{
    if(err) {
        console.log(err);
        return;
    }   

    let json = result;

    let startDate  = moment();
    //console.log('json: ' + json);
    let endDate = moment('17/07/2018 00:10:25', dateFromat); //json.root.NextStart

    let diff = endDate.diff(startDate, 'seconds');;
    console.log('diff: ' + diff);
    
    SetCountdDownTimer(diff);
    console.log('countdDownTimer should be now: ' + countdDownTimer);
    return countdDownTimer
}

function FinishedReading(err, data)
{
    if(err) console.log(err);
    // we then pass the data to our method here
    return ParseFileData(err, data);
}


function GetTimerRemaingTime()
{
    var sec = 5;    
    try {
        //console.log(fileAnimationConfigs);
        //sec = 8+12;  
       
       let file = fs.readFile(fileAnimationConfigs, 'utf-8', FinishedReading);
       
       //console.log('file is : ' + file);
       console.log('countdDownTimer now is : ' + countdDownTimer);
       return sec;
       /*fs.readFile(fileAnimationConfigs, 'utf-8', function (err, data){
            if(err) console.log(err);
            // we then pass the data to our method here
            parser.parseString(data, function(err, result){
                if(err) console.log(err);

                let json = result;

                let startDate  = moment();
                //console.log('json: ' + json);
                let endDate = moment('16/07/2018 22:35:000', dateFromat); //json.root.NextStart

                let diff = endDate.diff(startDate, 'seconds');;

                SetCountdDownTimer(diff);
                console.log('countdDownTimer should be now: ' + countdDownTimer);
            });
        });  */ 
        //console.log('countdDownTimer now is : ' + countdDownTimer);
       /*let getFileData = fs.readFileAsync(fileAnimationConfigs, 'utf8').then((data) => {
               promisesParser(data).then((err, result) => {
                    if(err) console.log(err);

                    let json = result;

                    var startDate  = moment();
                    console.log('json: '+json);
                    var endDate = moment('16/07/2018 02:00:000', dateFromat); //

                    countdDownTimer = endDate.diff(startDate, 'seconds');;
                    console.log('difference sec: ' + sec);
            }).then(() => {
                console.log('countdDownTimer: ' + countdDownTimer);                
            })
            .catch((err) => { console.log(err); })           
        })
        .catch((err) => { console.log(err); }) ;*/
        
        /*let readFile = await fs.readFile(fileAnimationConfigs, 'utf-8', function (err, data){
                if(err) console.log(err);
                sec = 8+7;  
                // we then pass the data to our method here
                parser.parseString(data, function(err, result){
                    if(err) console.log(err);

                    let json = result;
                    var startDate  = moment();
                    /*
                    var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
                    var d = moment.duration(ms);
                    var s = d.format("hh:mm:ss");
                    var endDate = moment('15/07/2018 22:25:45', dateFromat); //
                    console.log(endDate); 
                    console.log('startDate: ' + startDate);
                    console.log('endDate: ' + endDate);
                    sec = 8+2;   
                    console.log('difference sec: ' + sec); 
                    return sec; 
                });
        })*/
        //sec = endDate.diff(startDate, 'seconds'); 
        //console.log('sekunde: ' + countdDownTimer);
        //return countdDownTimer;               
    } catch (ex) {
        console.log("Unable to read file '" + fileAnimationConfigs + "'.");
        console.log(ex);
    }
    return sec; 
}

function LogError()
{
    
}