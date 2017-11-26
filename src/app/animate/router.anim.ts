import { trigger,state,transition,style,animate,keyframes,group } from '@angular/animations'

export const slideToRight = trigger('routeAnim',[
    state('void',style({'position':'fixed','width':'100%','height':'80%'})),
    state('*',style({'position':'fixed','width':'100%','height':'80%'})),
    transition(':enter',[
        style({transform:'translateX(-100%)',opacity:0})
    ]),
    transition(':enter',[
        style({transform:'translateX(-100%)'}),
        group([
            animate('0.5s ease-in-out',style({transform:'translateX(0)'})),
            animate('0.3s ease-in-out',style({opacity:1}))
        ]),
        
    ]),
    transition(':leave',[
        style({transform:'translateX(0)',opacity:1}),
        group([
            animate('0.5s ease-in-out',style({transform:'translateX(100%)'})),
            animate('0.3s ease-in-out',style({opacity:0}))
        ]),
    ])
])