import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Layout from '../layout/Layout';

// Make sure to bind the modal to your appElement (required for accessibility)
Modal.setAppElement('#root');

function DataTable() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedVoterIdUrl, setSelectedVoterIdUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const pageSize = 10; // Number of items per page

  useEffect(() => {
    fetchData();
  }, [currentPage, sortField, sortOrder]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bppindia.com/api/user/getBppMember', {
        params: {
          page: currentPage,
          limit: pageSize,
          sortField,
          sortOrder,
        },
      });

      const { data } = response.data;
      setData(data);
      setTotalPages(Math.ceil(data.length / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (url) => {
    setSelectedVoterIdUrl(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVoterIdUrl(null);
  };

  return (
    <Layout>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Voter ID List</h1>
      <hr/>
      <div className="overflow-x-auto my-2">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('_id')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Sr {sortField === '_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('firstName')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                First Name {sortField === 'firstName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('lastName')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Last Name {sortField === 'lastName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('fatherName')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Father Name {sortField === 'fatherName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('dob')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Date Of Birth {sortField === 'dob' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('gender')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Gender {sortField === 'gender' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('profession')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                profession {sortField === 'profession' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('state')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                State {sortField === 'state' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('country')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Country {sortField === 'country' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('voterId')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Voter id {sortField === 'voterId' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('phoneNo')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Phone No{sortField === 'phoneNo' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('email')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('docs')}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer text-nowrap"
              >
                Voter Card {sortField === 'docs' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="py-2 px-4 border-b border-gray-200 text-center text-sm text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row._id}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.firstName}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.lastName}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.fatherName}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.dob}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.gender}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.profession }</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.state}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.city}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.voterIdNo}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.phoneNo}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                   <div className='flex gap-2'>

                   <button
  onClick={() => handleOpenModal(row.voterIdFront)}
  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
>
  VoterIdFront
</button>
<button
  onClick={() => handleOpenModal(row.voterIdBack)}
  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
>
  VoterIdBack
</button>

                        </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
    <Modal
  isOpen={modalOpen}
  onRequestClose={handleCloseModal}
  contentLabel="Voter ID Document"
  className="fixed inset-0 bg-white p-4 w-full max-w-3xl h-3/4 mx-auto my-auto rounded shadow-lg relative"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <button
    onClick={handleCloseModal}
    className="absolute top-2 right-2 bg-gray-300 text-gray-800 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
  >
    <span className="text-xl font-bold">&times;</span>
  </button>
  <div className="relative w-full h-full">
    <iframe
      src={selectedVoterIdUrl}
      className="absolute inset-0 w-full h-full"
      title="Voter ID Document"
      frameBorder="0"
    ></iframe>
  </div>
</Modal>

    </div>
    </Layout>
  );
}

export default DataTable;
