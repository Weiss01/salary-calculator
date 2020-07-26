$("body").on("click", "#continue2", function() {
    currentMonth = $('#monthName').val().toUpperCase();
    if (currentMonth === "") {
        $('#modalTitle').text('Enter a Valid Month');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Month cannot be empty!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    } else {
        $('#title').html('Calculate Salary');
        cleanup();
        $('#calculateSalary').attr('class', 'nav-link active')
        newCalcDiv();
    }
})

$("body").on("click", "#save", function(){
    let flag = validate();
    if (flag) {
        processTrips();
        processFood();
        processSales();
        processProject();
        processGroup();
        processBranch();
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
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'calculateSalaryEnd', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    }
})

function validate() {
    let flag = true;
    listOfEmployees.forEach((employee, i) => {
        if (employee.type !== 'Trainee') {
            if (!isNum($('#numberOfSales' + i).val()) && $('#numberOfSales' + i).val() !== ''){
                $('#numberOfSales' + i).attr('class', 'form-control is-invalid');
                flag = false;
            } else {
                $('#numberOfSales' + i).attr('class', 'form-control');
            }
            if (!isNum($('#numberOfProjects' + i).val()) && $('#numberOfProjects' + i).val() !== ''){
                $('#numberOfProjects' + i).attr('class', 'form-control is-invalid');
                flag = false;
            } else {
                $('#numberOfProjects' + i).attr('class', 'form-control');
            }
            if (!isNum($('#numberOfGroups' + i).val()) && $('#numberOfGroups' + i).val() !== ''){
                $('#numberOfGroups' + i).attr('class', 'form-control is-invalid');
                flag = false;
            } else {
                $('#numberOfGroups' + i).attr('class', 'form-control');
            }
            if (!isNum($('#numberOfBranches' + i).val()) && $('#numberOfBranches' + i).val() !== ''){
                $('#numberOfBranches' + i).attr('class', 'form-control is-invalid');
                flag = false;
            } else {
                $('#numberOfBranches' + i).attr('class', 'form-control');
            }
        }
    });
    if (!flag) {
        $('#modalTitle').text('Invalid Input');
        exists('modalFooter') ? $('#modalFooter').remove() : {}; exists('modalListGroup') ? $('#modalListGroup').remove() : {};
        $('.modal-body').text("Please check your input again!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#modal').modal('show');
    }
    return flag;
}

function processTrips() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'Staff' || listOfEmployees[i].type === 'JuniorExecutive' || listOfEmployees[i].type === 'SeniorExecutive') {
            listOfEmployees[i].trips[currentMonth] = [];
            if ($('#addedTrips' + i).val().length === 0) {
                listOfEmployees[i].addTrip(currentMonth, '');
            } else {
                $('#addedTrips' + i).val().forEach((item) => {
                    listOfEmployees[i].addTrip(currentMonth, item);
                });
            }
        }
    }
}

function processFood() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'Staff' || listOfEmployees[i].type === 'JuniorExecutive') {
            listOfEmployees[i].food[currentMonth] = [];
            if ($('#addedFood' + i).val().length === 0) {
                listOfEmployees[i].addFood(currentMonth, 0);
            } else {
                $('#addedFood' + i).val().forEach((item) => {
                    listOfEmployees[i].addFood(currentMonth, item);
                });
            }
            listOfEmployees[i].updateFood(currentMonth);
        }
    }
}

function processSales() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'JuniorExecutive' || listOfEmployees[i].type === 'SeniorExecutive' || listOfEmployees[i].type === 'JuniorBranchManager' || listOfEmployees[i].type === 'SeniorBranchManager') {
            if ($('#numberOfSales' + i).val().length === 0) {
                listOfEmployees[i].setNumberOfSales(currentMonth, 0);
            } else {
                listOfEmployees[i].setNumberOfSales(currentMonth, Number($('#numberOfSales' + i).val()));
            }
        }
    }
}

function processProject() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'SeniorExecutive' || listOfEmployees[i].type === 'JuniorBranchManager' || listOfEmployees[i].type === 'SeniorBranchManager') {
            if ($('#numberOfProjects' + i).val().length === 0) {
                listOfEmployees[i].setNumberOfProjects(currentMonth, 0);
            } else {
                listOfEmployees[i].setNumberOfProjects(currentMonth, Number($('#numberOfProjects' + i).val()));
            }
        }
    }
}

function processGroup() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'JuniorBranchManager' || listOfEmployees[i].type === 'SeniorBranchManager') {
            if ($('#numberOfGroups' + i).val().length === 0) {
                listOfEmployees[i].setGroupOverride(currentMonth, 0);
            } else {
                listOfEmployees[i].setGroupOverride(currentMonth, Number($('#numberOfGroups' + i).val()));
            }
        }
    }
}

function processBranch() {
    for (let i = 0; i < listOfEmployees.length; i++) {
        if (listOfEmployees[i].type === 'SeniorBranchManager') {
            if ($('#numberOfBranches' + i).val().length === 0) {
                listOfEmployees[i].setBranchOverride(currentMonth, 0);
            } else {
                listOfEmployees[i].setBranchOverride(currentMonth, Number($('#numberOfBranches' + i).val()));
            }
        }
    }
}

function newCalcDiv() {
    $('<div/>', {class: 'container-fluid border rounded my-auto', id: 'newCalcDiv'}).appendTo('#myWindow');
    listOfEmployees.forEach((employee, i) => {
        if (employee.type !== 'Trainee') {
            $('<h4/>', {text: employee.name + ' (' + employee.type + ')'}).appendTo('#newCalcDiv');
            $('<div/>', {class: 'row', id: 'row' + i}).appendTo('#newCalcDiv');
            div1(employee, i);
            div2(employee, i);
            div3(employee, i);
            div4(employee, i);
            div5(employee, i);
            div6(employee, i);

            $('<hr/>', {class: 'lead-4'}).appendTo('#newCalcDiv');
        }
    })
    $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'calcDivBg'}).appendTo('#newCalcDiv');
    $('<button/>', {type: 'button', class: "btn btn-primary", id: 'save', text: 'SAVE'}).appendTo('#calcDivBg');
}

function div1(employee, i) {
    function generateHandler(i) {
        return function (event) {
            $('<option/>', {selected: '', id: 'addedTrips', text: $('#selectTripsSelect' + i).val()}).appendTo('#addedTrips' + i);
        }
    }
    if (employee.type === 'Staff' || employee.type === 'JuniorExecutive' || employee.type === 'SeniorExecutive') {
        $('<div/>', {class: 'enterTripDiv col-2', id: 'enterTripDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'form-group', id: 'enterTripDivfg' + i}).appendTo('#enterTripDiv' + i);
        $('<label/>', {for: 'addedTrips' + i, text: 'Added Trips'}).appendTo('#enterTripDivfg' + i);
        $('<select/>', {multiple: '', class: 'form-control form-control-lg', id: 'addedTrips' + i}).appendTo('#enterTripDivfg' + i);
        $('<label/>', {for: '', text: 'Select Trips'}).appendTo('#enterTripDivfg' + i);
        $('<select/>', {class: 'form-control form-control-lg', id: 'selectTripsSelect' + i}).appendTo('#enterTripDivfg' + i);
        $('<option/>', {text: 'Penang'}).appendTo('#selectTripsSelect' + i);
        $('<option/>', {text: 'Perai'}).appendTo('#selectTripsSelect' + i);
        $('<option/>', {text: 'Kedah'}).appendTo('#selectTripsSelect' + i);
        $('<option/>', {text: 'Taiping'}).appendTo('#selectTripsSelect' + i);
        $('<option/>', {text: 'Perlis'}).appendTo('#selectTripsSelect' + i);
        $('<option/>', {text: 'Ipoh'}).appendTo('#selectTripsSelect' + i);
        $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'enterTripDivbg' + i}).appendTo('#enterTripDiv' + i);
        $('<button/>', {type: 'button', class: "btn btn-secondary", id: 'tripAddButton' + i, text: 'ADD'}).appendTo('#enterTripDivbg' + i);
        $('#tripAddButton' + i).click(generateHandler(i));
    } else {
        $('<div/>', {class: 'enterTripDiv col-2', id: 'enterTripDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'form-group', id: 'enterTripDivfg' + i}).appendTo('#enterTripDiv' + i);
        $('<label/>', {for: 'addedTrips' + i, text: 'Added Trips'}).appendTo('#enterTripDivfg' + i);
        $('<select/>', {disabled: '', multiple: '', class: 'form-control form-control-lg', id: 'addedTrips' + i}).appendTo('#enterTripDivfg' + i);
        $('<label/>', {for: '', text: 'Select Trips'}).appendTo('#enterTripDivfg' + i);
        $('<select/>', {disabled: '', class: 'form-control form-control-lg', id: 'selectTripsSelect' + i}).appendTo('#enterTripDivfg' + i);
        $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'enterTripDivbg' + i}).appendTo('#enterTripDiv' + i);
        $('<button/>', {disabled: '', type: 'button', class: "btn btn-secondary", id: 'tripAddButton' + i, text: 'ADD'}).appendTo('#enterTripDivbg' + i);
    }
}

function div2(employee, i) {
    function generateHandler(i) {
        return function (event) {
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
    if (employee.type === 'Staff' || employee.type === 'JuniorExecutive') {
        $('<div/>', {class: 'enterFoodDiv col-2', id: 'enterFoodDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'form-group', id: 'enterFoodDivfg' + i}).appendTo('#enterFoodDiv' + i);
        $('<label/>', {for: 'addedFood' + i, text: 'Food Allowance'}).appendTo('#enterFoodDivfg' + i);
        $('<select/>', {multiple: '', class: 'form-control form-control-lg', id: 'addedFood' + i}).appendTo('#enterFoodDivfg' + i);
        $('<label/>', {for: '', text: 'Enter Food Spending'}).appendTo('#enterFoodDivfg' + i);
        $('<div/>', {class: 'input-group input-group-lg', id: 'foodIg' + i}).appendTo('#enterFoodDivfg' + i);
        $('<input/>', {class: 'form-control', type: 'text', id: 'foodInput' + i}).appendTo('#foodIg' + i);
        $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'enterFoodDivbg' + i}).appendTo('#enterFoodDiv' + i);
        $('<button/>', {type: 'button', class: "btn btn-secondary", id: 'foodAddButton' + i, text: 'ADD'}).appendTo('#enterFoodDivbg' + i);
        $('#foodAddButton' + i).click(generateHandler(i));
    } else {
        $('<div/>', {class: 'enterFoodDiv col-2', id: 'enterFoodDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'form-group', id: 'enterFoodDivfg' + i}).appendTo('#enterFoodDiv' + i);
        $('<label/>', {for: 'addedFood' + i, text: 'Food Allowance'}).appendTo('#enterFoodDivfg' + i);
        $('<select/>', {disabled: '', multiple: '', class: 'form-control form-control-lg', id: 'addedFood' + i}).appendTo('#enterFoodDivfg' + i);
        $('<label/>', {for: '', text: 'Enter Food Spending'}).appendTo('#enterFoodDivfg' + i);
        $('<div/>', {class: 'input-group input-group-lg', id: 'foodIg' + i}).appendTo('#enterFoodDivfg' + i);
        $('<input/>', {disabled: '', class: 'form-control', type: 'text', id: 'foodInput' + i}).appendTo('#foodIg' + i);
        $('<div/>', {class: "btn-group btn-group-lg float-right", role: 'group', id: 'enterFoodDivbg' + i}).appendTo('#enterFoodDiv' + i);
        $('<button/>', {disabled: '', type: 'button', class: "btn btn-secondary", id: 'foodAddButton' + i, text: 'ADD'}).appendTo('#enterFoodDivbg' + i);
    }
}

function div3(employee, i) {
    if (employee.type !== 'Staff') {
        $('<div/>', {class: 'enterSalesDiv col-2', id: 'enterSalesDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'salesIg' + i}).appendTo('#enterSalesDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'salesSpanDiv' + i}).appendTo('#salesIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Sales:'}).appendTo('#salesSpanDiv' + i);
        $('<input/>', {class: 'form-control', type: "text", id: 'numberOfSales' + i}).appendTo('#salesIg' + i);
        $('<div/>', {class: 'invalid-feedback', text: 'Please provide a valid number'}).appendTo('#salesIg' + i);
    } else {
        $('<div/>', {class: 'enterSalesDiv col-2', id: 'enterSalesDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'salesIg' + i}).appendTo('#enterSalesDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'salesSpanDiv' + i}).appendTo('#salesIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Sales:'}).appendTo('#salesSpanDiv' + i);
        $('<input/>', {disabled: '', class: 'form-control', type: "text", id: 'numberOfSales' + i}).appendTo('#salesIg' + i);
    }
}

function div4(employee, i) {
    if (employee.type === 'Staff' || employee.type === 'JuniorExecutive') {
        $('<div/>', {class: 'enterProjectDiv col-2', id: 'enterProjectDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'projectIg' + i}).appendTo('#enterProjectDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'projectSpanDiv' + i}).appendTo('#projectIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Project:'}).appendTo('#projectSpanDiv' + i);
        $('<input/>', {disabled: '', class: 'form-control', type: "text", id: 'numberOfProjects' + i}).appendTo('#projectIg' + i);
    } else {
        $('<div/>', {class: 'enterProjectDiv col-2', id: 'enterProjectDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'projectIg' + i}).appendTo('#enterProjectDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'projectSpanDiv' + i}).appendTo('#projectIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Project:'}).appendTo('#projectSpanDiv' + i);
        $('<input/>', {class: 'form-control', type: "text", id: 'numberOfProjects' + i}).appendTo('#projectIg' + i);
        $('<div/>', {class: 'invalid-feedback', text: 'Please provide a valid number'}).appendTo('#projectIg' + i);
    }
}

function div5(employee, i) {
    if (employee.type === 'JuniorBranchManager' || employee.type === 'SeniorBranchManager') {
        $('<div/>', {class: 'enterGroupDiv col-2', id: 'enterGroupDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'groupIg' + i}).appendTo('#enterGroupDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'groupSpanDiv' + i}).appendTo('#groupIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Groups:'}).appendTo('#groupSpanDiv' + i);
        $('<input/>', {class: 'form-control', type: "text", id: 'numberOfGroups' + i}).appendTo('#groupIg' + i);
        $('<div/>', {class: 'invalid-feedback', text: 'Please provide a valid number'}).appendTo('#groupIg' + i);
    } else {
        $('<div/>', {class: 'enterGroupDiv col-2', id: 'enterGroupDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'groupIg' + i}).appendTo('#enterGroupDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'groupSpanDiv' + i}).appendTo('#groupIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Groups:'}).appendTo('#groupSpanDiv' + i);
        $('<input/>', {disabled: '', class: 'form-control', type: "text", id: 'numberOfGroups' + i}).appendTo('#groupIg' + i);
    }
}

function div6(employee, i) {
    if (employee.type === 'SeniorBranchManager') {
        $('<div/>', {class: 'enterBranchDiv col-2', id: 'enterBranchDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'branchIg' + i}).appendTo('#enterBranchDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'branchSpanDiv' + i}).appendTo('#branchIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Branches:'}).appendTo('#branchSpanDiv' + i);
        $('<input/>', {class: 'form-control', type: "text", id: 'numberOfBranches' + i}).appendTo('#branchIg' + i);
        $('<div/>', {class: 'invalid-feedback', text: 'Please provide a valid number'}).appendTo('#branchIg' + i);
    } else {
        $('<div/>', {class: 'enterBranchDiv col-2', id: 'enterBranchDiv' + i}).appendTo('#row' + i);
        $('<div/>', {class: 'input-group input-group-lg', style: 'margin-top: 184px; margin-bottom: 64px;', id: 'branchIg' + i}).appendTo('#enterBranchDiv' + i);
        $('<div/>', {class: 'input-group-prepend', id: 'branchSpanDiv' + i}).appendTo('#branchIg' + i);
        $('<span/>', {class: 'input-group-text pl-1 pr-1', id: 'inputGroup-sizing-lg', text: '#Branches:'}).appendTo('#branchSpanDiv' + i);
        $('<input/>', {disabled: '', class: 'form-control', type: "text", id: 'numberOfBranches' + i}).appendTo('#branchIg' + i);
    }
}
