import React, {Component} from 'react';
import Product from './Product';
import Cart from './Cart';
import { Provider } from 'mobx-react';
import { withRouter } from 'react-router';
import { Route,Link,Switch,Redirect } from 'react-router-dom';
import Store from '../Store';
import { decorate, observable, action } from 'mobx';

decorate(Store, {
    products: observable,
    addToCart: action,
    increaseQuantityInCart: action,
    decreaseQuantityInCart: action,
    removeFromCart: action,
    currentCart: observable
});

const shoppingStore = new Store();

class Home extends Component {
    render() {
        return (
            <Provider store={shoppingStore}>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link className={"navbar-brand"} to={"/"}> Symfony React Project </Link>
                        <Link className={""} to={"/cart"}> View Cart </Link>
                    </nav>
                    <Switch>
                        <Route exact path='/' render={() => <Product />} />
                        <Route path='/cart' render={() => <Cart />} />
                    </Switch>
                </div>
            </Provider>
        )
    }
}

export default withRouter(Home);