function afterInflationYearly(yearlyAmount){
    let yearsOfInflation = ageOfRetirement - currentAge;
    return (1 + inflationRate)**yearsOfInflation * yearlyAmount;
}