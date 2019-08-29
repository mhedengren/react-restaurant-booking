import React from 'react'

const axios = require('axios');

// interface IReservationsState {
//     IReservation: IReservation[]
// }

// interface IReservation {
//     id: number,
//     guests: number,
//     date: string,
//     time: number,
//     name: string,
//     email: string,
//     phone: number

// }

interface IState {
    reservations: any
}

    class Admin extends React.Component <{}, IState >{  // Should be a stateless functional component
        constructor(props: any){
            super(props)
           this.state = {
               reservations: []
           }
        } 
        componentDidMount() {
            axios.get('http://localhost/react-restaurant-booking-backend/reservations.php/')
            .then((result: any)=> {
                this.setState({
                    reservations: result.data
                })
                console.log(this.state.reservations)
            });
        }

        render() {

    
        return (
            <div>
                <p>{this.state.reservations}</p>
            </div>
        )
    }
}

export default Admin
