let imgList = [...document.querySelectorAll('img')];
let len = imgList.length;

// 防抖
function debounce(func, delay = 0) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, delay)
    }
}

// 获取窗口高度
function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

const imgLazyLoad1 = (function () {
    let count = 0;

    return function () {
        const delta = 30;  // 预加载阈值
        const winH = getWindowHeight();
        let deleteIndexList = [];
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect();  // 返回元素的大小及其相对于视口的位置
            if (winH + delta > rect.top && rect.bottom > - delta) {
                img.src = img.dataset.src;  // 将图片路径赋值给src
                deleteIndexList.push(index);
                count++;

                // 如果全部图片都加载完毕，即结束监听
                if (count === len) {
                    window.removeEventListener('load',debounce(imgLazyLoad1));
                    window.removeEventListener('scroll', debounce(imgLazyLoad1));
                }
            }
        })

        // 将加载完成的图片从imgList删除
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
    }
})()

// window.addEventListener('load',debounce(imgLazyLoad1));
// window.addEventListener('scroll', debounce(imgLazyLoad1));

const imgLazyLoad2 = (function() {
    let count = 0;
    return function () {
        /*
        * 创建一个IntersectionObserver实例
        *   - IntersectionObserver接口用来观察一个元素是否在视窗可见
        *   - callback函数会触发两次，即元素进入视窗（开始可见）和元素开始离开视窗时（开始不可见）
        * */
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                /**
                 * entry -> IntersectionObserverEntry提供观察元素的信息，有七个属性
                 *    - boundingClientRect 目标元素的矩形信息
                 *    - intersectionRatio 相交区域和目标元素的比例值 intersectionRect/boundingClientRect 不可见时小于等于0
                 *    - intersectionRect 目标元素和视窗（根）相交的矩形信息 可以称为相交区域
                 *    - isIntersecting 目标元素当前是否可见 Boolean值 可见为true
                 *    - rootBounds 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息
                 *    - target 观察的目标元素
                 *    - time 返回一个记录从IntersectionObserver的时间到交叉被触发的时间的时间戳
                 * */
                if(entry.intersectionRatio > 0) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    count++;
                    observer.unobserve(entry.target);  // 停止观察当前元素 避免不可见时候再次调用callback函数
                    if(count === len){
                        window.removeEventListener('load',debounce(imgLazyLoad2));
                    }
                }
            })
        },
            /**
             * options 配置项
             *    - root: 用于观察的根元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素
             *    - threshold: 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]
             *    - rootMargin: 用来扩大或者缩小视窗的的大小，使用css的定义方法，10px 10px 30px 20px表示top、right、bottom 和 left的值
             * */
            {rootMargin: '30px'}
        )

        for(let i = 0; i < len; i++) {
            observer.observe(imgList[i])  // 开始观察，接受一个DOM节点对象
        }
    }
})()

window.addEventListener('load',debounce(imgLazyLoad2));