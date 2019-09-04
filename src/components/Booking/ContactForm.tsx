import React from 'react'
import { thisExpression } from '@babel/types';

interface IValuesState {
  name: string;
  tel: string;
  email: string;
  nameError: string;
  telError: string;
  emailError: string;
}



class ContactForm extends React.Component<{}, IValuesState> {
    constructor(p: any) {
        super(p); 
        this.handleValues = this.handleValues.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  // temporary method - should be in parent 

        this.state = {
            name: "",
            tel: "",
            email: "",
            nameError: "",
            telError: "",
            emailError: "",
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
    handleValues(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as IValuesState );

        console.log(this.state);
    }
    handleSubmit(e:any){
        e.preventDefault();
        const isValid = this.validateInput();
        console.log(this.state);
        if(isValid){

        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <h2>This is the Contact form component!</h2>
                <div>
                Name:
                    <input  
                    placeholder="name"
                    value={this.state.name}  
                    onChange={this.handleValues} 
                    name="name"/>
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
                    name="tel"/>
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
                <button type="submit">Submit</button>
                    </form>
            </div>
        )
    }
}

export default ContactForm
