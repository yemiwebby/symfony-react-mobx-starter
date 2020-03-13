# Manage the state of a Symfony-React application with Mobx

## Introduction

State management is one of the most important aspects of any software application, especially web and mobile apps. The ability to create, retrieve and reuse application data from different page components often facilitate things for software developers.

In this tutorial, I will show you how to manage the state of application data within web applications built with Symfony and React. Earlier in a previous article. I covered the step by step guide involved in [Building a Single Page Application with Symfony PHP and React](https://www.twilio.com/blog/building-a-single-page-application-with-symfony-php-and-react). In that article, I covered every basic fundamental knowledge required to set up and combine the power of Symfony APIs and handling of frontend logics of an app with React.

We will leverage the knowledge gained from that article and enhance it by adding state management using MobX. Rather than start from scratch, I am going to extend the previous application.

## What we will build

To begin, we will start by cloning a starter template of Symfony and React [from here on GitHub](https://github.com/yemiwebby/symfony-react-mobx-starter) and enhance it to build a shopping cart. Similar to what is obtainable in most E-commerce apps, a user will be able to add and subtract items to and from a shopping cart. For proper implementation of a cart, one needs to be able to keep track of products a user wishes to buy, their respective quantities and prices. 

Here, we will use MobX to store and facilitate the process of managing the cart data in the app. To keep things simple, we will not authenticate users in this application for now. Here is a sneak peek into what we will build in this tutorial:


![](https://paper-attachments.dropbox.com/s_50BF3D33077AF7AA815C1485C164054F3A7E9316D4203659255A59E4A298206C_1583103456688_ezgif.com-video-to-gif+8.gif)


As shown here, users can click on the **Add to Cart** button to add a particular item to the cart and can also increase or decrease the number of quantities needed. The list of items added to the cart is displayed below the images and also on the cart page. This is happening in realtime and then accessible from anywhere within the application. We discover how all this work later in the article.

I encourage you to tune in your utmost concentration as we will build and learn something new together,  but if you prefer to access the code immediately, you can find it on the [mobx-completed branch of this repository](https://github.com/yemiwebby/symfony-react-mobx-starter/tree/mobx-completed). 


## What is state management

The state of an application is the currently available value that can be use throughout the entire reusable components in an application. It determines the contents that need rendering. Once your application starts to scale and increase in size, it becomes difficult to keep data global and accessible. To handle such a situation, the concept of state management was introduced. State management inteprets monitoring and managing the data (i.e the state) of your application. With that in place, you will have less or no issues accessing data from anywhere within your application.

MobX is one of the three popular options used in single-page applications for state management and gaining lots of popularity in the tech community. Other options include [React Context API](https://reactjs.org/docs/context.html) and [Redux](https://redux.js.org/).


## Prerequisites

This tutorial requires the knowledge of React, Object-Oriented Programming with PHP and familiarity with building applications using Symfony. You also need to ensure that you have [Node.js](https://nodejs.org/en/), [Yarn package manager](https://yarnpkg.com/lang/en/docs/install/) and [Composer](https://getcomposer.org/) installed on your development machine. Lastly, you need to install [Symfony](https://symfony.com/download) installer, to run the Symfony application and a local web server.


## Why MobX

MobX is a scalable library used to host data in any application. It is best known and quite popular in the React community as a library that can be easily combined with React. It provides mechanisms to optimally synchronize application state with React components by using a reactive virtual dependency state graph that is only updated when strictly needed and is never stale.

While using MobX as a state management library, you can define the state of any data structure you prefer to use within your application like; objects, arrays, classes and make them observable. Being observable means that your defined data will remain under observation and will automatically update within the review whenever any state change occurs. It feels cool to know that MobX can also be used with other JavaScript frontend frameworks apart from React.

To learn more about MobX and its awesome features,  feel free to check the [official documentation](https://mobx.js.org/).


## Getting started

We are going to use the boilerplate from the [master branch of this repository](https://github.com/yemiwebby/symfony-react-mobx-starter) to kickstart our project. The starter project contains a couple of required dependencies that you will need to install. To begin, download or clone the repository using Git as shown below:


    git clone https://github.com/yemiwebby/symfony-react-mobx-starter

Once the installation process is completed, move to the project directory and use [Composer](https://getcomposer.org/download/) to install all the dependencies for Symfony:


    // change directory
    cd symfony-react-mobx-starter
    
    // install dependencies
    composer install

This will install all the dependencies for a traditional Symfony web application. Next, we need to install all the JavaScript dependencies. Do that by running the following command from the project’s directory:


    yarn install

With the starter project which contains minimal code and functionality installed successfully, here is a quick overview of the most important files and directories in it:


- `src/Controller/DefaultController.php`: this Controller handles all HTTP requests sent to the application.
- `templates/default/index.html.twig`: this template will render the React application within Symfony by binding the React app to the `div` with an id of `root`.
- `assets/js`: this directory holds all the React components for the application.

The basic setup for the Symfony and React application has been completed and we will add more features that will showcase state management using MobX later in the tutorial. To run the application, you need to compile the React application and watch the JavaScript files for any changes using the following command:


    yarn run watch

The preceding command will build and compile all the JavaScript files and writes the output to `public/build` directory. Next, open a new tab but still from the project’s directory and run the command below to start the Symfony application:


    symfony serve

This will start the app on the development server on http://localhost:8000:


![](https://paper-attachments.dropbox.com/s_50BF3D33077AF7AA815C1485C164054F3A7E9316D4203659255A59E4A298206C_1583923066920_home-component.png)


We will start making the application more functional in the next section. Feel free to go through [the previous tutorial](https://www.twilio.com/blog/building-a-single-page-application-with-symfony-php-and-react) if you will like to learn how to set up the application from scratch.


## Installing MobX

Run the following command to use yarn to install MobX and an additional tool for utilizing it with React:


    yarn add mobx mobx-react --save-dev

This command will install the following dependencies:

- `mobx`: this is the main MobX library that powers state management.
- `mobx-react`: this library contains React specific functions available through MobX.
## Install other dependencies and configure Babel

MobX uses decorators to handle its state management and React doesn't come with support for decorators by default. So you will install a babel plugin `@babel/plugin-proposal-decorators`.  Also, to use class properties and arrow functions within our React application, we will need to install another babel plugin named `@babel/plugin-proposal-class-properties`. Run the following command to install all these plugins:


    yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

Once the installation process is completed, go ahead and create a new file within the root of your application and name it `.babelrc`. Open this new file and use the following content for it:


    {
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": [
          [
            "@babel/plugin-proposal-decorators",
            {
              "legacy": true
            }
          ],
          [
            "@babel/plugin-proposal-class-properties",
            {
              "loose": true
            }
          ]
        ]
    }

This is a standard process of configuring Babel, and it takes priority over the Babel configuration added by Encore.


## Setting up MobX store

Next, we will create a store that will hold the state of our application. Stores in MobX are usually quite useful and sometimes compulsory to use. This is because it helps to move logic and state out of your React components into a standalone testable unit that can be used in JavaScript applications.

To begin, go ahead and create `Store.js` file within `assets/js` folder. Open the newly created file and paste the following content in it:


    // assets/js/Store.js
    class Store {
        products = [
            {
                id: 1,
                name: 'Casual Wears',
                description: 'Comfy and unisex',
                price: 50,
                image: require('../img/item1.jpg')
            },
            {
                id: 2,
                name: 'Corporate wears & bags',
                description: 'Stylish',
                price: 350,
                image: require('../img/item2.jpg')
            },
            {
                id: 3,
                name: 'Tops and Blouses',
                description: 'Wonderfully fitted',
                price: 250,
                image: require('../img/item3.jpg')
            },
            {
                id: 4,
                name: 'Tshirt sleeker',
                description: 'Wonderfully fitted',
                price: 250,
                image: require('../img/item4.jpg')
            }
        ];
        carts = [];
        currentCart = [];
    }
    export default Store;

From the code snippet above, we created three different arrays which are:

- `products[]`: this array will house all the available products that a user can add to the cart. To avoid having empty products on own product page, we initialised the array with three hardcoded items.
- `carts`: all items added to the cart by the user will be stored in this array.
- `currentCart`: this array will hold the initial state of the cart.

To carry out a couple of actions such as adding or removing items from the cart, we will create more methods. Update the `Store.js` file by adding the following contents:


    // assets/js/Store.js
    class Store {
        ...
        removeFromCart(id) {
            this.carts = this.carts.filter(item => {
                return item.product_id !== id;
            });
            this.getCart();
        }
        increaseQuantityInCart(id) {
            this.carts.map(item => {
                if (item.product_id === id) item.quantity += 1;
                return item;
            });
            this.getCart();
        }
        decreaseQuantityInCart(id) {
            this.carts.map(item => {
                if (item.product_id === id && item.quantity > 1) item.quantity -= 1;
                return item;
            });
            this.getCart();
        }
        addToCart(id) {
            let found = false;
            this.carts.map(item => {
                if (item.product_id === id) {
                    item.quantity += 1;
                    found = true;
                }
                return item;
            });
            if (!found) {
                this.carts.push({ product_id: id, quantity: 1 });
            }
            this.getCart();
        }
        getCart() {
            let carts = this.carts;
            carts.map(item => {
                for (let i in this.products) {
                    if (item.product_id === this.products[i].id) {
                        item.image = this.products[i].image;
                        item.name = this.products[i].name;
                        item.description = this.products[i].description;
                        item.price = this.products[i].price * item.quantity;
                    }
                }
                return item;
            });
            this.currentCart = carts;
        }
    }
    export default Store;

Here, we created functions to:

- remove items from a cart, 
- Increase the quantity of a particular item in cart
- Decrease the quantity of a particular item in a cart
- Add a new item to Carts and finally 
- Retrieve all the data in the `carts` array


## Creating application components

React applications are always best structured as a self-contained module also known as a component. We will create a couple of components for our application.


## Creating the cart component

Earlier we defined the cart variable within MobX store. To display the data in it, we will create a Cart component with the sole responsibility of displaying the data. To achieve that, create a file within `assets/js/components` folder and name it `Cart.js`. Open this newly created file and paste the following content in it:


    // assets/js/components/Cart.js
    
    import React, { Component } from 'react';
    import { observer, inject } from 'mobx-react';
    @inject('store')
    @observer
    class Cart extends Component {
      render() {
        return (
          <div className='card'>
              <div>
                  <p>Items added to Cart will be displayed here</p>
              </div>
              <div className={'row'}>
                  {this.props.store.currentCart.map((data, index) => (
                      <div key={index} className='cart col-md-3'>
                          <img height={30} src={data.image} alt='Product stuff' />
                          <div className='product-cart-name'>{data.name}</div>
                          <div className='control'>
                              <span
                                  onClick={() => this.props.store.removeFromCart(data.product_id)}
                                  className='btn btn-danger btn-xs cancel'
                              >
                              <i className={'fa fa-times'} />
                          </span>
                              <span
                                  onClick={() =>
                                      this.props.store.increaseQuantityInCart(data.product_id)
                                  }
                                  className='btn btn-success btn-xs'
                              >
                                  <i className={'fa fa-plus'} />
                              </span>
                              <span
                                  onClick={() =>
                                      this.props.store.decreaseQuantityInCart(data.product_id)
                                  }
                                  className='btn btn-warning btn-xs'
                              >
                                  <i className={'fa fa-minus'} />
                              </span>
                          </div>
                          <div className='quantity'>{data.quantity}</div>
                          <div className='quantity'>$ {data.price}</div>
                      </div>
                  ))}
              </div>
          </div>
        );
      }
    }
    export default observer(Cart);

Here, you configured the Cart component to display the list of items added to the cart array within the store. Each item in the cart will contain an image, the name of the item, description, price and the quantity needed by the user.


## Creating product component

Next, we will create a component to named `Product.js` within `assets/js/components` folder. This will house all the items available as a product for the user to add to cart and buy. In production, you should fetch and populate this array with items from your backend API. But what we have done here is to hardcode the items in the store. Open the `Product.js` file and add the following content to it:


    // assets/js/components/Product.js
    import React, { Component } from 'react';
    import { observer, inject } from 'mobx-react';
    import Cart from './Cart';
    
    @inject('store')
    class Product extends Component {
      addToCart(id) {
        this.props.store.addToCart(id);
      }
    
      list(data, index) {
        return (
          <div key={index} className='col-md-3 top-space'>
            <div className='card'>
              <img
                className='card-img-top'
                height={200}
                src={data.image}
                alt='Product stuff'
              />
              <div className='card-body'>
                <h4 className='card-title'>{data.name}</h4>
                <p className='card-text'>{data.description}</p>
                <div className='detail'>
                  <div className='price text-center'>$ {data.price}</div>
                  <button
                    onClick={() => this.addToCart(data.id)}
                    className='btn btn-primary btn-sm'
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      render() {
        return (
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {this.props.store.products.map((data, index) =>
                  this.list(data, index)
                )}
              </div>
            </div>
            <div className='col-md-12 text-center m-t-10'>
              <div className='top-space'>
                <Cart />
              </div>
            </div>
          </div>
        );
      }
    }
    export default observer(Product);

First, we imported the appropriate modules from React, MobX-React and also imported the Cart component created earlier to display the entire list of items added to or removed from the cart by the users. To ensure that the application always renders every updated content within the `products` array, we wrapped the Product component with a higher-order component named observer. This automatically subscribes the component to an observable and easily monitor and re-render the component incase of any changes.


## Updating the home component

Next, replace the content of the home component with the following:


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

MobX makes provision for a built-in decorate utility which can be used to apply decorators to your classes and objects. Here, within the component above, you imported the `Store`  defined earlier and use the decorate utility to indicate that the `products` and `currentCart` are entities that can be observed by components for changes.

`addToCart`, `increaseQuantityInCart`, `decreaseQuantityInCart`, and `removeFromCart` are functions used to update the store.


## Add stylesheet

To include custom stylesheet to make the application more appealing, open `assets/css/app.css` file and update its content with the following:


    .row-section{float:left; width:100%; background: #42275a;  /* fallback for old browsers */
    }
    .row-section h2{float:left; width:100%; color:#fff; margin-bottom:30px; font-size: 14px;}
    .row-section h2 span{font-family: 'Libre Baskerville', serif; display:block; font-size:45px; text-transform:none; margin-bottom:20px; margin-top:30px;font-weight:700;}
    .row-section h2 a{color:#d2abce;}
    .row-section .row-block{background:#fff; padding:20px; margin-bottom:50px;}
    .row-section .row-block ul{margin:0; padding:0;}
    .row-section .row-block ul li{list-style:none; margin-bottom:20px;}
    .row-section .row-block ul li:last-child{margin-bottom:0;}
    .row-section .row-block ul li:hover{cursor:grabbing;}
    .row-section .row-block .media{border:1px solid #d5dbdd; padding:5px 20px; border-radius: 5px; box-shadow:0px 2px 1px rgba(0,0,0,0.04); background:#fff;}
    .row-section .media .media-left img{width:75px;}
    .row-section .media .media-body p{padding: 0 15px; font-size:14px;}
    .row-section .media .media-body h4 {color: #6b456a; font-size: 18px; font-weight: 600; margin-bottom: 0; padding-left: 14px; margin-top:12px;}
    .btn-default{background:#6B456A; color:#fff; border-radius:30px; border:none; font-size:16px;}
    .fa-spin {
        margin: 0 auto;}
    body {
        background-color: lightgray;
    }


## Testing the application

Now, run the application and test its functionality. Before that, ensure that both the Symfony and React application are currently running from separate terminals within your project directory. In case you have closed it, use the command below to resume the Symfony application:


    symfony serve

And from the second terminal, run the following command to compile the React application and watch the JavaScript files for any changes:


    yarn run watch

Open this link http://localhost:8000 from your favorite browser to view the application and test it out:


![](https://paper-attachments.dropbox.com/s_50BF3D33077AF7AA815C1485C164054F3A7E9316D4203659255A59E4A298206C_1583103456688_ezgif.com-video-to-gif+8.gif)

## Conclusion

In this tutorial, you have learned about the importance of state management, how to update and distribute data within your Symfony and React application without hassle. MobX is generally available for use and it is compatible with any other JavaScript libraries or framework. It is just more popular within the React community.

I do hope you found this tutorial helpful. Check the [mobx-completed branch](https://github.com/yemiwebby/symfony-react-mobx-starter/tree/mobx-completed) of this [repository](https://github.com/yemiwebby/symfony-react-mobx-starter) for the complete source code for this tutorial.

