import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Footer from '../Components/Footer/Footer'

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <div id="latest" className='new-collections mt-8'>
        <NewCollections title="NEW COLLECTION" type="motorcycle" />
        <NewCollections title="" type="bicycle" />
      </div>
      <NewsLetter />
    </div>
  )
}
export default Shop