import { useState } from 'react';
import { MenuOutlined, HomeOutlined, DatabaseOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  let location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full rounded-[20px] shadow-3xl px-8 py-4 mt-5">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold font-montserrat"><Link to="/">Invoices <span className='text-coral-red'>app</span></Link></div>

        {/* Hamburger/responsive menu */}
        <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
          <MenuOutlined />
        </div>

        <ul className="hidden md:flex justify-center space-x-4 items-center gap-8">

          <li><Link to="/" className={`font-montserrat leading-normal font-semibold ${location.pathname === '/' ? 'text-coral-red underline' : 'text-slate-gray'
            } hover:text-coral-red flex align-middle`} ><HomeOutlined className='mr-2 mt-0.5' /> Home / Stats</Link></li>

          <li><Link to="invoices" className={`font-montserrat leading-normal font-semibold ${location.pathname === '/invoices' || location.pathname === '/new-invoice' || location.pathname.startsWith('/edit-invoice') || location.pathname.startsWith('/pdf') ? 'text-coral-red underline' : 'text-slate-gray'
            } hover:text-coral-red flex align-middle`}><DatabaseOutlined className='mr-2 mt-0.5' /> Invoices</Link></li>

          <li><Link to="partners" className={`font-montserrat leading-normal font-semibold ${location.pathname === '/partners' || location.pathname === '/new-partner' || location.pathname.startsWith('/edit-partner') ? 'text-coral-red underline' : 'text-slate-gray'
            } hover:text-coral-red flex align-middle`}><ContactsOutlined className='mr-2 mt-0.5' /> Partners</Link></li>
        </ul>
      </div>

      {/* Responsive menu */}
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block py-2 px-4 hover:bg-coral-red hover:text-white hover:rounded-xl">Home / Stats</Link>
          <Link to="invoices" className="block py-2 px-4 hover:bg-coral-red hover:text-white hover:rounded-xl">Invoices</Link>
          <Link to="partners" className="block py-2 px-4 hover:bg-coral-red hover:text-white hover:rounded-xl">Partners</Link>
        </div>
      )}
    </nav>
  )
}

export default Header