import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-3xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-2xl'>
          <p>Welcome to Hobbee – where every handmade piece tells a story. Our passion lies in creating unique, heartfelt crafts that bring joy to everyday life.</p>
          <p>Whether you're searching for the perfect gift or a special something for yourself, Hobbee is your cozy little corner of creativity.</p>
          <b className='text-gray-800 text-3xl'>Our Mission</b>
          <p>Our mission is to celebrate the art of handmade – to honor the patience, love, and individuality behind every crafted item. We aim to inspire people to slow down, appreciate the beauty in imperfection, and choose meaningful over mass-produced.</p>
        </div>
      </div>

      <div className='text-3xl text-center py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='text-gray-600 text-2xl text-center'>Unique, handcrafted items</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='text-gray-600 text-2xl text-center'>High-quality materials & attention to detail</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='text-gray-600 text-2xl text-center'>Thoughtful, personalized customer experience</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='text-gray-600 text-2xl text-center'>Support for local artisans and sustainable living</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
