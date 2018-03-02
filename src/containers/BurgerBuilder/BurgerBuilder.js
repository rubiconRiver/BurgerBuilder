import React, { Component } from 'react';

import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INITIAL_PRICE = 4.00;

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
        totalPrice: INITIAL_PRICE,
        purchaseable: false,
        purchasing: false   
    }

        updatePurchaseState = (price) => {     
            this.setState({purchaseable: !(price === INITIAL_PRICE)});
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
        this.updatePurchaseState(newPrice);
    }



    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //update total price
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(newPrice);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandlder = () => {
        alert('You Continue');
    }

    render() {

        //check if button should be disabled
        const disabledInfo = {
            ...this.state.ingredients
        };

        //for each item, set disabledInfo to true if the value is <= 0
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandlder}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
                
            </Aux>
        );
    }

}

export default BurgerBuilder;