import {
  Children,
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import classNames from 'classnames'

import BSTable from 'react-bootstrap/Table'
import TableColumn from '@/components/Table/TableColumn'
import TableColumnGroup from '@/components/Table/TableColumnGroup'

import type { TableColumnGroupProps } from '@/components/Table/TableColumnGroup'
import type { TableColumnProps } from '@/components/Table/TableColumn'
import { sortCompareFunction } from '@/core/sort.ts'

interface CustomTableProps<T> {
  width?: CSSProperties['width']
  height?: CSSProperties['height']

  dataSource?: T[]

  children: (ReactElement<TableColumnProps<T>> | ReactElement<TableColumnGroupProps<T>>)[]

  caption?: string
  captionSide?: CSSProperties['captionSide']
}

const Table = <T,>({
  children,
  width,
  height,
  dataSource,
  caption,
  captionSide,
}: CustomTableProps<T>) => {
  const [sort, setSort] = useState<{ dataKey: string; value: 'asc' | 'desc' | null } | null>(null)

  const groups = useMemo(() => {
    const allGroups = Children.map(children, (child) => {
      const typedChild = child as ReactElement<TableColumnGroupProps<T>>
      return typedChild.props.group
    })

    const grM = new Map<string, ReactElement<TableColumnProps<T>>[]>()

    allGroups.forEach((group) => {
      if (grM.has(group)) return

      grM.set(
        group,
        Children.map(children, (child) => {
          if (!('group' in child.props) || child.props.group !== group) return

          const typedChild = child as unknown as ReactElement<TableColumnGroupProps<T>>

          return typedChild.props.children
        }).flat(),
      )
    })
    return grM
  }, [children])

  const columns = useMemo(() => {
    const result: ReactElement<TableColumnProps<T>>[] = []

    Children.forEach(children, (child) => {
      if ('title' in child.props) {
        const typedChild = child as ReactElement<TableColumnProps<T>>

        result.push(typedChild)
        return
      }
      const typedChild = child as ReactElement<TableColumnGroupProps<T>>
      const group = typedChild.props.group

      if (!groups.has(group)) return

      const columnsFromGroup = groups.get(group)

      columnsFromGroup?.forEach((col) => {
        result.push(col)
      })
    })

    return result
  }, [children, groups])

  const sortedDataSource = useMemo(() => {
    if (!sort) return dataSource
    if (!dataSource) return dataSource
    if (sort && !sort.value) return dataSource
    if (sort && !sort.dataKey) return dataSource

    return [...dataSource].sort(
      sortCompareFunction({
        ascending: sort.value === 'asc',
        sortBy: columns.find((c) => c.props.dataKey === sort.dataKey)!.props.render,
      }),
    )
  }, [sort, dataSource])

  const colgroup = useMemo(() => {
    return (
      <colgroup>
        {Children.map(columns, (column, index) => {
          return <col key={index} width={column.props.width} />
        })}
      </colgroup>
    )
  }, [columns])

  const handleSetSort = useCallback((dataKey: string) => {
    setSort((sort) => ({
      dataKey,
      value:
        !sort || sort.dataKey !== dataKey || (sort.dataKey === dataKey && !sort.value)
          ? 'asc'
          : sort.dataKey === dataKey && sort.value === 'asc'
            ? 'desc'
            : null,
    }))
  }, [])

  const getSortIcon = useCallback(
    (dataKey: string) => {
      return sort && sort.dataKey === dataKey && sort.value === 'asc'
        ? 'up'
        : sort && sort.dataKey === dataKey && sort.value === 'desc'
          ? `down`
          : 'def'
    },
    [sort],
  )

  const mainTableRow = useMemo(() => {
    return (
      <tr>
        {Children.map(children, (child) => {
          const props = child.props

          let columnTitle = ''
          let colSpan: number | undefined = undefined
          let rowSpan: number | undefined = undefined

          let sortable: boolean = false
          let dataKey: string = ''

          if ('group' in props) {
            columnTitle = props.group
            colSpan = props.children.length
            rowSpan = undefined
          }

          if ('title' in props) {
            columnTitle = props.title
            rowSpan = [...groups.keys()].length > 0 ? 2 : undefined
            sortable = !!props.sortable
            dataKey = props.dataKey
          }

          return (
            <th
              className={'title' in props && props.sticky ? 'sticky-th' : undefined}
              scope='col'
              colSpan={colSpan}
              rowSpan={rowSpan}
            >
              {columnTitle}
              {sortable && (
                <div
                  className={'cursor'}
                  onClick={() => {
                    handleSetSort(dataKey)
                  }}
                >
                  {getSortIcon(dataKey)}
                </div>
              )}
            </th>
          )
        })}
      </tr>
    )
  }, [children, sort])

  const tableRowForGroupsColumns = useMemo(() => {
    const groupsKeys = [...groups.keys()]
    if (groupsKeys.length === 0) return null

    const preparedColumns: ReactElement[] = []

    groupsKeys.forEach((key, groupIndex) => {
      if (!groups.has(key)) return

      const columns = groups.get(key)

      if (!columns) return

      columns.forEach((col, index) => {
        preparedColumns.push(
          <th scope='col' key={`${groupIndex}_${index}`}>
            {col.props.title}
            {col.props.sortable && (
              <div
                onClick={() => {
                  handleSetSort(col.props.dataKey)
                }}
              >
                {getSortIcon(col.props.dataKey)}
              </div>
            )}
          </th>,
        )
      })
    })

    if (preparedColumns.length === 0) return null

    return <tr>{preparedColumns}</tr>
  }, [groups])

  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    const table = tableRef.current

    if (!table) return

    const trs = table.getElementsByTagName('tr')

    const trsArray = [...trs]

    trsArray.forEach((tr) => {
      const stickyTdElms = tr.getElementsByClassName('sticky-td')
      const stickyTdElmsArr = [...stickyTdElms] as HTMLTableCellElement[]

      stickyTdElmsArr.forEach((td) => {
        td.style.position = 'sticky'
        if (td.offsetLeft + td.offsetWidth >= tr.offsetWidth) {
          td.style.right = `${tr.offsetWidth - td.offsetLeft - td.offsetWidth}px`
          return
        }

        td.style.left = `${td.offsetLeft}px`
      })

      const stickyThElms = tr.getElementsByClassName('sticky-th')
      const stickyThElmsArr = [...stickyThElms] as HTMLTableCellElement[]

      stickyThElmsArr.forEach((th) => {
        th.style.position = 'sticky'
        if (th.offsetLeft + th.offsetWidth >= tr.offsetWidth) {
          th.style.right = `${tr.offsetWidth - th.offsetLeft - th.offsetWidth}px`

          return
        }

        th.style.left = `${th.offsetLeft}px`
      })
    })
  }, [])

  return (
    <div
      className={classNames('d-flex flex-column position-relative overflow-auto', {
        ['w-100']: !width,
        ['h-100']: !height,
      })}
    >
      <BSTable
        ref={tableRef}
        bordered
        hover
        striped
        variant={'dark'}
        className={'mb-0'}
        style={{ tableLayout: 'fixed' }}
      >
        {caption && <caption style={{ captionSide }}>{caption}</caption>}
        {colgroup}

        <tbody>
          {sortedDataSource?.map((el, sourceIndex) => {
            return (
              <tr key={sourceIndex}>
                {columns.map(({ props }, index) => {
                  const css: CSSProperties = {
                    // position: props.sticky ? 'sticky' : undefined,
                    // left: 0,
                    overflow: 'hidden',
                  }
                  return (
                    <td key={index} style={css} className={props.sticky ? 'sticky-td' : undefined}>
                      {columns[index].props.render?.(el)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>

        <thead className={classNames('position-sticky top-0')}>
          {mainTableRow}
          {tableRowForGroupsColumns}
        </thead>
      </BSTable>
    </div>
  )
}

export default Object.assign(Table, { Column: TableColumn, ColumnGroup: TableColumnGroup })
