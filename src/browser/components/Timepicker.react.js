import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Range} from 'immutable';
import stringToTime from '../../common/lib/stringToTime.js';


const fromHour = 0;
const toHour = 24;
const fromMinutes = 0;
const toMinutes = 60;

export default class Timepicker extends Component {
  static propTypes = {
    minutesStep: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    minutesStep: 1,
    value: '09:00'
  };

  componentWillMount() {
    const {value} = this.props;
    const time = stringToTime(value);

    this.setState({hours: time.hours, minutes: time.minutes});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.props.value) return;

    const time = stringToTime(nextProps.value);

    this.setState({hours: time.hour, minutes: time.minutes});
  }

  render() {
    return (
      <div>
        <h1>
          This is my awesome timepicker component.
        </h1>
        <div>
          {this.renderHours()}
          :
          {this.renderMinutes()}
        </div>
      </div>
    );
  }

  renderHours() {
    const hoursRange = Range(fromHour, toHour);
    const selectedHour = this.state.hours;

    return (
      this.renderSelect(hoursRange, selectedHour, this.onHoursChange)
    );
  }

  renderMinutes() {
    const {minutesStep} = this.props;
    let minutesRange = Range(fromMinutes, toMinutes);
    const selectedMinute = this.state.minutes;

    if (minutesStep !== 1) {
      minutesRange = minutesRange.reduce((newInterval, value) => {
        if (value % minutesStep === 0) newInterval.push(value);
        return newInterval;
      }, []);
    }

    return (
      this.renderSelect(minutesRange, selectedMinute, this.onMinutesChange)
    );
  }

  onHoursChange(event) {
    const value = event.target.value;

    this.setState({hours: value}, this.handleChange);
  }

  onMinutesChange(event) {
    const value = event.target.value;

    this.setState({minutes: value}, this.handleChange);
  }

  handleChange() {
    const{onChange, name} = this.props;

    onChange({name, value: this.formattedValue()});
  }

  formattedValue() {
    return (this.state.hours + ':' + this.state.minutes);
  }

  renderSelect(range, selectedValue, onChange) {
    return (
      <select onChange={onChange.bind(this)} value={selectedValue}>
        {range.map((value) =>
          <option value={value} key={value}>{value}</option>) }
      </select>
    );
  }

}
