const key="dee072bab12aef631e1eedfd";
const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".btn");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".TO select");
let totalExchangeRate = 0;
for(let select of dropdowns){
    for(let currcode in countryList)
    {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        // console.log(newoption);
        if(select.name=="from" && currcode == "USD"){
            newoption.selected = "selected";
        }
        else if(select.name=="to" && currcode == "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change" ,(evt)=>{

        updateFlag(evt.target);
    });
        
}
const updateFlag = (element) => {
    let currcode=element.value;
    let countrcode = countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrcode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval.trim()==="" || isNaN(amtval) || amtval<1){
        amtval=1;
        amount.value=amtval;
    }
    amtval = parseFloat(amtval);
    const url=`https://v6.exchangerate-api.com/v6/${key}/latest/${fromcurr.value}`;
    const response = await fetch(url);
    const data = await response.json();
    let rate = data.conversion_rates[tocurr.value];
    totalExchangeRate = (rate * amtval).toFixed(2);
    let msg = document.querySelector('.msg');
    msg.innerText = `${amtval} ${fromcurr.value} = ${totalExchangeRate} ${tocurr.value}`;
});
