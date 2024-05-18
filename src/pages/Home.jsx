import React from 'react'
import { Main } from '../components/Main'
import { HeadSlider } from '../components/HeadSlider'

export const Home = () => {
  return (
    <>
      <div className='p-5'>
        <HeadSlider />
        <Main />
      </div>
    </>
  )
}
