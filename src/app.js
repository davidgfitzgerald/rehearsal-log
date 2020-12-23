import React, { Fragment } from 'react'

import { Practices, Exercises, About } from './pages'
import { Nav, Footer } from './layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { COLOURS } from './utils/globals.json'

const PRIMARY_COLOUR = COLOURS.PRIMARY;

function App() {
  return (
    <div>
      <Router >
        <Nav/>

        <div>
          <Switch>
            <Fragment>
              <Route exact path="/"><Exercises/></Route>
              <Route exact path="/practices"><Practices/></Route>
              <Route exact path="/about"><About/></Route>
            </Fragment>
          </Switch>
        </div>

        <Footer/>
      </Router>
    </div>
  )
}

export default App
