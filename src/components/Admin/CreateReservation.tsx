import React from 'react';
const axios = require('axios');


export interface ICreateReservationState {
    guests: number
    date: string
    time: number
    name: string
    email: string
    tel: string
}

interface ICreateReservationProps {
  createBooking(values: ICreateReservationState):void
}
class CreateReservation extends React.Component<ICreateReservationProps,ICreateReservationState> {
    constructor(props:any){
        super(props)

        this.state = {
            guests: 0,
            date: '',
            time: 0,
            name: '',
            email: '',
            tel: ''
        }

        this.postReservation = this.postReservation.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    postReservation() {
      this.props.createBooking(this.state);
        console.log(this.state)
        
      }

    onChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        } as any)
      }

    render() {
        return(
            <form action="submit">
            <label htmlFor="guests">Guests:</label>
            <input name="guests" type="text" value={this.state.guests} onChange={this.onChange} />
            <label htmlFor="date">Date:</label>
            <input name="date" type="text" value={this.state.date} onChange={this.onChange} />
            <label htmlFor="time">Time:</label>
            <input name="time" type="text" value={this.state.time} onChange={this.onChange} />
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" value={this.state.name} onChange={this.onChange} />
            <label htmlFor="email">Email:</label>
            <input name="email" type="text" value={this.state.email} onChange={this.onChange} />
            <label htmlFor="email">Phone:</label>
            <input name="tel" type="text" value={this.state.tel} onChange={this.onChange} />
           
            <button type="button" onClick={this.postReservation}>Create Now</button>
        </form>
        )
    }
}


export default CreateReservation