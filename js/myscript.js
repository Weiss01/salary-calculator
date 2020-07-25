let listOfEmployees = [];
let viewMonths = [];
let currentFile;
let typeSeq = ['Trainee', 'Staff', 'JuniorExecutive', 'SeniorExecutive', 'JuniorBranchManager', 'SeniorBranchManager'];
let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ".split('');
let myStorage = window.sessionStorage;

createModal();

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}
function isNum(val) { return !isNaN(val) && val.indexOf(' ') === -1; }
function removeNonAlphabets(str) {
    let temp = str.split('');
    let removeList = []
    temp.forEach((item, i) => {
        if (!alphabets.includes(item)) {
            removeList.push(i)
        }
    });
    for (let i = 0; i < removeList.length; i++) {
        removeList[i] = removeList[i] - i;
    }
    removeList.forEach((item) => {
        temp.splice(item, 1);
    });
    return temp.join('');
}
function downloadObjectAsJson(exportObj, exportName) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
function readFileAsString(file) {
    let reader = new FileReader();
    reader.onload = function(event) {
        console.log("Finished Reading");
        let obj = JSON.parse(event.target.result);
        for (let importedObject of obj['listOfEmployees']) {
            let temp;
            if (importedObject.type === 'Trainee') {
                temp = new Trainee(importedObject.name);
                temp.build(importedObject);
            } else if (importedObject.type === 'Staff') {
                temp = new Staff(importedObject.name);
                temp.build(importedObject);
            } else if (importedObject.type === 'JuniorExecutive') {
                temp = new JuniorExecutive(importedObject.name);
                temp.build(importedObject);
            } else if (importedObject.type === 'SeniorExecutive') {
                temp = new SeniorExecutive(importedObject.name);
                temp.build(importedObject);
            } else if (importedObject.type === 'JuniorBranchManager') {
                temp = new JuniorBranchManager(importedObject.name);
                temp.build(importedObject);
            } else if (importedObject.type === 'SeniorBranchManager') {
                temp = new SeniorBranchManager(importedObject.name);
                temp.build(importedObject);
            } else {
                console.log('Failed to import ' + importedObject.name);
            }
            listOfEmployees.push(temp);
        }
        for (month of obj['viewMonths']) {
            viewMonths.push(month);
        }
    };
    reader.readAsText(file);
}
function sortEmployeeList() {
    listOfEmployees.sort(function (a, b) {
        if (typeSeq.indexOf(a.type) < typeSeq.indexOf(b.type)) {
            return -1;
        }
        if (typeSeq.indexOf(a.type) > typeSeq.indexOf(b.type)) {
            return 1;
        }
        return 0;
    })
}

function cleanup() {
    sortEmployeeList();
    exists('buttonToolbar') ? $('#buttonToolbar').remove() : {};
    exists('editNameDiv') ? $('#editNameDiv').remove() : {};
    exists('newCalcDiv') ? $('#newCalcDiv').remove() : {};
    exists('homeDiv') ? $('#homeDiv').remove() : {};
    exists('singleTableDiv') ? $('#singleTableDiv').remove() : {};
    exists('tableDiv') ? $('#tableDiv').remove() : {};
    exists('viewDiv') ? $('#viewDiv').remove() : {};
    exists('groupDiv') ? $('#groupDiv').remove() : {};
    exists('branchDiv') ? $('#branchDiv').remove() : {};
    exists('projectDiv') ? $('#projectDiv').remove() : {};
    exists('commisionDiv') ? $('#commisionDiv').remove() : {};
    exists('foodAllowanceDiv') ? $('#foodAllowanceDiv').remove() : {};
    exists('enterTripDiv') ? $('#enterTripDiv').remove() : {};
    exists('calculateSalaryDiv') ? $('#calculateSalaryDiv').remove() : {};
    exists('deleteEmployeeDiv') ? $('#deleteEmployeeDiv').remove() : {};
    exists('registerEmployeeDiv') ? $('#registerEmployeeDiv').remove() : {};
    exists('exportDiv') ? $('#exportDiv').remove() : {};
    exists('importDiv') ? $('#importDiv').remove() : {};
    $('.nav-link').attr('class', 'nav-link');
    exists('modal') ? $('#modal').modal('dispose') : {};
}

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if ($('body').attr('class') === "modal-open") {
            $('button').eq(1).click();
        } else if (exists('registerButton')) {
            $('#registerButton').click();
        } else {
            $('button').last().click();
        }
    }
});

$("body").on("click", '#homepage', function(){
    cleanup();
    $('#homepage').attr('class', 'nav-link active')
    $('#title').html('Homepage');
    homeDiv();
})

$("body").on("click", '#homepagelogo', function(){
    cleanup();
    $('#homepage').attr('class', 'nav-link active')
    $('#title').html('Homepage');
    homeDiv();
})

$("body").on("click", '#exportSessionData', function(){
    $('#title').html('Export Session Data');
    cleanup();
    $('#exportSessionData').attr('class', 'nav-link active')
    exportDiv();
})

$("body").on("click", '#exportFileButton', function(){
    myObj = {};
    myObj['listOfEmployees'] = listOfEmployees;
    myObj['viewMonths'] = viewMonths;
    console.log(myObj);
    downloadObjectAsJson(myObj, removeNonAlphabets($('#fileName').val()));
})

$("body").on("click", '#importSessionData', function(){
    $('#title').html('Import Session Data');
    cleanup();
    $('#importSessionData').attr('class', 'nav-link active')
    importDiv();
})

$("body").on("change", '#inputFile', function(event){
    currentFile = event.target.files[0];
    $(".custom-file-label").text(currentFile.name);
    exists('alertDiv') ? $('#alertDiv').remove() : {};
    $('<div/>', {id: 'alertDiv'}).appendTo('#importDiv');
    $('<br/>', {}).appendTo('#alertDiv');
    $('<div/>', {id: 'alert-bar', class: 'alert alert-primary', role: 'alert', text: "File Name: " + currentFile.name + ", File Type: " + currentFile.type + ", File Size: " + currentFile.size + "kB"}).appendTo('#alertDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#importDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', 'data-toggle' : 'modal', 'data-target' : '#modal', id : 'importButton', text : 'Import'}).appendTo('.btn-group');
})

$("body").on("click", '#importButton', function(){
    $('#modalTitle').text('Import File');
    exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
    $('.modal-body').text("Are you sure you want to import " + currentFile.name + '?');
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelImport', text: 'Cancel'}).appendTo('#modalFooter');
    $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmImport', text: 'Import'}).appendTo('#modalFooter');
})

$("body").on("click", '#confirmImport', function(){
    readFileAsString(currentFile);
    $('#modalTitle').text('Successful Import');
    exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
    $('.modal-body').text("Successfully imported " + currentFile.name);
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'homeButton', text: 'Okay'}).appendTo('#modalFooter');
    $('#mainModal').modal('show');
})

function homeDiv() {
    $('<div/>', {class: 'container-fluid', id: 'homeDiv'}).appendTo('#myWindow');
    $('<div/>', {class: 'jumbotron jumbotron-fluid'}).appendTo('#homeDiv');
    $('<div/>', {class: 'container', id: 'homeContainer'}).appendTo('.jumbotron');
    $('<p/>', {class: 'lead', id: 'lead1'}).appendTo('#homeContainer');
    $('<strong/>', {text: 'How to use: '}).appendTo('#lead1');
    $('<ol/>', {id: 'theList'}).appendTo('#homeContainer');
    $('<li/>', {text: 'Go to Register Employee Tab'}).appendTo('ol');
    $('<li/>', {text: 'Enter Name and postion of Employee'}).appendTo('ol');
    $('<li/>', {text: 'Go to Calculate Salary Tab'}).appendTo('ol');
    $('<li/>', {text: 'Enter month of payout'}).appendTo('ol');
    $('<li/>', {text: 'Select position of employees you want to assign salary to'}).appendTo('ol');
    $('<li/>', {text: 'Go to View Payout Tab'}).appendTo('ol');
    $('<li/>', {text: 'Select the month of the payout to view'}).appendTo('ol');
    $('<hr/>', {class: 'my-4'}).appendTo('#homeContainer');
    $('<p/>', {class: 'lead', id: 'lead2'}).appendTo('#homeContainer');
    $('<strong/>', {text: 'Features: '}).appendTo('#lead2');
    $('<ul/>', {class: 'THEUL', id: 'theList'}).appendTo('#homeContainer');
    $('<li/>', {text: 'Under the Edit Records Tab, you can double click any value you want to make changes to'}).appendTo('.THEUL');
    $('<li/>', {text: 'When Assigning Trips for employees, you can double click the added trips to remove any trips from the queue'}).appendTo('.THEUL');
    $('<li/>', {text: 'When viewing payouts, you can double click the name of any employee to view the employees individual record for the month'}).appendTo('.THEUL');
    $('<br/>', {}).appendTo('#homeContainer');
    $('<div/>', {class: 'alert alert-warning', role: 'alert'}).appendTo('#homeContainer');
    $('<h5/>', {text: 'Please remember to export your session date before closing your browser!'}).appendTo('.alert');
}

function createModal() {
    $('<div/>',{class : 'modal', id : 'modal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#modal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: ""}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "A"}).appendTo('.modal-content');
}

function exportDiv() {
    $('<div/>',{class : 'container border rounded my-auto', id : 'exportDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Enter File Name'}).appendTo('#exportDiv');
    $('<br/>',{}).appendTo('#exportDiv');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#exportDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'File Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id : 'fileName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#exportDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#exportDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'exportFileButton', text: 'Confirm'}).appendTo('.btn-group');
}

function importDiv() {
    $('<div/>', {class : 'container border rounded my-auto', id: 'importDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Choose JSON file'}).appendTo('#importDiv');
    $('<br/>',{}).appendTo('#importDiv');
    $('<div/>', {class: 'input-group', id: 'inputGroup'}).appendTo('#importDiv');
    $('<div/>', {class: 'custom-file',}).appendTo('#inputGroup');
    $('<input/>', {type: 'file', class: 'custom-file-input form-control-lg', id: 'inputFile', 'aria-describedby': 'inputFileAddon', accept:'.json'}).appendTo('.custom-file');
    $('<label/>', {class: 'custom-file-label col-form-label-lg', for:'inputFile', text: 'Choose file'}).appendTo('.custom-file');
}
