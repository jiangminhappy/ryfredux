import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProData, editPro } from '@/store/production/action'
import './production.less';


class Production extends Component {

  componentDidMount() {
    if(!this.props.proData.dataList.length) {
      this.props.getProData();
    }
  }

  handleEdit = (index, num) => {
    let currentNum = this.props.proData.dataList[index].selecNum + num;
    if(currentNum < 0) {
      return
    }
    this.props.editPro(index, currentNum);
  }

  render() {
    console.log(this.props.proData.dataList)
    return (
      <main className="common-con-top">
        <section className="pro-list-con">
          <ul className="pro-list-ul">
            {
              this.props.proData.dataList.map((item,index) => {
                return (
                  <li className="pro-item" key={index}>
                    <div className="pro-item-select">
                      <span className={`icon-xuanze1 pro-select-status ${item.selectStatus? 'pro-selected': ''}`}></span>
                      <span className="pro-name">{item.product_name}</span>
                    </div>
                    <div className="pro-item-edit">
                      <span className={`icon-jian ${item.selecNum > 0? 'edit-active':''}`}></span>
                      <span className="pro-num">{item.selecNum}</span>
                      <span className={`icon-jia`} onClick={this.handleEdit.bind(this, index, 1)}></span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    )
  }
}

export default connect((state) => ({
  proData: state.proData
}), {
  getProData,
  editPro
})(Production)