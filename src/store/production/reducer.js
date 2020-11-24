import * as pro from './action-type';
import Immutable from 'immutable';

let defaultState = {
  dataList: []
}

export const proData = (state = defaultState, action) => {
  let imuDataList;
  let imuItem;
  switch(action.type) {
    // 获取列表数据
    case pro.GETPRODUCTION:
      return {...state, ...action}
      // 编辑数据
    case pro.EDITPRODUCTION:
      // 使用Immutable对数据进行转换，避免引用类型的数据
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selecNum', action.selecNum);
      imuDataList = imuDataList.set(action.index, imuItem);
    // 返回新的state
      return { ...state, ...{dataList: imuDataList.toJS()}}
      case pro.TOGGLESELECT:
        imuDataList = Immutable.List(state.dataList);
        imuItem = Immutable.Map(state.dataList[action.index]);
        imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
        imuDataList = imuDataList.set(action.index, imuItem);
        return { ...state, ...{dataList: imuDataList.toJS()}}
    default:
      return state;
  }
}