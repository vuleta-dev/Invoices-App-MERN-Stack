import React, { useState, useEffect } from 'react';
import InvoicesListItem from './InvoicesListItem';

const InvoicesList = ({ invoices, partners, handleDeleteInvoice, invoiceItems }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Sorting the list
  const sortedInvoices = invoices.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleInvoices = sortedInvoices.slice(startIndex, endIndex);

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    // Reset to the first page when the data changes
    setCurrentPage(1);
  }, [invoices]);

  return (
    <>
      <div className='flex gap-9 mt-7 bg-slate-600 py-3 rounded-tl-lg rounded-tr-lg'>
        <div className='font-semibold sm:w-[200px] flex-1 pl-4 text-white'>
          Partner
        </div>
        <div className='font-semibold sm:w-[150px] text-white'>
          Total
        </div>
        <div className='font-semibold sm:w-[150px] text-white'>
          Date
        </div>
        <div className='font-semibold sm:w-[80px] text-white'>
          Status
        </div>
        <div className='font-semibold sm:w-[80px] text-white'>
          Action
        </div>
      </div>
      {visibleInvoices.map((invoice, index) => {
        const partner = partners.find((partner) => partner._id === invoice.partnerid);
        const partnername = partner?.name || "No partner";

        const InvoiceItemsAmount = invoiceItems.filter(item => item.invoiceid == invoice.id);
        const totalAmount = InvoiceItemsAmount.reduce((total, item) => {
          const itemAmount = parseFloat(item.qty) * parseFloat(item.rate);
          return total + itemAmount;
        }, 0);

        const formattedTotalAmount = totalAmount.toLocaleString('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        return (
          <InvoicesListItem
            key={invoice.id}
            id={invoice._id}
            partnerid={invoice.partnerid}
            partnername={partnername}
            Date={invoice.Date}
            DueDate={invoice.DueDate}
            Status={invoice.Status}
            activeDropdown={activeDropdown === index}
            toggleDropdown={() => toggleDropdown(index)}
            handleDeleteInvoice={handleDeleteInvoice}
            totalAmount={formattedTotalAmount}
          />
        );
      })}
      <div className='text-center pt-6 pb-2'>
        <button
          className='px-3 py-2 border font-montserrat text-sm leading-none bg-slate-200 hover:bg-coral-red rounded-xl text-gray-800 hover:cursor-pointer'
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <span className='text-sm text-gray-400 mx-5'> Page {currentPage} of {totalPages} </span>
        <button
          className='px-3 py-2 border font-montserrat text-sm leading-none bg-slate-200 hover:bg-coral-red rounded-xl text-gray-800 hover:cursor-pointer'
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= sortedInvoices.length}
        >
          Next page
        </button>
      </div>
    </>
  );
};

export default InvoicesList;
