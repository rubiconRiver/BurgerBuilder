import React, { Component } from 'react';

import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4    
    }

    addIngredientHandler = (type) => {
        //update ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //update total price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients.type
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     //update total price
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    // }

    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}/>
            </Aux>
        );
    }

}

export default BurgerBuilder;