function* func() {
    console.log('one')
    yield "1"
    console.log('two')
    yield "2"
    console.log('three')
    yield '3'
}

const f = func()

for(const [key, value] of func()) {
    console.log(`${key}: ${value}`)
}