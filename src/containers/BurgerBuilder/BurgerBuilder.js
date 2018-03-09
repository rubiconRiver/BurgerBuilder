import React, { Component } from "react";

import Aux from "../../hoc/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from "../../axios-orders";

const INITIAL_PRICE = 4.0;
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get('https://react-burger-builder-8b134.firebaseio.com/ingredients.json')
    .then(response => {
     //  console.log('[response]: ' + response.data);
        this.setState({ingredients: response.data});
      })
    .catch(error => {
      this.setState({error: true});
    });
  }

  updatePurchaseState = price => {
    //Purchasable will be set to false if the current price and inital price match
    this.setState({ purchaseable: !(price === INITIAL_PRICE) });
  };

  addIngredientHandler = type => {
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

    //update ingredients and price
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    //pass the new price to check if purchasable should be updated
    this.updatePurchaseState(newPrice);
  };

  removeIngredientHandler = type => {
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

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(newPrice);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandlder = () => {
    // alert('You Continue');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      //sending price here is bad practice as it should be calculated server-side
      price: this.state.totalPrice,
      customer: {
        name: "Garett Gelsinger",
        address: {
          street: "342 Test Street",
          city: "Saskatoon",
          postalCode: "S4R 7V3"
        },
        email: "testemail@test.com",
        deliverySpeed: "fastest"
      }
    };

    axios
        .post("/orders.json", order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
        this.setState({loading: false, purchasing: false});
        }
        );
};

  render() {
    //check if button should be disabled
    const disabledInfo = {
      ...this.state.ingredients
    };

    //for each item, set disabledInfo to true if the value is <= 0
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}}> ingredients couldn't be loaded </p> : <Spinner /> ;
    let orderSummary = null;

    if(this.state.ingredients) {
      burger =  (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandlder}
          price={this.state.totalPrice}
        />
      );
    }
 
    if (this.state.loading) {
        console.log('loading!');
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
