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
            "max": .1,
            "suggested": .03,
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

comparativeConfig = [
    {
        "account": "Traditional 401K",
        "attribs": {
            "name": "Traditional 401k",
            "Taxed Upon Contribution": {
                "value": 0,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "This is a thing"
            },
            "Risk": {
                "value": 1,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 1,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 1,
                "tooltip": ""
            },
        }
    },
    {
        "account": "Roth 401K",
        "attribs": {
            "name": "Traditional 401k",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 0,
                "tooltip": ""
            },
            "Risk": {
                "value": 1,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 1,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 1,
                "tooltip": ""
            },
        }
    },
    {
        "account": "Traditional IRA",
        "attribs": {
            "name": "Traditional IRA",
            "Taxed Upon Contribution": {
                "value": 0,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": ""
            },
            "Risk": {
                "value": 1,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 0,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": ""
            },
        }
    },
    {
        "account": "Roth IRA",
        "attribs": {
            "name": "Roth IRA",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 0,
                "tooltip": ""
            },
            "Risk": {
                "value": 1,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 0,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": ""
            },
        }
    },
    {
        "account": "High-Yield Savings Account",
        "attribs": {
            "name": "High-Yield Savings Account",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": ""
            },
            "Risk": {
                "value": 0,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 3,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 1,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 0,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": ""
            },
        }
    },
    {
        "account": "Certificates of Deposit",
        "attribs": {
            "name": "Certificates of Deposit",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": ""
            },
            "Risk": {
                "value": 0,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 4.5,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 1,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 0,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": ""
            },
        }
    },
    {
        "account": "S&P Index",
        "attribs": {
            "name": "S&P Index",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": ""
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": ""
            },
            "Risk": {
                "value": 1,
                "tooltip": ""
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": ""
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": ""
            },
            "Anytime No-Penalty Availability": {
                "value": 1,
                "tooltip": ""
            },
            "Employer Match": {
                "value": 0,
                "tooltip": ""
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": ""
            },
        }
    }
]