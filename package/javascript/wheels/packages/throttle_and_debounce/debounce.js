window.addEventListener('mousemove',
    debounce2(() => console.log('Mousemove'),  1000));

function debounce1(func, delay) {
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        },delay)
    }
}


/**
 * @return <Function>
 * @param func<Function>
 * @param delay<Number>
 * @param options<Object>
 * */
function debounce2(func, delay, options = {
    leading: true,  // 表示是否立即执行
    context: null
}) {
    let timer;
    let res;
    const _debounce = function(...args) {
        options.context || (options.context = this);
        if(timer){
            clearTimeout(timer);
        }
        if(options.leading && !timer){
            timer = setTimeout(() => {
                timer = null;
            }, delay)
            res = func.apply(options.context, args);
        } else {
            timer = setTimeout(() => {
                res = func.apply(options.context, args);
                timer = null;
            }, delay)
        }
        return res;
    };

    _debounce.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }

    return _debounce;
}
