
import './Home.css'
import Header from '../Header/Header'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import ProductRow from './ProductRow'


function Home() {

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);



  const fetchData = async() => {

    try {
      
      const response = await axios("http://localhost:5000/api/v1/products");
      const newData = await response.data.product;
      setData(newData);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const onChange =(e)=> {
    const newProduct = data.filter((product)=> {
      return product.name === e.target.value
    })
  
    setCart([...cart, ...newProduct])
  }


  const [counts, setCounts] = useState({}); //{}

  const handleCountChange = (productId, count) => {
    setCounts({
      ...counts,
      [productId]: count, 
    });                        
  };






  const total = cart.reduce((acc, product) => acc + (product.price *( counts[product._id]) || product.price), 0);

 

  
  return (
    <div className='home'>
        <Header onChange={onChange} data = {data}/>
        <div className='banner'>
          <img src="https://m.media-amazon.com/images/I/61+GduPIncL._SX3000_.jpg" alt="" />
        </div>
<section className='table'>
  <table>
    <tbody>
    <tr>
      <th>slno.</th>
      <th>product name</th>
      <th>price/qty</th>
      <th>quantity</th>
      <th>total</th>
      <th>item-details</th>
      
    </tr>
   
    {cart.length > 0 &&
          cart.map((product, i) => (
            <ProductRow 
            key={product._id} 
            product={product} 
            index={i} 
            count={counts[product._id] || 1} 
            onCountChange={count => handleCountChange(product._id, count)}
            cart={cart}
            setCart={setCart}
            />
          ))}
    </tbody>
    <tfoot>
      <tr>
      <td  scope="col" colSpan="4">Total Price</td>
    <td align="center">{total}</td>
      </tr>
   
  </tfoot>

  </table>

</section>

    </div>
  )
}

export default Home