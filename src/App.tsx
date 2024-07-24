import { mackData, mockThermo } from '@/mock.ts'

import TermoTable from '@/modules/termo/components/TermoTable'
import DeformationTable from '@/modules/deformation/components/DeformationTable'
import { useEffect } from 'react'
import api from '@/core/api/api.ts'

function App() {
  useEffect(() => {
    api.services.deformation.fetchDeformations().then((res) => console.log(res.data.data))
    api.services.termo.fetchTermo().then((res) => console.log(res.data.data))
  }, [])

  return (
    <div className={'container-fluid '}>
      <div style={{ height: '250px', width: '1000px' }}>
        <DeformationTable dataSource={mackData} />
        <TermoTable dataSource={mockThermo} />
      </div>
    </div>
  )
}

export default App
