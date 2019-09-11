import React from 'react';
import ReservationsView, { IReservationUpdate } from './ReservationsView';
import CreateReservation, { ICreateReservationState } from './CreateReservation';
import moment from 'moment';
import './admin.scss';

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
    showCreateNewReservation: boolean
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
                },
                showCreateNewReservation: false
                
            }

            this.getAdmin = this.getAdmin.bind(this);
            this.reservationDelete = this.reservationDelete.bind(this);
            this.reservationUpdate = this.reservationUpdate.bind(this);
            this.getSingleReservation = this.getSingleReservation.bind(this);
            this.toggleCreateNewReservation = this.toggleCreateNewReservation.bind(this)
            this.createBooking = this.createBooking.bind(this)

        } 
        componentDidMount() {
            this.getAdmin();
        }
        
        getAdmin() {
            axios.get('http://localhost:8888/react-restaurant-booking-backend/admin.php/')
            .then((result: any)=> {
                this.setState({
                    reservations: JSON.parse(result.data)
                })
                
            });
        }

        createBooking(values: ICreateReservationState) {
            axios.post('http://localhost:8888/react-restaurant-booking-backend/post-reservation.php', {
            res_guests: values.guests,
            res_date: moment(values.date).format('YYYY-MM-DD'),
            res_time: values.time,
            res_name: values.name,
            res_email: values.email,
            res_tel: values.phone
            })
            .then((res:any) => {
                this.getAdmin();
            });
        }
    

        toggleCreateNewReservation(){
            this.setState({
                showCreateNewReservation: true
            })
        }

        reservationDelete(id: number) {  
            axios.delete(`http://localhost:8888/react-restaurant-booking-backend/delete.php/`, {data: { params: { res_id: id}}})
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
                });
            } 
            
        getSingleReservation(id: number) {
            axios.get('http://localhost:8888/react-restaurant-booking-backend/single-reservation.php/', { params: { res_id: id}})
            .then((result: any)=> {
                let singleReservation = result.data
                
                this.setState({
                    reservation: singleReservation
                });
            });
        }
        
        reservationUpdate(reservation: IReservationUpdate) { 
            axios.post(`http://localhost:8888/react-restaurant-booking-backend/update.php/`, reservation)
                .then((res: any) => {
                    this.getAdmin();
                })
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
                    <div>
                        <button className="createNewButton" onClick={this.toggleCreateNewReservation}>Create new</button>
                    </div>
                        {this.state.showCreateNewReservation ?  <CreateReservation createBooking={this.createBooking} /> :null }
                    
                   
                </div>

              )
        }

}


export default Admin
