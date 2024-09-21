import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../ApiService'
import moment from 'moment/moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportExcel from '../../../components/ExportExcel'

const ZoneTable = () => {
  const [defects, setDefects] = useState([])
  const [filteredDefects, setFilteredDefects] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [defectIdToDelete, setDefectIdToDelete] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(15)
  const [fil, setfil] = useState(defects.length)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [fromDate, setFromDate] = useState(null);
const [toDate, setToDate] = useState(null);


  useEffect(() => {
    fetchData()
  }, [])



  useEffect(() => {
    applyFilters()
  }, [defects, sortBy, sortOrder, currentPage, searchTerm, fromDate, toDate])

  const fetchData = async () => {
    try {
      const response = await ApiService.request('get', '/api/all-zone-records', null, {}, navigate)
      setDefects(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch defects')
    }
  }

  // Apply sorting and pagination
  const applyFilters = () => {
    let filteredData = [...defects]

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filteredData = filteredData.filter(
        (defect) =>
          defect.engine_serial_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.defect_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.action_taken.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.operator_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.station_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.screen_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          defect.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (fromDate || toDate) {
      filteredData = filteredData.filter((defect) => {
        const defectDate = moment(defect.updated_at).toDate();
        const isAfterFromDate = fromDate ? defectDate >= fromDate : true;
        const isBeforeToDate = toDate ? defectDate <= toDate : true;
        return isAfterFromDate && isBeforeToDate;
      });
    }
  

    // Apply sorting
    if (sortBy) {
      filteredData.sort((a, b) => {
        const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy]
        const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy]
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    setfil(filteredData)

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    filteredData = filteredData.slice(startIndex, endIndex)

    setFilteredDefects(filteredData)
  }

  // Sorting function
  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Delete defect
  const deleteDefect = (defectId) => {
    const updatedDefects = defects.filter((defect) => defect.id !== defectId)
    setDefects(updatedDefects)
    toast.success('Defect deleted successfully')
    setShowConfirmModal(false)
  }

  // Toggle delete confirmation modal
  const toggleConfirmModal = (defectId) => {
    setShowConfirmModal(!showConfirmModal)
    setDefectIdToDelete(defectId)
  }

  // Prepare data for CSV export
  const csvData = defects.map((defect) => ({
    'Engine Serial No': defect.engine_serial_no,
    'Defect Name': defect.defect_name,
    'Action Taken': defect.action_taken,
    'Operator Name': defect.operator_name,
    'Station ID': defect.station_id,
    'Screen No': defect.screen_no,
    'User' : defect.user,
    'Updated At': moment(defect.updated_at).format(" HH:mm:ss DD/MM/YYYY")
  }))

  const csvHeaders = [
    { label: 'Engine Serial No', key: 'Engine Serial No' },
    { label: 'Defect Name', key: 'Defect Name' },
    { label: 'Action Taken', key: 'Action Taken' },
    { label: 'Operator Name', key: 'Operator Name' },
    { label: 'Station ID', key: 'Station ID' },
    { label: 'Zone', key: 'Screen No' },
    { label: 'User', key: 'User' },
    { label: 'Creation Time', key: 'Updated At' }
  ]

  return (
    <CRow style={{ width: "100%", margin: "0", padding: "0" }}>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Defects</strong>
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex">
                <div className="mr-2">
                  <label>From:</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Select Start Date"
                  />
                </div>
                <div>
                  <label>To:</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Select End Date"
                  />
                </div>
              </div>
            </div>
            {/* <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="defects.csv"
              className="btn btn-success"
            >
              Download CSV
            </CSVLink> */}

            <ExportExcel defects={fil} fromDate={fromDate} toDate={toDate} />
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-between mb-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <CTable hover striped responsive bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("engine_serial_no")}
                  >
                    Engine Serial No{" "}
                    {sortBy === "engine_serial_no" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("defect_name")}
                  >
                    Defect Name{" "}
                    {sortBy === "defect_name" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("action_taken")}
                  >
                    Action Taken{" "}
                    {sortBy === "action_taken" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("operator_name")}
                  >
                    Operator Name{" "}
                    {sortBy === "operator_name" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("station_id")}
                  >
                    Station ID{" "}
                    {sortBy === "station_id" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("screen_no")}
                  >
                    Zone{" "}
                    {sortBy === "screen_no" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("user")}
                  >
                    User{" "}
                    {sortBy === "screen_no" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort("updated_at")}
                  >
                    Creation Time{" "}
                    {sortBy === "updated_at" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </CTableHeaderCell>
                  {localStorage.getItem("role") === "admin" && (
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  )}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredDefects.length > 0 &&
                  filteredDefects.map((defect, index) => (
                    <CTableRow key={defect.id}>
                      <CTableHeaderCell scope="row">
                        {index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell>{defect.engine_serial_no}</CTableDataCell>
                      <CTableDataCell>{defect.defect_name}</CTableDataCell>
                      <CTableDataCell>{defect.action_taken}</CTableDataCell>
                      <CTableDataCell>{defect.operator_name}</CTableDataCell>
                      <CTableDataCell>
                        Station {defect.station_id}
                      </CTableDataCell>
                      <CTableDataCell>Zone {defect.screen_no}</CTableDataCell>
                      <CTableDataCell>{defect.user}</CTableDataCell>
                      <CTableDataCell>
                        {moment(defect.updated_at).format(
                          " HH:mm:ss DD/MM/YYYY"
                        )}
                      </CTableDataCell>
                      {localStorage.getItem("role") === "admin" && (
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => toggleConfirmModal(defect.id)}
                          >
                            Delete
                          </CButton>
                        </CTableDataCell>
                      )}
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <nav>
              <ul className="pagination">
                {Array.from({
                  length: Math.ceil(fil.length / itemsPerPage),
                }).map((_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Delete Confirmation Modal */}
      <CModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this defect?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </CButton>
          <CButton
            color="danger"
            onClick={() => deleteDefect(defectIdToDelete)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </CRow>
  );
}

export default ZoneTable
