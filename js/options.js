let currentMonth = '';
let previousMonth = '';
let currentType;
let calculateType = 'Staff';
let registerType = 'Trainee';
let payoutMonth;
let second;
let third;
let afterCommision;
let afterProjects;
let afterGroup;

$("body").on("click", '#editRecords', function() {
    $('#title').html('Edit Records');
    cleanup();
    $('#editRecords').attr('class', 'nav-link active')
    editRecordsDiv();
})

$("body").on("click", '#registerEmployee', function() {
    $('#title').html('Register Employee');
    cleanup();
    $('#registerEmployee').attr('class', 'nav-link active')
    registerEmployeeDiv();
    deleteEmployeeDiv();
})

$("body").on("click", '#registerEmployeeDone', function() {
    $('#title').html('Register Employee');
    cleanup();
    $('#registerEmployee').attr('class', 'nav-link active')
    registerEmployeeDiv();
    deleteEmployeeDiv();
})

$("body").on("click", '#end', function() {

    for (let employee of listOfEmployees) {
        let temp = new Record(currentMonth, employee);
        employee.records[currentMonth] = temp;
    }
    if (currentMonth !== '') {
        if (!viewMonths.includes(currentMonth)) {
            viewMonths.push(currentMonth);
        }
        previousMonth = currentMonth;
        currentMonth = '';
    }
    $('#modalTitle').text('Success');
    exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
    $('.modal-body').text("Successfully saved all records!");
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'editEnd', text: 'Okay'}).appendTo('#modalFooter');
    $('#modal').modal('show');
})

$("body").on("click", '#editEnd', function() {
    previousMonth = payoutMonth;
    $('#title').html('Edit Records');
    cleanup();
    $('#editRecords').attr('class', 'nav-link active')
    editRecordsDiv();
})

$("body").on("click", '#calculateSalaryEnd', function() {
    $('#title').html('Calculate Salary');
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    calculateSalaryDiv();
})

$("body").on("click", '#calculateSalary', function() {
    $('#title').html('Calculate Salary');
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    calculateSalaryDiv();
})

$("body").on("click", '#view', function() {
    $('#title').html('View Payouts');
    cleanup();
    $('#view').attr('class', 'nav-link active');
    viewDiv();
})

$("body").on("click", '#registerButton', function() {
    let employeeName = $('#employeeName').val();
    if (employeeName.length === 0) {
        $('#modalTitle').text('Enter a Valid Name');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Employee Name cannot be empty!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    } else {
        let myList = listOfEmployees.map(employee => employee.name);
        console.log(myList);
        console.log(myList.includes($('#employeeName').val()));
        if (myList.includes($('#employeeName').val())) {
            $('#modalTitle').text('Warning');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("There is already an employee with the same name. Do you want to proceed?");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-danger', 'data-dismiss': 'modal', id: 'proceedNewName', text: 'Proceed'}).appendTo('#modalFooter');
            $('#proceedNewName').click(function() {
                let type = $('#employeeType').val();
                registerType = type;
                let employee;
                if (type === 'Trainee') {
                    employee = new Trainee(employeeName);
                } else if (type === 'Staff') {
                    employee = new Staff(employeeName);
                } else if (type === 'Junior Executive') {
                    employee = new JuniorExecutive(employeeName);
                } else if (type === 'Senior Executive') {
                    employee = new SeniorExecutive(employeeName);
                } else if (type === 'Junior Branch Manager') {
                    employee = new JuniorBranchManager(employeeName);
                } else if (type === 'Senior Branch Manager') {
                    employee = new SeniorBranchManager(employeeName);
                }
                listOfEmployees.push(employee);
                $('#modalTitle').text('Successful Registration');
                exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
                $('.modal-body').text("Successfully created Employee " + employeeName);
                $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'registerEmployeeDone', text: 'Okay'}).appendTo('#modalFooter');
                $('#modal').modal('show');
            })
            $('#modal').modal('show');
        } else {
            let type = $('#employeeType').val();
            registerType = type;
            let employee;
            if (type === 'Trainee') {
                employee = new Trainee(employeeName);
            } else if (type === 'Staff') {
                employee = new Staff(employeeName);
            } else if (type === 'Junior Executive') {
                employee = new JuniorExecutive(employeeName);
            } else if (type === 'Senior Executive') {
                employee = new SeniorExecutive(employeeName);
            } else if (type === 'Junior Branch Manager') {
                employee = new JuniorBranchManager(employeeName);
            } else if (type === 'Senior Branch Manager') {
                employee = new SeniorBranchManager(employeeName);
            }
            listOfEmployees.push(employee);
            $('#modalTitle').text('Successful Registration');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Successfully created Employee " + employeeName);
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'registerEmployeeDone', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    }
})

$("body").on("click", "#deleteButton", function() {
    if ($('#employeeNameList').val() !== null) {
        $('#modalTitle').text('Delete Confirmation');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Are you sure you want to delete " + $('#employeeNameList').val() + '?');
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-danger', 'data-dismiss': 'modal', id: 'confirmDelete', text: 'DELETE!'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    } else {
        $('#modalTitle').text('Warning');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Nothing to delete!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'deleteEmployee', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    }
})

$("body").on("click", "#confirmDelete", function() {
    if ($('#employeeNameList').val() !== null) {
        let myList = listOfEmployees.map(employee => employee.name);
        console.log('mylist -> ' + myList);
        const index = myList.indexOf($('#employeeNameList').val().split(' ').slice(0, -1).join(' '));
        console.log('index -> ' + index);
        listOfEmployees.splice(index, 1);
        $('#modalTitle').text('Success Deletion');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Successfully deleted " + $('#employeeNameList').val());
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'registerEmployeeDone', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    }
})

$("body").on("click", "#continue", function() {
    currentMonth = $('#monthName').val().toUpperCase();
    if (currentMonth === "") {
        $('#modalTitle').text('Enter a Valid Month');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Month cannot be empty!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    } else {
        currentType = $('#employeeType').val();
        calculateType = currentType;
        cleanup();
        $('#title').html('Calculate Salary' + ' (' + currentType + ')');
        $('#calculateSalary').attr('class', 'nav-link active');
        if (currentType === 'Staff') {
            second = 'foodAllowanceDiv';
            third = 'end';
            enterTripDiv(currentType);
        } else if (currentType === 'Junior Executive') {
            second = 'foodAllowanceDiv';
            third = 'commisionDiv';
            afterCommision = 'end';
            currentType = 'JuniorExecutive';
            enterTripDiv(currentType);
        } else if (currentType === 'Senior Executive') {
            second = 'commisionDiv';
            afterCommision = 'projectDiv';
            afterProjects = 'end';
            currentType = 'SeniorExecutive';
            enterTripDiv(currentType);
        } else if (currentType === 'Junior Branch Manager') {
            afterCommision = 'projectDiv';
            afterProjects = 'groupDiv';
            afterGroup = 'end';
            currentType = 'JuniorBranchManager';
            commisionDiv(currentType);
        } else if (currentType === 'Senior Branch Manager') {
            afterCommision = 'projectDiv';
            afterProjects = 'groupDiv';
            afterGroup = 'branchDiv';
            currentType = 'SeniorBranchManager';
            commisionDiv(currentType);
        }
    }
})

$("body").on("click", "#viewPayout", function() {
    payoutMonth = $('#payoutMonth').val();
    cleanup();
    $('#view').attr('class', 'nav-link active');
    $('#title').html('View Payouts' + '  (' + payoutMonth + ')');
    $('<div/>', {class: "btn-toolbar mb-2 mb-md-0", id: "buttonToolbar"}).appendTo('#titleBar');
    $('<button/>', {type: "button", class: "btn btn-sm btn-outline-secondary", id: 'printButton'}).appendTo('#buttonToolbar');
    $('<span/>', {'data-feather': "printer"}).appendTo('#printButton');
    $('#printButton').html('<span data-feather="printer"></span>Print in New Tab');
    feather.replace();
    viewTableDiv();
})

$("body").on("click", "#printButton", function() {
    window.open('format.html');
});

$("body").on("dblclick", "#addedTrips", function(event) {
    event.currentTarget.remove();
})

$("body").on("dblclick", "#addedFood", function(event) {
    event.currentTarget.remove();
})

$("body").on("click", "#foodAllowanceDivButton", function() {
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    foodAllowanceDiv(currentType);
})

$("body").on("click", "#commisionDivButton", function() {
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    commisionDiv(currentType);
})

$("body").on("click", "#projectDivButton", function() {
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    projectDiv(currentType);
})

$("body").on("click", "#groupDivButton", function() {
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    groupDiv(currentType);
})

$("body").on("click", "#branchDivButton", function() {
    cleanup();
    $('#calculateSalary').attr('class', 'nav-link active');
    branchDiv(currentType);
})

$("body").on("click", "#editTable", function() {
    payoutMonth = $('#payoutMonth').val();
    cleanup();
    $('#editRecords').attr('class', 'nav-link active');
    $('#title').html('View Records' + '  (' + payoutMonth + ')');
    editTableDiv();
})

$("body").on("click", "#backToTable", function() {
    cleanup();
    $('#view').attr('class', 'nav-link active');
    $('#title').html('View Payouts' + '  (' + payoutMonth + ')');
    viewTableDiv();
})

$('body').dblclick(function(e) {
    function editStuff(i, property) {
        cleanup();
        $('#calculateSalary').attr('class', 'nav-link active');
        currentMonth = payoutMonth;
        if (property === 'trips') {
            second = 'end';
            enterTripDiv(i, 'edit');
        } else if (property === 'foodAllowance') {
            third = 'end';
            foodAllowanceDiv(i, 'edit');
        } else if (property === 'numberOfSales') {
            afterCommision = 'end';
            commisionDiv(i, 'edit');
        } else if (property === 'numberOfProjects') {
            afterProjects = 'end';
            projectDiv(i, 'edit');
        } else if (property === 'groupOverride') {
            afterGroup = 'end';
            groupDiv(i, 'edit');
        } else if (property === 'branchOverride') {
            branchDiv(i, 'edit');
        } else if (property === 'name') {
            editNameDiv(i);
        }
    }

    if ($(e.target).attr('id') !== undefined) {
        let target = $(e.target).attr('id').split(' ');
        if (target[0] === 'q' && target[1] !== 'type') {
            editStuff(target[1], target[2]);
        }
    }
})

function singleRecordDiv(record) {
    $('#title').html(record.employeeName + '\'s Record for ' + record.month);
    cleanup();
    $('#viewPayout').attr('class', 'nav-link active');

    $('<div/>',{class : 'container-fluid border rounded my-auto', id : 'singleTableDiv'}).appendTo('#myWindow');
    $('<table/>', {class : 'table table-striped table-bordered'}).appendTo('#singleTableDiv');
    $('<thead/>', {}).appendTo('table');
    $('<tbody/>', {}).appendTo('table');
    $('<tr/>', {id: 'header'}).appendTo('thead');
    $('<th/>', {scope: 'col', colspan: "2", text: record.employeeName + " (" + record.type + ")"}).appendTo('#header');
    record.getTable().forEach((row, i) => {
        $('<tr/>', {id: 'row' + i}).appendTo('tbody');
        row.forEach((item, j) => {
            if (j === 0) {
                $('<th/>', {scope: 'col', text: item}).appendTo('#row' + i);
            } else {
                $('<td/>', {scope: 'col', text: item}).appendTo('#row' + i);
            }
        })
    })
    $('<br/>', {}).appendTo('singleTableDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#singleTableDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'backToTable', text: 'Back'}).appendTo('.btn-group');
}

function editTableDiv() {
    $('<div/>',{class : 'container-fluid', id : 'tableDiv'}).appendTo('#myWindow');
    $('<table/>', {class : 'table table-striped table-bordered'}).appendTo('#tableDiv');
    $('<thead/>', {}).appendTo('table');
    $('<tbody/>', {}).appendTo('table');
    $('<tr/>', {id: 'header'}).appendTo('thead');
    $('<th/>', {scope: 'col', text: 'Employee Name'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Position'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Trips'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Food Allowance'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Number of Sales'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Total Project Overrides'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Total Group Overrides'}).appendTo('#header');
    $('<th/>', {scope: 'col', text: 'Total Branch Overrides'}).appendTo('#header');
    let allList = [];
    for (let employee of listOfEmployees) {
        if (Object.keys(employee.records).includes(payoutMonth)){
            allList.push(employee);
        }
    }
    listEdit(allList)
}

function listEdit(list) {
    let properties = ['name', 'type', 'trips', 'foodAllowance', 'numberOfSales', 'numberOfProjects', 'groupOverride', 'branchOverride'];
    list.forEach((employee, i) => {
        $('<tr/>', {id: 'row' + i}).appendTo('tbody');
        for (let property of properties) {
            if (['name', 'type'].includes(property)) {
                if (employee[property] === undefined) {
                    $('<td/>', {scope: 'col', text: '---'}).appendTo('#row' + i);
                } else {
                    $('<td/>', {scope: 'col', text: employee[property], id: 'q ' + i + " " + property}).appendTo('#row' + i);
                }
            } else {
                if (employee[property][payoutMonth] === undefined) {
                    $('<td/>', {scope: 'col', text: '---'}).appendTo('#row' + i);
                } else {
                    $('<td/>', {scope: 'col', text: employee[property][payoutMonth], id: 'q ' + i + " " + property}).appendTo('#row' + i);
                }
            }
        }
    })
}

function editRecordsDiv() {
    $('<div/>',{class : 'container border rounded my-auto', id : 'viewDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Select Payout Month'}).appendTo('#viewDiv');
    $('<br/>',{}).appendTo('#viewDiv');
    $('<div/>',{class: 'form-group', id: 'viewFormGroup'}).appendTo('#viewDiv');
    $('<label/>',{for: 'employeeType', id: 'employeeTypeLabel', text: 'Payout Month:'}).appendTo('#viewFormGroup');
    $('<select/>',{class: 'form-control form-control-lg', id: 'payoutMonth'}).appendTo('#viewFormGroup');
    listViewMonth();
    if (payoutMonth !== undefined) {
        $('#payoutMonth').val(payoutMonth);
    }
    $('<br/>',{}).appendTo('#viewDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#viewDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'editTable', text: 'Continue'}).appendTo('.btn-group');
}

function viewTableDiv() {
    let recordList = [];
    for (let employee of listOfEmployees) {
        if (Object.keys(employee.records).includes(payoutMonth)){
            recordList.push(employee.records[payoutMonth]);
        }
    }
    let table = new Table(recordList);
    table = table.getTable();

    myStorage.setItem('table', table);
    myStorage.setItem('payoutMonth', payoutMonth);

    $('<div/>',{class : 'container-fluid', id : 'tableDiv'}).appendTo('#myWindow');
    $('<table/>', {class : 'table table-striped table-bordered'}).appendTo('#tableDiv');
    $('<thead/>', {}).appendTo('table');
    $('<tbody/>', {}).appendTo('table');
    $('<tr/>', {id: 'header'}).appendTo('thead');
    for (let headerItem of table[0]) {
        if (headerItem === 'Employee Name') {
            $('<th/>', {scope: 'col', text: headerItem, id: 'thicc'}).appendTo('#header');
        } else {
            $('<th/>', {scope: 'col', text: headerItem, id: 'thinn'}).appendTo('#header');
        }
    }
    for (let i = 1; i < table.length; i++) {
        $('<tr/>', {id: 'row' + i}).appendTo('tbody');
        table[i].forEach((item, j) => {
            if (j === table[i].length - 1) {
                $('<th/>', {scope: 'col', text: item}).appendTo('#row' + i);
            } else {
                if (j === 0) {
                    $('<td/>', {scope: 'col', text: item, id: 'name' + i}).appendTo('#row' + i);
                    $('#name' + i).dblclick(function() {
                        let employeeName = item;
                        for (let employee of listOfEmployees) {
                            if (employee.name === employeeName) {
                                let record = new Record(payoutMonth, employee);
                                singleRecordDiv(record);
                                break;
                            }
                        }
                    });
                } else if (j === 4) {
                    $('<td/>', {scope: 'col', text: item, id: 'food' + i}).appendTo('#row' + i);
                    $('#food' + i).dblclick(function() {
                        console.log("FUCK");
                        let employeeName = table[i][0];
                        for (let employee of listOfEmployees) {
                            if (employee.name === employeeName) {
                                $('#modalTitle').text('Food Allowance');
                                exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
                                $('.modal-body').text(employee.name + '\'s food allowance');
                                $('<ul/>', {class: 'list-group', id: 'modalListGroup'}).appendTo('.modal-body');
                                for (let item of employee.food[payoutMonth]) {
                                    $('<li/>', {class: 'list-group-item', text: item}).appendTo('#modalListGroup');
                                }
                                $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
                                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
                                $('#modal').modal('show');
                                break;
                            }
                        }
                    });
                } else if (j === 5) {
                    $('<td/>', {scope: 'col', text: item, id: 'trip' + i}).appendTo('#row' + i);
                    $('#trip' + i).dblclick(function() {
                        let employeeName = table[i][0];
                        for (let employee of listOfEmployees) {
                            if (employee.name === employeeName) {
                                $('#modalTitle').text('Trip Allowance');
                                exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
                                $('.modal-body').text(employee.name + '\'s trips');
                                $('<ul/>', {class: 'list-group', id: 'modalListGroup'}).appendTo('.modal-body');
                                console.log(employee.trips);
                                for (let item of employee.trips[payoutMonth]) {
                                    $('<li/>', {class: 'list-group-item', text: item}).appendTo('#modalListGroup');
                                }
                                $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
                                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
                                $('#modal').modal('show');
                                break;
                            }
                        }
                    });
                } else {
                    $('<td/>', {scope: 'col', text: item}).appendTo('#row' + i);
                }
            }
        });
    }
    $('<tr/>', {id: 'lastRow'}).appendTo('tbody');
    $('<th/>', {scope: 'col', colspan: "12", text: 'TOTAL'}).appendTo('#lastRow');
    let summ = 0;
    for (let i = 1; i < table.length; i++) {
        summ += Number(table[i][table[i].length-1].split(' ')[1]);
    }
    $('<th/>', {scope: 'col', text: "RM " + summ.toFixed(2)}).appendTo('#lastRow');
}

function viewDiv() {
    $('<div/>',{class : 'container border rounded my-auto', id : 'viewDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Select Payout Month'}).appendTo('#viewDiv');
    $('<br/>',{}).appendTo('#viewDiv');
    $('<div/>',{class: 'form-group', id: 'viewFormGroup'}).appendTo('#viewDiv');
    $('<label/>',{for: 'employeeType', id: 'employeeTypeLabel', text: 'Payout Month:'}).appendTo('#viewFormGroup');
    $('<select/>',{class: 'form-control form-control-lg', id: 'payoutMonth'}).appendTo('#viewFormGroup');
    listViewMonth();
    $('<br/>',{}).appendTo('#viewDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#viewDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'viewPayout', text: 'Continue'}).appendTo('.btn-group');
}

function groupDiv(i, mode) {
    function generateGroupDiv(list) {
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#groupDiv');
            $('<div/>',{class : 'input-group input-group-lg', id: 'inputGrp' + i}).appendTo('#groupDiv');
            $('<div/>',{class : 'input-group-prepend', id: 'inputGrpPrepend' + i}).appendTo('#inputGrp' + i);
            $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Total Group Overrides:'}).appendTo('#inputGrpPrepend' + i);
            $('<input/>',{type : 'text', class : 'form-control', id : 'groupOverride' + i}).appendTo('#inputGrp' + i);
            $('<br/>',{}).appendTo('#groupDiv');
        })
    }
    $('<div/>',{class : 'container border rounded my-auto', id : 'groupDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Total Group Overrides'}).appendTo('#groupDiv');
    $('<br/>',{}).appendTo('#groupDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#groupDiv');
    generateGroupDiv([listOfEmployees[i]]);
    $('<br/>',{}).appendTo('#groupDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'saveBtnGrp', role : 'group'}).appendTo('#groupDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveGroupOverrides', text: 'SAVE'}).appendTo('#saveBtnGrp');

    if (mode === 'edit') {
        $('#groupOverride' + i).val(listOfEmployees[i].groupOverride[currentMonth]);
    }

    $('#saveGroupOverrides').click(function () {
        let flag = true;
        if(!isNum($('#groupOverride' + i).val()) || $('#groupOverride' + i).val().length === 0) {
            flag = false;
        }
        if (flag) {
            listOfEmployees[i].setGroupOverride(currentMonth, Number($('#groupOverride' + i).val()));
            $('#modalTitle').text('Succesful Save');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Group Overrides have been saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            if (afterGroup === 'end') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            } else if (afterGroup === 'branchDiv') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: afterGroup + 'Button', text: 'Okay'}).appendTo('#modalFooter');
            }
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Number');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Total Group Overrides must be a number!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    })
}

function editNameDiv(i) {
    $('<div/>',{class : 'container border rounded my-auto', id : 'editNameDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Rename Employee'}).appendTo('#editNameDiv');
    $('<br/>',{}).appendTo('#editNameDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#editNameDiv');
    $('<h4/>',{text: listOfEmployees[i].name}).appendTo('#editNameDiv');
    $('<div/>',{class : 'input-group input-group-lg', id: 'inputGrp' + i}).appendTo('#editNameDiv');
    $('<div/>',{class : 'input-group-prepend', id: 'inputGrpPrepend' + i}).appendTo('#inputGrp' + i);
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'New Employee Name:'}).appendTo('#inputGrpPrepend' + i);
    $('<input/>',{type : 'text', class : 'form-control', id : 'newName'}).appendTo('#inputGrp' + i);
    $('<br/>',{}).appendTo('#editNameDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'saveBtnGrp', role : 'group'}).appendTo('#editNameDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'newNameButton', text: 'SAVE'}).appendTo('#saveBtnGrp');

    $('#newName').val(listOfEmployees[i].name);

    $('#newNameButton').click(function() {
        let myList = listOfEmployees.map(employee => employee.name);
        if (myList.includes($('#newName').val())) {
            $('#modalTitle').text('Warning');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("There is already an employee with the same name. Do you want to proceed?");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-danger', 'data-dismiss': 'modal', id: 'proceedNewName', text: 'Proceed'}).appendTo('#modalFooter');
            $('#proceedNewName').click(function() {
                listOfEmployees[i].name = $('#newName').val()
                $('#modalTitle').text('Success');
                exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
                $('.modal-body').text("New employee name saved!");
                $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
                $('#modal').modal('show');
            })
            $('#modal').modal('show');
        } else if ($('#newName').val() != '') {
            listOfEmployees[i].name = $('#newName').val()
            $('#modalTitle').text('Success');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("New employee name saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Name');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Employee Name cannot be empty");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    });
}

function branchDiv(i, mode) {
    function generateBranchDiv(list) {
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#branchDiv');
            $('<div/>',{class : 'input-group input-group-lg', id: 'inputGrp' + i}).appendTo('#branchDiv');
            $('<div/>',{class : 'input-group-prepend', id: 'inputGrpPrepend' + i}).appendTo('#inputGrp' + i);
            $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Total Branch Overrides:'}).appendTo('#inputGrpPrepend' + i);
            $('<input/>',{type : 'text', class : 'form-control', id : 'branchOverrides' + i}).appendTo('#inputGrp' + i);
            $('<br/>',{}).appendTo('#branchDiv');
        })
    }
    $('<div/>',{class : 'container border rounded my-auto', id : 'branchDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Total Branch Overrides'}).appendTo('#branchDiv');
    $('<br/>',{}).appendTo('#branchDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#branchDiv');
    generateBranchDiv([listOfEmployees[i]]);
    $('<br/>',{}).appendTo('#branchDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'saveBtnGrp', role : 'group'}).appendTo('#branchDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveBranchOverrides', text: 'SAVE'}).appendTo('#saveBtnGrp');

    if (mode === 'edit') {
        $('#branchOverrides' + i).val(listOfEmployees[i].branchOverride[currentMonth]);
    }

    $('#saveBranchOverrides').click(function () {
        let flag = true;
        if(!isNum($('#branchOverrides' + i).val()) || $('#branchOverrides' + i).val().length === 0) {
            flag = false;
        }
        if (flag) {
            listOfEmployees[i].setBranchOverride(currentMonth, Number($('#branchOverrides' + i).val()));
            $('#modalTitle').text('Succesful Save');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Branch Overrides have been saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Number');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Total Branch Overrides must be a number!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    })
}

function projectDiv(i, mode) {
    function generateProjectsDiv(list) {
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#projectDiv');
            $('<div/>',{class : 'input-group input-group-lg', id: 'inputGrp' + i}).appendTo('#projectDiv');
            $('<div/>',{class : 'input-group-prepend', id: 'inputGrpPrepend' + i}).appendTo('#inputGrp' + i);
            $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Total Project Overrides:'}).appendTo('#inputGrpPrepend' + i);
            $('<input/>',{type : 'text', class : 'form-control', id : 'numberOfProjects' + i}).appendTo('#inputGrp' + i);
            $('<br/>',{}).appendTo('#projectDiv');
        })
    }
    $('<div/>',{class : 'container border rounded my-auto', id : 'projectDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Total Project Overrides'}).appendTo('#projectDiv');
    $('<br/>',{}).appendTo('#projectDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#projectDiv');
    generateProjectsDiv([listOfEmployees[i]]);
    $('<br/>',{}).appendTo('#projectDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'saveBtnGrp', role : 'group'}).appendTo('#projectDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveNumberOfProjects', text: 'SAVE'}).appendTo('#saveBtnGrp');

    if (mode === 'edit') {
        $('#numberOfProjects' + i).val(listOfEmployees[i].numberOfProjects[currentMonth]);
    }

    $('#saveNumberOfProjects').click(function () {
        let flag = true;
        if(!isNum($('#numberOfProjects' + i).val()) || $('#numberOfProjects' + i).val().length === 0) {
            flag = false;
        }
        if (flag) {
            listOfEmployees[i].setNumberOfProjects(currentMonth, Number($('#numberOfProjects' + i).val()));
            $('#modalTitle').text('Succesful Save');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Project Overrides have been saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            if (afterProjects === 'end') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            } else if (afterProjects === 'groupDiv') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: afterProjects + 'Button', text: 'Okay'}).appendTo('#modalFooter');
            }
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Number');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Total Project Overrides must be a number!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    })
}

function commisionDiv(i, mode) {
    function generateSalesDiv(list) {
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#commisionDiv');
            $('<div/>',{class : 'input-group input-group-lg', id: 'inputGrp' + i}).appendTo('#commisionDiv');
            $('<div/>',{class : 'input-group-prepend', id: 'inputGrpPrepend' + i}).appendTo('#inputGrp' + i);
            $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Number of Sales:'}).appendTo('#inputGrpPrepend' + i);
            $('<input/>',{type : 'text', class : 'form-control', id : 'numberOfSales' + i}).appendTo('#inputGrp' + i);
            $('<br/>',{}).appendTo('#commisionDiv');
        })
    }
    $('<div/>',{class : 'container border rounded my-auto', id : 'commisionDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Number Of Sales'}).appendTo('#commisionDiv');
    $('<br/>',{}).appendTo('#commisionDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#commisionDiv');
    generateSalesDiv([listOfEmployees[i]]);
    $('<br/>',{}).appendTo('#commisionDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'saveBtnGrp', role : 'group'}).appendTo('#commisionDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveNumberOfSales', text: 'SAVE'}).appendTo('#saveBtnGrp');

    if (mode === 'edit') {
        $('#numberOfSales' + i).val(listOfEmployees[i].numberOfSales[currentMonth]);
    }

    $('#saveNumberOfSales').click(function () {
        let flag = true;
        if(!isNum($('#numberOfSales' + i).val()) || $('#numberOfSales' + i).val().length === 0) {
            flag = false;
        }
        if (flag) {
            listOfEmployees[i].setNumberOfSales(currentMonth, Number($('#numberOfSales' + i).val()));
            $('#modalTitle').text('Succesful Save');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Number of Sales have been saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            if (afterCommision === 'end') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            } else if (afterCommision === 'projectDiv') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: afterCommision + 'Button', text: 'Okay'}).appendTo('#modalFooter');
            }
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Number');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Number of Sales must be a number!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    })
}

function foodAllowanceDiv(i, mode) {
    function generateFoodDiv(list) {
        function generateHandler() {
            return function () {
                if (isNum($('#foodInput' + i).val())) {
                    $('<option/>', {selected: '', id: 'addedFood', text: $('#foodInput' + i).val()}).appendTo('#addedFood' + i);
                    $('#foodInput' + i).val('');
                } else {
                    $('#modalTitle').text('Enter a Valid Number');
                    exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
                    $('.modal-body').text("Food Allowance must be a number!");
                    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
                    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
                    $('#modal').modal('show');
                }
            }
        }
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#foodAllowanceDiv');
            $('<div/>', {class: 'form-group', id: 'enterFoodDivfg' + i}).appendTo('#foodAllowanceDiv');
            $('<label/>', {for: 'addedFood' + i, text: 'Food Allowance'}).appendTo('#enterFoodDivfg' + i);
            $('<select/>', {multiple: '', class: 'form-control form-control-lg', id: 'addedFood' + i}).appendTo('#enterFoodDivfg' + i);
            $('<label/>', {for: '', text: 'Enter Food Spending'}).appendTo('#enterFoodDivfg' + i);
            $('<div/>', {class: 'input-group input-group-lg', id: 'foodIg' + i}).appendTo('#enterFoodDivfg' + i);
            $('<input/>', {class: 'form-control', type: 'text', id: 'foodInput' + i}).appendTo('#foodIg' + i);
            $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'enterFoodDivbg' + i}).appendTo('#foodAllowanceDiv');
            $('<button/>', {type: 'button', class: "btn btn-secondary", id: 'foodAddButton' + i, text: 'ADD'}).appendTo('#enterFoodDivbg' + i);
            $('#foodAddButton' + i).click(generateHandler())
        })
    }
    $('<div/>',{class : 'container border rounded my-auto', id : 'foodAllowanceDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Food Allowance'}).appendTo('#foodAllowanceDiv');
    $('<br/>',{}).appendTo('#foodAllowanceDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#foodAllowanceDiv');
    generateFoodDiv([listOfEmployees[i]]);
    $('<br/>',{}).appendTo('#foodAllowanceDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-left', id: 'saveBtnGrp', role : 'group'}).appendTo('#foodAllowanceDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveFood', text: 'SAVE'}).appendTo('#saveBtnGrp');



    if (mode === 'edit') {
        listOfEmployees[i].food[currentMonth].forEach((item) => {
            $('<option/>', {selected: '', id: 'addedFood', text: item}).appendTo('#addedFood' + i);
        });
    }

    $('#saveFood').click(function () {
        if (true) {
            listOfEmployees[i].food[currentMonth] = [];
            console.log(listOfEmployees[i]);
            console.log(listOfEmployees[i].food[currentMonth]);
            console.log($('#addedFood' + i).val());
            if ($('#addedFood' + i).val().length === 0) {
                listOfEmployees[i].addFood(currentMonth, 0);
            } else {
                $('#addedFood' + i).val().forEach((item) => {
                    listOfEmployees[i].addFood(currentMonth, item);
                });
            }
            listOfEmployees[i].updateFood(currentMonth);
            console.log(listOfEmployees[i].food[currentMonth]);
            $('#modalTitle').text('Succesful Save');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Food Allowance have been saved!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            if (third === 'end') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
            } else if (third === 'commisionDiv') {
                $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: third + 'Button', text: 'Okay'}).appendTo('#modalFooter');
            }
            $('#modal').modal('show');
        } else {
            $('#modalTitle').text('Enter a Valid Number');
            exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
            $('.modal-body').text("Food Allowance must be a number!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#modal').modal('show');
        }
    })
}

function enterTripDiv(i, mode) {
    function generateTripDiv(list) {
        function generateHandler(i) {
            return function (event) {
                $('<option/>', {selected: '', id: 'addedTrips', text: $('#trip' + i).val()}).appendTo('#addedTrips' + i);
            }
        }
        list.forEach((employee) => {
            $('<h4/>',{text: employee.name}).appendTo('#enterTripDiv');
            $('<div/>',{class: 'form-group', id:'tripFormGroup' + i}).appendTo('#enterTripDiv');
            $('<label/>',{for: 'addedTrips' + i, id: 'employeeTypeLabel', text: 'Added Trips:'}).appendTo('#tripFormGroup' + i);
            $('<select/>',{multiple: '', class: 'form-control form-control-lg', id: 'addedTrips' + i}).appendTo('#tripFormGroup' + i);
            $('<label/>',{for: 'trip' + i, id: 'employeeTypeLabel', text: 'Select Trips:'}).appendTo('#tripFormGroup' + i);
            $('<select/>',{class: 'form-control form-control-lg', id: 'trip' + i}).appendTo('#tripFormGroup' + i);
            $('<option/>',{text: 'Penang'}).appendTo('#trip' + i);
            $('<option/>',{text: 'Perai'}).appendTo('#trip' + i);
            $('<option/>',{text: 'Kedah'}).appendTo('#trip' + i);
            $('<option/>',{text: 'Taiping'}).appendTo('#trip' + i);
            $('<option/>',{text: 'Perlis'}).appendTo('#trip' + i);
            $('<option/>',{text: 'Ipoh'}).appendTo('#trip' + i);
            $('<br/>',{}).appendTo('#enterTripDiv');
            $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'btnGroup' + i, role : 'group'}).appendTo('#enterTripDiv');
            $('<button/>',{type : 'button', class : 'btn btn-secondary', id :'addButton' + i, text: 'ADD'}).appendTo('#btnGroup' + i);
            $('#addButton' + i).click(generateHandler(i));
        })
    }


    $('<div/>',{class : 'container border rounded my-auto', id : 'enterTripDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Add Trips Taken by Employee'}).appendTo('#enterTripDiv');
    $('<br/>',{}).appendTo('#enterTripDiv');
    $('<hr/>', {class: 'my-4'}).appendTo('#enterTripDiv');

    generateTripDiv([listOfEmployees[i]]);
    $('<div/>',{class : 'btn-group btn-group-lg float-left', id: 'saveBtnGrp', role : 'group'}).appendTo('#enterTripDiv');
    $('<button/>',{type : 'button', class : 'btn btn-primary', id : 'saveTrips', text: 'SAVE'}).appendTo('#saveBtnGrp');

    if (mode === 'edit') {
        if (listOfEmployees[i].trips[currentMonth].length === 1 && listOfEmployees[i].trips[currentMonth][0] === ''){
            // nothing here
        } else {
            listOfEmployees[i].trips[currentMonth].forEach((item) => {
                $('<option/>', {selected: '', id: 'addedTrips', text: item}).appendTo('#addedTrips' + i);
            });
        }
    }

    $('#saveTrips').click(function () {
        listOfEmployees[i].trips[currentMonth] = [];
        if ($('#addedTrips' + i).val().length === 0) {
            listOfEmployees[i].addTrip(currentMonth, '');
        } else {
            $('#addedTrips' + i).val().forEach((item) => {
                listOfEmployees[i].addTrip(currentMonth, item);
            });
        }
        $('#modalTitle').text('Succesful Save');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Trips have been saved!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        if (second === 'foodAllowanceDiv' || second === 'commisionDiv') {
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: second + "Button", text: 'Okay'}).appendTo('#modalFooter');
        } else if (second === 'end') {
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'end', text: 'Okay'}).appendTo('#modalFooter');
        }
        $('#modal').modal('show');
    })
}

function registerEmployeeDiv() {
    $('<div/>',{class : 'container border rounded my-auto border-bottom-0', id : 'registerEmployeeDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Set Employee\'s Status and Name'}).appendTo('#registerEmployeeDiv');
    $('<br/>',{}).appendTo('#registerEmployeeDiv');
    $('<div/>',{class: 'form-group', id: 'registerFormGroup'}).appendTo('#registerEmployeeDiv');
    $('<label/>',{for: 'employeeType', id: 'employeeTypeLabel', text: 'Employee Type:'}).appendTo('#registerFormGroup');
    $('<select/>',{class: 'form-control form-control-lg', id: 'employeeType'}).appendTo('#registerFormGroup');
    $('<option/>',{text: 'Trainee'}).appendTo('#employeeType');
    $('<option/>',{text: 'Staff'}).appendTo('#employeeType');
    $('<option/>',{text: 'Junior Executive'}).appendTo('#employeeType');
    $('<option/>',{text: 'Senior Executive'}).appendTo('#employeeType');
    $('<option/>',{text: 'Junior Branch Manager'}).appendTo('#employeeType');
    $('<option/>',{text: 'Senior Branch Manager'}).appendTo('#employeeType');
    $('#employeeType').val(registerType);
    $('<br/>',{}).appendTo('#registerEmployeeDiv');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#registerEmployeeDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Employee\'s Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id : 'employeeName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#registerEmployeeDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#registerEmployeeDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'registerButton', text: 'Register'}).appendTo('.btn-group');
}

function deleteEmployeeDiv() {
    $('<div/>',{class : 'container border rounded my-auto border-top-0', id : 'deleteEmployeeDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Select Employee to Delete'}).appendTo('#deleteEmployeeDiv');
    $('<br/>',{}).appendTo('#deleteEmployeeDiv');
    $('<div/>',{class: 'form-group', id: 'deleteFormGroup'}).appendTo('#deleteEmployeeDiv');
    $('<label/>',{for: 'employeeNameList', id: 'employeeTypeLabel', text: 'Employee Name:'}).appendTo('#deleteFormGroup');
    $('<select/>',{class: 'form-control form-control-lg', size: 1, id: 'employeeNameList'}).appendTo('#deleteFormGroup');
    listEmployees();
    $('<br/>',{}).appendTo('#deleteEmployeeDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', id: 'abc1', role : 'group'}).appendTo('#deleteEmployeeDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'deleteButton', text: 'Delete'}).appendTo('#abc1');
}

function listEmployees() {
    for (let employee of listOfEmployees) {
        $('<option/>',{text: employee.name + '  (' + employee.type + ')'}).appendTo('#employeeNameList');
    }
}

function listViewMonth() {
    for (let month of viewMonths) {
        $('<option/>',{text: month}).appendTo('#payoutMonth');
    }
}

function calculateSalaryDiv() {
    $('<div/>',{class : 'container border rounded my-auto', id : 'calculateSalaryDiv'}).appendTo('#myWindow');
    $('<h1/>',{class : 'display-4', text: 'Enter Payout Month'}).appendTo('#calculateSalaryDiv');
    $('<br/>',{}).appendTo('#calculateSalaryDiv');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#calculateSalaryDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Month:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id : 'monthName', value: previousMonth}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#calculateSalaryDiv');
    $('<div/>',{class : 'btn-group btn-group-lg float-right', role : 'group'}).appendTo('#calculateSalaryDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'continue2', text: 'Continue'}).appendTo('.btn-group');
}
