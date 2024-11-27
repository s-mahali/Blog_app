import React, {useId} from 'react'
import { useSelector } from 'react-redux';


function Inputindividual({
    label,
    type = 'text',
    className = '',
    ...props
},ref) {
  const id = useId();
  const isDarkMode = useSelector(state => state.theme.themeMode === "dark");
  return (
   <div className='w-full'>
    {label && <label 
       className= {`inline-block mb-1 pl-1
        ${isDarkMode ? "text-textLightp" : "text-textLightp"}
        `}
       htmlFor={id}>{label}</label>}
    <input 
     type= {type}
     id={id}
     ref = {ref}
     className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
     {...props}
    />
   </div>
  )
}

export default React.forwardRef(Inputindividual)

