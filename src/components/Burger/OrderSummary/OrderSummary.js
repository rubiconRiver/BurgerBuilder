import React, { Component } from 'react';

import Aux from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                    <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} 
            </li> );
        })
    

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h4>Total: ${this.props.price.toFixed(2)}</h4>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType={'Danger'}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
            </Aux>
        );
    };
}
export default OrderSummary;