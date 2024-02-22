import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

  const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
         <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            </div>  
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={"data:image/png;base64,"+product.imageData} alt="" />
            </div> 
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.oldPrice}</div>
                <div className="productdisplay-right-price-new">${product.newPrice}</div>
            </div>
            <div className="productdisplay-right-description">
            Our website is a one-stop destination for all things cars. Dive into the world of cutting-edge automotive technology, sleek designs, and powerful engines. Explore a vast collection of the latest car models, from stylish sedans to rugged SUVs, each meticulously crafted to elevate your driving experience. 
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        </div>
    </div>
  )
}
export default ProductDisplay