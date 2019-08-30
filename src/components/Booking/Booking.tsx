import React from 'react'
import BookingForm from './BookingForm';

class Booking extends React.Component<{}, {}> {
  constructor(props:any){
    super(props)
  }

  render(){
    return(
      <div>
        <BookingForm />
      </div>
    )
  }
}
export default Booking
