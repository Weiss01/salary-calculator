class Employee {
    type; //
    name; //
    baseSalary; //
    sa; //
    dpa; //
    food = {};
    foodAllowance = {}; //
    petrolAllowance; //
    entertainmentAllowance; //
    trips = {}; //
    tripAllowance = {}; //
    numberOfSales = {}; //
    personalCommision = {}; //
    numberOfProjects = {}; //
    projectOverride = {}; //
    groupOverride = {}; //
    groupOverrideMultiplier = 0; //
    branchOverride = {};
    branchOverrideMultiplier = 0; //
    records = {};

    constructor(name, baseSalary, sa, dpa, petrolAllowance, entertainmentAllowance) {
        this.type = this.constructor.name;
        this.name = name;
        this.baseSalary = baseSalary;
        this.sa = sa;
        this.dpa = dpa;
        this.petrolAllowance = petrolAllowance;
        this.entertainmentAllowance = entertainmentAllowance;
    }

    build(importedObject) {
        this.type = this.constructor.name;
        this.name = importedObject.name;
        this.baseSalary = importedObject.baseSalary;
        this.sa = importedObject.sa;
        this.dpa = importedObject.dpa;
        this.petrolAllowance = importedObject.petrolAllowance;
        this.entertainmentAllowance = importedObject.entertainmentAllowance;
        this.foodAllowance = importedObject.foodAllowance;
        this.trips = importedObject.trips;
        this.tripAllowance = importedObject.tripAllowance;
        this.numberOfSales = importedObject.numberOfSales;
        this.personalCommision = importedObject.personalCommision;
        this.numberOfProjects = importedObject.numberOfProjects;
        this.projectOverride = importedObject.projectOverride;
        this.groupOverride = importedObject.groupOverride;
        this.branchOverride = importedObject.branchOverride;
        this.records = importedObject.records;
    }

    updateFood(month) {
        this.foodAllowance[month.toUpperCase()] = this.food[month.toUpperCase()].reduce( (a, b) => { return a + b}, 0);
    }

    setGroupOverride(month, groupOverride) {
        this.groupOverride[month.toUpperCase()] = groupOverride;
    }

    setBranchOverride(month, branchOverride) {
        this.branchOverride[month.toUpperCase()] = branchOverride;
    }

    setNumberOfProjects(month, numberOfProjects) {
        this.numberOfProjects[month.toUpperCase()] = numberOfProjects;
        this.setProjectOverride(month.toUpperCase(), this.numberOfProjects);
    }

    setProjectOverride(month, projectsList) {
        function calculateProjectOverride(total, r1, r2, p1, p2) {
            let projectOverride = 0;
            if (total >= r2) {
                projectOverride = p2;
            } else if (total >= r1) {
                projectOverride = p1;
            }
            return projectOverride;
        }

        let type = this.constructor.name;
        let numberOfProjects = projectsList[month];
        let projectOverride = 0;
        if (type === 'SeniorExecutive') {
            projectOverride = calculateProjectOverride(numberOfProjects, 100000, 150000, 2000, 3500);
        } else if (type === 'JuniorBranchManager') {
            projectOverride = calculateProjectOverride(numberOfProjects, 150000, 150000, 3500, 5000);
        } else if (type === 'SeniorBranchManager') {
            projectOverride = calculateProjectOverride(numberOfProjects, 300000, 500000, 6000, 8000);
        }
        this.projectOverride[month] = projectOverride;
    }

    setNumberOfSales(month, numberOfSales) {
        this.numberOfSales[month.toUpperCase()] = numberOfSales;
        this.setPersonalCommision(month.toUpperCase(), this.numberOfSales);
    }

    setPersonalCommision(month, salesList) {
        function calculateTotalCommision(total, r1, r2, p1, p2, p3) {
            let totalCommision = 0;
            for (let i = 1; i <= total; i++) {
                if (i <= r1) {
                    totalCommision += p1;
                } else if (i <= r2) {
                    totalCommision += p2;
                } else if (i > r2) {
                    totalCommision += p3;
                }
            }
            return totalCommision;
        }

        let type = this.constructor.name;
        let numberOfSales = salesList[month];
        let totalCommision = 0;
        if (type === 'JuniorExecutive') {
            totalCommision = calculateTotalCommision(numberOfSales, 50, 80, 0.50, 0.80, 1.00);
        } else if (type === 'SeniorExecutive' || type === 'JuniorBranchManager' || type === 'SeniorBranchManager') {
            totalCommision = calculateTotalCommision(numberOfSales, 100, 200, 1.00, 1.30, 1.50);
        }
        this.personalCommision[month] = totalCommision;
    }

    addFood(month, food) {
        if (this.food[month.toUpperCase()] === undefined) {
            this.food[month.toUpperCase()] = [];
        }
        this.food[month.toUpperCase()].push(Number(food));
    }

    addTrip(month, state) {
        function calculateTripAllowance(trips) {
            let totalTripAllowance = 0;
            for (let state of trips) {
                if (state === 'PENANG' || state === 'PERAI') {
                    totalTripAllowance += 5;
                } else if (state === 'KEDAH' || state === 'TAIPING') {
                    totalTripAllowance += 10;
                } else if (state === 'PERLIS' || state === 'IPOH') {
                    totalTripAllowance += 20;
                } else if (state === ''){
                    totalTripAllowance += 0;
                } else {
                    console.log('wtf happened here?!?!?');
                }
            }
            return totalTripAllowance;
        }

        if (['PENANG', 'PERAI', 'KEDAH', 'TAIPING', 'PERLIS', 'IPOH', ''].includes(state.toUpperCase())) {
            state = state.toUpperCase();
        } else {
            state = 0;
            console.log("fuck you");
        }
        if (state !== 0) {
            if (this.trips[month.toUpperCase()] === undefined) {
                this.trips[month.toUpperCase()] = [];
            }
            this.trips[month.toUpperCase()].push(state);
            this.tripAllowance[month.toUpperCase()] = calculateTripAllowance(this.trips[month.toUpperCase()]);
        }
    }
}

class Trainee extends Employee {
    constructor(name) {
        super(name, 1500, 0, 0, 0, 0);
    }
}

class Staff extends Employee { // setTripAllowance() setFoodAllowance()
    constructor(name) {
        super(name, 1600, 100, 100, 0, 0);
    }
}

class JuniorExecutive extends Employee { // setTripAllowance() setFoodAllowance() setPersonalCommision()
    constructor(name) {
        super(name, 1800, 100, 100, 0, 0);
    }
}

class SeniorExecutive extends Employee { // setTripAllowance() setPersonalCommision() setProjectOverride()
    constructor(name) {
        super(name, 2300, 100, 100, 400, 0);
    }
}

class JuniorBranchManager extends Employee { // setPersonalCommision() setProjectOverride() setGroupOverride()
    constructor(name) {
        super(name, 3200, 100, 200, 500, 500);
        this.groupOverrideMultiplier = 0.01;
    }
}

class SeniorBranchManager extends Employee { // setPersonalCommision() setProjectOverride() setGroupOverride() setBranchOverride()
    constructor(name) {
        super(name, 4500, 100, 200, 800, 800);
        this.groupOverrideMultiplier = 0.01;
        this.branchOverrideMultiplier = 0.02;
    }
}

class Record {
    type;
    employeeName;
    month;
    totalSalary = 0;
    payables = {};
    constructor(month, employee) {
        this.month = month;
        this.type = employee.type;
        this.employeeName = employee.name;
        if (this.type === 'Trainee') {
            this.payables['Base Salary'] = employee.baseSalary;
        } else if (this.type === 'Staff') {
            this.payables['Base Salary'] = employee.baseSalary;
            this.payables['Sticker Allowance'] = employee.sa;
            this.payables['Duty / Punctual Allowance'] = employee.dpa;
            this.payables['Trip Allowance'] = employee.tripAllowance[month.toUpperCase()];
            this.payables['Food Allowance'] = employee.foodAllowance[month.toUpperCase()];
        } else if (this.type === 'JuniorExecutive') {
            this.payables['Base Salary'] = employee.baseSalary;
            this.payables['Sticker Allowance'] = employee.sa;
            this.payables['Duty / Punctual Allowance'] = employee.dpa;
            this.payables['Trip Allowance'] = employee.tripAllowance[month.toUpperCase()];
            this.payables['Food Allowance'] = employee.foodAllowance[month.toUpperCase()];
            this.payables['Personal Commision'] = employee.personalCommision[month.toUpperCase()];
        } else if (this.type === 'SeniorExecutive') {
            this.payables['Base Salary'] = employee.baseSalary;
            this.payables['Sticker Allowance'] = employee.sa;
            this.payables['Duty / Punctual Allowance'] = employee.dpa;
            this.payables['Trip Allowance'] = employee.tripAllowance[month.toUpperCase()];
            this.payables['Personal Commision'] = employee.personalCommision[month.toUpperCase()];
            this.payables['Petrol Allowance'] = employee.petrolAllowance;
            this.payables['Project Override'] = employee.projectOverride[month.toUpperCase()];
        } else if (this.type === 'JuniorBranchManager') {
            this.payables['Base Salary'] = employee.baseSalary;
            this.payables['Sticker Allowance'] = employee.sa;
            this.payables['Duty / Punctual Allowance'] = employee.dpa;
            this.payables['Personal Commision'] = employee.personalCommision[month.toUpperCase()];
            this.payables['Petrol Allowance'] = employee.petrolAllowance;
            this.payables['Project Override'] = employee.projectOverride[month.toUpperCase()];
            this.payables['Entertainment Allowance'] = employee.entertainmentAllowance;
            this.payables['Group Override'] = employee.groupOverride[month.toUpperCase()] * employee.groupOverrideMultiplier;
        } else if (this.type === 'SeniorBranchManager') {
            this.payables['Base Salary'] = employee.baseSalary;
            this.payables['Sticker Allowance'] = employee.sa;
            this.payables['Duty / Punctual Allowance'] = employee.dpa;
            this.payables['Personal Commision'] = employee.personalCommision[month.toUpperCase()];
            this.payables['Petrol Allowance'] = employee.petrolAllowance;
            this.payables['Project Override'] = employee.projectOverride[month.toUpperCase()];
            this.payables['Entertainment Allowance'] = employee.entertainmentAllowance;
            this.payables['Group Override'] = employee.groupOverride[month.toUpperCase()] * employee.groupOverrideMultiplier;
            this.payables['Branch Override'] = employee.branchOverride[month.toUpperCase()] * employee.branchOverrideMultiplier;
        }

        for (let payable in this.payables) {
            this.totalSalary += Number(this.payables[payable]);
        }
    }

    getTable() {
        let table = [];
        for (let property of Object.keys(this.payables)) {
            let temp = [];
            temp.push(property);
            temp.push('RM ' + this.payables[property].toFixed(2));
            table.push(temp);
        }
        table.push(['TOTAL', 'RM ' + this.totalSalary.toFixed(2)]);
        return table;
    }
}

class Table { // 91px per collumn
    listOfRecords;
    constructor(listOfRecords) {
        this.listOfRecords = listOfRecords;
    }

    getTable() {
        let table = [['Employee Name', 'Base Salary', 'Sticker Allowance', 'Duty / Punctual Allowance', 'Food Allowance', 'Trip Allowance', 'Petrol Allowance', 'Entertainment Allowance', 'Personal Commision', 'Project Override', 'Group Override', 'Branch Override', 'TOTAL SALARY']];
        for (let record of this.listOfRecords) {
            let temp = [];
            temp.push(record.employeeName);
            for (let i = 1; i < table[0].length - 1; i++) {
                if (record.payables[table[0][i]] === undefined) {
                    temp.push('---');
                } else {
                    temp.push('RM ' + record.payables[table[0][i]].toFixed(2));
                }
            }
            temp.push('RM ' + record.totalSalary.toFixed(2));
            table.push(temp);
        }
        return table;
    }
}
