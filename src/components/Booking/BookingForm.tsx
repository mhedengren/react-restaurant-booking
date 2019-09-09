import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { IReservation } from '../Admin/Admin'
const axios = require('axios')

interface IBookingFormState {
  numberOfGuests: number
  numberOfGuestsError: boolean
  date: Date
  dateToSend: string
  time: number
  show18: boolean
  show21: boolean
  timePicked: string
  bookingArrayByDate: IReservation[]
}

interface IBookingFormProps {
  getBookingFormInfo(numberOfGuests: number, date: string, time: number): void
}

class BookingForm extends React.Component<IBookingFormProps, IBookingFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numberOfGuests: 1,
      numberOfGuestsError: false,
      date: new Date(),
      dateToSend: '',
      time: 0,
      show18: false,
      show21: false,
      timePicked: '',
      bookingArrayByDate: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
    this.getTodaysBookings = this.getTodaysBookings.bind(this)
    this.calendarOnChange = this.calendarOnChange.bind(this)
  }

  getTodaysBookings() {
    let today = moment(new Date())
    let dateToSend = today.format('YYYY-MM-DD')
    console.log(dateToSend)
    axios
      .get(
        `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
        { params: { res_date: dateToSend } }
      )
      .then((result: any) => {
        this.setState(
          {
            bookingArrayByDate: result.data
          },
          () => this.toggleOptions()
        )
      })
  }

  // Will get reservations for todays date.
  componentDidMount() {
    this.getTodaysBookings()
  }

  // Lifting state up.
  handleSubmit(event: any) {
    if (this.state.numberOfGuests > 6){
      this.setState({numberOfGuestsError: true})
      return
    }
    this.props.getBookingFormInfo(this.state.numberOfGuests, this.state.dateToSend, event.target.value)
  }

  // Fetches new reservations every time a new date is picked in the calendar.
  calendarOnChange(date: any) {
    let dateToSend = moment(date).format('YYYY-MM-DD')
    axios
      .get(
        `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
        { params: { res_date: dateToSend } }
      )
      .then((result: any) => {
        this.setState(
          {
            bookingArrayByDate: result.data,
            dateToSend: dateToSend
          },
          () => this.toggleOptions()
        )
      })
  }

  // Logic for rendering available bookings.
  toggleOptions() {
    let firstSitting = '18'
    let count18 = this.state.bookingArrayByDate.filter(
      (obj: any) => obj.time === firstSitting
    )
    let secondSitting = '21'
    let count21 = this.state.bookingArrayByDate.filter(
      (obj: any) => obj.time === secondSitting
    )

    if (count18.length < 15) {
      this.setState({
        show18: true
      })
    } else if (count18.length >= 15) {
      this.setState({
        show18: false
      })
    }

    if (count21.length < 15) {
      this.setState({
        show21: true
      })
    } else if (count21.length >= 15) {
      this.setState({
        show21: false
      })
    }
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
      <div>
        <form>
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
            {this.state.numberOfGuestsError ? <span style={{ fontSize: 11, color: "red" }}>That's too many! Maximum amount of guests is 6.</span>:null}
          </label>
          <Calendar
            onChange={this.calendarOnChange}
            value={this.state.date}
            minDate={new Date()}
          />
          <select onChange={this.handleSubmit}>
            <option value='1'>Välj tid</option>
            {this.state.show18 ? <option value='18'>18</option> : null}
            {this.state.show21 ? <option value='21'>21</option> : null}
          </select>
        </form>
      </div>
    )
  }
}
export default BookingForm
