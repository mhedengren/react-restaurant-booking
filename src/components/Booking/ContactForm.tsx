import React from "react";

interface IContactFormState {
  name: string;
  tel: string;
  email: string;
  nameError: string;
  telError: string;
  emailError: string;
  contactFormValid: boolean;
}

interface IContactFormProps {
  getContactFormValues: (
    name: string,
    tel: string,
    email: string,
    contactFormValid: boolean
  ) => void;
}

class ContactForm extends React.Component<IContactFormProps, IContactFormState> {
  constructor(p: any) {
    super(p);
    this.handleValues = this.handleValues.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      name: "",
      tel: "",
      email: "",
      nameError: "",
      telError: "",
      emailError: "",
      contactFormValid: false
    };
  }

  validateInput() {
    let emailError = "";
    let nameError = "";
    let telError = "";

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
      this.setState({ emailError });
    } else {
      this.setState({ emailError });
    }

    if (this.state.name === "") {
      nameError = "Please enter name";
      this.setState({ nameError });
    } else {
      this.setState({ nameError });
    }

    if (this.state.tel === "") {
      telError = "Please enter phonenumber";
      this.setState({ telError });
    } else {
      this.setState({ telError });
    }

    if (!emailError && !nameError && !telError) {
      console.log('Setting to true',this.state.contactFormValid)
        this.setState({ contactFormValid: true });
      
    } else {
      console.log('Setting to false',this.state.contactFormValid)
        this.setState({ contactFormValid: false });
    }
    
  }

  handleBlur(){
    this.validateInput();
  }

  handleValues(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    const cleanedValue = this.preventInjections(value);
    
    this.setState(
      (prevState: IContactFormState) => ({ ...prevState, [name]: cleanedValue }),
      () => {
        this.props.getContactFormValues(
          this.state.name,
          this.state.tel,
          this.state.email,
          this.state.contactFormValid
        );
      }
    );
  }

  preventInjections(value: string) {
    // not a real prevention but temporary, html safety preventions is made in backend.
    return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  render() {
    const name = this.props;
    return (
      <div className="contact-form-wrapper">
        <h4>Just a little more info!</h4>
        <form>
            <label>Name</label><br/>
            <input
              value={this.state.name}
              onChange={this.handleValues}
              onBlur={this.handleBlur}
              name="name"
              required
            />
            {this.state.nameError ? (
              <div style={{ fontSize: 11, color: "red" }}>
                {this.state.nameError}
              </div>
            ) : (
              undefined
            )}
          <label>Phone</label><br/>
            <input
              value={this.state.tel}
              onChange={this.handleValues}
              onBlur={this.handleBlur}
              name="tel"
              required
            />
            {this.state.telError ? (
              <div style={{ fontSize: 11, color: "red" }}>
                {this.state.telError}
              </div>
            ) : (
              undefined
            )}
  
          <label>Email</label><br/>
            <input
              value={this.state.email}
              onChange={this.handleValues}
              onBlur={this.handleBlur}
              name="email"
            />
            {this.state.emailError ? (
              <div style={{ fontSize: 11, color: "red" }}>
                {this.state.emailError}
              </div>
            ) : (
              undefined
            )}
        </form>
      </div>
    );
  }
}

export default ContactForm;
