import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center gap-10 md:flex-row mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img}></img>
        <div className='flex flex-col gap-6 items-start justify-center'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Thu Duc <br/>Ho Chi Minh City, Vietnam</p>
          <p className='text-gray-500'>Tel: (079) 876-5432 <br/>Email: admin@hobbee.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Hobbee</p>
          <p className='text-gray-500'>Learn more about our teams</p>
          <button className='border border-black py-4 px-8 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore more</button>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default Contact
