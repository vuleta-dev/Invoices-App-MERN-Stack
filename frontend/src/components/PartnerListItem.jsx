import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PartnerListItem = ({ partnerid, name, address, city, zip, country, handleDeletePartner }) => {

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePartner(partnerid);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      <div className="flex gap-9 border-b-2 py-3 bg-slate-50 mt-2 hover:bg-slate-200">
        <div className="sm:w-[150px] pl-4">{name}</div>
        <div className="sm:w-[400px] flex-1">{address}, {city}, {zip}, {country}</div>

        <div className="sm:w-[150px]">
          <Link className="bg-green-500 py-1 px-3 rounded-md leading-normal text-white hover:bg-green-800 mr-4" to={`/edit-partner/${partnerid}`}>edit</Link>

          <Link onClick={() => handleDeleteClick()} className="bg-red-500 py-1 px-3 rounded-md leading-normal text-white hover:bg-red-800">delete</Link>
        </div>
      </div>

      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className='font-palanquin'>Are you sure you want to delete this partner?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white mr-2 font-palanquin"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 font-palanquin"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PartnerListItem