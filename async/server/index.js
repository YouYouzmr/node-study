
exports.callback = () => {
    setTimeout(()=> {
        console.log('callback 1');

        // 多层会进入回调地狱
        setTimeout(()=> {
            console.log('callback 2');
        }, 100)
    }, 100)

}

const logTime = (name) => {
    console.log('log...'+name+':',new Date().toLocaleDateString());
}

const promise = (name, delay=100) => new Promise(resolve=> {
    setTimeout(()=> {
        logTime(name)
        resolve()
    }, delay)
})

exports.promise = () => {
    promise("promise 1")
        .then(promise("promise 2"))
        .then(promise("promise 3"))
}