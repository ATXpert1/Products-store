import { Route, Routes } from 'react-router-dom'
import CustomersComp from './customers'
import EditCustomerComp from './editCustomer'
import EditProductComp from './editProduct'
import MainMenuComp from './mainMenu'
import ProductsComp from './products'
import PurchasesComp from './purchases'

const ContainerComp = (props) => {
    console.log("ContainerComp")
    return <div>
        <Routes>
            <Route path="/" element={<MainMenuComp />} />
            <Route path="/products" element={<ProductsComp />} />
            <Route path="/product/:id" element={<EditProductComp />} />
            <Route path="/customers" element={<CustomersComp />} />
            <Route path="/customer/:id" element={<EditCustomerComp />} />
            <Route path="/purchases" element={<PurchasesComp />} />
        </Routes>
    </div>
}
export default ContainerComp
