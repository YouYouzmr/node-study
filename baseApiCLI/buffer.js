// buffer 开启二进制缓冲区
// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10)
console.log(buf1)
// 00 表示一个字节
/* <Buffer 00 00 00 00 00 00 00 00 00 00> */

// 创建一个Buffer 包含ASCII
const buf2 = Buffer.from('a')
console.log(buf2)
/* <Buffer 61> */

/**
 * 创建Buffer包含UTF-8字节
 * UTF-8: 一种变长的编码方案，使用1-6个字节来存储
 * UTF-32: 一种固定长度的编码方案，不管字符编号大小，使用使用4个字节来存储
 * UTF-16: 介于UTF-8和UTF-32之前，使用2个或4个字节来存储，长度既固定又可变
 */
const buf3 = Buffer.from('中文')
console.log(buf3)
/* <Buffer e4 b8 ad e6 96 87> */

const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4:', buf4, buf4.toString())
// buf4: <Buffer 61 e4 b8 ad e6 96 87> a中文