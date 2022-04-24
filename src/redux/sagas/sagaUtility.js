import firebase from "../../firebase/configureFirebase"

// shortcut for firebase
const firebasePath = firebase.firestore()

// this function is resposible for communicating with firebase
const GET_DATA_FROM_FIREBASE = async (info) => {
    let collection = info[0]
    let action = info[1]
    switch (action.type) {
        // GET applies to PRODUCTS, CUSTOMERS, PURCHASES
        case "GET_PRODUCTS_ASYNC": case "GET_CUSTOMERS_ASYNC": case "GET_PURCHASES_ASYNC":
                return await firebasePath.collection(collection).get()
        case "ADD_PURCHASE_ASYNC":
                return await firebasePath.collection(collection).add(action.payload)
        case "REMOVE_PURCHASE_ASYNC": case "REMOVE_PRODUCT_ASYNC": case "REMOVE_CUSTOMER_ASYNC":
                return await firebasePath.collection(collection).doc(action.payload).delete()
        case "EDIT_CUSTOMER_ASYNC": case "EDIT_PRODUCT_ASYNC":
            return await firebasePath.collection(collection).doc(action.payload.id).set(action.payload.data)
        default:
            break;
    }
}
export default GET_DATA_FROM_FIREBASE
