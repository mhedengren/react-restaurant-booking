import React from 'react';
import ReservationsView from './ReservationsView';


const axios = require('axios');

export interface IReservation {
    id: number,
    guests: number,
    date: string,
    time: number,
    name: string,
    email: string,
    phone: number
}



interface IState {
    reservations: IReservation[];
    reservation: IReservation;
}

    class Admin extends React.Component <{}, IState >{ 
        constructor(props: any){
            super(props);

            this.state = {
                reservations: [],
                reservation: {
                    id: 0,
                    guests: 0,
                    date: '',
                    time: 0,
                    name: '',
                    email:'',
                    phone:0
                }
            }

            this.getAdmin = this.getAdmin.bind(this);
            this.reservationDelete = this.reservationDelete.bind(this);
            this.reservationUpdate = this.reservationUpdate.bind(this);
            this.getSingleReservation = this.getSingleReservation.bind(this);

        } 
        componentDidMount() {
            this.getAdmin();
        }
        getAdmin() {
            axios.get('http://localhost/react-restaurant-booking-backend/admin.php/')
            .then((result: any)=> {
                this.setState({
                    reservations: JSON.parse(result.data)
                })
                
            });
        }
        render() {
   
            return (
                <div>
                    <ReservationsView
                        reservations={this.state.reservations}
                        deleteFunction={this.reservationDelete}
                        updateFunction={this.getSingleReservation}
                        saveUpdate={this.reservationUpdate}
                        reservation={this.state.reservation}
                    />
                </div>
              )
        }

        reservationDelete(id: number) {
           
            axios.delete(`http://localhost/react-restaurant-booking-backend/delete.php/`, {data: { params: { res_id: id}}})

                .then((res: any) => {
                   
                    // 1. Make a copy of the state object (the list)
                    let newList = this.state.reservations;
                    // 2. splice the copy
                    newList.splice(0, 1)
                    // 3. Run setState and set reservations to your copy object
                    this.setState({
                        reservations: newList
                    })
                    this.getAdmin();                                           
                })
        }

        getSingleReservation(id: number) {
            axios.get('http://localhost/react-restaurant-booking-backend/single-reservation.php/', { params: { res_id: id}})
            .then((result: any)=> {
                let singleReservation = result.data
                
                this.setState({
                    reservation: singleReservation
                });
            });
        }
        
        reservationUpdate(id: number) { 
            axios.put(`http://localhost/react-restaurant-booking-backend/update.php/`, {data: { params: { res_id: id}}})
                .then((res: any) => {
                    this.getSingleReservation(id);
                    
                    let updatedReservation = this.state.reservation
                    this.setState({
                        reservation: updatedReservation
                    })
                    // console.log(this.getSingleReservation(id));
                })
        }
}

export default Admin
