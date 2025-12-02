import React from 'react'
import NavComp from './navComp'
import Footer from './Footer'

function LayoutComp({children}:{children:React.ReactNode}) {
  return (
    <div>
        <NavComp/>
      {children}
      <Footer/>
    </div>
  )
}

export default LayoutComp
