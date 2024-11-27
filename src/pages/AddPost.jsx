import React from 'react'
import { Container, PostForm } from '../components'
import { useSelector } from 'react-redux'

function AddPost() {
  const isDarkMode = useSelector(state => state.theme.themeMode === "dark");
  return (
    <div className={`py-2
    ${isDarkMode ? "bg-secLight" : "bg-secLight"}`}>
        <Container>
        <div className='w-full px-2'>
          <h1 className={`text-2xl font-bold text-center mb-5 mt-1
            ${isDarkMode ? "text-textLightp" : "text-textLightp"}`}>
            Add new Post
          </h1>
        
          <PostForm />
          
        </div>
          
        </Container>
    </div>
  )
}

export default AddPost