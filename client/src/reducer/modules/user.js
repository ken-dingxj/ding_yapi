import axios from 'axios';

// Actions
const LOGIN = 'yapi/user/LOGIN';
const REGISTER = 'yapi/user/REGISTER';

// Reducer user
const initialState = {
  isLogin: false,
  uid: null,
  userName: '',
  email: '',
  role: '',
  type: '',
  add_time: null,
  up_time: null,
  study: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      if (action.payload.data.code === 10000) {
        return {
          ...state,
          isLogin: true,
          uid: action.payload.data.data.uid,
          userName: action.payload.data.data.username,
          email: action.payload.data.data.email,
          role: action.payload.data.data.role,
          type: action.payload.data.data.type,
          study: action.payload.data.data.study,
          add_time: action.payload.data.data.add_time,
          up_time: action.payload.data.data.up_time
        };
      } else {
        return state;
      }
    }
    case REGISTER: {
      if (action.payload.data.code === 10000) {
        return {
          ...state,
          isLogin: false
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

// Action Creators
export function loginActions(data) {
  return {
    type: LOGIN,
    payload: axios.post('/api/user/login', data)
  };
}

export function registerActions(data) {
  return {
    type: REGISTER,
    payload: axios.post('/api/user/reg', data)
  };
}