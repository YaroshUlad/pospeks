import TermoTable from '@/modules/termo/components/TermoTable'
import { useGetTermoForTableQuery } from '@/modules/termo/termo.api.ts'

const FetchAndRenderTermoData = () => {
  const {
    data: termoData,
    isFetching: termoFetching,
    isLoading: termoLoading,
  } = useGetTermoForTableQuery()

  return <TermoTable dataSource={termoData} loading={termoFetching || termoLoading} />
}

export default FetchAndRenderTermoData
