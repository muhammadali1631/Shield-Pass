import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='flex justify-between items-center p-2 md:container md:mx-auto md:px-40 py-3'>
        <div className="logo font-bold text-white text-2xl ">
            <span className='text-slate-400'> &lt;</span>
           
            Shield 
            <span className='text-slate-400'>Pass / &gt;</span>
            </div>
        {/* <ul>
            <li className='space-x-4'>
                <a href='#'>Home</a>
                <a href='#'>About</a>
                <a href='#'>Support</a>
                <a href='#'>Contact</a>
            </li>
        </ul> */}
        <a href="https://github.com/muhammadali1631/" className='cursor-pointer' target="_blank" >
        <button className="text-white bg-slate-400 flex cursor-pointer items-center justify-between rounded-full ring-1 ring-white">
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='px-3 '>

          Github
          </span>
        </button>
        </a>
        </div>
    </nav>
  )
}

export default Navbar