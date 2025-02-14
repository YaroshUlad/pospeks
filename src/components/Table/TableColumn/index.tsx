import { CSSProperties, ReactNode } from 'react'

export interface TableColumnProps<T> {
  dataKey: string
  title: string
  width?: CSSProperties['width']
  render?: (record: T) => ReactNode
  sticky?: boolean
  sortable?: boolean
  onSortChange?: (isAsc: boolean | null) => void
}

const TableColumn = <T = unknown,>(_: TableColumnProps<T>) => null

TableColumn.displayName = 'Column'

export default TableColumn
