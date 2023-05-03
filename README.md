# How Much Money Will I Have When I Retire?
-----------

Authors:
- Amy Paul [amypaul@arizona.edu](mailto:amypaul@arizona.edu)
- Connie Sun [conniesun@arizona.edu](mailto:conniesun@arizona.edu)
- Luke Hankins [lwhankins@arizona.edu](mailto:lwhankins@arizona.edu)  

Publication Date: 05/03/2023

Final Project for CSC 544, Data Visualization, The University of Arizona

## Overview
We present a visualization tool used to help users answer the question: How much money will I have when I retire? We provide seven different retirement accounts for users to specify contributions to; the resulting amount per month that the user can expect in retirement (in today's dollars) is displayed on the righthand side. We provide a comparison barchart for the user to explore how much they need to contribute to be "on track" for retirement and a breakdown barchart so the user can see how much each individual account contributes to their overall total.

In addition to the main calculator functionality, we include summative and detailed information for each account with dropdowns and tooltips. At-a-glance comparison visualization is provided in the "Compare Accounts" section. The "Uncertainty Analysis" section runs Monte Carlo simulations for growth accounts so users can explore the risk vs reward tradeoff of different asset allocation strategies.

Raise an issue if you encounter any bugs or have questions.

URL: https://lwhankins.github.io/544project/. Should work in all modern browsers (probably not Internet Explorer, update your computer sheesh).

## How to Use
Clone the repo and run index.html in a browser, or visit the url linked above. You can then mess around with the various features.

### **Features**
*Expert Advice:* We've incorporated advice from experts throughout the webpage. Read the account overviews or click Show Account Info to learn more. Tooltips (grey circles with question mark items) can be moused over to get explanations of different variables, and some accounts have a Show Specific Info dropdown that appears when activated and can tell you even more information.

*Sidebar with Breakdown:* The sidebar tells you the answer to the overarching question (money per month in retirement), and provides charts both to compare your currently selected amount with that of the average American and show you how each selected account is contributing to your total money.

*Account Type Dropdowns:* Toggle on as many accounts as you like to activate them, and mess with the variables to see how much each type changes your total money in retirement (visible in the sidebar). Mousing over some of the sliders will also tell you what the suggested value for that variable is, based on the average for that type of account. You can also see the total amount each account will hold before and after inflation in the activated header, and can toggle off an account to remove it from your portfolio.

*Account Comparisons:* The Compare Accounts section holds several interesting tables and graphs to help you see differences between accounts. The first slide shows a table to compare all the different account types; mouse over each cell to learn more. The second slide contains a bar chart showing the number of accounts of each type held by Americans in 2021, as surveyed by the U.S. Census Bureau. The third slide uses the same data, but shows the number of accounts based on age, so you can compare the popularity of different accounts among different demographics.

*Monte Carlo Simulation:* Some retirement accounts, notably investment accounts such as IRAs and 401Ks, carry risk. In order to help you decide what asset mix and risk amount is right for you, you can use the Uncertainty Analysis section of the website. Selecting different asset mixes will tell you what the average rate of return and "risk factor" (volatility) is for that mix.

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

## MIT License Information
This visualization is published under the MIT license.

Copyright 2023 Paul, Sun, Hankins.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

