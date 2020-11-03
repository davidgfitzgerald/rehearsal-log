import React from 'react'
import { Home, About, Contact } from './pages'
import { Nav, Footer } from './layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { APP_COLOUR_1 } from './globals.json'

function App() {
  return (
    <div className={"bg-"+APP_COLOUR_1+"-150 flex flex-col min-h-screen"}>
      <Router className="App">
        <Nav/>

        <div className="flex-grow sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
          <Switch>
            <div>
              <Route exact path="/"><Home/></Route>
              <Route exact path="/about"><About/></Route>
              <Route exact path="/contact"><Contact/></Route>
            </div>
          </Switch>
        </div>

        <Footer/>
      </Router>
    </div>
  )
}

export default App
