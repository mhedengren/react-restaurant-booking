import React from 'react'
import BookingForm from './BookingForm';
import ContactForm from "./ContactForm";
import moment from 'moment'



//Interface för hur hela bokningen ser ut
interface IBookingState {
  guests: number;
  date: string,
  time: number;
}


class Booking extends React.Component<{}, {}> {
  constructor(props:any){
    super(props)

    this.getFirstFormInfo = this.getFirstFormInfo.bind(this)
  }

  //getFirstFormInfo är funktionen som vi skickar ned till BookingForm via props
  //Sätta state/Lyfta ut state från vår andra komponent
  //hämtar värdena 
  getFirstFormInfo(numberOfGuests: number, date: string, time:number){
    this.setState({
      guests: numberOfGuests,
      date: date,
      time: time
    })
  }


   
  render(){
    return (
      <div>
        {/* Namnger propsen och skickar ner funktionen*/}
 <  BookingForm sendToBooking={this.getFirstFormInfo} />
        <div>
          <ContactForm />
        </div>
      </div>
    )
  }
}
export default Booking
