
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

exports.generator = () => {
    const generator = function* (name) {
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
    }

    let co = generator => {
        if(it = generator.next().value){
            it.then(res => {
                co(generator)
            })
        } else {
            return
        }
    }
    co(generator('Co-generator'))
}

exports.asyncAwait = async ()=> {
    await promise('AsyncAwait 1')
    await promise('AsyncAwait 2')
    await promise('AsyncAwait 3')
    await promise('AsyncAwait 4')
}

// 时间监听
exports.event = async () => {
    const asyncFun = name => event => {
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100)

        return event
    }

    const ary = [
        asyncFun('event 1'),
        asyncFun('event 2'),
        asyncFun('event 3'),
    ]

    const {EventEmitter} = require("events")
    const event = new EventEmitter()
    let i = 0;
    event.on('end', ()=> i<ary.length && ary[i++](event))
    event.emit('end')
}