import FetchAndRenderDeformationData from '@/modules/deformation/components/FetchAndRenderDeformationData'
import FetchAndRenderTermoData from '@/modules/termo/components/FetchAndRenderTermoData'
import DateFilter from '@/modules/dateFilter/components/DatePicker'

function App() {
  return (
    <div className={'container-fluid'}>
      <div className={'m-5 d-flex flex-column'}>
        <div className={'d-flex flex-column mb-4'}>
          <h4 className={'mb-4'}>Фильтр по дате</h4>
          <DateFilter />
        </div>
        <div style={{ height: '250px' }}>
          <FetchAndRenderDeformationData />
        </div>
      </div>

      <hr />

      <div className={'m-5'} style={{ height: '250px' }}>
        <FetchAndRenderTermoData />
      </div>
    </div>
  )
}

export default App
