import React from 'react'

const Footer = () => {
  return (
    <footer className='pt-6 text-center text-zinc-600'>Copyright <b>Invoice app</b> {new Date().getFullYear()}</footer>
  )
}

export default Footer