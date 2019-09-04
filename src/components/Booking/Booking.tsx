import React from 'react'
import BookingForm from './BookingForm';
import ContactForm from "./ContactForm";

class Booking extends React.Component<{}, {}> {
  constructor(props:any){
    super(props)
  }

  render(){
    return(
        <div>
            <BookingForm/>
            <div>
                <ContactForm/>
            </div>
        </div>
    
    )
  }
}
export default Booking
