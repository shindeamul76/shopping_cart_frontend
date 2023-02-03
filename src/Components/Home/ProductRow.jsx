
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'



const ProductRow = ({ product, index, count, onCountChange, cart, setCart}) => {



  useEffect(() => {
    window.localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  // // const [quantity, setQuantity] = useState(product.quantity);

  // // useEffect(() => {
  // //   localStorage.setItem('cart', JSON.stringify({ ...product, quantity }));
  // // }, [quantity]);

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);

  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   setCart([...savedCart]);
  // }, []);
 

  const onDelete=(id)=>{
    let result = window.confirm("Are you sure you want to proceed?");

    if(result === true){ 
    const newCart = cart.filter((item)=>{
          return item._id !==id
     })
     setCart(newCart)
   }
  }
 
   const onEdit=(id)=>{
     const newName =prompt("Edit name");
     const newPrice = prompt('edit price')
      cart.map((item)=>{
       if(item._id === id){
         item.name = newName
         item.price = newPrice
         }
         return item;
     })
     setCart([...cart])
   }


// const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);




  const navigate = useNavigate();

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
    
        <td>
        <button onClick={() => onCountChange(count + 1)}>+</button>
        {count}
        <button onClick={() => onCountChange(count - 1)}>-</button> 
      </td>
        <td>{count * product.price}</td>
        <td>
          <button onClick={() => navigate('/view/details', {state: product})}>view details</button>
        </td>

        <td>
          <button onClick={()=>{onEdit(product._id)}}>Edit</button>
          <button onClick={()=> {onDelete(product._id)}}>Delete</button>
        </td>
      </tr>

      
    );
  }

  export default ProductRow
  