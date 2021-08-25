// 获取DOM节点
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 获取localStorage数据
const localStorageTransactions = localStorage.getItem('transactions');
let transactions = localStorageTransactions ? JSON.parse(localStorageTransactions) : [];

// 表单提交
function addTransaction(e) {
    // 阻止表单默认事件
    e.preventDefault();
    // 表单校验
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("请输入交易名称和金额")
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// 创建generateID
function generateID() {
    return Math.floor(Math.random()*100000000)
}

// 添加transaction交易到Dom节点
function addTransactionDOM(transaction){
    // 判断收入还是支出
    const sign = transaction.amount < 0 ? '-' : '+';
    // 创建li标签
    const item  = document.createElement('li');
    // 基于金额正负添加对应的类名
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
     ${transaction.text}
     <span>${sign}${Math.abs(transaction.amount)}</span>
     <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>   
    `;
    list.appendChild(item);
}

// 更新余额、收入、支出的金额
function updateValues(){
    // 通过map()获得交易金额数组
    const amounts = transactions.map(transaction => transaction.amount);
    // 余额
    const total = amounts.reduce((acc,item) => (acc+item),0).toFixed(2);
    // 收入
    const income = amounts.filter(amount => amount > 0)
        .reduce((acc,item) => (acc+item),0)
        .toFixed(2);
    // 支出
    const expense = amounts.filter(amount => amount < 0)
        .reduce((acc,item) => (acc+item),0)
        .toFixed(2);
    // 更新DOM
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// 删除记录
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// 更新本地存储数据
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

// 初始化应用
function init(){
    list.innerHTML = '';
    transactions.forEach(transaction => addTransactionDOM(transaction));
    updateValues()
}

init()

// 事件监听
form.addEventListener('submit',addTransaction);