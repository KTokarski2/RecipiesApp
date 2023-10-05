import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    recipes: []
  };

  async componentDidMount() {
    const response = await fetch('/recipes')
    const body = await response.json();
    this.setState({recipes: body});
  }

  render() {
    const {recipes} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Recipes</h2>
              {recipes.map(recipe =>
                    <div key={recipe.id}>
                      {recipe.name}
                    </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;