import React from 'react'
import BookingForm from './BookingForm'
import ContactForm from './ContactForm'
import './booking.css'
import moment from 'moment'
const axios = require('axios');

//Interface för hur hela bokningen ser ut
interface IBookingState {
  guests: number
  date: string;
  time: number
  name: string
  email: string
  tel: string
  GDPRconsent: boolean
  contactFormValid: boolean
  showSecondForm: boolean
}

class Booking extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)

    this.postReservation = this.postReservation.bind(this)
    this.formValues = this.formValues.bind(this)
    this.contactFormValues = this.contactFormValues.bind(this)
    this.getFirstFormInfo = this.getFirstFormInfo.bind(this)
    this.handleGDPRChange = this.handleGDPRChange.bind(this)
    this.state = {
      guests: 0,
      date: '',
      time: 0,
      name: '',
      email: '',
      tel: '',
      GDPRconsent: false,
      contactFormValid: false,
      showSecondForm: false
    }
  }

  contactFormValues(
    name: string,
    tel: string,
    email: string,
    contactFormValid: boolean
  ) {
    this.setState(
      () => ({ name, tel, email, contactFormValid })
    )
  }



  postReservation() {
    axios.post('http://localhost:8888/react-restaurant-booking-backend/post-reservation.php', {
      res_guests: this.state.guests,
      res_date: this.state.date,
      res_time: this.state.time,
      res_name: this.state.name,
      res_email: this.state.email,
      res_tel: this.state.tel
    })
    .then(function (res:any) {
      console.log(res);
    })
  }

  formValues() {}

  //getFirstFormInfo är funktionen som vi skickar ned till BookingForm via props
  //Sätta state/Lyfta ut state från vår andra komponent
  //hämtar värdena
  getFirstFormInfo(numberOfGuests: number, date: string, time: number) {
    console.log(date)
    this.setState({
      guests: numberOfGuests,
      date: date,
      time: time,
      showSecondForm: true
    })
  }

  handleGDPRChange(){
    this.setState({
      GDPRconsent: true
    })
  }

  render() {
    return (
      <div>
        {/* Namnger propsen och skickar ner funktionen*/}
        <BookingForm sendToBooking={this.getFirstFormInfo} />
        <div>
         {this.state.showSecondForm ? <ContactForm onChangeHandler={this.contactFormValues} /> :null}
        </div>
        {this.state.showSecondForm ?
        <div className="gdpr-notice-wrapper">
        <input type='checkbox' onChange={this.handleGDPRChange} />
        <p>Genom att klicka i denna checkbox godkänner du att vi hanterar dina
           personuppgifter enligt GDPR. Du kan läsa mer om detta under vår{''}
        <a href='#'>sida för integritet.</a></p>
        </div> :null}
        {this.state.showSecondForm ?<button onClick={this.postReservation}> Book your table </button> :null}
      </div>
    )
  }
}
export default Booking
