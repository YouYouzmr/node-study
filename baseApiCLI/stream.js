const fs = require('fs')

// img.png -> readStrem
const rs = fs.createReadStream('./img.png')
// wirteStream -> img2.png
const ws = fs.createWriteStream('./img2.png')

// img.png-> readStream -> writeStream -> img2.png
// 对接
rs.pipe(ws)