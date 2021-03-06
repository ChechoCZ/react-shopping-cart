import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, total, removeFromCart, updateAmount }) {
  const increment = product => {
    updateAmount(product.id, product.amount + 1);
  }
  
  const decrement = product => {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr key={ product.id }>
              <td>
                <img src={ product.image } alt={ product.title } />
              </td>
              <td>
                <strong>{ product.title }</strong>
                <span>{ product.priceFormatted }</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" onClick={() => decrement(product)} />
                  </button>
                  <input type="number" readOnly value={ product.amount } />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" onClick={() => increment(product)} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{ product.subtotal }</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete size={20} color="#7159c1" onClick={() => removeFromCart(product.id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finish</button>

        <Total>
          <span>Total</span>
          <strong>{ total }</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToPops = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),

  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0))
});

const mapDispatchToProps = dispatch => 
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToPops, mapDispatchToProps)(Cart);