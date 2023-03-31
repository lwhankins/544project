accountsConfig = {
    "Traditional 401K" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setCurrent401kBalance},

        {"name": "Percent (%) Salary to Contribute",
        "min": 0,
        "max": .25,
        "suggested": .06,
        "step": .01,
        "format": ".1%",
        "setGlob": set401kSalaryPortionContribution},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setAnnualRateOfReturn401k},

        {"name": "Employer Match of Your Contribution (%)",
        "min": 0,
        "max": 1,
        "suggested": .5,
        "step": .05,
        "format": ".1%",
        "setGlob": setEmployerMatchAmount401k},

        {"name": "Employer Match Limit (%)",
        "min": 0,
        "max": .15,
        "suggested": .06,
        "step": .01,
        "format": ".1%",
        "setGlob": setEmployerMaxMatch401k}
    ],

    "Roth 401K" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setCurrentRoth401kBalance},

        {"name": "Percent (%) Salary to Contribute",
        "min": 0,
        "max": .25,
        "suggested": .06,
        "step": .01,
        "format": ".1%",
        "setGlob": setRoth401kSalaryPortionContribution},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setAnnualRateOfReturnRoth401k},

        {"name": "Employer Match of Your Contribution (%)",
        "min": 0,
        "max": 1,
        "suggested": .5,
        "step": .05,
        "format": ".1%",
        "setGlob": setEmployerMatchAmountRoth401k},

        {"name": "Employer Match Limit (%)",
        "min": 0,
        "max": .15,
        "suggested": .06,
        "step": .01,
        "format": ".1%",
        "setGlob": setEmployerMaxMatchRoth401k}
    ],

    "Traditional IRA" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setTradIraCurBal},

        {"name": "Annual Contribution",
        "min": 0,
        "max": 6500,
        "suggested": 6500,
        "step": 100,
        "format": ",",
        "setGlob": setTradIraAnnCont},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setTradIraAnnRet},

        {"name": "Catchup Contribution",
        "min": 0,
        "max": 1000,
        "suggested": 1000,
        "step": 100,
        "format": ",",
        "setGlob": setTradIraCatchupCont}
    ],

    "Roth IRA" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setRothIraCurBal},

        {"name": "Annual Contribution",
        "min": 0,
        "max": 6500,
        "suggested": 6500,
        "step": 100,
        "format": ",",
        "setGlob": setRothIraAnnCont},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setRothIraAnnRet},

        {"name": "Catchup Contribution",
        "min": 0,
        "max": 1000,
        "suggested": 1000,
        "step": 100,
        "format": ",",
        "setGlob": setRothIraCatchupCont}],

    "High-Yield Savings Account" : [
        {
            "name": "Annual Percent (%) Yield",
            "min": 0,
            "max": 10,
            "suggested": 3,
            "step":.01,
            "format": ".2%",
            "setGlob": setHYSavingsAPY
        },
        {
            "name": "Current Savings Balance",
            "min": 0,
            "max": 100000,
            "suggested": 1000,
            "step": 100,
            "format": ",",
            "setGlob": setCurrentSavingsBalance
        },
        {
            "name": "Percent (%) Salary to Contribute",
            "min": 0,
            "max": 25,
            "suggested": 10,
            "step": .01,
            "format": ".2%",
            "setGlob": setSavingsPortionContribution
        }
    ],

    "Certificates of Deposit" : [
        {
            "name": "Annual Percent (%) Yield",
            "min": 0,
            "max": 10,
            "suggested": 4.5,
            "step": .01,
            "format": ".2%",
            "setGlob": setCdAPY
        },
        {
            "name": "Current Balance",
            "min": 0,
            "max": 100000,
            "suggested": 1000,
            "step": 100,
            "format": ",",
            "setGlob": setCurrentCDBalance
        },
        {
            "name": "Percent (%) Salary to Contribute",
            "min": 0,
            "max": 25,
            "suggested": 10,
            "step": .01,
            "format": ".2%",
            "setGlob": setCDSalaryPortionContibution
        }
    ],

    "S&P Index" : [
        {"name": "Current Balance",
        "min": 0,
        "max": 100000,
        "suggested": 0,
        "step": 100,
        "format": ",",
        "setGlob": setCurrentAmountInvestedSP},

        {"name": "Percent (%) Salary to Contribute",
        "min": 0,
        "max": .25,
        "suggested": .05,
        "step": .01,
        "format": ".1%",
        "setGlob": setPortionOfSalaryToContributeSP},

        {"name": "Annual Rate of Return",
        "min": .01,
        "max": .15,
        "suggested": .07,
        "step": .005,
        "format": ".1%",
        "setGlob": setExpectedReturnSP}
    ]
}

accountCalculators = {
    "Traditional 401K": calculateTraditional401k,
    "Roth 401K": calculateRoth401k,
    "Traditional IRA": calculateTraditionalIra,
    "Roth IRA": calculateRothIra,
    "High-Yield Savings Account": calculateHYSavings,
    "Certificates of Deposit": calculateCD,
    "S&P Index": calculateSP
}

barNames = {
    "Traditional 401K": "401k",
    "Roth 401K" : "R401k",
    "Traditional IRA": "IRA",
    "Roth IRA": "RIRA",
    "High-Yield Savings Account": "Savings",
    "Certificates of Deposit": "CDs",
    "S&P Index": "S&P"
}