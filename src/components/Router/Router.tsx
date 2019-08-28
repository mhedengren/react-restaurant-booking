import React from 'react'
import Home from '../Home/Home'
import About from '../About/About'
import Contact from '../Contact/Contact'
import NotFound from '../NotFound/NotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
}

export default Router