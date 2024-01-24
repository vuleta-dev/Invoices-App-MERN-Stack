import React from 'react'
import PartnerListItem from './PartnerListItem';

const PartnersList = ({ partners, handleDeletePartner }) => {
  return (
    <>
      <div className='flex gap-9 mt-7 bg-slate-600 py-3 rounded-tl-lg rounded-tr-lg'>
        <div className='font-semibold sm:w-[150px] pl-4 text-white'>
          Partner Name
        </div>
        <div className='font-semibold sm:w-[400px] flex-1 text-white'>
          Address
        </div>
        <div className='font-semibold sm:w-[150px] text-white'>
          Action
        </div>
      </div>
      {partners.map((partner) => {
        return (
          <PartnerListItem
            key={partner._id}
            partnerid={partner._id}
            name={partner.name}
            address={partner.address}
            city={partner.city}
            zip={partner.zip}
            country={partner.country}
            handleDeletePartner={handleDeletePartner}
          />
        );
      })}
    </>
  )
}

export default PartnersList