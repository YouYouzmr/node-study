// 同步读取
// const data = fs.readFileSync("./config.js")

// console.log('data', data.toString())
// <Buffer 61 62 63>


// 异步读取, 错误优先
// fs.readFile("./config.js", (err, data) => {
//     if(err) throw err
//     console.log('data:', data.toString())
// })

(async () => {
    const fs = require('fs')
    // node 8.0后支持async & await
    const {promisify} = require('util')
    const readFile = promisify(fs.readFile)

    const data = await readFile('./config.js')
    console.log('data:', data.toString())
})()