import ContainerComp from './Components/container';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
function App() {
  let dispatch = useDispatch()
  // insert all data into redux state
  useEffect(async () => {
    dispatch({ type: "GET_PRODUCTS_ASYNC" })
  }, [])
  useEffect(async () => {
    dispatch({ type: "GET_CUSTOMERS_ASYNC" })
  }, [])
  useEffect(async () => {
    dispatch({ type: "GET_PURCHASES_ASYNC" })
  }, [])
  return <div>
    <ContainerComp />
  </div>
}

export default App;
