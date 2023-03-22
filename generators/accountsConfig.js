accountsConfig = {
    "401K" : [],

    "Roth 401K" : [],

    "Traditional IRA" : [],

    "Roth IRA" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setRothCurBal},

        {"name": "Annual Contribution",
        "min": 0,
        "max": 6500,
        "suggested": 6500,
        "step": 100,
        "format": ",",
        "setGlob": setRothAnnCont},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setRothAnnRet},

        {"name": "Catchup Contribution",
        "min": 0,
        "max": 1000,
        "suggested": 1000,
        "step": 100,
        "format": ",",
        "setGlob": setRothCatchupCont}],

    "High-Yield Savings Account" : [],

    "Certificates of Deposit" : [],

    "S&P Index" : []
}