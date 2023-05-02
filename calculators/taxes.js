/*
    File: taxes.js
    Purpose: Contains the calculator code for taxes depending on filer status.
*/

let filerTypes = {
    Single: 0,
    MarriedSeparate: 1,
    MarriedJoint: 2,
    HeadOfHousehold: 3
};

let filer = 0; // From dropdown, one of filertype
// Uses 2023 tax brackets from https://www.forbes.com/advisor/taxes/taxes-federal-income-tax-bracket/#:~:text=For%20the%202022%20tax%20year,filing%20status%20and%20taxable%20income.
// Could make more updatable in the future.
function taxesPerYear(salary) {
    brackets = [];
    switch (filer) {
        case filerTypes.Single:
            brackets.push({top: 11000, amount: (s) => 0.1 * s});
            brackets.push({top: 44725, amount: (s) => 1100 + 0.12 * (s - 11000)});
            brackets.push({top: 95375, amount: (s) => 5147 + 0.22 * (s - 44725)});
            brackets.push({top: 182100, amount: (s) => 16290 + 0.24 * (s - 95375)});
            brackets.push({top: 231250, amount: (s) => 37104 + 0.32 * (s - 182100)});
            brackets.push({top: 578125, amount: (s) => 52832 + 0.35 * (s - 231250)});
            brackets.push({top: Infinity, amount: (s) => 174238.25 + 0.37 * (s - 578125)});
            break;
        case filerTypes.MarriedSeparate:
            brackets.push({top: 11000, amount: (s) => 0.1 * s});
            brackets.push({top: 44725, amount: (s) => 1100 + 0.12 * (s - 11000)});
            brackets.push({top: 95375, amount: (s) => 5147 + 0.22 * (s - 44725)});
            brackets.push({top: 182100, amount: (s) => 16290 + 0.24 * (s - 95375)});
            brackets.push({top: 231250, amount: (s) => 37104 + 0.32 * (s - 182100)});
            brackets.push({top: 346875, amount: (s) => 52832 + 0.35 * (s - 231250)});
            brackets.push({top: Infinity, amount: (s) => 93300.75 + 0.37 * (s - 346875)});    
            break;
        case filerTypes.MarriedJoint: 
            brackets.push({top: 22000, amount: (s) => 0.1 * s});
            brackets.push({top: 89450, amount: (s) => 0.12 * (s - 22000)});
            brackets.push({top: 190750, amount: (s) => 10294 + 0.22 * (s - 89450)});
            brackets.push({top: 364200, amount: (s) => 32580 + 0.24 * (s - 190750)});
            brackets.push({top: 462500, amount: (s) => 74208 + 0.32 * (s - 364200)});
            brackets.push({top: 693750, amount: (s) => 105664 + 0.35 * (s - 462500)});
            brackets.push({top: Infinity, amount: (s) => 186601.50 + 0.37 * (s - 693.750)});
            break;
        case filerTypes.HeadOfHousehold:
            brackets.push({top: 15700, amount: (s) => 0.1 * s});
            brackets.push({top: 59850, amount: (s) => 1570 + 0.12 * (s - 15700)});
            brackets.push({top: 95350, amount: (s) => 6868 + 0.22 * (s - 59850)});
            brackets.push({top: 182100, amount: (s) => 14678 + 0.24 * (s - 95350)});
            brackets.push({top: 231250, amount: (s) => 35498 + 0.32 * (s - 182100)});
            brackets.push({top: 578100, amount: (s) => 51226 + 0.35 * (s - 231250)});
            brackets.push({top: Infinity, amount: (s) => 172623.50 + 0.37 * (s - 578100)});
            break;
        default:
            break;
    }

    let taxAmount = 0;
    for (let bracket of brackets) {
        if (salary <= bracket.top) {
            // falls into this tax bracket
            taxAmount = bracket.amount(salary);
            break;
        }
    }

    return taxAmount;
}

function setFilerType(type) {
    filer = parseInt(type);
}