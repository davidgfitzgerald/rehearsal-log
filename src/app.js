import React, { Fragment } from 'react'

import { Practices, Exercises, About, Development } from './pages'
import { Nav, Footer } from './layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { COLOURS } from './utils/globals.json'

const PRIMARY_COLOUR = COLOURS.PRIMARY;

function App() {
  return (
    <div className={"bg-"+PRIMARY_COLOUR+"-150 flex flex-col min-h-screen"}>
      <Router className="App">
        <Nav/>

        <div className="flex-grow sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
          <Switch>
            <Fragment>
              <Route exact path="/"><Practices/></Route>
              <Route exact path="/about"><About/></Route>
              <Route exact path="/development"><Development/></Route>
              <Route exact path="/exercises"><Exercises/></Route>
            </Fragment>
          </Switch>
        </div>

        <Footer/>
      </Router>
    </div>
  )
}

export default App
