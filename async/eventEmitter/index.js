// EventEmitter 订阅发布的实现
class EventEmitter {
    constructor() {
        this.handler = {}
    }

    on(eventName, callback) {
        if(!this.handles) {
            this.handles = {}
        } 
        if(!this.handles[eventName]) {
            this.handles[eventName] = []
        }

        this.handles[eventName].push(callback)
    }

    emit(eventName, ...arg) {
        if(this.handles[eventName]) {
            for(let i=0; i< this.handles[eventName].length; i++) {
                this.handles[eventName][i](...arg)
            }
        }
    }
}

const evt = new EventEmitter();
evt.on('some_event', num => {
    console.log('some_event事件促发：', num)
})

let num = 0;
setInterval(() => {
    evt.emit('some_event', num++)
}, 1000)