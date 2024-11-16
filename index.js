const tipAmountDisplay = document.getElementById("tipAmount");
const totalAmountDisplay = document.getElementById("totalAmount");
let billAmount = 0;
let selectedTipPercentage = 0;
let numberOfPeople = 0;


function formatBill(billInput){
    const onlyNumber = billInput.value.replace(/\D/g, "");
    const value = onlyNumber.replace(/,/g, '');
    if(!isNaN(value) && value != ''){
        billAmount = parseFloat(value);
        billInput.value = Number(value).toLocaleString();
        calculateTip();
    }else{
        billAmount = 0;
        billInput.value = '';
    }
}

function selectTip(percentage){
    selectedTipPercentage = percentage;
    
    const buttons = document.querySelectorAll("#tipBtn");
    buttons.forEach(button => {
        button.classList.remove("active");
    })
    event.target.classList.add("active");
    document.querySelector(".custom-tip").value = "";
    calculateTip();
}

function customTipPercentage(customInput){
    const buttons = document.querySelectorAll("#tipBtn");
    buttons.forEach(button => {
        button.classList.remove("active");
    })
    selectedTipPercentage = parseFloat(customInput.value);
    calculateTip();
}

function selectPeople(peopleInput){
    const peopleNumber = parseInt(peopleInput.value);
    if(peopleNumber <= 0 || peopleInput.value == ""){
      document.querySelector(".error-msg").style.display = "block";
      peopleInput.parentElement.classList.add("error");
      numberOfPeople = 0;
    }else{
        document.querySelector(".error-msg").style.display = "none";
        peopleInput.parentElement.classList.remove("error");
        numberOfPeople = peopleNumber;
       
    }
    calculateTip();
}

function calculateTip(){
    if(numberOfPeople > 0 && billAmount !== ""){
        const tipAmount = (billAmount * (selectedTipPercentage / 100)) / numberOfPeople;
        const totalAmount = (billAmount + (billAmount * (selectedTipPercentage / 100))) / numberOfPeople;
        const tipAmountDisplay = document.getElementById("tipAmount");
        const totalAmountDisplay = document.getElementById("totalAmount");
        const resetBtn = document.getElementById("resetBtn");

        tipAmountDisplay.innerText = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.innerText =`$${totalAmount.toFixed(2)}`;

        resetBtn.removeAttribute("disabled");
    }
    else{
        resetBtn.setAttribute("disabled", true);
        tipAmountDisplay.innerText = "$0.00";
        totalAmountDisplay.innerText ="$0.00";
    }
}

calculateTip()

