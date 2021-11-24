export const debounce = (func: Function, wait = 0) => {
    if (typeof func !== 'function') {
        throw new TypeError('need a function arguments')
    }
    let timeid: NodeJS.Timeout;
    let result: any;    
    return function () {
        let args = arguments;

        if (timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(function () {
            result = func.apply(null, args);
        }, wait);

        return result;
    }
}