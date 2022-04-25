const StudentVue = require('studentvue.js');
dothing();
let grades;
let mpObject = [];
let allGrades = [];
//let domObject = document.getElementById('domObject');

for (let i = 1; i <= 5; i += 2) {
    mpObject.push(getGrades('https://va-arl-psv.edupoint.com/', '986134', 'xbnu4gnl', i))
    grades = getGrades('https://va-arl-psv.edupoint.com/', '986134', 'xbnu4gnl', i);
    
    
}


function getGrades(url, username, password, reportingPeriod)  {
    /*
    0: IPR1
    1: MP1
    2: IPR2
    3: MP2
    4: IPR3
    5: MP3
    6: IPR4
    7: MP4
    */
    return StudentVue.login(url, username, password, reportingPeriod)
        .then(client => client.getGradebook(reportingPeriod))
        .then(JSON.parse)
    
}

//let grades = getGrades('https://va-arl-psv.edupoint.com/', '986134', 'xbnu4gnl', 1);

function callGrades() {
   // console.log(grades['_rejectionHandler0']['Gradebook']['Courses']['Course']['0']['Marks']['Mark']['CalculatedScoreRaw'] + '%');
    for (let j = 0; j <= 2; j++) {
        if (j === 1) {
            allGrades.push(mpObject[j]['_rejectionHandler0']['Gradebook']['Courses']['Course']['0']['Marks']['Mark']['0']['CalculatedScoreRaw'])
            console.log(mpObject[j]['_rejectionHandler0']['Gradebook']['Courses']['Course']['0']['Marks']['Mark']['0']['CalculatedScoreRaw'])
        }
        else {
            allGrades.push(mpObject[j]['_rejectionHandler0']['Gradebook']['Courses']['Course']['0']['Marks']['Mark']['CalculatedScoreRaw'])
            console.log(mpObject[j]['_rejectionHandler0']['Gradebook']['Courses']['Course']['0']['Marks']['Mark']['CalculatedScoreRaw'])
        } 
    } 
    console.log(allGrades)
    computeLowestGrade(allGrades);
}

function computeLowestGrade(allGrades) {
    let totalNeeded = 358;
    let total = 0;
    for (let i = 0; i < allGrades.length; i++) {
        total += parseInt(allGrades[i])
        
    }
    console.log(totalNeeded - total)
    //domObject.innerHTML(totalNeeded - total);

}

setTimeout( function () { callGrades(); }, 60000)

function dothing() {
    console.log('');
    setTimeout(dothing, 1000);
}



