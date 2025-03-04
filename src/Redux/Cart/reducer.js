import * as types from "./actionTypes";

export const cartInitialState = {
  totalOriginalAmount:0,
  totalCount: 0,
  totalAmount: 0,
  cartItems: [],
};

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case types.GET_TOTAL:
      let { totalAmount, totalCount,totalOriginalAmount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { newPrice, amount , originalPrice } = cartItem;
          const itemTotal = newPrice * amount;
          const OriginalTotal = originalPrice * amount;

          cartTotal.totalAmount += itemTotal;
          cartTotal.totalCount += amount;
          cartTotal.totalOriginalAmount += OriginalTotal;
          return cartTotal;
        },
        {
          totalCount: 0,
          totalAmount: 0,
          totalOriginalAmount:0
        }
      );
      totalAmount = parseFloat(totalAmount.toFixed(2));
      totalOriginalAmount = parseFloat(totalOriginalAmount.toFixed(2));
      return { ...state, totalAmount, totalCount,totalOriginalAmount };

    case types.UPDATE:
      let tempCartInc = state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, amount: action.payload.amount };
        }
        return cartItem;
      });
      return { ...state, cartItems: tempCartInc };
    default:
      return state;
    case types.REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
      case types.ADD_ITEM:
        console.log("from redux",action.payload)
        return{
            ...state,
            cartItems:[...state.cartItems,action.payload]
        }
        case types.SET_CART:
            return{
                ...state,
                cartItems:[...action.payload]
            }
            case types.CLEAR_CART:
                return{
                    ...state,
                    cartItems:[]
                }
    
  }
};
export default cartReducer;
