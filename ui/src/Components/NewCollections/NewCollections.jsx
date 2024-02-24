import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import CategoryItem from '../Item/CategoryItem'
import axios from 'axios'

const NewCollections = ({ title, type }) => {

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("/api/products/category/" + type).then((res) => {
      setCategoryList(res.data);
    }).catch((err) => {
      console.error("Error occured", err);
    })
  }, []);

  return (
    <>
      <h1>{title}</h1>
      {title != "" ? <hr /> : <></>}
      <div className="collections flex w-2/3 items-center justify-center">
        {categoryList.map((item, i) => {
          return <CategoryItem key={i} id={item.id} name={item.name} image={item.imageData} new_price={item.newPrice} old_price={item.oldPrice} showcase={true} />
        })}
      </div>
    </>

  )
}
export default NewCollections