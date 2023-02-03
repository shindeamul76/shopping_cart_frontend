import React from 'react'
import "./Header.css"

const Header = ({onChange, data}) => {

  return (
    <div className='header'>

      <div className="left">
        L O G O 
      </div>

      <div className="center">
        <section className='products'>
            <select id="select" onChange={onChange}>
              <option >Select Your Product</option>
              {data&& data.map((product)=> {
                 return  <option value={product.name} key={product.name}>{product.name}</option>
              })}  
            </select>
        </section>
      </div>

      <div className="right">

        <section className='user'>
            <select>
                <option selected>Irfan Opc</option>
                <option>Log Out</option>
            </select>
        </section>
      </div>
    </div>
  )
}

export default Header
