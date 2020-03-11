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