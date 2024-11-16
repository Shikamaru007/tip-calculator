const tipAmountDisplay = document.getElementById("tipAmount");
const totalAmountDisplay = document.getElementById("totalAmount");
let billAmount = 0;
let selectedTipPercentage = 0;
let numberOfPeople = 0;


function formatBill(billInput){
    let value = billInput.value;
    value = value.replace(/[^\d.]/g, "");
    let parts = value.split(".");

    if(parts.length > 2){
        value = parts[0] + "." + parts[1];
    }
    if(parts.length === 2 && parts[1].length > 2){
        parts[1] = parts[1].substring(0, 2);
    }
    if (parts[0].length > 0) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    billInput.value = parts.join('.');

    const numericValue = parseFloat(parts.join('.').replace(/,/g, ''));
    if (!isNaN(numericValue)) {
        billAmount = numericValue;
        console.log(billAmount)
    } else {
        billAmount = 0;
    }

    calculateTip();
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

function resetPage(){
    billAmount = 0;
    selectedTipPercentage = 0;
    numberOfPeople = 0;

    document.getElementById("bill").value = "";
    document.getElementById("people").value = "";
    const buttons = document.querySelectorAll("#tipBtn");

    buttons.forEach(button => {
        button.classList.remove("active");
    })
    const customInput = document.querySelector(".custom-tip");
    customInput.value = "";

    

    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";

}

calculateTip()

