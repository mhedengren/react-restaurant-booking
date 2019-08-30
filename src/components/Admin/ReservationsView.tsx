import React from 'react'
import { IReservation } from './Admin';

interface IReservationViewProps {
    reservations: IReservation[];
}

class ReservationsView extends React.Component <IReservationViewProps,{}> {
    constructor(props:any){
        super(props)

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
                            </tr>
                        
            )
        })}

                        </tbody>
                    </table>
                    <p>This is the Reservations view component!</p>
                </div>
        )
        
        
        
        
    }
}


export default ReservationsView
