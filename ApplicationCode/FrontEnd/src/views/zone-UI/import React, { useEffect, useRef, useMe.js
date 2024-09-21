import React, { useEffect, useRef, useMemo, useState } from 'react'
import { CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react'
import useWebSocket from 'react-use-websocket'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearDefects, selectDefectsByScreenNo, setDefects } from '../../redux/DefectsSlice'
import './style.css' // Import your CSS file for Zone component styling
import axios from 'axios'
import { backendUrl, websocketUrl } from '../../config';

const Zone = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const defects = useSelector((state) => selectDefectsByScreenNo(state, id))
  const prevDefectsRef = useRef(defects)
  const [alertTimer, setAlertTimer] = useState(5)

  const { sendMessage, lastMessage, readyState } = useWebSocket(`${websocketUrl}`, {
    onOpen: () => console.log('WebSocket connection established'),
    onClose: () => console.log('WebSocket connection closed'),
    onError: (error) => console.error('WebSocket error:', error),
    shouldReconnect: (closeEvent) => true,
  })


  return (
    <div className='con'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Engine Assembly Line Defect Monitoring System - Zone {id || '-'}
      </h2>
      <CRow className="g-4">
        {defectsArr.length > 0 &&
          defectsArr.map((defect, index) => (
            <CCol xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <CCard
                className={`defect-card ${defect.is_updated ? 'updated' : ''}`}
                style={defect.is_updated ? { animationDuration: `${alertTimer}s` } : {}}
              >
                <CCardBody>
                  <CTable>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row">Defect Name</CTableHeaderCell>
                        <CTableHeaderCell scope="row">Operator Name</CTableHeaderCell>
                        <CTableHeaderCell scope="row">Count</CTableHeaderCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>{defect.defect_name}</CTableDataCell>
                        <CTableDataCell>{defect.operator_name}</CTableDataCell>
                        <CTableDataCell>{defect.count || 1}</CTableDataCell>
                      </CTableRow>

                      {/* Assuming you want another row with the same data */}
                      <CTableRow>
                        <CTableDataCell>{defect.defect_name_hi || "-"}</CTableDataCell>
                        <CTableDataCell>{defect.operator_name}</CTableDataCell>
                        <CTableDataCell>{defect.count || 1}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
      </CRow>
    </div>
  )

}

export default Zone

