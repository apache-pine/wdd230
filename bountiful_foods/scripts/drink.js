let drinkID = Date.now();

document.querySelector("#subDate").value = fullDate;

const drinkForm = document.querySelector("#drinkForm");
const drinkOrder = document.querySelector("#drinkOrder");
const drinkOrderDate = document.querySelector("#drinkOrderDate");
const orderFirstName = document.querySelector("#orderFirstName");
const orderLastName = document.querySelector("#orderLastName");
const orderEmail = document.querySelector("#orderEmail");
const orderPhone = document.querySelector("#orderPhone");
const i1 = document.querySelector("#orderIngredient1");
const i2 = document.querySelector("#orderIngredient2");
const i3 = document.querySelector("#orderIngredient3");
const orderInstructions = document.querySelector("#orderSpecialInstructions");
const subButton = document.querySelector("#subButton");

const firstSelect = document.querySelector("#ingredient1");
const secondSelect = document.querySelector("#ingredient2");
const thirdSelect = document.querySelector("#ingredient3");

let totalCarbohydrates = 0;
let totalProtein = 0;
let totalFat = 0;
let totalCalories = 0;
let totalSugar = 0;

const totOrdersLS = window.localStorage.getItem("totOrdersLs");

if (totOrdersLS === null) {
    window.localStorage.setItem("totOrdersLs", 0);
};

const urlIngredients = "https://brotherblazzard.github.io/canvas-content/fruit.json";

function displayDrinkOrder() {
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
	const ing1 = firstSelect.value;
    const ing2 = secondSelect.value;
    const ing3 = thirdSelect.value;
    const instructions = document.querySelector("#specialInstructions").value;
	drinkOrder.style.display = "block";
    drinkOrderDate.textContent = fullDate;
    orderFirstName.textContent = firstName;
    orderLastName.textContent = lastName;
    orderEmail.textContent = email;
    orderPhone.textContent = phone;
	i1.textContent = ing1;
    i2.textContent = ing2;
    i3.textContent = ing3;
    orderInstructions.textContent = instructions;

    window.localStorage.setItem("totOrdersLs", Number(totOrdersLS) + 1);

    nutritionFacts(urlIngredients);
};

async function getIngredients(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayIngredients(data);
        } else {
            console.log(`Response not OK ${await response.text()}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

function displayIngredients(data) {
    results = data;
    for (let i = 0; i < results.length; i++) {
        const option = document.createElement("option");
        option.textContent = results[i].name;
        option.value = results[i].name;
        firstSelect.appendChild(option);
    };
    for (let i = 0; i < results.length; i++) {
        const option = document.createElement("option");
        option.textContent = results[i].name;
        option.value = results[i].name;
        secondSelect.appendChild(option);
    };
    for (let i = 0; i < results.length; i++) {
        const option = document.createElement("option");
        option.textContent = results[i].name;
        option.value = results[i].name;
        thirdSelect.appendChild(option);
    };
};

subButton.addEventListener("click", event => {
    if (drinkForm.checkValidity()) {
        displayDrinkOrder();
        event.preventDefault();
    } else {
        console.log("Form not valid");
    };
});

async function nutritionFacts(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayNutritionFacts(data);
        } else {
            console.log(`Response not OK ${await response.text()}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

const totCarbs = document.querySelector("#totCarbs");
const totProtein = document.querySelector("#totProtein");
const totFat = document.querySelector("#totFat");
const totCalories = document.querySelector("#totCalories");
const totSugar = document.querySelector("#totSugar");

function displayNutritionFacts(data) {
    results = data;
    selectedOptions = [firstSelect.value, secondSelect.value, thirdSelect.value];
    for (const option of selectedOptions) {
        const fruitName = option;
        const fruit = results.find(fruit => fruit.name === fruitName);
        totalCarbohydrates += fruit.nutritions.carbohydrates;
        totalProtein += fruit.nutritions.protein;
        totalFat += fruit.nutritions.fat;
        totalCalories += fruit.nutritions.calories;
        totalSugar += fruit.nutritions.sugar;
    
    totCarbs.textContent = totalCarbohydrates;
    totProtein.textContent = totalProtein;
    totFat.textContent = totalFat;
    totCalories.textContent = totalCalories;
    totSugar.textContent = totalSugar;
    drinkForm.reset();
};
};

getIngredients(urlIngredients);