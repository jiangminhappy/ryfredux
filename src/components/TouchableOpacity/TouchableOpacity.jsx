import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';

export default class TouchableOpacity extends Component {
  constructor(props) {
    super(props);
    this.btn = React.createRef();
  }
  static propTypes = {
    clickCallBack: PropTypes.func,
    text: PropTypes.string,
    className: PropTypes.string
  }

  handleTouchStart = () => {
    this.btn.current.style.opacity = '0.3'
  }

  handleTouchEnd = () => {
    this.btn.current.style.opacity = '1';
    this.props.clickCallBack();
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {
    return (
      <div
        className={`btn-con ${this.props.className}`}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        ref= {this.btn}
     >
        {this.props.text || '确认'}
      </div>
    )
  }
}