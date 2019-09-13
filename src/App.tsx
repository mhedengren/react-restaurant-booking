import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'
import Home from './components/Home/Home'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'
import Booking from "./components/Booking/Booking";
import Admin from "./components/Admin/Admin";

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/booking" component={Booking} />
              <Route path="/admin" component={Admin} />
              <Route component={NotFound}/>
            </Switch>
      </BrowserRouter>
    )
  }
}

export default App
