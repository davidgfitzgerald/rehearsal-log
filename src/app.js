import React from 'react'

import { Practices, About, Development } from './pages'
import { Nav, Footer } from './layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { APP_COLOUR_1 } from './utils/globals.json'


function App() {
  return (
    <div className={"bg-"+APP_COLOUR_1+"-150 flex flex-col min-h-screen"}>
      <Router className="App">
        <Nav/>

        <div className="flex-grow sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
          <Switch>
            <div>
              <Route exact path="/"><Practices/></Route>
              <Route exact path="/about"><About/></Route>
              <Route exact path="/development"><Development/></Route>
            </div>
          </Switch>
        </div>

        <Footer/>
      </Router>
    </div>
  )
}

export default App
