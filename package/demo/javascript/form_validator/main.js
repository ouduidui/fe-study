// get element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// show input error message
function  showError(input,message){
    const formControl =  input.parentElement;
    formControl.classList = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText=message;
}

// show success
function  showSuccess(input){
    const formControl =  input.parentElement;
    formControl.classList = "form-control success";
}

// check email is valid
// function isValidEmail(email){
//     const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//     return re.test(String(email));
// }

function checkEmail(input){
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(re.test(input.value.trim())){
       showSuccess(input)
   }else{
       showError(input,'邮箱格式错误');
   }
}

// checkRequired input
function checkRequired(inputArr){
    inputArr.forEach(input =>{
        if(input.value.trim() === ''){
            showError(input,`${getKeyWords(input)}为必选项`);
        }else {
            showSuccess(input);
        }
    })
}

// check length
function checkLength(input,min,max) {
    if(input.value.length < min){
        showError(input,`${getKeyWords(input)}至少${min}个字符`);
    }else if(input.value.length > max){
        showError(input,`${getKeyWords(input)}应少于${max}个字符`);
    }else{
        showSuccess(input);
    }
}

// check password match
function checkPasswordsMatch(input1,input2) {
    if(input1.value !== input2.value){
        showError(input2,"密码不匹配")
    }
}

// get keyword
function getKeyWords(input){
    return input.placeholder.slice(3);
}

// event listener
form.addEventListener('submit', (e)=> {
    // 阻止表单上交事件
    e.preventDefault();

    const inputArr =[username,email,password,password2];
    checkRequired(inputArr);

    checkLength(username,3,15);
    checkLength(password,6,12);

    checkEmail(email);

    checkPasswordsMatch(password,password2)

    // if(username.value === ''){
    //     showError(username,"用户名为必填项");
    // }else{
    //     showSuccess(username);
    // }
    //
    // if(email.value === ''){
    //     showError(email,"邮箱为必填项");
    // }else if(!isValidEmail(email.value)){
    //     showError(email,"邮箱格式错误");
    // }else{
    //     showSuccess(email);
    // }
    //
    // if(password.value === ''){
    //     showError(password,"密码为必填项");
    // }else{
    //     showSuccess(password);
    // }
    //
    // if(password2.value === ''){
    //     showError(password2,"确认密码为必填项");
    // }else{
    //     showSuccess(password2);
    // }
})