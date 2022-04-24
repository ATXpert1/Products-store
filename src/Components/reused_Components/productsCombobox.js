import { useState } from "react"
import { Button, TextField, MenuItem, FormControl } from "@mui/material"
const ProductsComboboxComp = (props) => {
    const [selectedProduct, setSelectedProduct] = useState("")
    return <form onSubmit={(e) => { props.handleSubmitPurchase(e, selectedProduct) }}>
        <TextField select style={{ width: "160px" }} value={selectedProduct} label="Product" onChange={(e) => setSelectedProduct(e.target.value)} required>
            {props.products.map((product) => {
                return <MenuItem key={product.id} value={product.id}>{product.data.name}</MenuItem>
            })}
        </TextField>
        <Button type="submit" variant="contained">buy</Button>
    </form>
}
export default ProductsComboboxComp
