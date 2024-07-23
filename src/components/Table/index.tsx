import { FC, ReactNode } from 'react'
import BSTable from 'react-bootstrap/Table'
import './table.css'

interface CustomTableProps {
  scrollable?: boolean
  header: ReactNode
  body: ReactNode
}

const Table: FC<CustomTableProps> = ({ scrollable = false, header, body }) => {
  return (
    <div
      className={`w-100 d-flex flex-column position-relative overflow-x-scroll ${scrollable && 'h-100 overflow-hidden'}`}
    >
      <div className={' {/*overflow-hidden*/} flex-shrink-0'}>
        <BSTable bordered hover className={'mb-0'} style={{ tableLayout: 'fixed' }}>
          {header}
        </BSTable>
      </div>
      <div className={`w-100  ${scrollable && 'overflow-y-auto overflow-x-hidden Scrollable'}`}>
        <div style={{ width: `calc(100% + ${scrollable ? '16px' : 0})` }}>
          <BSTable bordered hover striped className={'mb-0'} style={{ tableLayout: 'fixed' }}>
            {body}
          </BSTable>
        </div>
      </div>
    </div>
  )
}

export default Table
