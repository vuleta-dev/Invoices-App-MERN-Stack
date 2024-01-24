import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios, { all } from 'axios';
import InvoiceItems from '../components/InvoiceItems';
import InvoiceItemsForm from '../components/InvoiceItemsForm';
import InvoiceForm from '../components/InvoiceForm';
import { Helmet } from 'react-helmet';
import DataContext from '../context/DataContext';


const NewInvoice = (
) => {

  const { handleInvoiceSubmit, invoiceID, setInvoiceID, invoicePartnerid, setInvoicePartnerid, invoiceDate, setInvoiceDate, invoiceDueDate, setInvoiceDueDate, invoiceStatus, setInvoiceStatus, partners, invoiceItems, setInvoiceItems } = useContext(DataContext);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [itemDesc, setItemDesc] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemRate, setItemRate] = useState('');
  const [generateInvoiceID, setGenerateInvoiceID] = useState(null);

  // Generate Invoice ID
  useEffect(() => {
    setGenerateInvoiceID(Math.floor(Math.random() * 999999) + 1);
  }, []);

  const handInvoiceID = () => {
    setInvoiceID(generateInvoiceID);
  };


  // Adding new item
  const handleInvoiceItemSubmit = async (e) => {
    e.preventDefault();

    const id = invoiceItems.length ? invoiceItems[invoiceItems.length - 1].id + 1 : 1;

    const createInoviceItem = {
      id: id,
      invoiceid: generateInvoiceID,
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
        <title>New Invoices - Invoice App</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">New Invoice</h1>

      <div className='flex flex-col md:flex-row gap-10'>

        <div className='w-full md:w-1/3'>
          <InvoiceForm
            invoicePartnerid={invoicePartnerid}
            setInvoicePartnerid={setInvoicePartnerid}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            invoiceDueDate={invoiceDueDate}
            setInvoiceDueDate={setInvoiceDueDate}
            invoiceStatus={invoiceStatus}
            setInvoiceStatus={setInvoiceStatus}
            handInvoiceID={handInvoiceID}
            handleInvoiceSubmit={handleInvoiceSubmit}
            partners={partners}
          />
        </div>

        <div className='w-full md:w-2/3'>
          <h2 className="text-xl text-coral-red font-semibold">Invoice items</h2>

          <InvoiceItemsForm
            handleInvoiceItemSubmit={handleInvoiceItemSubmit}
            itemDesc={itemDesc}
            setItemDesc={setItemDesc}
            itemQty={itemQty}
            setItemQty={setItemQty}
            itemRate={itemRate}
            setItemRate={setItemRate}
          />

          <InvoiceItems
            invoiceItems={invoiceItems}
            handleInvoiceItemDelete={handleInvoiceItemDelete}
            generateInvoiceID={generateInvoiceID}
          />

        </div>
      </div>
    </section>
  )
}

export default NewInvoice