import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Product = () => {
  // const {all_product} = useContext(ShopContext);
  const [product, setProduct] = useState();
  const { productId } = useParams();

  useEffect(() => {
    axios.get("/api/products/" + productId).then((res) => {
      console.log("prod", res.data)
      setProduct(res.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [])
  return (
    <div>
      {
        product == undefined ? <>Loading..</> :
          <><Breadcrum product={product} />
            <ProductDisplay product={product} />
          </>
      }

      {/* const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id ===Number(productId));
  return (
    <div>
      <Breadcrum product = {product} />
      <ProductDisplay product={product} />  */}
    </div>
  )
}
export default Product;