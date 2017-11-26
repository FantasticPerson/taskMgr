import { trigger,state,transition,style,animate,keyframes } from '@angular/animations'

export const itemAnim = trigger('item',[
    state('in',style({'border-left-width':'3px'})),
    state('out',style({'border-left-width':'8px'})),
    transition('out=>hover',animate('100ms ease-in')),
    transition('hover=>out',animate('100ms ease-out'))
])