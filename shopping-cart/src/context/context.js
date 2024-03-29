import { useReducer, useContext, createContext} from 'react'
import { faker } from '@faker-js/faker';
import {CartReducer, FilterReducer} from './reducer';


const Cart  = createContext();

export default function CartContextProvider({children}){

    const products = [...Array(30)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: faker.helpers.arrayElement([0, 3, 6, 7, 10]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1,2,3,4,5])
    }));

    const [state, dispatch] = useReducer(CartReducer, {
        products: products,
        cart: []
    })

    const [filterProdState, filterProdDispatch] = useReducer(FilterReducer, {
        sortByPrice: '',
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ''
    })

  return (
    <Cart.Provider value={{state, dispatch, filterProdState, filterProdDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export const CartState = () => {
    return useContext(Cart);
}


