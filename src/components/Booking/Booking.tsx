import React from 'react'
import BookingForm from './BookingForm'
import ContactForm from './ContactForm'
import BookingComplete from './BookingComplete'
import GdprConsent from './GdprConsent';
import './booking.css'
const axios = require('axios')

interface IBookingState {
  guests: number
  date: string
  time: number
  name: string
  email: string
  tel: string
  GdprConsent: boolean
  contactFormValid: boolean
  showBookingForm: boolean
  showContactForm: boolean
  showBookingComplete: boolean
}

class Booking extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      guests: 0,
      date: '',
      time: 0,
      name: '',
      email: '',
      tel: '',
      GdprConsent: false,
      contactFormValid: false,
      showBookingForm: true,
      showContactForm: false,
      showBookingComplete: false
    }
    this.postReservation = this.postReservation.bind(this)
    this.contactFormValues = this.contactFormValues.bind(this)
    this.getBookingFormInfo = this.getBookingFormInfo.bind(this)
    this.toggleGdpr = this.toggleGdpr.bind(this)
  }

  //Get values from the booking form.
  getBookingFormInfo(numberOfGuests: number, date: string, time: number) {
    this.setState({ guests: numberOfGuests, date: date, time: time, showContactForm: true})
  }
  
   //Get values from the contact form.
  contactFormValues(name: string, tel: string, email: string, contactFormValid: boolean) {
    this.setState(() => ({ name, tel, email, contactFormValid }))
  }

  // Toggle GDPR-consent.
  toggleGdpr() {
    this.setState({GdprConsent: !this.state.GdprConsent})
  }

  // Validation and post reservation.
  postReservation() {
    if (!this.state.GdprConsent && !this.state.contactFormValid){
      return
    }
    axios
      .post(
        'http://localhost:8888/react-restaurant-booking-backend/post-reservation.php',
        {
          res_guests: this.state.guests,
          res_date: this.state.date,
          res_time: this.state.time,
          res_name: this.state.name,
          res_email: this.state.email,
          res_tel: this.state.tel
        }
      )
      .then(function(res: any) {
        console.log(res)
      })
    this.setState({
      showBookingComplete: true,
      showContactForm: false,
      showBookingForm: false
    })
    
  }

  render() {
    return (
      <div>
        {this.state.showBookingForm ? <BookingForm getBookingFormInfo={this.getBookingFormInfo}/> :null }
        {this.state.showContactForm ? <ContactForm onChangeHandler={this.contactFormValues} /> : null}
        {this.state.showContactForm ? <GdprConsent toggleGdpr={this.toggleGdpr} /> :null}
        {this.state.showContactForm ? <button onClick={this.postReservation}> Book your table </button> : null}
        {this.state.showBookingComplete ? <BookingComplete /> :null}
      </div> 
    )
  }
}
export default Booking
