import { Link } from 'react-router-dom';
import PartnersList from '../components/PartnersList'
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Partners = () => {

  const { partners, handleDeletePartner } = useContext(DataContext);

  return (
    <section className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">

      <Helmet>
        <title>Partners - Invoice App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">Partners</h1>

      <p className='pb-6 pt-3'>Total partners: {partners.length}</p>

      <Link to="../new-partner" className='px-5 py-3 border font-montserrat text-sm leading-none bg-coral-red rounded-xl text-white hover:bg-slate-600'>New partner</Link>

      {partners.length ? (<PartnersList partners={partners} handleDeletePartner={handleDeletePartner} />)
        :
        (<p className='text-center mt-12 mb-4 text-gray-500'>No partners to display</p>)}

    </section>
  )
}

export default Partners