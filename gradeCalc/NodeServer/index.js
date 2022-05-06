const express = require('express');
const StudentVue = require('studentvue.js');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


io.on('connection', (socket) => {
    socket.on('getGrades', (username, password) => {
    putObject(username, password)
    });
  });


let mpObject = [];
let allGrades = [];
let className = '';
let grades = {
    a: 89.5,
    b: 79.5,
    c: 69.5,
    d: 59.5
}

async function putObject(username, password) {
    for (let i = 1; i <= 5; i += 2) {
        let testthing = await (getGrades('https://va-arl-psv.edupoint.com/', username, password, i))
        mpObject.push(testthing)
        testthing = ''
        //console.log(i)
        console.log(mpObject)
        if (i === 5) {
            callGrades();
        } 
    }
}

function getGrades(url, username, password, reportingPeriod)  {
    return StudentVue.login(url, username, password, reportingPeriod)
        .then(client => client.getGradebook(reportingPeriod))
        .then(JSON.parse)
    
}


function callGrades() { 
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= 2; j++) {
            if (j === 1) {
                allGrades.push(mpObject[j]['Gradebook']['Courses']['Course'][i]['Marks']['Mark']['0']['CalculatedScoreRaw'])
                //console.log(mpObject[j]['Gradebook']['Courses']['Course'][i]['Marks']['Mark']['0']['CalculatedScoreRaw'])
            }
            else {
                allGrades.push(mpObject[j]['Gradebook']['Courses']['Course'][i]['Marks']['Mark']['CalculatedScoreRaw'])
                //console.log(mpObject[j]['Gradebook']['Courses']['Course'][i]['Marks']['Mark']['CalculatedScoreRaw'])
            }
            className = mpObject[j]['Gradebook']['Courses']['Course'][i];
            
    }
    //console.log(allGrades)
    //console.log(className)
    computeLowestGrade(allGrades, 'a');
    allGrades = [];
    className = '';
} 
}

function computeLowestGrade(allGrades, grade) {
    let zero = 0;
    for (let array = 0; array < allGrades.length; array++) {
        if(allGrades[array] == 0) {zero++}
    }
    let gradeWanted = (allGrades.length - zero) * grades[grade] + grades[grade];
    let totalCurrent = 0;
    for (let i = 0; i < allGrades.length; i++) {
            totalCurrent += parseInt(allGrades[i])
    }
    if (grade === 'a') {
    console.log('You need a ' + (gradeWanted - totalCurrent) + '% to get an ' + grade.toUpperCase() + ' in ' + className['Title'])
    io.emit("needed", 'You need a ' + (gradeWanted - totalCurrent) + '% to get an ' + grade.toUpperCase() + ' in ' + className['Title'])


    }
    else {
        console.log('You need a ' + (gradeWanted - totalCurrent) + '% to get a ' + grade.toUpperCase() + ' in ' + className['Title'])
        io.emit('needed'), 'You need a ' + (gradeWanted - totalCurrent) + '% to get a ' + grade.toUpperCase() + ' in ' + className['Title'] 
    }

}






