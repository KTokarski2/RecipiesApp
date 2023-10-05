import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/recipes')
            .then(response => response.json())
            .then(data => this.setState({recipes: data}))
    }

    async remove(id) {
        await fetch(`/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRecipes = [...this.state.recipes].filter(i => i.id !== id);
            this.setState({recipes: updatedRecipes});
        });
    }

    render() {
        const {recipes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const recipesList = recipes.map(recipe => {
            return <tr key={recipe.id}>
                <td style={{whiteSpace: 'nowrap'}}>{recipe.name}</td>
                <td>{recipe.category}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/recipes/" + recipe.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(recipe.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Category</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default RecipesList;