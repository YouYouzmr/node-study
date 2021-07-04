test('callback', done=> {
    const { callback } = require("../index.js")
    callback()
    // 延迟1s
    setTimeout(done, 1000)
})

test('promise', done=> {
    const { promise } = require("../index.js")
    promise()
    // 延迟1s
    setTimeout(done, 1000)
})