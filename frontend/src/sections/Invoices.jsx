import { Link } from 'react-router-dom';
import InvoicesList from '../components/InvoicesList';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Invoices = () => {

  const { invoicesSearchResults, partners, searchInvoices, setSearchInvoices, handleDeleteInvoice, invoiceItems } = useContext(DataContext);

  return (

    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">
      <Helmet>
        <title>Invoices - Invoice App</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Invoices list</h1>

      <p className='pb-6 pt-3'>Total invoices: {invoicesSearchResults.length}</p>

      <div className='flex justify-between'>
        <Link to="../new-invoice" className='px-5 py-3 border font-montserrat text-sm leading-none bg-coral-red rounded-xl text-white hover:bg-slate-600'>New Invoice</Link>

        <form className='flex-shrink-0 w-2/5' onSubmit={(e) => e.preventDefault()}>
          <input className='input'
            type='text'
            placeholder='search invoices'
            value={searchInvoices}
            onChange={(e) => setSearchInvoices(e.target.value)}
          />
        </form>
      </div>

      {invoicesSearchResults.length ? (<InvoicesList invoices={invoicesSearchResults} partners={partners} handleDeleteInvoice={handleDeleteInvoice} invoiceItems={invoiceItems} />)
        :
        (<p className='text-center mt-12 mb-4 text-gray-500'>No invoices to display</p>)}
    </section>
  )
}

export default Invoices;