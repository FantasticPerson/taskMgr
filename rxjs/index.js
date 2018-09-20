const height = document.getElementById('height')
const height$ = rxjs.fromEvent(height,'keyup')

height$.subscribe(val=>{
    console.log(val.target.value + ' '+new Date())
})

const length = document.getElementById('length')
const width = document.getElementById('width')
const area = document.getElementById('area')

//最最新的两个值
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

// const area$ = rxjs.combineLatest(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })


//两个都有最新值是进行计算
const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

const area$ = rxjs.zip(length$,width$,(l,w)=>{return l*w})
area$.subscribe(val=>{
    area.innerHTML = val
})
