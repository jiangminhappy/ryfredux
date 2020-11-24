import * as home from './action-type'

export const savaFormData = (value, datatype) => {
  return {
    // 触发的事件
    type: home.SAVEFORMDATA,
    // 传入的值
    value, 
    // 改变的值得类型
    datatype
  }
}