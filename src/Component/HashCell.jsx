import React, { Component } from 'react';
import { simbols } from '../Service/HashGameService'

export default class extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  currentValue() {
    return this.state.value;
  }

  resetValue() {
    this.setState({ value: '' })
  }

  render() {
    const { className, started, playerTurn, whenUpdateValue } = this.props;
    const { value } = this.state;
    const onClick = () => started && !value
      && this.setState({ value: simbols[playerTurn] }, () => whenUpdateValue())
    return (
      <td className={className} onClick={onClick}>
        {value}
      </td>
    )
  }
}