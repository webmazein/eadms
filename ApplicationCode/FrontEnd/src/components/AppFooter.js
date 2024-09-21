import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2024 TND.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://thenewdimensionz.com" target="_blank" rel="noopener noreferrer">
          The New Dimensionz
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
