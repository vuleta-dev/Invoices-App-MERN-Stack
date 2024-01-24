import React from 'react'
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5 pb-8">

      <Helmet>
        <title>404 Error - Invoice App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">404 - the page was not found</h1>

      <p className='mt-10'>We can’t seem to find the page you’re looking for :(</p>
    </section>
  )
}

export default NotFound