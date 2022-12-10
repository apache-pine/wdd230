const drinksOrdered = document.querySelector("#drinksOrdered");

const totOrdersLS = window.localStorage.getItem("totOrdersLs");

if (totOrdersLS === null) {
    window.localStorage.setItem("totOrdersLs", 0);
    let totOrders = Number(totOrdersLS);
    drinksOrdered.textContent = totOrders;
} else {
    let totOrders = Number(totOrdersLS);
    drinksOrdered.textContent = totOrders;
};