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
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

// const area$ = rxjs.zip(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })


//map 用法
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.map(ev=>ev.target.value))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.map(ev=>ev.target.value))

// const area$ = rxjs.zip(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })

//mapTo 用法  不关系值  比如 点击触发
//mapTo(1) ===> map(_=>1)
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.mapTo(1))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.mapTo(2))

// const area$ = rxjs.zip(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })

// length$.subscribe(val=>{console.log(val)})
// width$.subscribe(val=>{console.log(val)})


//from
// const length$ = rxjs.from([1,2,3,4])
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.mapTo(2))

// const area$ = rxjs.combineLatest(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })

// length$.subscribe(val=>{console.log(val)})
// width$.subscribe(val=>{console.log(val)})


// const length$ = rxjs.of({id:1,value:20},{id:2,value:30})
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.mapTo(2))

// const area$ = rxjs.combineLatest(length$,width$,(l,w)=>{return l.value*w})
// area$.subscribe(val=>{
//     area.innerHTML = val
// })

// length$.subscribe(val=>{console.log(val)})
// width$.subscribe(val=>{console.log(val)})

// const interval$ = rxjs.interval(100)
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100).pipe(rxjs.operators.take(3))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const timer$ = rxjs.timer(100)

// timer$.subscribe(v=>{console.log(v)})

// const timer$ = rxjs.timer(100,100) //这样子就 是一开始有延迟的 interval

// timer$.subscribe(v=>{console.log(v)})


// rxjs.operators.filter


// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.filter(val=>val%2 === 0))
// .pipe(rxjs.operators.map(val=>val*2))
// .pipe(rxjs.operators.last())

// // .pipe(rxjs.operators.do(v=>console.log('val is:'+val)))
// // .pipe(rxjs.operators.take(3))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.filter(val=>val%2 === 0))
// .pipe(rxjs.operators.map(val=>val*2))
// .pipe(rxjs.operators.skip(2))

// // .pipe(rxjs.operators.do(v=>console.log('val is:'+val)))
// .pipe(rxjs.operators.take(3))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.filter(val=>val%2 === 0))
// .pipe(rxjs.operators.scan((x,y)=>{return x+y}))
// .pipe(rxjs.operators.take(4))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.filter(val=>val%2 === 0))
// .pipe(rxjs.operators.take(4))
// .pipe(rxjs.operators.reduce((x,y)=>{return x+y}))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.filter(val=>val%2 === 0))
// .pipe(rxjs.operators.take(4))
// .pipe(rxjs.operators.reduce((x,y)=>{return [...x,y]},[]))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(err),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.interval(100)
// .pipe(rxjs.operators.map(val=>{
//     throw 'error6666'
// }))
// .pipe(rxjs.operators.take(4))
// .pipe(rxjs.operators.reduce((x,y)=>{return [...x,y]},[]))
// interval$.subscribe(
//     val=>console.log(val),
//     error=>console.log(error),
//     ()=>console.log('i am complete')    
// )

// const interval$ = rxjs.never()
// const interval$ = rxjs.throwError('error 666')
// const interval$ = rxjs.empty()


// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value')).pipe(rxjs.operators.debounceTime(300))

// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value')).pipe(rxjs.operators.debounce(()=>rxjs.interval(300)))

// length$.subscribe(val=>{console.log(val)})

// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value')).pipe(rxjs.operators.distinct()) //保证序列中 没有重复的元素

// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value')).pipe(rxjs.operators.distinctUntilChanged()) //保证跟上一个值  不一样


// length$.subscribe(val=>{console.log(val)})

// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

// const merged$ = rxjs.merge(length$,width$)//merge 按各自的顺序输出流
// merged$.subscribe(val=>{console.log(val)})

// const merged$ = rxjs.concat(length$,width$)//concat 将第二个流接在第一个流后面
// merged$.subscribe(val=>{console.log(val)})

// const first$ = rxjs.from([1,2,3,4]).pipe(rxjs.operators.startWith(0)) //一般用来赋初始值

const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

const area$ = rxjs.combineLatest(length$,width$,(l,w)=>{return l*w})
area$.subscribe(val=>{
    console.log(val)
})

const merge$=length$.pipe(rxjs.operators.withLatestFrom(width$)) //第一个流改变是 才可能有输出
merge$.subscribe(val=>console.log(val))