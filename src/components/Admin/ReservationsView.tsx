import React from "react";
import { IReservation } from "./Admin";

interface IReservationViewProps {
  reservations: IReservation[];
  reservation: IReservation;

  deleteFunction(id: number): void;
  updateFunction(id: number): void;
  saveUpdate(updateItem: IReservationUpdate): void;
}

export interface IReservationUpdate {
  id: number;
  guests: number;
  date: string;
  time: number;
  name: string;
  email: string;
  phone: number;
  emailError: string;
}

class ReservationsView extends React.Component<
  IReservationViewProps,
  IReservationUpdate
> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.reservation.id,
      guests: this.props.reservation.guests,
      date: this.props.reservation.date,
      time: this.props.reservation.time,
      name: this.props.reservation.name,
      email: this.props.reservation.email,
      phone: this.props.reservation.phone,
      emailError: ""
    };
    this.onChange = this.onChange.bind(this);
    this.emailValid = this.emailValid.bind(this);

  }
  emailValid() {
    let emailError = "";

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
      this.setState({ emailError });
    } else {
      console.log("valid mail" + emailError); 
     this.setState({ emailError });
    }
  }

  onChange(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }  as any, 
    () => this.emailValid())
  }
  
  componentDidUpdate(prevProps: any) {
    if (
      this.props.reservation.id !== prevProps.reservation.id &&
      this.props.reservation.guests !== prevProps.reservation.guests &&
      this.props.reservation.date !== prevProps.reservation.date &&
      this.props.reservation.time !== prevProps.reservation.time &&
      this.props.reservation.name !== prevProps.reservation.name &&
      this.props.reservation.email !== prevProps.reservation.email &&
      this.props.reservation.phone !== prevProps.reservation.phone
    ) {
      this.setState(
        {
          id: this.props.reservation.id,
          guests: this.props.reservation.guests,
          date: this.props.reservation.date,
          time: this.props.reservation.time,
          name: this.props.reservation.name,
          email: this.props.reservation.email,
          phone: this.props.reservation.phone
        },
      );
    }
  }

  render() {
    console.log(this.state);
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
                  <td>
                    <button
                      type="button"
                      onClick={this.props.deleteFunction.bind(
                        this,
                        reservation.id
                      )}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.props.updateFunction.bind(
                        this,
                        reservation.id
                      )}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <form action="submit">
          <label htmlFor="id">Id:</label>
          <input
            name="id"
            type="text"
            value={this.props.reservation.id}
            disabled
          />
          <label htmlFor="guests">Guests:</label>
          <input
            name="guests"
            type="text"
            value={this.state.guests}
            onChange={this.onChange}
          />
          <label htmlFor="date">Date:</label>
          <input
            name="date"
            type="text"
            value={this.state.date}
            onChange={this.onChange}
          />
          <label htmlFor="time">Time:</label>
          <input
            name="time"
            type="text"
            value={this.state.time}
            onChange={this.onChange}
          />
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.onChange}
          />
          {this.state.emailError ? (
              <div style={{ fontSize: 11, color: "red" }}>
                {this.state.emailError}
              </div>
            ) : (
              undefined
            )}
          <label htmlFor="phone">Phone:</label>
          <input
            name="phone"
            type="text"
            value={this.state.phone}
            onChange={this.onChange}
          />

          <button
            type="button"
            onClick={this.props.saveUpdate.bind(this, this.state)}
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}

export default ReservationsView;
