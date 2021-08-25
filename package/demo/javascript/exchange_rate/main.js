// 获取节点
const currentEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currentEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// 获取汇率，并实现dom节点更新
function calculate(){
    const currency_one = currentEl_one.value;
    const currency_two = currentEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res =>res.json())
        .then(data =>{
            const rate = data.rates[currency_two];
            
            rateEl.innerText = `1${currency_one} = ${rate}${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
}

// 事件监听
currentEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currentEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
    const temp = currentEl_one.value;
    currentEl_one.value = currentEl_two.value;
    currentEl_two.value = temp;
    calculate();
})

calculate()