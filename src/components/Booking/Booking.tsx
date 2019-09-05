import React from 'react'
import BookingForm from './BookingForm';
import ContactForm from "./ContactForm";

interface IBookingState {
  name: string;
  tel: string;
  email: string;
  contactFormValid: boolean;
}


class Booking extends React.Component<{}, IBookingState> {
  constructor(props:any){
    super(props)
    this.submitBook = this.submitBook.bind(this); 
    this.formValues = this.formValues.bind(this);
    this.contactFormValues = this.contactFormValues.bind(this);
    this.state = {
      name: "",
      email: "",
      tel: "",
      contactFormValid: false
    }
  }
  displayGuestLog() {
    console.log('Welcome to June ' + JSON.stringify(this.state));
}
  contactFormValues(name: string, tel: string, email:string, contactFormValid: boolean){
    this.setState(() => ({name, tel, email, contactFormValid}), () => this.displayGuestLog());
  }

  submitBook(e:any){
    e.preventDefault();
      console.log(this.state);
  }

  formValues(){

  }

  render(){
    return(
        <div>
            <BookingForm />
            <div>
                <ContactForm onChangeHandler={this.contactFormValues}/>
            </div>
            <button onClick={this.submitBook}> Book your table </button>
        </div>
    
    )
  }
}
export default Booking
