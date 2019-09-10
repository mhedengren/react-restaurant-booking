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
    tel: string
    numberOfGuests: number
    numberOfGuestsError: boolean
    date: Date
    dateToSend: string
    show18: boolean
    show21: boolean
    timePicked: string
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
            tel: '',
            numberOfGuests: 1,
            numberOfGuestsError: false,
            date: new Date(),
            dateToSend: '',
            show18: false,
            show21: false,
            timePicked: '',
            bookingArrayByDate: []
        }

        this.postReservation = this.postReservation.bind(this)
        this.onChange = this.onChange.bind(this)
        this.toggleOptions = this.toggleOptions.bind(this)
        this.getTodaysBookings = this.getTodaysBookings.bind(this)
        this.calendarOnChange = this.calendarOnChange.bind(this)

    }

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
            },
            () => this.toggleOptions()
          )
        })
    }

    postReservation() {
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
            <form action="submit">
            <label htmlFor="guests">Guests:</label>
            <input name="guests" type="text" value={this.state.guests} onChange={this.onChange} />
            <Calendar
            onChange={this.calendarOnChange}
            value={this.state.date}
            minDate={new Date()}
            />
            <label htmlFor="time">Time:</label>
            <input name="time" type="text" value={this.state.time} onChange={this.onChange} />
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" value={this.state.name} onChange={this.onChange} />
            <label htmlFor="email">Email:</label>
            <input name="email" type="text" value={this.state.email} onChange={this.onChange} />
            <label htmlFor="tel">Phone:</label>
            <input name="tel" type="text" value={this.state.tel} onChange={this.onChange} />
           
            <button type="button" onClick={this.postReservation}>Create Now</button>
        </form>
        )
    }
}


export default CreateReservation