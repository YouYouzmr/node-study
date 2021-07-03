// 立即生成测试文件
// 用到 fs 
const path = require('path')
const fs = require('fs')

/**
 * path 的属性
 * basename: 文件名
 * extname: 扩展名
 * dirname: 目录名（不包含当前文件名）
 */
module.exports = class TestNow {

    /**
     * 获取测试文件内容
     * @param {*} sourcePath 
     */
    genJestSource(sourcePath = path.resolve("./")){
        const testPath = `${sourcePath}/__test__`
        // 生成文件夹
        if(!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件+文件夹
        let list = fs.readdirSync(sourcePath)

        // list:  [ '__test__', 'class.js', 'fun.js' ]
        console.log('list: ', list)
        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件，statSync()获取对应路径文件信息
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => v.indexOf('.spec') === -1)
            .map(v => this.genTestFile(v))
    }
    /**
     * 处理当前文件并生成对应文件测试用例
     * @param {*} filename 
     * @returns 
     */
    genTestFile(filename) {
        // 输出完整文件名称
        console.log('filename:', filename)
        const testFileName = this.getTestFileName(filename)

        // 判断文件是否存在
        if(fs.existsSync(testFileName)) {
            console.log('该测试代码已经存在', testFileName)
            return
        }

        const mod = require(filename)
        let source
        if(typeof mod === 'object') {
            source = Object.keys(mod)
                        .map(v => this.getTestSource(v, path.basename(filename), true))
                        .join('\n')
        } else if(typeof mod === 'function') {
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testFileName, source)
    }
    
    /**
     * 生成测试用例
     * @param {*} methodName 方法名、属性名
     * @param {*} classFile 
     * @param {*} isClass 
     */
    getTestSource(methodName, classFile, isClass=false) {
        console.log('getTestSource: ', methodName, classFile);
        return `
test('${'TEST'+methodName}', ()=> {
    const ${isClass? '{' + methodName + '}' : methodName} = require('${'../'+classFile}')
    const ret = ${methodName}()
    // expect(ret)
    //   .toBo('test return')
})`
    }

    /**
     * 生成测试文件名
     * @param {*} fileName 代码文件名
     * @returns 
     */
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName)
        const baseName = path.basename(fileName)
        const extName = path.extname(fileName)
        const testName = baseName.replace(extName, `.spec${extName}`)
        console.log('getTestFileName:', dirName, baseName, extName, testName)

        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}