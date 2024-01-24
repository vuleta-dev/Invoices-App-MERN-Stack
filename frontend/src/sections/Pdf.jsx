import React, { useContext } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';
import { useParams, Link } from "react-router-dom"
import { Helmet } from 'react-helmet';
import DataContext from '../context/DataContext';


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderColor: '#000',
  },
  companyInfo: {
    width: '40%',
  },
  invoiceInfo: {
    width: '40%',
  },
  customerInfo: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontSize: 14,
    width: '20%',
    textAlign: 'center',
    alignItems: 'center',
  },
  tableRow: {
    borderBottom: 1,
    borderColor: '#000',
    flexDirection: 'row',
  },
  tableCell: {
    padding: 8,
    width: '20%',
    textAlign: 'center',
    alignItems: 'center',
  },
  totalRow: {
    borderTop: 1,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  notes: {
    marginTop: 20,
  },
});


const MyDocument = ({ invoiceDetails, partnerDetails, invoiceFilteredItems }) => {

  let totalAmount = 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Invoice app LLC</Text>
        </View>

        <View style={{ ...styles.header, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.invoiceInfo}>
            <Text>Invoice Date: {new Date(invoiceDetails.Date).toLocaleDateString()}</Text>
            <Text>Due Date: {new Date(invoiceDetails.DueDate).toLocaleDateString()}</Text>
            <Text>Invoice Number: {invoiceDetails.id}</Text>
          </View>

          <View style={styles.customerInfo}>
            <Text>{partnerDetails.name}</Text>
            <Text>Address: {partnerDetails.address}</Text>
            <Text>City: {partnerDetails.city}</Text>
            <Text>ZIP: {partnerDetails.zip}</Text>
            <Text>Country: {partnerDetails.country}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Item</Text>
          <Text style={styles.tableHeader}>Description</Text>
          <Text style={styles.tableHeader}>Quantity</Text>
          <Text style={styles.tableHeader}>Rate</Text>
          <Text style={styles.tableHeader}>Total Amount</Text>
        </View>


        {invoiceFilteredItems.map((item, index) => {
          totalAmount = totalAmount + (item.qty * item.rate)

          return (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.desc}</Text>
              <Text style={styles.tableCell}>{item.qty}</Text>
              <Text style={styles.tableCell}>{item.rate}</Text>
              <Text style={styles.tableCell}>{item.qty * item.rate}</Text>
            </View>
          )
        })}

        <View style={styles.totalRow}>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}></Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}>Total: {totalAmount}</Text>
        </View>

        <View style={styles.notes}>
          <Text style={{ fontSize: 12, fontStyle: 'italic' }}>Notes:</Text>
          <Text>Payment is due by the due date mentioned above.</Text>
        </View>
      </Page>
    </Document>
  )
};

const Pdf = () => {

  const { invoices, partners, invoiceItems } = useContext(DataContext);

  const { id } = useParams();

  // Invoice details
  const invoiceDetails = invoices.find(invoice => invoice?._id === id);


  // Check if invoiceDetails is undefined
  if (!invoiceDetails) {
    return <div>Error: Invoice not found</div>;
  }

  // Partner details
  const partnerDetails = partners.find(partner => partner._id === invoiceDetails.partnerid)

  // Invoice items
  const invoiceFilteredItems = invoiceItems.filter(item => String(item.invoiceid) === String(invoiceDetails.id))

  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">

      <Helmet>
        <title>Download Invoice PDF - Invoice App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">New Invoice</h1>

      {invoiceDetails && partnerDetails && invoiceFilteredItems ? (
        <PDFDownloadLink document={<MyDocument invoiceDetails={invoiceDetails} partnerDetails={partnerDetails} invoiceFilteredItems={invoiceFilteredItems} />} fileName={id}>
          {({ blob, url, loading, error }) =>

            loading ? 'Loading document...'
              :
              <p>
                Your Invoice PDF document is ready.
                <br /><br />
                <button className="px-4 py-2 bg-green-500 text-white mr-2 font-palanquin">Download now!</button>
              </p>
          }
        </PDFDownloadLink>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default Pdf;
