import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom"
import axios, { all } from 'axios';
import InvoiceItems from '../components/InvoiceItems';
import InvoiceItemsForm from '../components/InvoiceItemsForm';
import InvoiceFormEdit from '../components/InvoiceFormEdit';
import { Helmet } from 'react-helmet';
import DataContext from '../context/DataContext';

const EditInvoice = () => {

  const { invoices, handleInvoiceEditSubmit, invoiceID, setInvoiceID, invoicePartnerid, setInvoicePartnerid, invoiceDate, setInvoiceDate, invoiceDueDate, setInvoiceDueDate, invoiceStatus, setInvoiceStatus, partners, invoiceItems, setInvoiceItems } = useContext(DataContext);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const { id } = useParams();

  const [itemDesc, setItemDesc] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemRate, setItemRate] = useState('');
  const [generateInvoiceID, setGenerateInvoiceID] = useState(null);

  // Invoice data
  const invoiceData = invoices.find(invoice => invoice._id === id);

  useEffect(() => {
    if (invoiceData) {
      setInvoiceID(invoiceData.id)
      setInvoicePartnerid(invoiceData.partnerid)
      setInvoiceDate(new Date(invoiceData.Date).toISOString().split('T')[0])
      setInvoiceDueDate(new Date(invoiceData.DueDate).toISOString().split('T')[0])
      setInvoiceStatus(invoiceData.Status)
    }
  }, [invoiceData])

  const handInvoiceID = () => {
    setInvoiceID(invoiceData._id);
  };

  // Adding new item
  const handleInvoiceItemSubmit = async (e) => {
    e.preventDefault();

    const id = invoiceItems.length ? invoiceItems[invoiceItems.length - 1].id + 1 : 1;

    const createInoviceItem = {
      invoiceid: invoiceID,
      desc: itemDesc,
      qty: itemQty,
      rate: itemRate
    }
    try {
      const response = await axios.post(`${apiUrl}items`, createInoviceItem)

      const AllInvoiceItems = [...invoiceItems, response.data];
      setInvoiceItems(AllInvoiceItems)
      // Clear
      setItemDesc('');
      setItemQty('');
      setItemRate('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // Delete Invoice item
  const handleInvoiceItemDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}items/${id}`)
      const invoiceItemsList = invoiceItems.filter(invoice => invoice._id !== id)
      setInvoiceItems(invoiceItemsList)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">
      <Helmet>
        <title>Edit Invoices - Invoice App</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">New Invoice</h1>

      <div className='flex flex-col md:flex-row gap-10'>

        <div className='w-full md:w-1/3'>
          <InvoiceFormEdit
            invoicePartnerid={invoicePartnerid}
            setInvoicePartnerid={setInvoicePartnerid}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            invoiceDueDate={invoiceDueDate}
            setInvoiceDueDate={setInvoiceDueDate}
            invoiceStatus={invoiceStatus}
            setInvoiceStatus={setInvoiceStatus}
            handInvoiceID={handInvoiceID}
            handleInvoiceEditSubmit={handleInvoiceEditSubmit}
            partners={partners}
            invoiceID={invoiceID}
          />
        </div>

        <div className='w-full md:w-2/3'>
          <h2 className="text-xl text-coral-red font-semibold">Invoice items</h2>

          <InvoiceItemsForm
            itemDesc={itemDesc}
            setItemDesc={setItemDesc}
            itemQty={itemQty}
            setItemQty={setItemQty}
            itemRate={itemRate}
            setItemRate={setItemRate}
            handleInvoiceItemSubmit={handleInvoiceItemSubmit}
          />

          <InvoiceItems
            invoiceItems={invoiceItems}
            handleInvoiceItemDelete={handleInvoiceItemDelete}
            generateInvoiceID={invoiceID}
          />

        </div>
      </div>
    </section>
  )
}

export default EditInvoice