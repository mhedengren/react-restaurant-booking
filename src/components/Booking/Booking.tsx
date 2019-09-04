import React from 'react'
import BookingForm from './BookingForm';
import ContactForm from "./ContactForm";
import moment from 'moment'

interface IBookingState {
  guests: number,

}

class Booking extends React.Component<{}, {}> {
  constructor(props:any){
    super(props)
  }

  awesomeFunction(numberOfGuests: number, date: moment.Moment, time:number ){
    this.setState({
      guests: numberOfGuests
    })
  }

  render(){
    return (
      <div>
        <BookingForm sendToBooking={this.awesomeFunction} />
        <div>
          <ContactForm />
        </div>
      </div>
    )
  }
}
export default Booking
