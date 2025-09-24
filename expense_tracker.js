document.addEventListener("DOMContentLoaded",()=>{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");
    // const btn = document.querySelector("button");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = CalculateTotal();
    renderExpenses();
    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());
        if(name!="" && !isNaN(amount) && amount>0){
            const newExpense = {
                id : Date.now(),
                name: name,
                amount: amount
            } 
            expenses.push(newExpense);
            console.log(newExpense);
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
            SaveToExpensesLocal();
            renderExpenses();
            UpdateTotal();
        }
        
    })

    function renderExpenses(){
        expenseList.innerHTML ="";
        expenses.forEach(expense=>{
            const li = document.createElement('li');
            li.innerHTML =`
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `
            expenseList.appendChild(li);
        })
    }
    function CalculateTotal(){
        return  expenses.reduce((sum,expense)=> sum+expense.amount,0)
    }
    function UpdateTotal(){
        let totalAmount = CalculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);

    }

    function SaveToExpensesLocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }

    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);

            SaveToExpensesLocal();
            renderExpenses();
            UpdateTotal();
        }
    })

})