import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(product => product._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    updateProductQuantity: (state, action) => {
      const product = state.products.find(product => product._id === action.payload.id);
      if (product) {
        state.total += (action.payload.quantity - product.quantity) * product.price;
        product.quantity = action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const product = state.products.find((product) => product._id === action.payload.id);
      if (product) {
        state.total -= product.price * product.quantity;
        state.products = state.products.filter((product) => product._id !== action.payload.id);
        state.quantity -= 1;
        if (state.products.length === 0) {
          state.total = 0; 
        }
      }
    },
  }
});

export const { addProduct, updateProductQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
