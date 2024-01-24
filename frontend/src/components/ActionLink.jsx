import React, { useState, useEffect, useRef } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ActionLink = ({ isOpen, toggleDropdown, id, handleDeleteInvoice }) => {
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if ((isOpen || isDeleteConfirmationOpen) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
      setDeleteConfirmationOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteConfirmationOpen(true);

  };

  const handleConfirmDelete = () => {
    handleDeleteInvoice(id);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleDropdown, isDeleteConfirmationOpen]);


  return (
    <div>
      <div className="relative inline-block text-left z-20" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="inline-flex justify-center items-center p-2 text-gray-600 hover:text-gray-800"
          onClick={toggleDropdown}>
          <EditOutlined />
        </button>

        {isOpen && (
          <div className="z-20 origin-top-right absolute right-7 mt-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link
                to={`/pdf/${id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Download PDF
              </Link>
              <Link
                to={`/edit-invoice/${id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Edit
              </Link>
              <Link
                onClick={() => { handleDeleteClick(); toggleDropdown(); }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Delete
              </Link>
            </div>
          </div>
        )}

        {isDeleteConfirmationOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className='font-palanquin'>Are you sure you want to delete this invoice?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white mr-2 font-palanquin">
                  Yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-gray-300 font-palanquin">
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionLink;
