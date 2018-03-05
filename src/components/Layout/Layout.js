import React, { Component } from 'react';

import Aux from '../../hoc/Auxs';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (            
            <Aux>
                <Toolbar clicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} 
                            closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    } 
}

export default layout;