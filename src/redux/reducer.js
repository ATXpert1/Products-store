const initialState = {
    products: [],
    customers: [],
    purchases: [],
}
function appReducer(state = initialState, action) {
    switch (action.type) {
        // products cases
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "EDIT_PRODUCT":
            let productIndex1 = state.products.findIndex((product) => product.id === action.payload.id)
            state.products[productIndex1] = action.payload
            return { ...state, products: [...state.products] }
        case "REMOVE_PRODUCT":
            let productIndex2 = state.products.findIndex((product) => product.id === action.payload)
            state.products.splice(productIndex2, 1)
            return { ...state, products: [...state.products] }
        // customers cases
        case "GET_CUSTOMERS":
            return { ...state, customers: action.payload }
        case "EDIT_CUSTOMER":
            let customerIndex1 = state.customers.findIndex((customer) => customer.id === action.payload.id)
            state.customers[customerIndex1] = action.payload
            return { ...state, customers: [...state.customers] }
        case "REMOVE_CUSTOMER":
            let customerIndex2 = state.customers.findIndex((customer) => customer.id === action.payload)
            state.customers.splice(customerIndex2, 1)
            return { ...state, customers: [...state.customers] }
        // purchases cases
        case "GET_PURCHASES":
            return { ...state, purchases: action.payload }
        case "ADD_PURCHASE":
            return { ...state, purchases: [...state.purchases, action.payload] }
        case "REMOVE_PURCHASE":
            let purchaseIndex = state.purchases.findIndex((purchase) => purchase.id === action.payload)
            state.purchases.splice(purchaseIndex, 1)
            return { ...state, purchases: [...state.purchases] }
        default:
            return state
    }
}
export default appReducer
