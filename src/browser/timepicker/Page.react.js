import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Timepicker from '../components/Timepicker.react';

export default class Page extends Component {
  render() {
    return (
      <Timepicker
        minutesInterval={5}
        name="time: "
        onChange={this.onTimepickerChange}
        value="12:35"
      />
    );
  }

  onTimepickerChange({name, value}) {
    console.log("Hey you've set new time. It's awesome.\n", name, value);
  }
}
