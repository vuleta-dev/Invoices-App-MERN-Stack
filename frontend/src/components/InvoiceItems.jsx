import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const InvoiceItems = ({ invoiceItems, handleInvoiceItemDelete, generateInvoiceID }) => {
  const filteredItems = invoiceItems.filter(item => item.invoiceid == generateInvoiceID);

  return (
    <>
      <div className='flex gap-9 mt-7 bg-slate-600 py-3 rounded-tl-lg rounded-tr-lg'>
        <div className='font-semibold sm:w-[200px] flex-1 pl-4 text-white'>
          Item description
        </div>
        <div className='font-semibold sm:w-[50px] text-white'>
          Quantity
        </div>
        <div className='font-semibold sm:w-[50px] text-white'>
          Rate
        </div>
        <div className='font-semibold sm:w-[60px] text-white'>
          Amount
        </div>
        <div className='font-semibold sm:w-[60px] text-white'>
          Action
        </div>
      </div>
      {filteredItems.length ? (
        filteredItems.map((item) => {
          const formattedTotalAmount = (item.qty * item.rate).toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });

          return (
            <div key={item.id} className="flex gap-9 border-b-2 py-3 bg-slate-50 mt-2 hover:bg-slate-200">
              <div className="sm:w-[200px] flex-1 pl-2">{item.desc}</div>
              <div className="sm:w-[50px]">{item.qty}</div>
              <div className="sm:w-[50px]">{item.rate}</div>
              <div className="sm:w-[60px]">{formattedTotalAmount}</div>
              <div className="sm:w-[60px]">
                <DeleteOutlined onClick={() => handleInvoiceItemDelete(item._id)} className='text-red-700 cursor-pointer' />
              </div>
            </div>
          );
        })
      ) : (
        <p className='text-center py-5 text-gray-500 font-montserrat'>This invoice does not have any items. Add the first one!</p>
      )}
    </>
  );
};

export default InvoiceItems;
