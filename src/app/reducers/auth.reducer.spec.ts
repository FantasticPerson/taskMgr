import * as fromAuth from './auth.reducer';
import {reducer} from './auth.reducer';
import * as actions from '../actions/auth.action';
import {async} from '@angular/core/testing';

describe('测试 AuthReducer', () => {
  describe('未定义Action', () => {
    it('应该返回一个默认状态', async(() => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromAuth.initialState);
    }));
  });

  describe('登录成功', () => {
    it('应该返回一个 Err 为 undefined 而 userId 不为空的 Auth 对象', async(() => {
      const action = new actions.LoginSuccessAction({
        token: '',
        user: {
          id: '1',
          email: '123@123.com',
          password: '123456'
        }
      });
      const result = reducer(undefined, action);
      expect(result).toEqual({token: '', userId: '1'});
      expect(result.err).toBeUndefined();
    }));
  });

  describe('登录失败', () => {
    it('应该返回一个 Err 不为 undefined 而 User 为 undefined Auth 对象', async(() => {
      const action = new actions.LoginFailAction({
        status: 501,
        message: 'Server Error'
      });
      const result = reducer(undefined, action);
      expect(result.err).toBeDefined();
      expect(result.user).toBeUndefined();
    }));
  });

  describe('注册成功', () => {
    it('应该返回一个 Err 为 undefined 而 User 不为空的 Auth 对象', async(() => {
      const action = new actions.RegisterSuccessAction({
        token: '',
        user: {
          id: '123abc',
          name: 'wang',
          email: 'wang@163.com'
        }
      });
      const result = reducer(undefined, action);
      expect(result).toEqual({token: '', userId: '123abc'});
      expect(result.err).toBeUndefined();
    }));
  });

  describe('注册失败', () => {
    it('应该返回一个 Err 不为 undefined 而 User 为 undefined Auth 对象', async(() => {
      const action = new actions.RegisterFailAction({
        status: 501,
        message: 'Server Error'
      });
      const result = reducer(undefined, action);
      expect(result.err).toBeDefined();
      expect(result.user).toBeUndefined();
    }));
  });
});

