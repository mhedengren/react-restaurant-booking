import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'
import Home from './components/Home/Home'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'
import Header from './components/Header/Header'
import Booking from "./components/Booking/Booking";
import Admin from "./components/Admin/Admin";
import ReactDOM from 'react-dom';
import Footer from './components/Footer/Footer'




class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        {/* <div className="color-wrapper"> */}
          {/* <Header /> */}
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/booking" component={Booking} />
              <Route path="/admin" component={Admin} />
              <Route component={NotFound}/>
            </Switch>
            {/* <Footer /> */}
          {/* </div> */}
      </BrowserRouter>
    )
  }
}

export default App
