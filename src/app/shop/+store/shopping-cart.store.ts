import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { CartItem } from '../../models/cart-item.interface';
import type { Product } from '../../models/product.interface';

type ShoppingCartState = {
  cartItems: CartItem[];
};

const initialState: ShoppingCartState = {
  cartItems: [],
};

export const ShoppingCartStore = signalStore(
  { providedIn: 'root' },
  withState<ShoppingCartState>(initialState),
  withComputed(({ cartItems }) => ({
    cartCount: computed(() =>
      cartItems().reduce((acc, item) => acc + item.quantity, 0),
    ),
    total: computed(() =>
      cartItems().reduce(
        (accTotal, item) => accTotal + item.product.precio * item.quantity,
        0,
      ),
    ),
  })),
  withMethods((shoppingCartState) => ({
    addToCart(product: Product): void {
      const index = shoppingCartState
        .cartItems()
        .findIndex((item) => item.product.codPro === product.codPro);

      if (index === -1) {
        // Aún no está en el carrito, lo añadimos
        patchState(shoppingCartState, (state: ShoppingCartState) => ({
          cartItems: [...state.cartItems, { product, quantity: 1 }],
        }));
      } else {
        // Ya está en el carrito, incrementamos la cantidad
        patchState(shoppingCartState, (state: ShoppingCartState) => ({
          cartItems: [
            ...state.cartItems.slice(0, index),
            {
              ...state.cartItems[index],
              quantity: state.cartItems[index].quantity + 1,
            },
            ...state.cartItems.slice(index + 1),
          ],
        }));
      }
    },

    removeFromCart(cartItem: CartItem): void {
      patchState(shoppingCartState, (state: ShoppingCartState) => ({
        cartItems: state.cartItems.filter(
          (item) => item.product.codPro !== cartItem.product.codPro,
        ),
      }));
    },

    updateQuantity(cartItem: CartItem, quantity: number): void {
      patchState(shoppingCartState, (state: ShoppingCartState) => ({
        cartItems: state.cartItems.map((item) =>
          item.product.codPro === cartItem.product.codPro
            ? { ...item, quantity }
            : item,
        ),
      }));
    },
  })),
);
