// name, min, max, suggested, step, format, setGlob
globalsConfig = [
    {"name": "Age",
     "min": 10,
     "max": 80,
     "suggested": 30,
     "step": 1,
     "format": ",",
     "setGlob": setAge},

    {"name": "Retirement Age",
    "min": 30,
    "max": 80,
    "suggested": 65,
    "step": 1,
    "format": ",",
    "setGlob": setAgeOfRetirement},

    {"name": "# Years in Retirement",
    "min": 5,
    "max": 70,
    "suggested": 20,
    "step": 1,
    "format": ",",
    "setGlob": setYearsInRetirement},

    {"name": "Current Salary",
    "min": 15000,
    "max": 500000,
    "suggested": 50000,
    "step": 1000,
    "format": ",",
    "setGlob": setSalary},

    {"name": "Average Salary Raise Per Year",
    "min": 0,
    "max": .10,
    "suggested": .03,
    "step": .005,
    "format": ".1%",
    "setGlob": setSalaryIncrease}
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