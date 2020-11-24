import * as home from './action-type';

let defaultState = {
  orderSum: '',//金额
  name: '',//姓名
}

export const formData = (state = defaultState, action) => {
  switch(action.type) {
    case home.SAVEFORMDATA:
      return { ...state, ...{[action.datatype]: action.value}}
    default: 
      return state
  }
}
