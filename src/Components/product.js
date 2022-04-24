import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CustomerComp from "./customer"
import { Card, Typography } from "@mui/material"
const ProductComp = (props) => {
    console.log("ProductComp")
    const purchasesInfo = useSelector(state => state.purchases)
    const customersInfo = useSelector(state => state.customers)
    const productInfo = useSelector(state => { return state.products.find((product) => product.id === props.id) })

    return <Card className="card-style" variant="outlined" sx={{border: 0}} >
        {/* link to editProductComp */}
        <Typography align="center" component={"div"} >
            <Link style={{ textDecoration: "none" }} to={"/product/" + productInfo.id}>{productInfo.data.name}</Link>
            <br />
            Price: {productInfo.data.price} <br />
            Quantity: {productInfo.data.quantity} <br />
            Purchased by : 
            {
                <Typography component={"span"}  overflow="scroll" style={{height: "190px"}} >
                    {
                    purchasesInfo.filter((purchase) => {
                        return purchase.data.productId === productInfo.id
                    }).map((purchaseInfo) => {
                        return <Typography component={"span"} key={purchaseInfo.id} >
                            <CustomerComp purchaseInfo={purchaseInfo}
                                customerInfo={customersInfo.find((customer) => {
                                    return customer.id === purchaseInfo.data.customerId
                                })} />
                                </Typography>
                    })} </Typography>
            } </Typography><br />
    </Card >
}
export default ProductComp
