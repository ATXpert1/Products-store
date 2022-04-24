import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import formatPurchase from "./reused_Components/formatPurchase"
import { Button, Typography } from "@mui/material"
import ProductsComboboxComp from "./reused_Components/productsCombobox"
const CustomerComp = (props) => {
    console.log("CustomerComp")

    const [showComboBox, setShowComboBox] = useState(false)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const handleSubmitPurchase = (e, selectedProduct) => {
        e.preventDefault()
        let finalPurchaseObj = formatPurchase(selectedProduct, props.customerInfo.id)
        dispatch({ type: "ADD_PURCHASE_ASYNC", payload: finalPurchaseObj })
    }
    return <Typography component={"span"}>
        {/* link to editCustomerComp */}
        <Link style={{ textDecoration: "none" }} to={"/customer/" + props.customerInfo.id}>{props.customerInfo.data.firstName}</Link> <br />
        Purchase Date: {props.purchaseInfo.data.date} <br />
        <Button variant="contained" onClick={() => { setShowComboBox(!showComboBox) }}>{!showComboBox ? "Add Product to " + props.customerInfo.data.firstName : "Fold back"}</Button> <br />
        {console.log("callback activated")}
        {showComboBox &&
            <ProductsComboboxComp products={products} handleSubmitPurchase={handleSubmitPurchase} />
        }
    </Typography >
}
export default CustomerComp
