import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment';

interface IBookingState {
    numberOfGuests: number;
    date: Date;
    time: number;
}

class BookingForm extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numberOfGuests: 1,
      date: new Date(),
      time: 18
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: any) {
      console.log(event)
   let newDate = moment(this.state.date);
   alert(newDate.format('MMMM Do YYYY, h:mm'))
  
   //    alert(this.state.numberOfGuests + this.state.date + this.state.time)
    event.preventDefault()
  }

  calendarOnChange = (date:any) => this.setState({ date })

  handleInputChange(event:any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
      } as any);
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
        <label>
            Time:
        <select
          name='time'
          value={this.state.time}
          onChange={this.handleInputChange}
        >
          <option value='18'>18</option>
          <option value='21'>21</option>
        </select>
        </label>
        <Calendar onChange={this.calendarOnChange} value={this.state.date} />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
export default BookingForm
