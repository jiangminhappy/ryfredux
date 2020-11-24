import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savaFormData } from '../../store/home/action';
import mixin, { padStr } from '../../utils/mixin';
import { Link } from 'react-router-dom';
import { is, fromJS } from 'immutable';
import './home.less';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity'
import PublicAlert from '@/components/alert/alert';

@mixin({padStr})
class home extends Component {

   state = {
      alertStatus: false, //弹框状态
      alertTip: '', //弹框提示文字
    }

  handleInput =(type, event) => {
    let value = event.target.value;
    switch(type) {
      case 'orderSum':
        value = value.replace(/\D/g, '');
        break;
      case 'name':
        break;
      case 'phoneNo':
        value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
        break;
      default: ;
    }
    this.props.savaFormData(value, type)
  }

  // 已经选择的商品的数量
  selectedProList = [];
  initData = props => {
    this.selectedProList = [];
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selecNum) {
        this.selectedProList.push(item)
      }
    })
  }

  // 组件初始化不调用，组件接受新的props调用
   componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

   shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  // 组件初始化不调用， 组件更新的时候调用，此时可以修改state
 componentWillMount(){
    this.initData(this.props);
  }

  // 提交表单
  sumitForm = () => {
    const {orderSum, name, phoneNo} = this.props.formData;
    let alertTip = '';
    if(!orderSum.toString().length){
      alertTip = '请填写金额';
    }else if(!name.toString().length){
      alertTip = '请填写姓名';
    }else if(!phoneNo.toString().length){
      alertTip = '请填写正确的手机号';
    }else{
      alertTip = '添加数据成功';
      this.props.clearSelected();
      this.props.clearData();
    }
    this.setState({
      alertStatus: true,
      alertTip,
    })
  }

  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: ''
    })
  }


  render() {
    console.log(this.props.proData.dataList)
    return (
      <main className="home-container">
        <p className="common-title">请录入你的信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>销售金额: </span>
            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input type="text" placeholder="请输入客户的姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this, 'name')} />
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input type="text" maxLength={11} placeholder="请输入客户的电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')} />
          </div>
          </form>
          <div>
            <p className="common-title">请选择销售产品</p>
            <Link to="/production" className="common-select-btn">
              {
              this.selectedProList.length ? <ul className="selected-pro-list">
                {
                  this.selectedProList.map((item, index) => {
                    return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                  })
                }
              </ul>:'选择产品'
            }
          </Link>
        </div>
        <TouchableOpacity className="submit-btn" clickCallBack={this.sumitForm} text="提交" />
        <PublicAlert
          closeAlert={this.closeAlert}
          alertTip={this.state.alertTip}
          alertStatus={this.state.alertStatus}
       />
      </main>
    )
  }
}


export default connect(state => ({
  formData: state.formData,
  proData: state.proData
}), {
  savaFormData
})(home)