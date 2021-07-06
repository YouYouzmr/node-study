#!/usr/bin/env node
// console.log('cli ....')

// 定制命令行界面
const program = require("commander")

program.version(require('../package.json').version)

// act init abc 创建abc工厂
program.command('init <name>')
    .description('init project')
    // .action(name=> {
    //     console.log('init '+ name)
    // })
    .action(require('../lib/init.js'))

// argv 执行中所有参数
program.parse(process.argv);