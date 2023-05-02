/*
    File: globalConfig.js
    Purpose: Contains config data that is used by all accounts.
*/

// name, min, max, suggested, step, format, setGlob
globalsConfig = [
    {"name": "Age",
     "min": 10,
     "max": 80,
     "initial": 30,
     "suggested": 0,
     "step": 1,
     "format": ",",
     "setGlob": setAge},

    {"name": "Retirement Age",
    "min": 30,
    "max": 80,
    "initial": 65,
    "suggested": 0,
    "step": 1,
    "format": ",",
    "setGlob": setAgeOfRetirement},

    {"name": "# Years in Retirement",
    "min": 5,
    "max": 70,
    "initial": 20,
    "suggested": 0,
    "step": 1,
    "format": ",",
    "setGlob": setYearsInRetirement},

    {"name": "Current Salary",
    "min": 15000,
    "max": 500000,
    "initial": 50000,
    "suggested": 0,
    "step": 1000,
    "format": ",",
    "setGlob": setSalary},

    {"name": "Average Salary Raise Per Year",
    "min": 0,
    "max": .10,
    "initial": .03,
    "suggested": 0,
    "step": .005,
    "format": ".1%",
    "setGlob": setSalaryIncrease,
    "tooltip": "Most employers give an average salary raise of 3% per year. This is largely driven by inflation."},

    {"name": "Inflation",
    "min": 0,
    "max": .10,
    "initial": .03,
    "suggested": 0,
    "step": .001,
    "format": ".1%",
    "setGlob": setInflation,
    "tooltip": "Inflation rate per year. This has a large impact on what reasonable retirement savings will look like in the future."}
]

radiosConfig = [
    {
        "name": "Tax Filing Status",
        "options": [
            "Single",
            "Married, Filing Separately",
            "Married, Filing Jointly",
            "Head of Household"
        ],
        "setGlob": setTaxStatus
    }
]

sources = {
    "401K": [["https://www.investopedia.com/terms/1/401kplan.asp", "6"], ["https://www.nerdwallet.com/article/investing/roth-401k-vs-401k", "8"]],
    "IRA": [["https://www.fidelity.com/building-savings/learn-about-iras/what-is-an-ira", "3"], ["https://www.fidelity.com/retirement-ira/ira-comparison", "4"]],
    "High-Yield Savings Account": [["https://www.cnbc.com/select/high-yield-savings-account-risk", "1"], ["https://www.experian.com/blogs/ask-experian/pros-cons-high-yield-savings-account/", "2"]],
    "Certificates of Deposit": [["https://www.investopedia.com/terms/c/certificateofdeposit.asp", "7"]],
    "S&P Index": [["https://www.fool.com/investing/how-to-invest/index-funds/average-return", "5"], ["https://en.wikipedia.org/wiki/S%26P_500", "9"]],
}