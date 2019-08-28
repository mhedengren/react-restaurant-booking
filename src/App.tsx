import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import NotFound from './components/NotFound/NotFound'
import Header from './components/Header/Header'

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
          <main className="main-wrapper">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound}/>
            </Switch>
          </main>
      </BrowserRouter>
    )
  }
}

export default App
