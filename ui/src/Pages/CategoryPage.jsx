import React, { useContext, useState ,useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import CategoryItem from '../Components/Item/CategoryItem'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const CategoryPage = (props) => {

  const { category } = useParams();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("/api/products/category/" + category).then((res) => {
      setCategoryList(res.data);
    }).catch((err) => {
      console.error("Error occured", err);
    })
  }, [category]);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {categoryList.map((item, i) => {
          return <CategoryItem key={i} id={item.id} name={item.name} image={item.imageData} new_price={item.newPrice} old_price={item.oldPrice} />
        })}
      </div>
    </div>
  )
}
export default CategoryPage