import React from 'react'
import Calendar from 'react-calendar'

interface IBookingState {
    numberOfGuests: number
    date: any
    time: number
}

class BookingForm extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numberOfGuests: 0,
      date: new Date(),
      time: 18
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: any) {
    alert('This is how many who wants to book: ' + this.state.numberOfGuests)
    alert('This is what date they want to go ' + this.state.date)
    alert('This is when they want to go ' + this.state.time)
    event.preventDefault()
  }

  onChange = (date:any) => this.setState({ date })

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
            name="numberOfGuests"
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
            max='6'
          />
        </label>
        <select name="time" value={this.state.time} onChange={this.handleInputChange}>
          <option value='18'>18</option>
          <option value='21'>21</option>
        </select>
        <Calendar onChange={this.onChange} value={this.state.date} />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
export default BookingForm
