import React from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { object, string } from 'prop-types';
import { IReservation } from '../Admin/Admin';
const axios = require('axios')

interface IBookingFormState {
    numberOfGuests: number;
    date: Date;
    dateToSend: string;
    time: number;
    show18: boolean;
    show21: boolean;
    timePicked: string;
    bookingArrayByDate: IReservation[];

}

interface IBookingFormProps {
    sendToBooking(numberOfGuests: number, date: string, time: number):void;
}

class BookingForm extends React.Component<
  IBookingFormProps,
  IBookingFormState
> {
  constructor(props: any) {
    super(props)
    // Set default values.
    this.state = {
      numberOfGuests: 1,
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
    // this.handleRadioChange = this.handleRadioChange.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
    this.getTodaysBookings = this.getTodaysBookings.bind(this)
    this.calendarOnChange = this.calendarOnChange.bind(this)
  }

  getTodaysBookings(){
    let today = moment(new Date())
    let dateToSend = today.format('YYYY-MM-DD')
    console.log(dateToSend)
    axios
      .get(
        `http://localhost/react-restaurant-booking-backend/fetch-reservation.php/`,
        { params: { res_date: dateToSend } }
      )
      .then((result: any) => {
        this.setState({
          bookingArrayByDate: result.data
        }, () => this.toggleOptions())
      })
  }

  // Will get reservations for todays date.
  componentDidMount() {
    this.getTodaysBookings();

  }


  //kallar på funktionen this.props.sendtobooking och skickar med värden från denna komponents state
  //det här är propsen som kommer lyfta vårt state upp

  handleSubmit(event: any) {
    
    
    // console.log(event)
    // let newDate = moment(this.state.date).format('YYYY-MM-DD')
    this.props.sendToBooking(this.state.numberOfGuests, this.state.dateToSend, event.target.value)
    // console.log(this.state.numberOfGuests)
    // console.log(newDate)
    // console.log(event.target.value) 

  }




  calendarOnChange(date: any) {
    let dateToSend =  moment(date).format('YYYY-MM-DD')
    // console.log(dateToSend)//HÄR ÄR DET RÄTT DATUM
    axios
    .get(
      `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
      { params: { res_date: dateToSend } }
    )
    .then((result: any) => {
      this.setState({
        bookingArrayByDate: result.data,
        dateToSend: dateToSend
      }, () => this.toggleOptions())
    })
  }

  toggleOptions() {
    //console.log('this is the array from state',this.state.bookingArrayByDate)
    var firstSitting = '18'
    var count18 = this.state.bookingArrayByDate.filter(
      (obj: any) => obj.time === firstSitting
    )
    var secondSitting = '21'
    var count21 = this.state.bookingArrayByDate.filter(
      (obj: any) => obj.time === secondSitting
    )
    //console.log('this is how many bookings at 18',count18.length);
    //console.log('this is how many bookings at 21', count21.length);

    if (count18.length <= 15) {
      this.setState({
        show18: true
      })
    } else if (count18.length >= 15) {
      this.setState({
        show18: false
      })
    }

    if (count21.length <= 15) {
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

  handleRadioChange(event: any) {
    this.setState({
      timePicked: event.target.value
    })
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
          </label>
          <Calendar onChange={this.calendarOnChange} value={this.state.date} />
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
