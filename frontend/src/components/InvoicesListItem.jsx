import React from 'react';
import ActionLink from '../components/ActionLink';

const InvoicesListItem = ({ id, partnerid, Date: invoiceDate, DueDate, Status, partnername, activeDropdown, toggleDropdown, handleDeleteInvoice, totalAmount }) => {
  
  const formattedDate = invoiceDate ? new Date(invoiceDate).toLocaleDateString() : 'N/A';

  return (
    <div className="flex gap-9 border-b-2 py-3 bg-slate-50 mt-2 hover:bg-slate-200">
      <div className="sm:w-[200px] flex-1 pl-2">{partnername}</div>
      <div className="sm:w-[150px]">{totalAmount}</div>
      <div className="sm:w-[150px]">{formattedDate}</div>
      <div className="sm:w-[80px]">
        {Status ? (
          <span className="text-green-900 font-bold">Paid</span>
        ) : (
          <span className="text-red-900 font-bold">Not paid</span>
        )}
      </div>
      <div className="sm:w-[80px]">
        <ActionLink
          className="z-10"
          isOpen={activeDropdown}
          toggleDropdown={toggleDropdown}
          id={id}
          handleDeleteInvoice={handleDeleteInvoice}
        />
      </div>
    </div>
  );
};

export default InvoicesListItem;
