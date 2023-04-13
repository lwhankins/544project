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
                "tooltip": "As long as you stay under the contribution limit, you contribute with your pre-tax income."
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "You pay taxes on distributions in retirement."
            },
            "Risk": {
                "value": 1,
                "tooltip": "Since your money is in investments, there is a chance they will lose money. However, 401k portfolios are usually well-balanced to mitigate this risk."
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": "Each year, the government sets a limit to the amount of money you can contribute to IRAs without penalty. In 2023, that limit is $22,500 for those under age 50."
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": "APYs can vary, but 7% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": "There are early withdrawal penalties unless for a few exceptions: first-time home-buying, college, having/adopting a child, and a few other things."
            },
            "Employer Match": {
                "value": 1,
                "tooltip": "Many employers will match their employees' contributions, usually up to around 3-6% of the employee's annual income."
            },
            "Tied to Employer": {
                "value": 1,
                "tooltip": "Yes, many employers offer 401ks to their employees."
            },
        }
    },
    {
        "account": "Roth 401K",
        "attribs": {
            "name": "Roth 401k",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": "You contribute with your after-tax income."
            },
            "Taxed Upon Withdrawal": {
                "value": 0,
                "tooltip": "Roth 401k withdrawals are not taxed."
            },
            "Risk": {
                "value": 1,
                "tooltip": "Since your money is in investments, there is a chance they will lose money. However, 401k portfolios are usually well-balanced to mitigate this risk."
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": "Each year, the government sets a limit to the amount of money you can contribute to 401ks without penalty. In 2023, that limit is $22,500 for those under age 50."
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": "APYs can vary, but 7% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": "There are early withdrawal penalties unless for a few exceptions: first-time home-buying, college, having/adopting a child, and a few other things."
            },
            "Employer Match": {
                "value": 1,
                "tooltip": "Many employers will match their employees' contributions, usually up to around 3-6% of the employee's annual income."
            },
            "Tied to Employer": {
                "value": 1,
                "tooltip": "Yes, some employers offer Roth 401ks to their employees."
            },
        }
    },
    {
        "account": "Traditional IRA",
        "attribs": {
            "name": "Traditional IRA",
            "Taxed Upon Contribution": {
                "value": 0,
                "tooltip": "This depends on whether you meet the income requirement to contribute to an IRA, which varies based on tax filing status. Check with the IRS for current brackets."
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "You pay tax on your IRA distributions during retirement."
            },
            "Risk": {
                "value": 1,
                "tooltip": "Since your money is in investments, there is a chance they will lose money. However, IEA portfolios are usually well-balanced to mitigate this risk."
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": "Each year, the government sets a limit to the amount of money you can contribute to IRAs without penalty. In 2023, that limit is $6,500 for those under age 50."
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": "APYs can vary, but 7% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": "There are early withdrawal penalties unless for a few exceptions: first-time home-buying, college, having/adopting a child, and a few other things."
            },
            "Employer Match": {
                "value": 0,
                "tooltip": "None for Traditional IRAs. There is a special type of IRA that does offer this, but it is less common and is outside the scope of this tool."
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": "No"
            },
        }
    },
    {
        "account": "Roth IRA",
        "attribs": {
            "name": "Roth IRA",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": "This depends on whether you meet the income requirement to contribute to an IRA, which varies based on tax filing status. Check with the IRS for current brackets."
            },
            "Taxed Upon Withdrawal": {
                "value": 0,
                "tooltip": "Roth IRA withdrawals are not taxed."
            },
            "Risk": {
                "value": 1,
                "tooltip": "Since your money is in investments, there is a chance they will lose money. However, IRA portfolios are usually well-balanced to mitigate this risk."
            },
            "Contribution Limit": {
                "value": 1,
                "tooltip": "Each year, the government sets a limit to the amount of money you can contribute to IRAs without penalty. In 2023, that limit is $6,500 for those under age 50."
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": "APYs can vary, but 7% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": "There are early withdrawal penalties unless for a few exceptions: first-time home-buying, college, having/adopting a child, and a few other things."
            },
            "Employer Match": {
                "value": 0,
                "tooltip": "None for Roth IRAs."
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": "Not for Roth IRAs."
            },
        }
    },
    {
        "account": "High-Yield Savings Account",
        "attribs": {
            "name": "High-Yield Savings Account",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": "You contribute money out of your after-tax income."
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "You must pay taxes on interest earned."
            },
            "Risk": {
                "value": 0,
                "tooltip": "Savings accounts are insured by the FDIC up to $250,000."
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": "You can contribute as much as you like."
            },
            "Average Percent Yield": {
                "value": 3,
                "tooltip": "APYs can vary, but 3% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 1,
                "tooltip": "You can withdraw money at any time. However, many accounts have a penalty if you withdraw more than a set number of times per month (often 6)."
            },
            "Employer Match": {
                "value": 0,
                "tooltip": "None"
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": "No"
            },
        }
    },
    {
        "account": "Certificates of Deposit",
        "attribs": {
            "name": "Certificates of Deposit",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": "You contribute money out of your after-tax income."
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "You must pay taxes on interest earned."
            },
            "Risk": {
                "value": 0,
                "tooltip": "CDs are insured by the FDIC up to $250,000."
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": "You can contribute as much as you like."
            },
            "Average Percent Yield": {
                "value": 4.5,
                "tooltip": "APYs can vary, but 4.5% is a good target to decide whether a particular institution's account is right for you."
            },
            "Anytime No-Penalty Availability": {
                "value": 0,
                "tooltip": "There is usually an early-withdrawal penalty if you remove money before the CD matures."
            },
            "Employer Match": {
                "value": 0,
                "tooltip": "None"
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": "No"
            },
        }
    },
    {
        "account": "S&P Index",
        "attribs": {
            "name": "S&P Index",
            "Taxed Upon Contribution": {
                "value": 1,
                "tooltip": "You buy shares out of your after-tax income."
            },
            "Taxed Upon Withdrawal": {
                "value": 1,
                "tooltip": "You must pay capital gains tax on any earnings."
            },
            "Risk": {
                "value": 1,
                "tooltip": "Since your money is in investments, there is a chance they will lose money. However, the S&P generally follows the health of the stock market fairly well, and tends to be stable."
            },
            "Contribution Limit": {
                "value": 0,
                "tooltip": "You can buy as many shares as you want."
            },
            "Average Percent Yield": {
                "value": 7,
                "tooltip": "The S&P, being an index, varies year-over-year depending on the health of the stock market. However, 7% is a good average for comparison purposes."
            },
            "Anytime No-Penalty Availability": {
                "value": 1,
                "tooltip": "You can buy and sell index shares at any time."
            },
            "Employer Match": {
                "value": 0,
                "tooltip": "None"
            },
            "Tied to Employer": {
                "value": 0,
                "tooltip": "No"
            },
        }
    }
]