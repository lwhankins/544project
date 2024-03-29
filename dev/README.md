Group Project
------------

Authors:
- Amy Paul [amypaul@arizona.edu](mailto:amypaul@arizona.edu)
- Clownie Sun [conniesun@arizona.edu](mailto:conniesun@arizona.edu)
- Luke Hankins [lwhankins@arizona.edu](mailto:lwhankins@arizona.edu)  

Date: 04/01/2023


## Development Notes

Branch Naming convention: ClownName-feature
Merge to dev
PR to main eventually


## TODO PO3 Milestone:
* Update descriptions to be shorter, with dropdown for additional info -- Luke
* Initial contributions to 0 and fix calculators -- Luke
* Compare Accounts section -- Amy
   * change header color
   * resize table
   * add graphs in carousel
* Update visual design -- Connie
  * Include visual indicator of average/suggested values on sliders
  * Update sidebar
      * how much money you need in retirement to maintain standard of living (70-80% of pre-retirement income)
      * adjust this amount for inflation to put in perspective of today's money?
      * make it smaller? change things to % width?
* Speak with Fidelity advisor -- all, if available
  * Thu., 4/20, 4 - 5 pm
* Distribute beta version for feedback -- all, if available
  * [website version](https://lwhankins.github.io/544project/)
* adjust for inflation -- Connie, if there is time
  * uncertainty values
* Update citations and additional info -- Luke

## Account Explanations
* 401k
* Roth 401k
* CD
* IRA
* Savings
* S&P
* Taxes (?)

## To-Do List for Visualizations
### Left Side: deadline 3/25
* ~~webpage title and motivation paragraph -- Luke~~
* ~~basic information div (holds global variables) -- Luke, by 3/22~~
  * ~~call `makeInputSlider()` for each global var~~
* function for making divs, `makeAccountDiv()` -- Connie
  * ~~title~~
  * ~~$ amount per month from this account~~
  * ~~sliders to construct inside the div~~
  * ~~dropdown toggle to show div~~
  * dropdown toggle to show additional info
* ~~each retirement account div using `makeAccountDiv()` -- Connie~~
  * ~~inputs: local variables for each retirement account~~
* ~~function for making sliders~~
  * ~~inputs: min, max, suggested~~
* ~~placeholder div for citations and additional info~~

### Right Side: deadline 3/28
* ~~div for total $$$ cash money $$$ / month in retirement -- Amy, by 3/28~~
* ~~div for breakdown bar chart -- whoever, make progress if possible~~
* ~~div for comparison bar chart -- whoever, make progress if possible~~
* ~~Calculate taxes at end -- add up annual amounts (not roths), then run taxesPerYear, then divide by months to get cash $$/month; Amy by 3/28~~

### ~~Latex Milestone Project Update: deadline 3/29~~
Meet 3/27 to divvy this up
* ~~update introduction, background, related work~~
* ~~preliminary results~~
* ~~update research plan section~~
* ~~update impacts section~~

## ~~To-Do List for Calculations~~
* 401K - Luke
* Roth IRA - Connie
* Roth 401K - Luke
* Traditional IRA - Connie
* S&P 500 - Luke
* CD - Amy
* High-yield savings - Amy

global variables
* current age: 12 - 80
* age of retirement: 35 - 80, suggested 60
* years in retirement: 5 - 40, suggested 18
* current salary: $20,000 - $500,000
* average salary raise per year: 0% - 8%, suggested 3%

401K
* percent salary contribution: 1 - 20%, suggested 10%
* employer match: 0 - 100%, suggested 50%
* employer max match: 0 - 10%, suggested 6%
* annual rate of return: 1 - 15%, suggested 7%

** Notes: need to cap the contribution to a max amount

Roth IRA
* yearly contribution: 0 - 6500, suggested $6500
* annual rate of return: 1 - 15%, suggested 7%
* catch-up contribution: 0 - 1000, suggested $1000

** Notes: need to cap contribution based on salary

Traditional IRA
* same as Roth

Other Notes
* penalties for early withdrawals
* Basic tax brackets based on income - Amy


## CLOWN PATROL
* Doinko - Savings calc (Done), CD calc (done), taxes
* Clownie - IRA, div function, slider function
* Loofie - SP 500, 401k


## Included files

* calculations.js   - 
* d3.js             - D3 functionality needed to implement the project
* index.html        - HTML document template. 
* project.js        - 
* README.md         - This file
* styles.css        - Styling to augment our implementation
* svg.js            - SVG functionality needed for our implementation


## References
