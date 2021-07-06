const {promisify} = require('util')
const figlet = promisify(require('figlet'))

// 清屏
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('./download')

const spawn = async (...args) => {
    // 日志流对接 子对接到主进程
    // promise风格
    const { spawn } = require('child_process')
    return new Promise(resolve=> {
        // 子进程
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stdout.pipe(process.stderr)

        proc.on('close', ()=> {
            resolve()
        })
    })
}

const {open} = require('open')

module.exports = async name => {
    clear()
    const data = await figlet('hello welcome !')
    log(data)
    log('create project: '+ name)

    // clone
    // await clone('github:su37josephxia/vue-template', name)

    // npm install
    log('安装依赖')
    // cwd: 指定文件
    await spawn('npm', ['install'], {cwd: `./${name}`})

log(chalk.green(`
👌安装完成：
To get Start:
==========================
    cd ${name}
    npm run serve
==========================
`))

}