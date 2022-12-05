import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Delivery } from '../Components/Payment/ExpressDelivery'
import { Payment } from '../Components/Payment/Payment'
import { setCart } from '../Redux/Cart/action'
import Cart from './Cart'
import Healthcare from './Healthcare'
import Home from './Home'
import NotFound from './NotFound'
import Products from './Products'
import Search from './Search'
import SingleProduct from './SingleProduct'

function AllRoutes() {
  const { cartItems,totalCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function getCart() {
    
    axios.get("https://pharmeasy-clone-x5wz.onrender.com/Cart").then((res) => {
   
      dispatch(setCart(res.data));
    
    })
  }
  useEffect(()=>{
    getCart();

  },[])

   
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/healthcare" element={<Healthcare/>}></Route>
        <Route path="/healthcare/products/:cat" element={<Products/>}></Route>
        <Route path='/healthcare/product/:id' element={<SingleProduct/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/search/:name' element={<Search/>}></Route>
        <Route path='/delivery' element={<Delivery />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/cart' element={<Cart />}></Route>

        
    </Routes>

  )
}

export default AllRoutes