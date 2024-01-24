import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';

import DataContext from '../context/DataContext';

const NewPartner = () => {

  const { partnerName, setPartnerName, partnerAddress, setPartnerAddress, partnerCity, setPartnerCity, partnerZip, setPartnerZip, partnerCountry, setPartnerCountry, handlePartnerSubmit } = useContext(DataContext);

  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">

      <Helmet>
        <title>New Partner - Invoice App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">New Partner</h1>

      <form onSubmit={handlePartnerSubmit}>
        <div className='flex flex-col md:flex-row gap-10'>

          <div className='w-full md:w-1/2'>
            <fieldset>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='input mt-1'
                id='name'
                required
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                required
                className='input mt-1'
                id='city'
                value={partnerCity}
                onChange={(e) => setPartnerCity(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                required
                className='input mt-1'
                id='country'
                value={partnerCountry}
                onChange={(e) => setPartnerCountry(e.target.value)}
              />
            </fieldset>
          </div>

          <div className='w-full md:w-1/2'>
            <fieldset>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                required
                className='input mt-1'
                id='address'
                value={partnerAddress}
                onChange={(e) => setPartnerAddress(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='zip'>Zip</label>
              <input
                type='number'
                required
                className='input mt-1'
                id='zip'
                value={partnerZip}
                onChange={(e) => setPartnerZip(e.target.value)}
              />
            </fieldset>
          </div>

        </div>

        <button className='mt-7 px-5 py-3 border font-montserrat text-sm leading-none bg-slate-400 hover:bg-coral-red rounded-xl text-white' type="submit">Save</button>

      </form>
    </section>
  )
}

export default NewPartner