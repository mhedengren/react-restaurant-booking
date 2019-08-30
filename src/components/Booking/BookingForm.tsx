import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
const axios = require('axios')

interface IBookingState {
    numberOfGuests: number;
    date: Date;
    time: number;
    show18: boolean;
    show21: boolean;
}

class BookingForm extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numberOfGuests: 1,
      date: new Date(),
      time: 0,
      show18: false,
      show21: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: any) {
    console.log(event)
    let newDate = moment(this.state.date)
    alert(newDate.format('YYYY-MM-DD'))

    event.preventDefault()
  }

  calendarOnChange = (date: any) => {
    this.setState({ date })
  }

  handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    } as any)
  }

  render() {
    return (
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
    )
  }
}
export default BookingForm
