import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { object, string } from 'prop-types';
const axios = require('axios')

interface IBookingState {
    numberOfGuests: number;
    date: Date;
    time: number;
    show18: boolean;
    show21: boolean;
    timePicked: string;
}

class BookingForm extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numberOfGuests: 1,
      date: new Date(),
      time: 0,
      show18: false,
      show21: false,
      timePicked: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitTime = this.handleSubmitTime.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  handleSubmit(event: any) {
    console.log(event)
    let newDate = moment(this.state.date)
    alert(newDate.format('YYYY-MM-DD'))

    event.preventDefault()
  }

  handleSubmitTime(event: any) {
    alert(this.state.timePicked)
    event.preventDefault();
  }

  calendarOnChange(date: any) {
    let newDate = moment(date);
    let dateToSend = newDate.format('YYYY-MM-DD');
    console.log(dateToSend)
    
    axios.get(`http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,      { params: { res_date: dateToSend}})
    .then((res: any) => {
      console.log(res.data)

      //this.setState({ date: date })
      
      var firstSitting = "18";
      var count = res.data.filter((obj:any) => obj.time === firstSitting)
      var secondSitting = "21";
      var count2 = res.data.filter((obj:any) => obj.time === secondSitting)
      console.log(count.length);
      console.log(count2.length);

      if (count <15) {
        //toggle radio-button 18
      } else {

      }

      if (count2 <15) {
        //toggle radio-button 21
      } else {
        
      }
    })
  }


  handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    } as any)
  }

  handleRadioChange(event: any) {
    this.setState({
      timePicked: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Number of guests:
            <input
              name='numberOfGuests'
              type='number'
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange}
              min='1'
              max='6'
            />
          </label>
          <Calendar onChange={this.calendarOnChange} value={this.state.date} />
          <input type='submit' value='Submit' />
        </form>
        
        <form onSubmit={this.handleSubmitTime}>
          <p>Pick a time for your reservation please</p>
            <ul>
              <li>
                <label>
                  <input
                    name='sitting18'
                    type='radio'
                    value='18'
                    checked={this.state.timePicked === "18"}
                    onChange={this.handleRadioChange}
                  />
                Time: 18</label>
              </li>

              <li>
                <label>
                  <input
                    name='sitting21'
                    type='radio'
                    value='21'
                    checked={this.state.timePicked === "21"}
                    onChange={this.handleRadioChange}
                  />
                  Time: 21</label>
                </li>
              <button type="submit">Make reservation</button>
            </ul>
          </form>
      </div>
    )
  }
}
export default BookingForm
