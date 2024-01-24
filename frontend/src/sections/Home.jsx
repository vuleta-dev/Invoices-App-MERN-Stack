import { useState, useContext } from 'react';
import ActionLink from '../components/ActionLink';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CalendarOutlined, FundOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import DataContext from '../context/DataContext';

const Home = () => {

  const { invoices } = useContext(DataContext);

  // Function to get the name of the month
  const getMonthName = (monthNumber) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber];
  };

  // Function to get the last 5 months
  const getLastFiveMonths = () => {
    const today = new Date();
    const months = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }
    return months;
  };

  // Calculate numbers for stats
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(invoice => invoice.Status == true).length;
  const unpaidInvoices = invoices.filter(invoice => invoice.Status == false).length;


  const countInvoicesByMonthYear = (targetMonth, targetYear) => {
    const matchingInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.Date);

      // Check if the month and year of the invoice match the target month and year
      return (
        invoiceDate.getMonth() + 1 === targetMonth && // 0+1
        invoiceDate.getFullYear() === targetYear
      );
    });

    return matchingInvoices.length;
  };


  const numberOfMatchingInvoices = countInvoicesByMonthYear(1, 2024);
  const lastFiveMonths = getLastFiveMonths();
  const labels = lastFiveMonths.map(({ month, year }) => `${getMonthName(month)} - ${year}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Invoice stats",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: lastFiveMonths.map(({ month, year }) => countInvoicesByMonthYear(month + 1, year)),
      },
    ],
  };

  return (

    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">
      <Helmet>
        <title>Stats - Invoice App</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Stats</h1>


      <div className='flex gap-5'>

        <div className='w-full md:w-1/3 bg-gray-600 rounded-md px-4 py-3'>
          <div className='flex'><FundOutlined className='mt-1 mr-1 leading-3 text-white' /><h2 className='text-white text-l'> Total invoices</h2></div>
          <p className='text-white text-3xl font-bold leading-9'>{totalInvoices}</p>
        </div>

        <div className='w-full md:w-1/3 bg-green-600 rounded-md px-4 py-3'>
          <div className='flex'><FundOutlined className='mt-1 mr-1 leading-3 text-white' /><h2 className='text-white text-l'> Paid invoices</h2></div>
          <p className='text-white text-3xl font-bold leading-9'>{paidInvoices}</p>
        </div>

        <div className='w-full md:w-1/3 bg-red-600 rounded-md px-4 py-3'>
          <div className='flex'><FundOutlined className='mt-1 mr-1 leading-3 text-white' /><h2 className='text-white text-l'> Unpaid invoices</h2></div>
          <p className='text-white text-3xl font-bold leading-9'>{unpaidInvoices}</p>
        </div>

      </div>



      <div className='flex flex-col md:flex-row gap-5 md:h-80 mt-7'>

        <div className='w-full md:w-2/3'>
          <Line data={data} />
        </div>

        <div className='w-full md:w-1/3 '>
          <ul>
            {lastFiveMonths.map(({ month, year }) => {
              const numberOfMatchingInvoices = countInvoicesByMonthYear(month + 1, year);
              return (
                <li key={`${year}-${month}`} className='mt-2 px-3 flex justify-between py-3 border-b-2 border-dotted bg-gray-100'>
                  <div className='flex'>
                    {`${getMonthName(month)} - ${year}`}
                  </div>
                  <div>{numberOfMatchingInvoices}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Home