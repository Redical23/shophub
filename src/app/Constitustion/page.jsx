'use client'
import React, { useEffect, useState } from 'react';
import LAHEAD from '../slidebar/LAHEAD';
import CONSTITUTIONTEMP from '../templates/CONSTITUTIONTEMP';
import Footer from '../slidebar/FOOTER';

const Page = () => {
  const [newss, setNewss] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch('/api/consitution')
      .then(response => response.json())
      .then(data => {
        setNewss(data);
        setFilteredUsers(data); // Initially set filteredUsers to all users
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const filterCases = (caseType) => {
    const filtered = newss.filter(item => item.filler === caseType);
    setFilteredUsers(filtered);
    setPage(1); // Reset to first page after filtering
  };

  const showAllCases = () => {
    setFilteredUsers(newss);
    setPage(1); // Reset to first page
  };

  const caseTypes = [
    'Family Court',
    'Corporate Case',
    'Property Disputes',
    'Consumer Cases',
    'Taxation Cases',
    'Intellectual Property Cases',
    'Employment & Labor Cases',
    'Environmental Cases',
    'Contract Disputes',
    'Criminal Offenses',
    'Economic Offenses',
    'Cybercrime Cases',
    'Corruption Cases',
    'Narcotics & Drugs Cases',
    'Traffic Violations & Motor Accident Cases',
    'Dowry & Domestic Violence Cases'
  ];

  const usersPerPage = 9;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div>
    
      <div className="flex justify-center my-4 flex-wrap gap-2">
        <button 
          onClick={showAllCases} 
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Show All
        </button>
        {caseTypes.map((type, index) => (
          <button 
            key={index} 
            onClick={() => filterCases(type)} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {type}
          </button>
        ))}
      </div>
      <div>
        <CONSTITUTIONTEMP constitution={selectedUsers} />
      </div>
      <div className="pagination-controls flex justify-center mt-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn mx-2 px-4 py-2 border rounded-lg text-lg ${
              page === index + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-black border-gray-300'
            } hover:bg-gray-200 focus:outline-none`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
