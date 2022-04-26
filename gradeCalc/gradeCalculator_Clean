const StudentVue = require('studentvue.js');

putObject();
let mpObject = [];
let allGrades = [];
let className = '';
let grades = {
    a: 358,
    b: 318,
    c: 278
}

async function putObject() {
    for (let i = 1; i <= 5; i += 2) {
        let testthing = await (getGrades('https://va-arl-psv.edupoint.com/', '986134', 'xbnu4gnl', i))
        mpObject.push(testthing)
        testthing = ''
        //console.log(i)
        //console.log(mpObject)
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


function callGrades() { // Add feature to choose class
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
    let gradeWanted = grades[grade];
    let totalCurrent = 0;
    for (let i = 0; i < allGrades.length; i++) {
        totalCurrent += parseInt(allGrades[i])
        
    }
    if (grade === 'a') {
    console.log('You need a ' + (gradeWanted - totalCurrent) + '% to get an ' + grade.toUpperCase() + ' in ' + className['Title'])
    }
    else {
        console.log('You need a ' + (gradeWanted - totalCurrent) + '% to get a ' + grade.toUpperCase() + ' in ' + className['Title']) 
    }

}



