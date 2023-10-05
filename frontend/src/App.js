import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeEdit from "./RecipeEdit";
import RecipesList from "./RecipesList";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/recipes' exact={true} component={RecipesList}/>
            <Route path='/recipes/:id' component={RecipeEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;