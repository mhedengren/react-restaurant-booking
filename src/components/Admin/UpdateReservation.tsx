import React from 'react';
import { IReservation } from './Admin';

interface IUpdateResevervationProps {
    reservation: IReservation[];
    
}

class UpdateReservation extends React.Component<IUpdateResevervationProps, {}> {
    constructor(props:any){
        super(props)

    }
    render() {
        return(
            <div>
                
            </div>
        )
    }
}


export default UpdateReservation