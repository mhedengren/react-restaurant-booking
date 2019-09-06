import React from 'react'
import BookingForm from './BookingForm'
import ContactForm from './ContactForm'
import './booking.css'
import moment from 'moment'

//Interface för hur hela bokningen ser ut
interface IBookingState {
  guests: number
  date: string
  time: number
  name: string
  email: string
  tel: string
  GDPRconsent: boolean
  contactFormValid: boolean
}

class Booking extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props)

    this.submitBook = this.submitBook.bind(this)
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
      contactFormValid: false
    }
  }
  displayGuestLog() {
    console.log('Welcome to June ' + JSON.stringify(this.state))
  }
  contactFormValues(
    name: string,
    tel: string,
    email: string,
    contactFormValid: boolean
  ) {
    this.setState(
      () => ({ name, tel, email, contactFormValid }),
      () => this.displayGuestLog()
    )
  }

  submitBook(e: any) {
    e.preventDefault()
    console.log(this.state)
  }

  formValues() {}

  //getFirstFormInfo är funktionen som vi skickar ned till BookingForm via props
  //Sätta state/Lyfta ut state från vår andra komponent
  //hämtar värdena
  getFirstFormInfo(numberOfGuests: number, date: string, time: number) {
    this.setState({
      guests: numberOfGuests,
      date: date,
      time: time
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
          <ContactForm onChangeHandler={this.contactFormValues} />
        </div>
        <div className="gdpr-notice-wrapper">
        <input type='checkbox' onChange={this.handleGDPRChange} />
        <p>
          Genom att klicka i denna checkbox godkänner du att vi hanterar dina
          personuppgifter enligt GDPR. Du kan läsa mer om detta under vår{' '}
          <a href='#'>sida för integritet.</a>
        </p>
        </div>
        <button onClick={this.submitBook}> Book your table </button>
      </div>
    )
  }
}
export default Booking
