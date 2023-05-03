# Data Visualization Group Project: How much money will I have when I retire?
-----------

Authors:
- Amy Paul [amypaul@arizona.edu](mailto:amypaul@arizona.edu)
- Connie Sun [conniesun@arizona.edu](mailto:conniesun@arizona.edu)
- Luke Hankins [lwhankins@arizona.edu](mailto:lwhankins@arizona.edu)  

Publication Date: 05/03/2023

## Overview

## How to Use

## Included Files
* /calculators - A folder containing all the calculators for the project
    * 401k.js - The calculators for the 401k account types
    * certificates.js - The calculator for the CD account type
    * global.js - Functions and variables used by all account types
    * inflation.js - Functions to apply inflation to a calculation
    * ira.js - The calculators for the IRA account types
    * monteCarlo.js - The functions and generator code for the Monte Carlo simulation
    * savings.js - The calculator for the High-Yield Savings account type
    * sp.js - The calculator for the S&P Index account type
    * taxes.js - Code for calculating the amount of money to remove in taxes (uses 2023 data)
* /data - A folder containing auxilliary data for the project
    * sipp_data.csv - Cleaned and stripped data from the Survey of Income and Program Participation (Census Bureau). The full dataset is massive (4GB), but this file contains the columns we actually used.
    * sipp.ipynb - A Jupiter Notebook containing the Python code to extract and format relevant SIPP data.
    * sipp.js - The formatted data for the Compare Accounts charts, as a JSON object and as generated by sipp.ipynb
* /dev - A folder containing information for the developers
    * README.md - A separate README containing development timelines and information
* /generators - Contains the configuration files and generators for the visualization itself
    * accountsConfig.js - Account-specific configuration values
    * globalConfig.js - Configuration values used by all account types
    * graphs.js - Generator code for Compare Accounts charts
    * utils.js - Generator code for the visualization itself (KEY FILE)
* /images - Some supplimental images to provide visualization style
    * down-arrow.png - Dropdown arrow image file
    * right-arrow.png - Dropdown arrow image file
* copy.js - Contains the written explanations for the project
* d3.js - D3 functionality needed to implement the project
* index.html - HTML template for the project
* project.js - Scaffold code to build the project
* styles.css - Styling to augment our implementation

## References
* https://www.cnbc.com/select/high-yield-savings-account-risk - Risk for HYSA
* https://www.experian.com/blogs/ask-experian/pros-cons-high-yield-savings-account - Learning more about HYSAs
* https://www.fidelity.com/building-savings/learn-about-iras/what-is-an-ira - Info for IRAs
* https://www.fidelity.com/retirement-ira/ira-comparison - Type-specific IRA explanations
* https://www.fool.com/investing/how-to-invest/index-funds/average-return/#:~:text=Over%20the%20past%2030%20years,rate%20of%2010.7%25%20per%20year - S&P / general index fund return information
* https://www.investopedia.com/terms/1/401kplan.asp - Info for 401Ks
* https://www.investopedia.com/terms/c/certificateofdeposit.asp - Info for CDs
* https://www.nerdwallet.com/article/investing/roth-401k-vs-401k - Type-specific 401K info
* https://en.wikipedia.org/wiki/S%26P_500 - Early S&P500 info
* https://www.investopedia.com/articles/younginvestors/08/generation-y.asp - Financial info for young investors
* https://money.com/saving-retirement-harder/ - General retirement savings info
* https://data.bls.gov/timeseries/CUUR0000SA0L1E?output_view=pct_12mths - 20-year inflation data
* https://data.bls.gov/timeseries/CIU1010000000000A - 20-year salary increase data
* https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/wealth-planning_investment-strategy.pdf - Monte Carlo info
* https://www.census.gov/programs-surveys/sipp/data/datasets/2021-data/2021.html - Download SIPP data here
