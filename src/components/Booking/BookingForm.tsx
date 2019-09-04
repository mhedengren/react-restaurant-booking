import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
const axios = require('axios')

// Interface for BookingState.
interface IBookingState {
  numberOfGuests: number
  date: Date
  time: number
  show18: boolean
  show21: boolean
}

class BookingForm extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    // Set default values.
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

  // Will get reservations for todays date.
  componentDidMount(){
    let today = moment(new Date)
    let dateToSend = today.format('YYYY-MM-DD')
    axios
      .get(
        `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
        { params: { res_date: dateToSend } }
      )
      .then((res: any) => {
        console.log(res.data)
      })
  }

  // Handles the form submit.
  handleSubmit(event: any) {
    console.log(event)
    let newDate = moment(this.state.date)
    alert(newDate.format('YYYY-MM-DD'))

    event.preventDefault()
  }

  // Gets reservations every time date changes in the calendar.
  calendarOnChange(date: any) {
    let newDate = moment(date)
    let dateToSend = newDate.format('YYYY-MM-DD')
    console.log(dateToSend)
    axios.get(`http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
      { params: { res_date: dateToSend}})
    .then((res: any) => {
  
      console.log(res.data);
      //this.setState({ date: date })

        
    });

    axios
      .get(
        `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
        { params: { res_date: dateToSend } }
      )
      .then((res: any) => {
        console.log(res.data)
        //this.setState({ date: date })
      })
  }

  // Reacts default multiple form input handler.
  handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    } as any)
  }

  //Render booking form.
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
