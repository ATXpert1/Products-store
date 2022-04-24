import { useSelector } from 'react-redux'
import { useState, useMemo } from "react"
import {
   Button,TextField,MenuItem,Table,TableBody,TableCell,TableHead,TableRow,List,ListItem,ListItemText
} from '@mui/material'

const PurchasesComp = (props) => {
   console.log("purchases")
   const [date, setDate] = useState("")
   const products = useSelector(state => state.products)
   const purchases = useSelector(state => state.purchases)
   const customers = useSelector(state => state.customers)
   const [selectedProduct, setSelectedProduct] = useState("")
   const [selectedCustomer, setSelectedCustomer] = useState("")
   const [showResults, setShowResults] = useState(false)
   const [startSearch, setStartSearch] = useState(false)
   const tableCell = {
      border: "1px solid black"
   }
   const toggleSearch = (e) => {
      e.preventDefault()
      setShowResults(true)
      setStartSearch(!startSearch)
   }
   // create table
   const handleSearch =
      () => {
         // filter by date
         let purchasesByDate = []
         if (date) {
            purchasesByDate = purchases.filter((purchase) => purchase.data.date === date)
         }
         else { purchasesByDate = purchases }
         // customer selected
         if (selectedCustomer) {
            const purchasesOfCustomer = purchasesByDate.filter((purchase) => purchase.data.customerId === selectedCustomer)
            let customer = customers.find((customer) => customer.id === selectedCustomer)
            return <TableRow>
               <TableCell sx={tableCell}>{customer.data.firstName}</TableCell>
               <TableCell sx={tableCell}>{handleProducts(purchasesOfCustomer)}</TableCell>
               <TableCell sx={tableCell}>
                  <ul>{handleDates(purchasesOfCustomer)}</ul>
               </TableCell>
            </TableRow>
         }
         // if customer not selected
         else {
            return customers.map((customer) => {
               const purchasesOfCustomer = purchasesByDate.filter((purchase) => purchase.data.customerId === customer.id)
               return <TableRow key={customer.id}>
                  <TableCell sx={tableCell}>{purchasesOfCustomer.length ? customer.data.firstName : null}</TableCell>
                  <TableCell sx={tableCell}>
                     <List>{handleProducts(purchasesOfCustomer)}</List>
                  </TableCell >
                  <TableCell sx={tableCell}>
                     <List>{handleDates(purchasesOfCustomer)}</List>
                  </TableCell>
               </TableRow>
            })
         }
      }
   // handle products results
   const handleProducts = (purchasesOfCustomer) => {
      // if product selected
      if (selectedProduct) {
         return purchasesOfCustomer.map((purchase) => {
            if (purchase.data.productId === selectedProduct) {
               return <ListItem sx={{ padding: 0 }} key={purchase.id}>
                  <ListItemText sx={{ margin: 0 }}>
                     {products.find(product => product.id === selectedProduct).data.name}
                  </ListItemText>
               </ListItem>
            }
            return null
         })
      }
      // if product not selected
      else {
         return purchasesOfCustomer.map((purchase) => {
            return <ListItem sx={{ padding: 0}} key={purchase.id}>
               <ListItemText sx={{ margin: 0 }}>
                  {products.find(product => product.id === purchase.data.productId).data.name}
               </ListItemText>
            </ListItem>
         })
      }
   }
   // handle dates resulst
   const handleDates = (purchasesOfCustomer) => {
      // display dates
      if (selectedProduct) {
         return purchasesOfCustomer.filter((purchase) => purchase.data.productId === selectedProduct)
            .map((purchase) => {
               return <ListItem sx={{ padding: 0}} key={purchase.id}>
                  {purchase.data.date}
               </ListItem>
            })
      }
      else {
         return purchasesOfCustomer.map((purchase) => {
            return <ListItem sx={{ padding: 0,}} key={purchase.id}>
               <ListItemText sx={{ margin: 0 }}>
                  {purchase.data.date}
               </ListItemText>
            </ListItem>
         })
      }
   }
   // use function only when start search toggles
   const searchResults = useMemo(() => handleSearch(), [startSearch])
   return <div>
      <form onSubmit={(e) => (toggleSearch(e))}>
         <TextField select style={{ width: "120px" }} value={selectedCustomer} label="Customer" onChange={(e) => { setSelectedCustomer(e.target.value) }} >
            <MenuItem value=""> <em>None</em></MenuItem>
            {customers.map((customer) => {
               return <MenuItem key={customer.id} value={customer.id}>{customer.data.firstName}</MenuItem>
            })}
         </TextField>
         <TextField select style={{ width: "120px" }} value={selectedProduct} label="Product" onChange={(e) => setSelectedProduct(e.target.value)} >
            <MenuItem value=""><em>None</em></MenuItem>
            {products.map((product) => {
               return <MenuItem key={product.id} value={product.id}>{product.data.name}</MenuItem>
            })}
         </TextField>
         <TextField label="date" onChange={(e) => setDate(e.target.value)} variant="outlined" ></TextField>
         <Button type="submit">Search</Button>
      </form>
      {showResults && <Table>
         <TableHead>
            <TableRow sx={{ align: "center" }}>
               <TableCell sx={tableCell}>customer/s</TableCell>
               <TableCell sx={tableCell}>product/s</TableCell>
               <TableCell sx={tableCell}>date/s</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {searchResults}
         </TableBody>
      </Table>}
   </div>
}
export default PurchasesComp