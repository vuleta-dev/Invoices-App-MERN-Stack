import React from 'react'
import { Link } from "react-router-dom"

const InvoiceFormEdit = ({
  invoicePartnerid, setInvoicePartnerid, invoiceDate, setInvoiceDate, invoiceDueDate, setInvoiceDueDate, invoiceStatus, setInvoiceStatus, handInvoiceID, handleInvoiceSubmit, partners, invoiceID, handleInvoiceEditSubmit
}) => {
  return (
    <form onSubmit={(e) => handleInvoiceEditSubmit(e, invoiceID)}>
      <h2 className="text-xl text-coral-red font-semibold">Invoice details</h2>

      <fieldset className='mt-3'>
        <label htmlFor="partnerid">Partner ID</label>
        {partners.length ?
          <select
            required
            className='input mt-1'
            id="partnerid"
            name="partnerid"
            onChange={(e) => setInvoicePartnerid(e.target.value)}
            value={invoicePartnerid}
          >
            <option key="0" value="">Select partner</option>
            {partners.map((partner) => (
              <option key={partner.id} value={String(partner._id)}>{partner.name}</option>
            ))}
          </select>
          :
          <p className="text-red-500">You have not entered any partners yet. <br />
            <Link className="underline" to="../new-partner">Click here to add the first one.</Link></p>
        }
      </fieldset>

      <fieldset className='mt-3'>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className='input mt-1'
          id="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />
      </fieldset>


      <fieldset className='mt-3'>
        <label htmlFor="DueDate">Due Date</label>
        <input type="date"
          className='input mt-1'
          id="DueDate"
          value={invoiceDueDate}
          onChange={(e) => setInvoiceDueDate(e.target.value)}
        />
      </fieldset>

      <fieldset className='mt-3'>
        <label htmlFor="DueDate">Invoice Status</label>
        <select
          className='input mt-1'
          id="status"
          name="status"
          onChange={(e) => setInvoiceStatus(e.target.value)}
          value={invoiceStatus}
        >
          <option value="true">Paid</option>
          <option value="false">Not Paid</option>
        </select>
      </fieldset>
      <button onClick={handInvoiceID} className='mt-7 px-5 py-3 border font-montserrat text-sm leading-none bg-coral-red rounded-xl text-white hover:bg-slate-600' type="submit">Save</button>
    </form>
  )
}

export default InvoiceFormEdit