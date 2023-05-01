function afterInflationYearly(yearlyAmount){
    let yearsOfInflation = ageOfRetirement - currentAge;
    return (1 + inflationRate)**yearsOfInflation * yearlyAmount;
}

function removeInflation(amount){
    let yearsOfInflation = ageOfRetirement - currentAge;
    return amount / ((1+inflationRate) ** yearsOfInflation);
}