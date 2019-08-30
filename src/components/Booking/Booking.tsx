import React from 'react'

interface IBookingState {
    numberOfGuests: number
    date: any
}

class BookingForm extends React.Component <{}, IBookingState> {
    constructor(props:any) {
      super(props);
      this.state = {
        numberOfGuests: 0,
        date: 0
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event:any) {
      this.setState({numberOfGuests: event.target.value});
    }
  
    handleSubmit(event:any) {
      alert('This is how many who wants to book: ' + this.state.numberOfGuests);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="number" value={this.state.numberOfGuests} onChange={this.handleChange} max="6" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
export default BookingForm
