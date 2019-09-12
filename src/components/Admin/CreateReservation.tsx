import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { IReservation } from '../Admin/Admin';
const axios = require('axios');


export interface ICreateReservationState {
    guests: number
    time: number
    name: string
    email: string
    phone: number
    numberOfGuests: number
    numberOfGuestsError: boolean
    date: Date
    dateToSend: string
    bookingArrayByDate: IReservation[]
}

interface ICreateReservationProps {
  createBooking(values: ICreateReservationState):void
}
class CreateReservation extends React.Component<ICreateReservationProps,ICreateReservationState> {
    constructor(props:any){
        super(props)

        this.state = {
            guests: 0,
            time: 0,
            name: '',
            email: '',
            phone: 0,
            numberOfGuests: 1,
            numberOfGuestsError: false,
            date: new Date(),
            dateToSend: '',
            bookingArrayByDate: []
        }

        this.postReservation = this.postReservation.bind(this)
        this.onChange = this.onChange.bind(this)
        this.getTodaysBookings = this.getTodaysBookings.bind(this)
        this.calendarOnChange = this.calendarOnChange.bind(this)

    }

    calendarOnChange(date: any) {
      let dateToSend = moment(date).format('YYYY-MM-DD');
      console.log(dateToSend);
      axios
        .get(
          `http://localhost:8888/react-restaurant-booking-backend/fetch-reservation.php/`,
          { params: { res_date: dateToSend } }
        )
        .then((result: any) => {
          this.setState(
            {
              bookingArrayByDate: result.data,
              date: date
            }
          )
        })
    }

    getTodaysBookings() {
      let today = moment(new Date())
      console.log(today);
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
            }
          )
        })
    }

    postReservation(e: any) {
      e.preventDefault();
      if (this.state.guests <= 1 || 
        this.state.time === 0 || 
        this.state.name === '' || 
        this.state.name === '' ||
        this.state.email === '' ||
        this.state.phone === 0) {
        alert('Please fill in all fields before saving reservation!')
        return false
    }


      this.props.createBooking(this.state);
        console.log(this.state)

        
      }

    onChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        } as any)
      }

    render() {
        return(
          <form action="submit" className="admin-form">
            <label htmlFor="guests">Guests:</label>
            <input name="guests" className="admin-input" type="text" value={this.state.guests} onChange={this.onChange} />
            <Calendar
            onChange={this.calendarOnChange}
            value={this.state.date}
            minDate={new Date()}
            />
            <label htmlFor="time">Time:</label>
            <input name="time" className="admin-input" type="text" value={this.state.time} onChange={this.onChange} />
            <label htmlFor="name">Name:</label>
            <input name="name" className="admin-input" type="text" value={this.state.name} onChange={this.onChange} />
            <label htmlFor="email">Email:</label>
            <input name="email" className="admin-input" type="text" value={this.state.email} onChange={this.onChange} />
            <label htmlFor="phone">Phone:</label>
            <input name="phone" className="admin-input" type="text" value={this.state.phone} onChange={this.onChange} />
           
            <button type="button" className="admin-createNowButton" onClick={this.postReservation}>Create Now</button>
          </form>
        )
    }
}


export default CreateReservation