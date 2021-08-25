// 返回文档中匹配指定 CSS 选择器的一个元素
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');

left.addEventListener('mouseenter',()=>{
    container.classList.add("hover-left");
})

left.addEventListener('mouseleave',()=>{
    container.classList.remove("hover-left");
})

right.addEventListener('mouseenter',()=>{
    container.classList.add("hover-right");
})

right.addEventListener('mouseleave',()=>{
    container.classList.remove("hover-right");
})