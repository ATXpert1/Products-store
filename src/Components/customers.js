import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import formatPurchase from "./reused_Components/formatPurchase"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText } from "@mui/material";
import ProductsComboboxComp from "./reused_Components/productsCombobox";

const CustomersComp = () => {
    console.log("CustomersComp")
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers)
    const purchases = useSelector(state => state.purchases)
    const products = useSelector(state => state.products)
    const [showComboboxByUserId, setShowComboboxByUserId] = useState()
    const tableCell = {
        border: "1px solid black"
    }
    const handleSubmitPurchase = (e, selectedProduct) => {
        e.preventDefault();
        // add date to the purchase object
        let finalPurchaseObj = formatPurchase(selectedProduct, showComboboxByUserId);
        dispatch({ type: "ADD_PURCHASE_ASYNC", payload: finalPurchaseObj })
    }
    return <div>
        <div>
            <TableContainer >
                <Table >
                    <TableHead >
                        <TableRow >
                            <TableCell sx={tableCell} >Customer's Name</TableCell>
                            <TableCell sx={tableCell} >Customer's Products</TableCell>
                            <TableCell sx={tableCell} >Purchased Dates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => {
                            return <TableRow key={customer.id} >
                                <TableCell sx={tableCell} >
                                    {customer.data.firstName}
                                </TableCell>
                                <TableCell sx={tableCell} >
                                    <List >
                                        {
                                            purchases.filter((purchase) => {
                                                return purchase.data.customerId === customer.id
                                            }).map(purchaseOfCustomer => {
                                                let productOfCustomer = products.find(product => product.id === purchaseOfCustomer.data.productId)
                                                if (productOfCustomer) {
                                                    return <ListItem sx={{ padding: 0, maxWidth: "100px" }} key={purchaseOfCustomer.id}
                                                        component={Link} to={"/product/" + productOfCustomer.id}>
                                                        <ListItemText sx={{ margin: 0 }}> {productOfCustomer.data.name} </ListItemText>
                                                    </ListItem>
                                                }
                                                else { return null }
                                            })
                                        }
                                    </List>
                                </TableCell>
                                <TableCell sx={tableCell} >
                                    <List >
                                        {purchases.filter((purchase) => {
                                            return purchase.data.customerId === customer.id
                                        }).map((purchaseOfCustomer) => {
                                            return <ListItem sx={{ padding: 0 }} key={purchaseOfCustomer.id}>
                                                <ListItemText sx={{ margin: 0 }}> {purchaseOfCustomer.data.date} </ListItemText>
                                            </ListItem>
                                        })}
                                    </List>
                                </TableCell>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    {/* show combobox */}
                                    <Button variant="contained"
                                        onClick={() => setShowComboboxByUserId(showComboboxByUserId === customer.id ? null : customer.id)}>
                                        Buy Product</Button>
                                    {showComboboxByUserId === customer.id &&
                                        <div>
                                            {/* combobox in reused components*/}
                                            <ProductsComboboxComp products={products} handleSubmitPurchase={handleSubmitPurchase} />
                                        </div>}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
}
export default CustomersComp
