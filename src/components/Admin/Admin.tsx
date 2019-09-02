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

        } 
        componentDidMount() {
            axios.get('http://localhost:8888/react-restaurant-booking-backend/admin.php/')
            .then((result: any)=> {
                this.setState({
                    reservations: JSON.parse(result.data)
                })
                console.log(this.state.reservations)
            });
        }

        render() {
   
            return (
                <ReservationsView
                    reservations={this.state.reservations}
                    deleteFunction={this.reservationDelete}
                />
              )
        }

        reservationDelete(id: number) {
            console.log(id);
            // console.log(this.state.reservations)
            // myArr.splice(id,1)
            // this.setState({
            //     reservations: myArr
            // })
            axios.delete(`http://localhost:8888/react-restaurant-booking-backend/delete.php/`, {data: { params: { res_id: id}}})
                .then((res: any) => {
                 
                    console.log('Item clicked' + {res_id: 'id'});
                    console.log(res);
                    
                })
        }
}

export default Admin
