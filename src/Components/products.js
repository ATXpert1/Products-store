import ProductComp from './product'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import '../App.css'
const ProductsComp = () => {
    console.log("ProductsComp")
    const productsInfo = useSelector(state => state.products)
    const purchasesInfo = useSelector(state => state.purchases)
    return <div >
        <div className='products-Region1'>
            <Typography
            
                variant="h3"
                color="#1976d2"
                align="center">
                Total amount of purchased products
                <br />
                {purchasesInfo.map((purchase) => {
                    let productMatch = productsInfo.find(product => product.id === purchase.data.productId)
                    if (productMatch) {
                        return productMatch.data.price
                    }
                    return 0
                }).reduce((previousValue, currentValue) => {
                    return previousValue + parseFloat(currentValue)
                }, 0).toFixed(2)} </Typography>
        </div>
        <div className='products-Region2'>
            {productsInfo.map((product => {
                return <div key={product.id}> <ProductComp id={product.id} /> </div>
            }))}
        </div>
    </div>
}
export default ProductsComp
