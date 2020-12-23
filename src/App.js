import React, {Component} from 'react';
import Nav from "./layout/Nav";
import ExercisesPage from "./pages/ExercisesPage";
import PracticesPage from "./pages/PracticesPage";
import AboutPage from "./pages/AboutPage";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Nav/>
        <ExercisesPage/>
        <PracticesPage/>
        <AboutPage/>
      </div>
    );
  }
}

export default App;