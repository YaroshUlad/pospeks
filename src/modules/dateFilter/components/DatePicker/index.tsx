import DatePicker from 'react-multi-date-picker'

import { useAppDispatch, useAppSelector } from '@/core/store'

import { setMaxDate, resetDateFilter, setMinDate } from '@/modules/dateFilter/dateFilter.slice.ts'
import { TIME_FORMAT } from '@/core/time.format.ts'

const DateFilter = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector((state) => state.filter.min)
  const max = useAppSelector((state) => state.filter.max)

  return (
    <div className={'d-flex align-items-center'}>
      <DatePicker
        range
        style={{ height: 40, marginRight: 20 }}
        value={[min, max]}
        onChange={(...args) => {
          const { 1: options } = args

          if (!options) return
          if (!options.validatedValue) return

          const value = options.validatedValue as string[]

          const { 0: min, 1: max } = value

          if (value.length === 0) {
            dispatch(resetDateFilter())
            return
          }

          if (value.length === 1) {
            dispatch(setMinDate(min))
            dispatch(setMaxDate(null))
            return
          }

          dispatch(setMinDate(min))
          dispatch(setMaxDate(max))
          return
        }}
        format={TIME_FORMAT}
      />
      <button className={'btn btn-primary'} onClick={() => dispatch(resetDateFilter())}>
        Сбросить
      </button>
    </div>
  )
}

export default DateFilter
