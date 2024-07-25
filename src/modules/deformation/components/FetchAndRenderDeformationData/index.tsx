import { useMemo } from 'react'

import DeformationTable from '@/modules/deformation/components/DeformationTable'

import { useGetDeformationsForTableQuery } from '@/modules/deformation/deformation.api.ts'
import { useAppSelector } from '@/core/store'

import dayjs from 'dayjs'

import { TIME_FORMAT } from '@/core/time.format.ts'

const FetchAndRenderDeformationData = () => {
  const min = useAppSelector((state) => state.filter.min)
  const max = useAppSelector((state) => state.filter.max)

  const {
    data,
    isFetching: deformationFetching,
    isLoading: deformationLoading,
  } = useGetDeformationsForTableQuery()

  const deformationData = useMemo(() => {
    if (!data) return

    if (!min && !max) return data

    if (!max) {
      return data.filter((el) => dayjs(el.time).isAfter(dayjs(min, TIME_FORMAT)))
    }

    return data.filter((el) => {
      return (
        dayjs(el.time).isAfter(dayjs(min, TIME_FORMAT)) &&
        dayjs(el.time).isBefore(dayjs(max, TIME_FORMAT))
      )
    })
  }, [min, max, data])

  return (
    <DeformationTable
      dataSource={deformationData}
      loading={deformationFetching || deformationLoading}
    />
  )
}

export default FetchAndRenderDeformationData
