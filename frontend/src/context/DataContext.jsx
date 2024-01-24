import { createContext, useState, useEffect } from "react";
import { Await, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios, { all } from 'axios';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [invoices, setInvoices] = useState([]);
  const [searchInvoices, setSearchInvoices] = useState('');
  const [invoicesSearchResults, setInvoicesSearchResults] = useState([]);
  const [partners, setPartners] = useState([]);

  const [invoiceItems, setInvoiceItems] = useState([]);

  // New Invoice
  const [invoiceID, setInvoiceID] = useState('')
  const [invoiceDbID, setInvoiceDbID] = useState('')
  const [invoicePartnerid, setInvoicePartnerid] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState(false);

  // New Partner
  const [partnerId, setPartnerID] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerAddress, setPartnerAddress] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerZip, setPartnerZip] = useState('');
  const [partnerCountry, setPartnerCountry] = useState('');

  // Edit Partner
  const [editPartnerId, setEditPartnerID] = useState('');
  const [editPartnerName, setEditPartnerName] = useState('');
  const [editPartnerAddress, setEditPartnerAddress] = useState('');
  const [editPartnerCity, setEditPartnerCity] = useState('');
  const [editPartnerZip, setEditPartnerZip] = useState('');
  const [editPartnerCountry, setEditPartnerCountry] = useState('');

  const navigate = useNavigate();

  // Create new invoice
  const handleInvoiceSubmit = async (e, id) => {
    e.preventDefault()

    const createInvoice = {
      id: invoiceID,
      partnerid: invoicePartnerid,
      Date: invoiceDate,
      DueDate: invoiceDueDate,
      Status: Boolean(invoiceStatus)
    }

    try {
      const response = await axios.post(`${apiUrl}invoices`, createInvoice)
      const allInvoices = [...invoices, response.data];
      setInvoices(allInvoices)

      // Clear Form
      setInvoicePartnerid('');
      setInvoiceDate('');
      setInvoiceDueDate('');
      setInvoiceStatus('');

      navigate('../invoices');

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  // Edit invoice
  const handleInvoiceEditSubmit = async (e, id) => {
    e.preventDefault()

    const createInvoice = {
      partnerid: invoicePartnerid,
      Date: invoiceDate,
      DueDate: invoiceDueDate,
      Status: JSON.parse(invoiceStatus)
    }

    try {
      const response = await axios.patch(`${apiUrl}invoices/${id}`, createInvoice)
      setInvoices(invoices.map(invoice => invoice._id === id ? { ...response.data } : invoice))
      navigate('/invoices');

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  // Create new partner
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();

    const id = partners.length ? partners[partners.length - 1].id + 1 : 1;

    const createPartner = {
      id,
      name: partnerName,
      address: partnerAddress,
      city: partnerCity,
      zip: partnerZip,
      country: partnerCountry
    }
    try {
      const response = await axios.post(`${apiUrl}partners`, createPartner)
      const allPartners = [response.data, ...partners];
      setPartners(allPartners)

      // Clear form
      setPartnerName('');
      setPartnerAddress('');
      setPartnerCity('');
      setPartnerZip('');
      setPartnerCountry('');

      navigate('/partners')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  // Edit partner
  const handleEditPartner = async (id) => {
    const updatePartner = {
      id,
      name: editPartnerName,
      address: editPartnerAddress,
      city: editPartnerCity,
      zip: editPartnerZip,
      country: editPartnerCountry
    }

    try {
      const response = await axios.patch(`${apiUrl}partners/${id}`, updatePartner)
      setPartners(partners.map(partner => partner._id == id ? { ...response.data } : partner));
      navigate('/partners');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  // Invoices item
  useEffect(() => {
    const fetchInvoiceItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}items`);
        setInvoiceItems(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchInvoiceItems();

  }, [])

  // Invoices data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}invoices`);
        setInvoices(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();

  }, [])


  // Partners data
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${apiUrl}partners`);
        setPartners(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPartners();

  }, [])


  useEffect(() => {
    const filteredResults = invoices.filter((invoice) => {
      const partner = partners.find((p) => p._id === invoice.partnerid);
      const partnerName = partner ? partner.name : '';

      return (
        partnerName.toLowerCase().includes(searchInvoices.toLowerCase()) ||
        invoice.Date.toLowerCase().includes(searchInvoices.toLowerCase())
      );
    });

    setInvoicesSearchResults(filteredResults.reverse());
  }, [invoices, partners, searchInvoices]);


  // Delete Invoice
  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`${apiUrl}invoices/${id}`)
      const invoicesList = invoices.filter(invoice => invoice._id !== id)
      setInvoices(invoicesList)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // Delete Partner
  const handleDeletePartner = async (id) => {
    try {
      await axios.delete(`${apiUrl}partners/${id}`)
      const partnersList = partners.filter(partner => partner._id !== id)
      setPartners(partnersList)

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <DataContext.Provider value={{

      invoices, partners, searchInvoices, setSearchInvoices, handleDeleteInvoice, handleInvoiceSubmit, invoiceID, setInvoiceID, invoicePartnerid, setInvoicePartnerid, invoiceDate, setInvoiceDate, invoiceDueDate, setInvoiceDueDate, invoiceStatus, setInvoiceStatus, invoiceItems, setInvoiceItems, partnerName, setPartnerName, partnerAddress, setPartnerAddress, partnerCity, setPartnerCity, partnerZip, setPartnerZip, partnerCountry, setPartnerCountry, handlePartnerSubmit, handleInvoiceEditSubmit, handleEditPartner, editPartnerName, setEditPartnerName, editPartnerAddress, setEditPartnerAddress, editPartnerCity, setEditPartnerCity, editPartnerZip, setEditPartnerZip, editPartnerCountry, setEditPartnerCountry, handleDeletePartner, invoicesSearchResults

    }}>
      {children}
    </DataContext.Provider>
  )
}


export default DataContext;