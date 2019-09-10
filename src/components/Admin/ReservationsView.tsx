import React from 'react';
import { IReservation } from './Admin';
import moment from 'moment';

const axios = require('axios');

interface IReservationViewProps {
    reservations: IReservation[];
    reservation: IReservation;

    deleteFunction(id: number): void;
    updateFunction(id: number): void;
    saveUpdate(updateItem: IReservationUpdate): void;  
}


export interface IReservationUpdate {
    id: number,
    guests: number,
    date: string,
    time: number,
    name: string,
    email: string,
    phone: number
}

class ReservationsView extends React.Component <IReservationViewProps, IReservationUpdate> {
    constructor(props:any){
        super(props)
        this.state = {
            id: this.props.reservation.id,
            guests: this.props.reservation.guests,
            date: this.props.reservation.date,
            time: this.props.reservation.time,
            name: this.props.reservation.name,
            email: this.props.reservation.email,
            phone: this.props.reservation.phone
        }
            this.onChange = this.onChange.bind(this);
    }

    onChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        } as any)
    }
 

      getSingleReservation(id: number) {
        axios.get('http://localhost:8888/react-restaurant-booking-backend/single-reservation.php/', { params: { res_id: id}})
        .then((result: any)=> {
            let singleReservation = result.data
            
            this.setState({
                id: singleReservation.id,
                guests: singleReservation.guests,
                date: singleReservation.date,
                time: singleReservation.time,
                name: singleReservation.name,
                email: singleReservation.email,
                phone: singleReservation.phone


            });
        });
    }

      update(e: any){
        e.preventDefault();
        console.log(this.state.date)
        if (this.state.guests <= 1 || 
            this.state.date != moment(this.state.date).format('YYYY-MM-DD') || 
            this.state.time === 0 || 
            this.state.name === '' || 
            this.state.name === '' ||
            this.state.email === '' ||
            this.state.phone === 0) {
            alert('Please fill in all fields before saving reservation!')
            return false
        }
        this.props.saveUpdate(this.state)
      } 

    render() {
        return (
            <div>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>guests</th>
                                <th>date</th>
                                <th>time</th>
                                <th>name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        {this.props.reservations.map((reservation: IReservation) => {
                            return (
                
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.guests}</td>
                                    <td>{reservation.date}</td>
                                    <td>{reservation.time}:00</td>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.phone}</td>
                                    <td><button type="button" onClick={this.props.deleteFunction.bind(this, reservation.id)}>Delete</button></td>
                                    <td><button type="button" onClick={this.getSingleReservation.bind(this, reservation.id)}>Update</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    
                    <form action="submit">
                        <label htmlFor="id">Id:</label>
                        <input name="id" type="text" value={this.state.id} disabled/>
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
                        <label htmlFor="phone">Phone:</label>
                        <input name="phone" type="text" value={this.state.phone} onChange={this.onChange }/>
                        
                        <button type="button" onClick={this.update.bind(this)}>Save Changes</button>
                    </form>
                </div>
        )
           
        
    }
}


export default ReservationsView
