import React from 'react'
import BookingForm from './BookingForm'
import ContactForm from './ContactForm'
import BookingComplete from './BookingComplete'
import GdprConsent from './GdprConsent';
import Header from '../Header/Header';
import './booking.scss'
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
  showGdprError: boolean
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
      showBookingComplete: false,
      showGdprError: false
    }
    this.postReservation = this.postReservation.bind(this)
    this.getContactFormValues = this.getContactFormValues.bind(this)
    this.getBookingFormValues = this.getBookingFormValues.bind(this)
    this.toggleGdpr = this.toggleGdpr.bind(this)
  }

  //Get values from the booking form.
  getBookingFormValues(numberOfGuests: number, date: string, time: number) {
    // If time selection dropdown is on "Choose time" it wont display the contact form.
    if (time == 1){
      this.setState({
        showContactForm: false
      })
      return
    }
    this.setState({ guests: numberOfGuests, date: date, time: time, showContactForm: true})

   //Get values from the contact form.
  getContactFormValues(name: string, tel: string, email: string, contactFormValid: boolean) {
    console.log(contactFormValid)
    this.setState(() => ({ name, tel, email, contactFormValid }))
  }

  // Toggle GDPR-consent.
  toggleGdpr() {
    this.setState({GdprConsent: !this.state.GdprConsent},()=> this.GdprValidation())
  }

  // If the user tried to submit without GDPR consent
  // this function will remove the warning when user checks the box.
  GdprValidation(){
    if (this.state.showGdprError && this.state.GdprConsent === true) {
      this.setState({
        showGdprError: false
      })
    }
  }

  // Validation and post reservation.
  postReservation() {
    if (!this.state.GdprConsent){
        this.setState({
          showGdprError: true
        }) 
        return false
    } 

    console.log(this.state.contactFormValid)
    if (!this.state.contactFormValid){
      return false
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
  }
  render() {
    return (
      <div>
        <div className="wrapper">
        <Header />
          <div className="column-wrapper">
            <div className="left-column">
              {this.state.showBookingForm ? <BookingForm getBookingFormValues={this.getBookingFormValues}/> :null }
  
            </div>
            <div className="right-column">
            {this.state.showContactForm ? <ContactForm getContactFormValues={this.getContactFormValues} /> : null}
              {this.state.showContactForm ? <GdprConsent toggleGdpr={this.toggleGdpr} /> :null}
              {this.state.showContactForm ? <button onClick={this.postReservation}> Book your table </button> : null}
              {this.state.showBookingComplete ? <BookingComplete /> :null}
            </div>
          </div>
        </div>
      </div> 
    )
  }
}
export default Booking
