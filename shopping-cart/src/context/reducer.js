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
        case 'SORT_BY_PRICE':
            return {
                ...state,
                sortByPrice: action.payload
            }
        case 'SORT_BY_STOCK':
            return {
                ...state,
                byStock: !state.byStock
            }
        case 'SORT_BY_FAST_DELIVERY':
            return {
                ...state,
                byFastDelivery: !state.byFastDelivery
            }
        case 'SORT_BY_RATING':
            return {
                ...state,
                byRating: action.payload
            }
        case 'SEARCH_BY_QUERY':
            return {
                ...state,
                searchQuery: action.payload
            }
        case 'CLEAR_FILTERS':
            return { sortByPrice: '', byStock: false, byFastDelivery: false, byRating: 0 }
        default:
            return state
    }
}

//export default CartReducer

