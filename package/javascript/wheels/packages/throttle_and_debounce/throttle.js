window.addEventListener('mousemove',
    throttle1(() => console.log('Mousemove'),  1000));

// 时间戳实现
function throttle1(func, delay) {
    let previous = 0;  // 保存上次调用的时间戳
    return function() {
        const now = Date.now();
        if(now >= delay + previous){
            func.apply(this, arguments);
            previous = now;
        }else{
            console.log('距离上次调用的时间差不满足要求')
        }
    }
}

// 定时器实现
function throttle2(func, delay){
    let timer = null;
    return function() {
        if(!timer){
            func.apply(this, arguments);
            timer = setTimeout(() => {
                timer = null;
            }, delay)
        }else{
            console.log('距离上次调用的时间差不满足要求')
        }
    }
}

/**
 * @return <Function>
 * @param func<Function>
 * @param delay<Number>
 * @param options<Object>
 * */
function throttle3(func, delay, options = {
    leading: true,   // 表示是否立即执行
    trailing: false,  // 是否在最后额外触发一次
    context: null
}){
    let timer;
    let res;
    let previous = 0;
    const _throttle = function(...arg){
        options.context || (options.context = this);  // 判断是否需要绑定新的上下文
        let now = Date.now();
        if(!previous && !options.leading){
            previous = now;
        }
        if(now >= previous + delay){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            res = func.apply(options.context, arg);
            previous = now;
        }else if(!timer && options.trailing){
            timer = setTimeout(() => {
                res = func.apply(options.context, arg);
                previous = 0;
                timer = null;
            }, delay)
        }
        return res;
    }

    _throttle.cancel = function() {
        previous = 0;
        clearTimeout(timer);
        timer = null;
    }

    return _throttle;
}