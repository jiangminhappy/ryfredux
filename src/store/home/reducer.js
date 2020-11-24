import * as home from './action-type';

let defaultState = {
  orderSum: '',//金额
  name: '',//姓名
  imgpath: '',
  phoneNo: ''
}

export const formData = (state = defaultState, action) => {
  switch(action.type) {
    case home.SAVEFORMDATA:
      return { ...state, ...{[action.datatype]: action.value}}
    case home.SAVEIMG:
      return {...state, ...{imgpath: action.path}};
    default: 
      return state
  }
}
