import React from 'react'

interface IBookingState {
    numberOfGuest: number
    date: any
}

class BookingForm extends React.Component <{}, IBookingState> {
    constructor(props:any) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event:any) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event:any) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
export default BookingForm
