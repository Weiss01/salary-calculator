let myStorage = window.sessionStorage;

$('#myTitle').html(myStorage.getItem('payoutMonth') + ' Payout');
viewTableDiv();

function viewTableDiv() {
    let table = getTable();

    $('<div/>',{class : 'container-fluid', id : 'tableDiv'}).appendTo('body');
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
                } else if (j === 4) {
                    $('<td/>', {scope: 'col', text: item, id: 'food' + i}).appendTo('#row' + i);
                } else if (j === 5) {
                    $('<td/>', {scope: 'col', text: item, id: 'trip' + i}).appendTo('#row' + i);
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

function getTable() {
    table = myStorage.getItem('table').split(',');
    let res = [];
    while (table.length > 0) {
        let temp = [];
        while (temp.length < 13) {
            temp.push(table.shift());
        }
        res.push(temp);
    }
    console.log(res);
    return res;
}
