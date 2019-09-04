import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { object, string } from 'prop-types';
import { IReservation } from '../Admin/Admin';
const axios = require('axios')

// Interface for BookingState.
interface IBookingFormState {

    numberOfGuests: number;
    date: Date;
    time: number;
    show18: boolean;
    show21: boolean;
    timePicked: string;
    bookingArrayByDate: IReservation[];

}

interface IBookingFormProps {
    sendToBooking(numberOfGuests: number, date: moment.Moment, time:number ):void;
}

class BookingForm extends React.Component<IBookingFormProps, IBookingFormState> {
  constructor(props: any) {
    super(props)
    // Set default values.
    this.state = {
      numberOfGuests: 1,
      date: new Date(),
      time: 0,
      show18: false,
      show21: false,
      timePicked: '',
      bookingArrayByDate: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitTime = this.handleSubmitTime.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this);
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
      this.toggleOptions();
  }

  // Handles the form submit.
  handleSubmit(event: any) {
    // console.log(event)
    // let newDate = moment(this.state.date)
    // alert(newDate.format('YYYY-MM-DD'))

    event.preventDefault();
    // this.props.sendToBooking(this.state.numberOfGuests, this.state.)
  }


  handleSubmitTime(event: any) {
    alert(this.state.timePicked)
    event.preventDefault();
  }

  calendarOnChange(date: any) {
    let newDate = moment(date);
    let dateToSend = newDate.format('YYYY-MM-DD');
    axios.get(`http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,      { params: { res_date: dateToSend}})
    .then((res: any) => {
 
      console.log(res.data)
      // this.setState({
      //   bookingArrayByDate: res.data
      // })

      // this.toggleOptions();
    })
  }

  toggleOptions(){
    var firstSitting = 18;
    var count18 = this.state.bookingArrayByDate.filter((obj:any) => obj.time === firstSitting)
    var secondSitting = 21;
    var count21 = this.state.bookingArrayByDate.filter((obj:any)  => obj.time === secondSitting)
    console.log(count18.length);
    console.log(count21.length);

    if (count18.length < 15) {
      this.setState({
        show18: true
      })
    } else {

    }

    if (count21.length < 15) {
      this.setState({
        show21: true
      })
    } else {
      return false
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

  handleRadioChange(event: any) {
    this.setState({
      timePicked: event.target.value
    });
  }

  //Render booking form.
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
          <select>
            <option value='1'>Välj tid</option>
            { this.state.show18 ? <option value="18">18</option> : null }
            { this.state.show21 ? <option value="21">21</option> : null }
          </select>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}
export default BookingForm
