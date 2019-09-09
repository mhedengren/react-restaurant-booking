import React from 'react'

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
        let emailError = "";

        if (!this.state.email.includes('@')) {
                emailError = "invalid email";
        }
        if(emailError){
            this.setState({emailError});
            return false;
        } else {
            return true;
        }
    }


    handleValues(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;        
        console.log("kuk " + value);
        const cleanedValue = this.preventInjections(value);
        console.log(this.state);
        this.setState(
            (prevState: IValuesState) => ({...prevState, [name]: cleanedValue}),
            () => this.props.onChangeHandler(this.state.name, this.state.tel, this.state.email, this.state.contactFormValid)
        );

    }

    preventInjections(value: string){
        return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    render() {
        const name = this.props;
        return (
            <div>
                <form>
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
