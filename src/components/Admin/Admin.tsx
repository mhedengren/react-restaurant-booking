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
}

    class Admin extends React.Component <{}, IState >{  // Should be a stateless functional component
        constructor(props: any){
            super(props);

            this.state = {
                reservations: []
            }

            this.getAdmin = this.getAdmin.bind(this);
            this.reservationDelete = this.reservationDelete.bind(this);
            this.reservationUpdate = this.reservationUpdate.bind(this);

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
        render() {
   
            return (
                <ReservationsView
                    reservations={this.state.reservations}
                    deleteFunction={this.reservationDelete}

                    updateFunction={this.reservationUpdate}

                />
              )
        }

        reservationDelete(id: number) {
            console.log(id);
            console.log(this.state.reservations)
            // myArr.splice(id,1)
            // this.setState({
            //     reservations: myArr
            // })
            axios.delete(`http://localhost:8888/react-restaurant-booking-backend/delete.php/`, {data: { params: { res_id: id}}})
                .then((res: any) => {
                 
                    console.log('Item clicked' + {res_id: 'id'});
                    console.log(res);
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
                })
            }) }
    

        reservationUpdate(id: number) {
            console.log(id);
            axios.put(`http://localhost:8888/react-restaurant-booking-backend/update.php/`, {data: { params: { res_id: id}}})
                .then((res: any) => {
                    
                })
        }
}

export default Admin
