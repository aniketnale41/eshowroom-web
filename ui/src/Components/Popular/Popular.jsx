import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'
import axios from 'axios'
import CategoryItem from '../Item/CategoryItem'

export const Popular = () => {

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("/api/products/category/car").then((res) => {
      setCategoryList(res.data);
    }).catch((err) => {
      console.error("Error occured", err);
    })
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN CAR</h1>
      <hr />
      <div className='popular-item'>
        {categoryList.map((item, i) => {
          return <CategoryItem key={i} id={item.id} name={item.name} image={item.imageData} new_price={item.newPrice} old_price={item.oldPrice} showcase={true} />
        })}
      </div>
    </div>
  )
}
export default Popular