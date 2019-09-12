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
        return (
          <div className='gdpr-notice-wrapper'>
            <input type='checkbox' onChange={this.toggle} />
            <p>
              * By clicking on this check box you agree that we handle your
              personal data in accordance with GDPR. You can read more about
              this under our   <a href='#'>Privacy policy page.</a>
            </p>
          </div>
        )
    }
}

export default GdprConsent