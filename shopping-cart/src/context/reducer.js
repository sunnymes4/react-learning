export const CartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [ ...state.cart,  {...action.payload, qty: 1}]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
        case 'CHANGE_CART_QTY':
            return {
                ...state,
                cart: state.cart.filter(item => item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty)
            }
        default:
            return state
    }
}

export const FilterReducer = (state, action) => {
    switch(action.type) {
        case 'SORT_BY_ASC':
            return {
                ...state,
                cart: state.cart.sort((a,b) => (a.name > b.name))
            }
        case 'SORT_BY_DESC':
            return {
                ...state,
                cart: state.cart.sort((a,b) => (b.name > a.name))
            }
        default:
            return state
    }
}

//export default CartReducer

