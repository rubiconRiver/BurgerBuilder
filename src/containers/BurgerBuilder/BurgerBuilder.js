import React, { Component } from 'react';

import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 3,
            bacon: 4,
            cheese: 2,
            meat: 1
        }    
    }
    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        );
    }

}

export default BurgerBuilder;