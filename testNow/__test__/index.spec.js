const fs = require('fs')
test("继承测试 测试生成测试代码文件", () => {
    // 准备环境
    // 删除测试文件夹
    fs.rmdirSync(__dirname + "/data/__test__", {
        recursive: true, // 删除文件夹中全部文件
    })
    const src = new (require('../index'))()
    src.genJestSource(__dirname + '/data')
})


// test('测试测试代码生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestSource('fun', 'class')
//     console.log('ret:', ret);

//     expect(ret)
//         .toBe(`
// test('TESTfun', ()=> {
//     const fun = require('../class')
//     const ret = fun()
//     // expect(ret)
//     //   .toBo('test return')
// })`)
// })

// test("测试文件名生成", ()=> {
//     const src = new (require("../index"))()
//     const ret = src.getTestFileName("/abc/class.js")
//     console.log('getTestFileName:', ret)

//     expect(ret)
//         .toBe("/abc/__test__/class.spec.js")
// })