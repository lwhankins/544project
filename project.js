// set up basic info with global configs
let basicInfoDiv = d3.select("#basic_info");
let accountTitles = Object.keys(accountCalculators);
let ids = [];
for (let i=0; i<accountTitles.length;i++) {
    ids.push(getIdFromTitle(accountTitles[i]));
}
for (let i=0; i<globalsConfig.length; i++) {
    addParam(basicInfoDiv, globalsConfig[i], Object.values(accountCalculators), ids);
}
// set up radio parameter info with global configs
for (let i=0; i<radiosConfig.length; i++) {
    makeRadio(basicInfoDiv, radiosConfig[i].name, radiosConfig[i].options, radiosConfig[i].setGlob, Object.values(accountCalculators), ids);
}


for (const generalAccount in generalAccounts) {
    makeWrapperDiv(generalAccounts[generalAccount]);
}

// set up account parameter info with accounts configs
for (const account in accountsConfig) {
    makeAccountDiv(account, accountsConfig[account], [accountCalculators[account]]);
}

for (const generalAccount in generalAccounts) {
    addSummaryCopy(generalAccounts[generalAccount]);
}

let sidebarDiv = d3.select("#sidebar");
runCalculators(accountCalculators, ids);
makeSidebarDiv(sidebarDiv);


// Set up comparison div with comparison config
makeComparisonDiv(comparativeConfig);

// set up monte carlo div
makeUncertaintyDiv();

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

