import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const navbar = () => {

  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36'></img></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-10 cursor-pointer'></img>
        <div className='group relative'>
          <img onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} className='w-10 cursor-pointer'></img>
          {token &&
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-10 cursor-pointer min-w-5'></img>
          <p className='absolute right-[-5px] bottom-[18px] w-5 text-center leading-5 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-10 cursor-pointer sm:hidden'></img>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-90'></img>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
        </div>
      </div>

    </div>
  )
}

export default navbar
