import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material'
const EditProductComp = () => {
    console.log("EditProductComp")

    const dispatch = useDispatch()
    const params = useParams()
    const serverError = useSelector(state => state.error)
    const productInfo = useSelector(state => state.products.find((product) => product.id === params.id))
    const [editedProduct, setEditedProduct] = useState({ id: 0, data: { name: "", price: "", quantity: "" } })
    const purchasesInfo = useSelector(state => state.purchases)
    const customersInfo = useSelector(state => state.customers)

    // stores product customers
    let alreadyShown = []

    useEffect(() => {
        if (productInfo) {
            setEditedProduct({ id: params.id, data: { name: productInfo.data.name, price: productInfo.data.price, quantity: productInfo.data.quantity } })
        }
    }, [productInfo])
    const updateProductInfo = (e) => {
        e.preventDefault()
        dispatch({ type: "EDIT_PRODUCT_ASYNC", payload: editedProduct })
    }
    const removeProduct = (e) => {
        e.preventDefault()
        dispatch({ type: "REMOVE_PRODUCT_ASYNC", payload: params.id })
        purchasesInfo.forEach(purchase => {
            if (purchase.data.productId === params.id) {
                dispatch({ type: "REMOVE_PURCHASE_ASYNC", payload: purchase.id })
            }
        });
    }
    // using useMemo to prevent rerender on input
    const customersThatBoughtProduct = useMemo(
        () => {
            return purchasesInfo.filter(purchase => {
                return purchase.data.productId === editedProduct.id
            }).map((purchase) => {
                if (customersInfo.length > 0) {
                    let productBuyer = customersInfo.find((customer) => customer.id === purchase.data.customerId)
                    // check if this is a unique customer to avoid showing duplicate of a customer
                    if (alreadyShown.length === 0 || alreadyShown.findIndex(alreadyShown => alreadyShown === productBuyer.id) === -1) {
                        alreadyShown.push(productBuyer.id)
                        return <Link style={{ textDecoration: "none" }} key={purchase.id} to={"/customer/" + productBuyer.id}>{productBuyer.data.firstName} </Link>
                    }
                    else { return null }
                }
                else { return null }
            })
        },
        [purchasesInfo, params.id, editedProduct.id])
    return <div style={{ textAlign: "center" }}>
        <form >
            <TextField type="text" value={editedProduct.data.name} onChange={(e) => { setEditedProduct({ ...editedProduct, data: { ...editedProduct.data, name: e.target.value } }) }} required></TextField>
            <TextField type="text" value={editedProduct.data.price} onChange={(e) => { setEditedProduct({ ...editedProduct, data: { ...editedProduct.data, price: e.target.value } }) }} required></TextField>
            <TextField type="text" value={editedProduct.data.quantity} onChange={(e) => { setEditedProduct({ ...editedProduct, data: { ...editedProduct.data, quantity: e.target.value } }) }} required></TextField>
            <Button type="submit" variant="contained" onClick={(e) => { updateProductInfo(e) }} >Update Product Info</Button>
            <Button type="submit" variant="contained" onClick={(e) => { removeProduct(e) }}>Delete Product</Button>
        </form>
        <Typography variant="h4">customers that bought this product: </Typography>
        <Typography variant="h6">
            {customersThatBoughtProduct}
        </Typography >
    </div>
}
export default EditProductComp
