const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rNdJNlHL4c9BWMHnLBMWiGnaDhcULU7FxYPDbH3I&base_currency=";
const dropdowns = document.querySelectorAll(".country");
const fromFlag = document.querySelector("#fromFlag");
const toFlag = document.querySelector("#toFlag");
const btn = document.querySelector(".button");
const msg = document.querySelector(".msg");


// amount.innerText="amt";




for(select of dropdowns){
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && code==="INR"){
                newOption.selected="selected";
        }
        select.append(newOption);
        
    }
}


const updateFlags = () => {
    let fromCurr = document.querySelector("#from select").value;
    let toCurr = document.querySelector("#to select").value;
    let flag1 = countryList[fromCurr];
    let flag2 = countryList[toCurr];
    fromFlag.src = `https://flagsapi.com/${flag1}/shiny/64.png`;
    toFlag.src = `https://flagsapi.com/${flag2}/shiny/64.png`;
};
updateFlags();

dropdowns.forEach(dropdown => {
    dropdown.addEventListener("change", updateFlags);
});


btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    var amount = document.querySelector(".cal input");
    amt = amount.value;
    // amount.innerText.value="amt";
    console.log(amt);
    if (amt === "" || amt < 1){
        amt = 1;
        amount.value="1";
    }
    let fromCurr = document.querySelector("#from select").value;
    let toCurr = document.querySelector("#to select").value;
    console.log(toCurr);
    BaseURl = URL+fromCurr;
    let response = await fetch(BaseURl);
    rjson = await response.json();
    // rate = rjson[USD];
    let list = [];
    list.push(rjson.data);
    let result = list[0];
    finRes = result[toCurr];
    // console.log(finRes);
    endRes = finRes*amt;
    console.log(endRes);
    if (finRes){
        let convertedAmt = endRes;
        msg.innerText = `${amt}${fromCurr}=${convertedAmt.toFixed(2)}${toCurr}`
    }else{
        msg.innerText = `Exchange rate not available for ${toCurr}`;
    }

    
})

