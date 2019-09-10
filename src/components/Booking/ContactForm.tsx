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
        this.setState({ contactFormValid: true });
        console.log('valid');
    } else {
        this.setState({ contactFormValid: false });
        console.log('not valid');
    }
  }

  handleValues(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    const cleanedValue = this.preventInjections(value);
    console.log(this.state);
    this.setState(
      (prevState: IContactFormState) => ({ ...prevState, [name]: cleanedValue }),
      () => {
        this.props.getContactFormValues(
          this.state.name,
          this.state.tel,
          this.state.email,
          this.state.contactFormValid
        );
        this.validateInput();
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
      <div>
        <form>
          <h2>This is the Contact form component!</h2>
          <div>
            Name:
            <input
              placeholder="name"
              value={this.state.name}
              onChange={this.handleValues}
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
          </div>
          <div>
            Tel:
            <input
              placeholder="phonenumber"
              value={this.state.tel}
              onChange={this.handleValues}
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
          </div>
          <div>
            Email:
            <input
              placeholder="email"
              value={this.state.email}
              onChange={this.handleValues}
              name="email"
            />
            {this.state.emailError ? (
              <div style={{ fontSize: 11, color: "red" }}>
                {this.state.emailError}
              </div>
            ) : (
              undefined
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
