const height = document.getElementById('height')
const height$ = rxjs.fromEvent(height, 'keyup')

height$.subscribe(val => {
    console.log(val.target.value + ' ' + new Date())
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

// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// const width$ = rxjs.fromEvent(width,'keyup').pipe(rxjs.operators.pluck('target','value'))

// const area$ = rxjs.combineLatest(length$,width$,(l,w)=>{return l*w})
// area$.subscribe(val=>{
//     console.log(val)
// })

// const merge$=length$.pipe(rxjs.operators.withLatestFrom(width$)) //第一个流改变是 才可能有输出
// merge$.subscribe(val=>console.log(val))


// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// .pipe(rxjs.operators.map(_=>{
//     return rxjs.interval(100)
// }))

// length$.subscribe(val=>{
//     val.subscribe(v=>console.log(v))
//     // console.log(val)
// })


// flatMap == mergeMap
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// .pipe(rxjs.operators.flatMap(_=>{
//     return rxjs.interval(100)
// }))

// length$.subscribe(val=>{
//     // val.subscribe(v=>console.log(v))
//     console.log(val)
// })


//switchMap
// const length$ = rxjs.fromEvent(length,'keyup').pipe(rxjs.operators.pluck('target','value'))
// .pipe(rxjs.operators.switchMap(_=>{
//     return rxjs.interval(1000)
// }))

// length$.subscribe(val=>{
//     // val.subscribe(v=>console.log(v))
//     console.log(val)
// })

// mergeMap 保留所有的流  switchMap一旦有新的元素进来  会抛弃之前的元素

//share 热   相当于 直播
// const count$ = rxjs.interval(1000)
// const sub1 = count$.subscribe(val=>{
//     console.log(val)
// })

// setTimeout(function(){
//     count$.subscribe(val=>{
//         console.log(val)
//     })
// },2000)

// const count$ = rxjs.interval(1000).pipe(rxjs.operators.share())
// const sub1 = count$.subscribe(val=>{
//     console.log(val)
// })

// setTimeout(function(){
//     count$.subscribe(val=>{
//         console.log(val)
//     })
// },2000)

// const counters$ = rxjs.interval(1000).pipe(rxjs.operators.take(5))
// const subject = new rxjs.Subject()

// const observal1 = {
//     next: (val) => console.log('1: ' + val),
//     error: (err) => console.error('ERROR>> 1:' + err),
//     complete: () => console.log('1 is complete')
// }

// const observal2 = {
//     next: (val) => console.log('2: ' + val),
//     error: (err) => console.error('ERROR>> 2:' + err),
//     complete: () => console.log('2 is complete')
// }

// counters$.subscribe(observal1)

// setTimeout(function () {
//     counters$.subscribe(observal2)
// }, 2000)

// const counters$ = rxjs.interval(1000).pipe(rxjs.operators.take(5))
// const subject = new rxjs.Subject()

// const observal1 = {
//     next: (val) => console.log('1: ' + val),
//     error: (err) => console.error('ERROR>> 1:' + err),
//     complete: () => console.log('1 is complete')
// }

// const observal2 = {
//     next: (val) => console.log('2: ' + val),
//     error: (err) => console.error('ERROR>> 2:' + err),
//     complete: () => console.log('2 is complete')
// }

// subject.subscribe(observal1)


// setTimeout(function () {
//     subject.subscribe(observal2)
// }, 2000)

// counters$.subscribe(subject)

// const counters$ = rxjs.interval(1000).pipe(rxjs.operators.take(5))
// const subject = new rxjs.Subject()

// const observal1 = {
//     next: (val) => console.log('1: ' + val),
//     error: (err) => console.error('ERROR>> 1:' + err),
//     complete: () => console.log('1 is complete')
// }

// const observal2 = {
//     next: (val) => console.log('2: ' + val),
//     error: (err) => console.error('ERROR>> 2:' + err),
//     complete: () => console.log('2 is complete')
// }

// subject.subscribe(observal1)
// subject.next(10)
// subject.next(11)


// setTimeout(function () {
//     subject.subscribe(observal2)
// }, 2000)

// counters$.subscribe(subject)

const counters$ = rxjs.interval(1000).pipe(rxjs.operators.take(5))
// const subject = new rxjs.ReplaySubject() //保留之前的值
const subject = new rxjs.BehaviorSubject()//保留之前的一个值

const observal1 = {
    next: (val) => console.log('1: ' + val),
    error: (err) => console.error('ERROR>> 1:' + err),
    complete: () => console.log('1 is complete')
}

const observal2 = {
    next: (val) => console.log('2: ' + val),
    error: (err) => console.error('ERROR>> 2:' + err),
    complete: () => console.log('2 is complete')
}

subject.subscribe(observal1)
subject.next(10)
subject.next(11)


setTimeout(function () {
    subject.subscribe(observal2)
}, 2000)

counters$.subscribe(subject)

