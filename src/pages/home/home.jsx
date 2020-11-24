import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savaFormData } from '../../store/home/action';
import mixin, { padStr } from '../../utils/mixin';
import { Link } from 'react-router-dom';
import './home.less'

@mixin({padStr})
class home extends Component {

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

  render() {
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
          <div>
            <p className="common-title">请选择销售产品</p>
            <Link to="/production" className="common-select-btn">
              选择
            </Link>
          </div>
        </form>
      </main>
    )
  }
}


export default connect(state => ({
  formData: state.formData
}), {
  savaFormData
})(home)