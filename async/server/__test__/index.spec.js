// test('callback', done=> {
//     const { callback } = require("../index.js")
//     callback()
//     // 延迟1s
//     setTimeout(done, 1000)
// })

// test('promise', done=> {
//     const { promise } = require("../index.js")
//     promise()
//     // 延迟1s
//     setTimeout(done, 1000)
// })

// test('generator', done=> {
//     const { generator } = require("../index.js")
//     generator()
//     // 延迟1s
//     setTimeout(done, 1000)
// })

// test('asyncAwait', done=> {
//     const { asyncAwait } = require("../index.js")
//     asyncAwait()
//     // 延迟1s
//     setTimeout(done, 1000)
// })

test('event', done=> {
    const { event } = require("../index.js")
    event()
    // 延迟1s
    setTimeout(done, 1000)
})