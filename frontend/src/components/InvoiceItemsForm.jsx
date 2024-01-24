import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons';

const InvoiceItemsForm = ({
  handleInvoiceItemSubmit, itemDesc, setItemDesc, itemQty, setItemQty, itemRate, setItemRate
}) => {
  return (
    <form onSubmit={handleInvoiceItemSubmit}>
      <div className='md:flex md:flex-row gap-3 mt-3'>
        <input
          value={itemDesc}
          className='w-full input md:w-1/2 mt-2'
          type='text'
          placeholder='Enter description'
          required
          onChange={(e) => setItemDesc(e.target.value)}
        />

        <input
          value={itemQty}
          className='w-full input md:w-1/4 mt-2'
          type='number'
          placeholder='Enter Quantity'
          required
          onChange={(e) => setItemQty(e.target.value)}
        />

        <input value={itemRate}
          className='w-full input md:w-1/4 mt-2'
          type='number'
          placeholder='Enter Rate'
          required
          onChange={(e) => setItemRate(e.target.value)}
        />
      </div>

      <button className='flex flex-row mt-3 px-5 py-3 border font-montserrat text-sm leading-none bg-coral-red rounded-xl text-white hover:bg-slate-600' type="submit"><CaretDownOutlined className='mr-2' /> Add new item<CaretDownOutlined className='ml-2' /></button>
    </form>
  )
}

export default InvoiceItemsForm