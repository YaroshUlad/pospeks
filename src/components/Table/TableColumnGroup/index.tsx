import { ReactElement } from 'react'
import { TableColumnProps } from '@/components/Table/TableColumn'

export interface TableColumnGroupProps<T> {
  group: string
  children: ReactElement<TableColumnProps<T>>[]
}

const TableColumnGroup = <T = unknown,>(_: TableColumnGroupProps<T>) => {
  return null
}

export default TableColumnGroup
