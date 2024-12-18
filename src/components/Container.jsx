import React from 'react'

function Container({children, className=''}) {
  return (
    <div className={` max-w-7xl mx-auto px-2 sm:px-6  lg:px-6 ${className}`}>
        {children}
    </div>
  )
}
 
export default Container