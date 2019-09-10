import React from 'react'

interface IGdprConsentProps {
    toggleGdpr():void
}
class GdprConsent extends React.Component <IGdprConsentProps, {}> {
    constructor(props:any){
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.props.toggleGdpr();
    }

    
    render(){
        return(
            <div className='gdpr-notice-wrapper'>
            <input type='checkbox' onChange={this.toggle} />
            <p>
            Genom att klicka i denna checkbox godkänner du att vi hanterar
            dina personuppgifter enligt GDPR. Du kan läsa mer om detta under
            vår <a href='#'>sida för integritet.</a>
            </p>
          </div>
        )
    }
}

export default GdprConsent