import React from 'react'

interface Validate {

}

class ContactForm extends React.Component<{}, Validate> {
    constructor(p: {}) {
        super(p); // calls the parent that is extending the component
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h2>This is the Contact form component!</h2>
                    <input type={"text"} name={"name"}/>
                    <input type={"number"} name={"number"}/>
                    <input type={"email"} name={"email"}/>
                    <button type={"submit"}>Submit Booking</button>
            </div>
        )
    }
}

export default ContactForm
