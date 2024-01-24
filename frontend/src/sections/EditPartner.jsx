import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DataContext from '../context/DataContext';

const EditPartner = () => {

  const { partners, handleEditPartner, editPartnerName, setEditPartnerName, editPartnerAddress, setEditPartnerAddress, editPartnerCity, setEditPartnerCity, editPartnerZip, setEditPartnerZip, editPartnerCountry, setEditPartnerCountry } = useContext(DataContext);

  const { id } = useParams();
  const partner = partners.find(partner => (partner._id).toString() === id);

  useEffect(() => {
    if (partner) {
      setEditPartnerName(partner.name)
      setEditPartnerAddress(partner.address)
      setEditPartnerCity(partner.city)
      setEditPartnerZip(partner.zip)
      setEditPartnerCountry(partner.country)
    }
  }, [partner])

  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">
      <Helmet>
        <title>Edit Partner - Invoice App</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Edit Partner</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col md:flex-row gap-10'>

          <div className='w-full md:w-1/2'>
            <fieldset>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='input mt-1'
                id='name'
                value={editPartnerName}
                onChange={(e) => setEditPartnerName(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                className='input mt-1'
                id='city'
                value={editPartnerCity}
                onChange={(e) => setEditPartnerCity(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                className='input mt-1'
                id='country'
                value={editPartnerCountry}
                onChange={(e) => setEditPartnerCountry(e.target.value)}
              />
            </fieldset>
          </div>

          <div className='w-full md:w-1/2'>
            <fieldset>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                className='input mt-1'
                id='address'
                value={editPartnerAddress}
                onChange={(e) => setEditPartnerAddress(e.target.value)}
              />
            </fieldset>

            <fieldset className='mt-3'>
              <label htmlFor='zip'>Zip</label>
              <input
                type='text'
                className='input mt-1'
                id='zip'
                value={editPartnerZip}
                onChange={(e) => setEditPartnerZip(e.target.value)}
              />
            </fieldset>
          </div>

        </div>

        <button onClick={() => handleEditPartner(partner._id)} className='mt-7 px-5 py-3 border font-montserrat text-sm leading-none bg-slate-400 hover:bg-coral-red rounded-xl text-white' type="submit">Save</button>

      </form>
    </section>
  )
}

export default EditPartner