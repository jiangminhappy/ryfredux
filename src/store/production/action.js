import * as pro from './action-type';
import API from '@/api/api';

// 异步获取列表页的数据
export const getProData = () => {
  return async dispatch => {
    try{
      let result = await API.getProduction();
      result.map(item => {
        item.selectStatus = true;
        item.selecNum = 0;
        return item
      })
      dispatch({
        type: pro.GETPRODUCTION,
        dataList: result
      })
    }catch(err) {
      console.log(err);
    }
  }
}

// 新增、减少数据
export const editPro = (index, selecNum) => {
  return {
    type: pro.EDITPRODUCTION,
    index,
    selecNum
  }
}