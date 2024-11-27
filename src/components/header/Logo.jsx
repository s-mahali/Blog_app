import React from 'react'
import ReactLogo from '../../assets/react.svg'


function Logo({width = '',
              className = ''

}) {
  return (
   <div
   style={{width}}
   className={`${className}`}
  >
     <img src={ReactLogo} alt="react-logo" />
    </div>
  )
}

export default Logo