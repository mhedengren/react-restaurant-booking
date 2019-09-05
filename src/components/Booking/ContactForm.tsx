import React from 'react'
import { thisExpression } from '@babel/types';

interface IValuesState {
  name: string;
  tel: string;
  email: string;
  nameError: string;
  telError: string;
  emailError: string;
  contactFormValid: boolean;
}

interface IValuesProps {
  onChangeHandler: (name: string, tel: string, email: string, contactFormValid: boolean) => void; 
  }


class ContactForm extends React.Component<IValuesProps, IValuesState> {
    constructor(p: any) {
        super(p); 
        this.handleValues = this.handleValues.bind(this);
        this.validateInput = this.validateInput.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);  // temporary method - should be in parent 

        this.state = {
            name: "",
            tel: "",
            email: "",
            nameError: "",
            telError: "",
            emailError: "",
            contactFormValid: false
        }
    }

    validateInput(){
        // let nameError = "";
        // let telError = "";
        let emailError = "";

        if (!this.state.email.includes('@')) {
                emailError = "invalid email";
        } 
        if(emailError){
            this.setState({emailError})
            return false;
        } else {
            return true;
        }
    }

    displayGuestLog() {
        const name = this.state.name;
        console.log('Welcome to June ' + JSON.stringify(name));
    }

    handleValues(event: any) {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        }  as IValuesState, 
        () => { this.props.onChangeHandler(this.state.name, this.state.tel, this.state.email, this.state.contactFormValid ); // Keeps the method and state values in sync
        }); 
    }

    // handleSubmit(e:any){
    //     e.preventDefault();
    //     const isValid = this.validateInput();
    //     console.log(this.state);
    //     if(isValid){
    //         this.setState({  // clears the form 
    //             name: " ",
    //             tel: " ",
    //             email: " ",
    //         });
    //     }
    // }

    render() {
        const name = this.props
        return (
            <div>
                <form /* onSubmit={this.handleSubmit} */>
                <h2>This is the Contact form component!</h2>
                <div>
                Name:
                    <input  
                    placeholder="name"
                    value={this.state.name}  
                    onChange={this.handleValues} 
                    name="name" required/>
                    {this.state.nameError ? 
                        ( <div style={{ fontSize: 11, color: "red"}} >{this.state.nameError}</div>) 
                        : undefined }
                </div>
                <div>
                Tel: 
                    <input 
                    placeholder="phonenumber" 
                    value={this.state.tel} 
                    onChange={this.handleValues} 
                    name="tel" required/>
                    {this.state.telError ? 
                        ( <div style={{fontSize: 11, color: "red"}} >{this.state.telError}</div>) 
                        : undefined }
                </div>
                <div>  
                Email:  
                    <input  
                    placeholder="email"
                    value={this.state.email} 
                    onChange={this.handleValues} 
                    name="email"/>
                    {this.state.emailError ? 
                        ( <div style={{fontSize: 11, color: "red"}} >{this.state.emailError}</div>) 
                        : undefined }
                </div>
                    </form>
            </div>
        )
    }
}

export default ContactForm
