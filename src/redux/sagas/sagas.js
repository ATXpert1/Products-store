import { call, put, takeEvery, all } from "redux-saga/effects";
import GET_DATA_FROM_FIREBASE from "./sagaUtility";

function* handleGetProducts(action) {
    try {
        let resp1 = yield call(GET_DATA_FROM_FIREBASE, ["products", action]);
        let products = resp1.docs.map((doc) => {
            return { id: doc.id, data: doc.data() }
        })
        yield put({ type: "GET_PRODUCTS", payload: products });
    } catch (err) { throw err }
}

function* handleEditProduct(action) {
    try {
        yield call(GET_DATA_FROM_FIREBASE, ["products", action]);
        yield put({ type: "EDIT_PRODUCT", payload: action.payload });
    } catch (err) { throw err }
}

function* handleRemoveProduct(action) {
    try {
        yield call(GET_DATA_FROM_FIREBASE, ["products", action]);
        yield put({ type: "REMOVE_PRODUCT", payload: action.payload });
    } catch (err) { throw err }
}

function* handleGetCustomers(action) {
    try {
        const resp = yield call(GET_DATA_FROM_FIREBASE, ["customers", action]);
        let customers = resp.docs.map((doc) => {
            return { id: doc.id, data: doc.data() }
        })
        yield put({ type: "GET_CUSTOMERS", payload: customers });
    } catch (err) { throw err }
}

function* handleEditCustomer(action) {
    try {
        yield call(GET_DATA_FROM_FIREBASE, ["customers", action]);
        yield put({ type: "EDIT_CUSTOMER", payload: action.payload })
    } catch (err) { throw err }
}

function* handleRemoveCustomer(action) {
    try {
        yield call(GET_DATA_FROM_FIREBASE, ["customers", action]);
        yield put({ type: "REMOVE_CUSTOMER", payload: action.payload })
    } catch (err) { throw err }
}

function* handleGetPurchases(action) {
    try {
        const resp = yield call(GET_DATA_FROM_FIREBASE, ["purchases", action]);
        let products = resp.docs.map((doc) => {
            return { id: doc.id, data: doc.data() }
        })
        yield put({ type: "GET_PURCHASES", payload: products });
    } catch (err) { throw err }
}

function* handleAddPurchase(action) {
    try {
        let resp = yield call(GET_DATA_FROM_FIREBASE, ["purchases", action]);
        // get the new purchase ID from server
        let finalPurchaseInfo = { id: resp.id, data: action.payload }
        yield put({ type: "ADD_PURCHASE", payload: finalPurchaseInfo })
    } catch (err) { throw err }
}

function* handleRemovePurchase(action) {
    try {
        yield call(GET_DATA_FROM_FIREBASE, ["purchases", action]);
        yield put({ type: "REMOVE_PURCHASE", payload: action.payload });
    } catch (err) { throw err }
}

export function* watchGetProducts() {
    yield takeEvery("GET_PRODUCTS_ASYNC", handleGetProducts);
}
export function* watchEditProduct() {
    yield takeEvery("EDIT_PRODUCT_ASYNC", handleEditProduct);
}
export function* watchRemoveProduct() {
    yield takeEvery("REMOVE_PRODUCT_ASYNC", handleRemoveProduct);
}
export function* watchGetCustomers() {
    yield takeEvery("GET_CUSTOMERS_ASYNC", handleGetCustomers);
}
export function* watchEditCustomer() {
    yield takeEvery("EDIT_CUSTOMER_ASYNC", handleEditCustomer);
}
export function* watchRemoveCustomer() {
    yield takeEvery("REMOVE_CUSTOMER_ASYNC", handleRemoveCustomer);
}
export function* watchGetPurchases() {
    yield takeEvery("GET_PURCHASES_ASYNC", handleGetPurchases);
}
export function* watchAddPurchase() {
    yield takeEvery("ADD_PURCHASE_ASYNC", handleAddPurchase);
}
export function* watchRemovePurchase() {
    yield takeEvery("REMOVE_PURCHASE_ASYNC", handleRemovePurchase);
}
export default function* rootSaga() {
    yield all([watchGetProducts(), watchEditProduct(), watchRemoveProduct(), watchGetCustomers(),
    watchEditCustomer(), watchRemoveCustomer(), watchGetPurchases(), watchAddPurchase(), watchRemovePurchase()]);
}
