import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuardService } from './auth-guard.service';
import { Store, StoreModule, select } from '@ngrx/store';
import { getAuth, reducers, metaReducers, State } from '../reducers';
import * as authActions from '../actions/auth.action';
import { withLatestFrom } from 'rxjs/operators';

const mockSnapshot: any = jasmine
  .createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

@Component({
  template: `<router-outlet></router-outlet>`
})
class RoutingComponent {
}

@Component({
  template: ``
})
class DummyComponent {
}


describe('测试路由守卫服务：AuthGuardService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'route1', component: DummyComponent },
          { path: 'route2', component: DummyComponent },
        ]),
        StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
      ],
      declarations: [DummyComponent, RoutingComponent],
      providers: [
        AuthGuardService,
        { provide: RouterStateSnapshot, useValue: mockSnapshot }
      ]
    }).compileComponents();
  }));

  it('不应该允许绕过守卫',
    async(inject([AuthGuardService, Store],
      (service: AuthGuardService, store$: Store<State>) => {
        const fixture = TestBed.createComponent(RoutingComponent);
        const guard$ = service.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
        const auth$ = store$.pipe(select(getAuth));
        const merge$ = guard$.pipe(
            withLatestFrom(
          auth$, (g, a) => ({ result: g, auth: a.err === undefined && a.user !== undefined })));
        merge$.subscribe(r => {
          expect(r.result).toBe(r.auth);
        });
        store$.dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: {
            token: 'xxxx',
            user: { id: 'xxxx', email: 'abc@dev.local', name: 'xxxx', password: 'sssss' }
          }
        });
      })));

});
