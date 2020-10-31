import React from 'react'
import { Home, About, Contact } from './pages'
import { Nav } from './layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router className="App">
      <Nav/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/about"><About/></Route>
        <Route exact path="/contact"><Contact/></Route>
      </Switch>
    </Router>
  )
}

export default App
