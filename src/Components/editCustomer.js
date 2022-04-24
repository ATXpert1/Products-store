import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Button, TextField, Typography } from '@mui/material'


const EditCustomerComp = () => {
    console.log("EditCustomerComp")

    const dispatch = useDispatch()
    const params = useParams()
    const customerInfo = useSelector(state => state.customers.find((customer) => customer.id === params.id))
    const [editedCustomer, setEditedCustomer] = useState({ id: 0, data: { firstName: "", lastName: "", city: "" } })
    const purchasesInfo = useSelector(state => state.purchases)
    const productsInfo = useSelector(state => state.products)

    useEffect(() => {
        if (customerInfo) {
            setEditedCustomer({ id: params.id, data: { firstName: customerInfo.data.firstName, lastName: customerInfo.data.lastName, city: customerInfo.data.city } })
        }
    }, [customerInfo])
    const updateCustomerInfo = (e) => {
        e.preventDefault()
        dispatch({ type: "EDIT_CUSTOMER_ASYNC", payload: editedCustomer })
    }
    const deleteCustomer = (e) => {
        e.preventDefault()
        dispatch({ type: "REMOVE_CUSTOMER_ASYNC", payload: params.id })
        purchasesInfo.forEach(purchase => {
            if (purchase.data.customerId === params.id) {
                dispatch({ type: "REMOVE_PURCHASE_ASYNC", payload: purchase.id })
            }
        });
    }
    const listOfPurchasedProducts = useMemo(
        () =>
            purchasesInfo.map(purchase => {

                if (purchase.data.customerId === params.id) {
                    let product = productsInfo.find((product) => product.id === purchase.data.productId)
                    if (product) {
                        return <Link style={{textDecoration: "none"}} key={purchase.id} to={"/product/" + product.id}> {product.data.name} </Link>
                    }
                }
                else {
                    return null
                }
            }),
        [purchasesInfo, params.id])
    return <div style={{ textAlign: "center" }}>
        <form>
            <TextField type="text" value={editedCustomer.data.firstName} onChange={(e) => { setEditedCustomer({ ...editedCustomer, data: { ...editedCustomer.data, firstName: e.target.value } }) }} required></TextField>
            <TextField type="text" value={editedCustomer.data.lastName} onChange={(e) => { setEditedCustomer({ ...editedCustomer, data: { ...editedCustomer.data, lastName: e.target.value } }) }} required></TextField>
            <TextField type="text" value={editedCustomer.data.city} onChange={(e) => { setEditedCustomer({ ...editedCustomer, data: { ...editedCustomer.data, city: e.target.value } }) }} required></TextField>
            <Button type="submit" variant="contained" onClick={(e) => { updateCustomerInfo(e) }} >Update customer Info</Button>
            <Button type="submit" variant="contained" onClick={(e) => { deleteCustomer(e) }}>Delete customer</Button>
        </form>
        <Typography variant="h4">list of all purchased products by {customerInfo ? customerInfo.data.firstName : null} </Typography>
        <Typography variant="h6">
            {listOfPurchasedProducts}
        </Typography >
    </div>
}
export default EditCustomerComp
