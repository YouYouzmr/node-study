const fs = require('fs')
const http = require('http')
const server = http.createServer((req, res)=> {
    // console.log(getPrototypeChain(res))
    /**
     * Stream {end}
     * EventEmitter{}
     */
    // console.log('this is a req')
    // res.end('hello node')

    const {url, method, headers} = req

    if(url==='/' && method==='GET') {
        fs.readFile('index.html', (err, data)=> {
            if(err) {
                res.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"})
                res.end('500 服务器异常 哈哈')
                return
            } 
            res.statusCode = 200
            res.setHeader("Content-Type", 'text/html')
            res.end(data)
        })
        console.log('main')
    } else if(url==='/users' && method ==='GET'){
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
            name: 'Tom'
        }))
    }
    // 所有图片请求
    else if(method==='GET' && headers.accept.indexOf('image/*')!==-1){
        // url = img.png
        console.log(url)
        fs.createReadStream('.'+url).pipe(res)
    }else {
        res.statusCode = 404
        res.setHeader("Content-Type", 'text/html')
        res.end('404 no page')
    }
})

server.listen(3000)

// 打印原型
function getPrototypeChain(obj) {
    const protoChain = []
    while(obj=Object.getPrototypeOf(obj) ){
        protoChain.push(obj)
    }

    return protoChain
}