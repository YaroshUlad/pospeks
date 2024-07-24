import { FC, useMemo } from 'react'

import Table from '@/components/Table'

import { TermoModel } from '@/models/termo.model.ts'

interface TermoTableProps {
  dataSource: TermoModel[]
}

const TermoTable: FC<TermoTableProps> = ({ dataSource }) => {
  const depths = useMemo(() => {
    const result = []

    for (let i = 0; i <= 30; i += 0.5) {
      result.push(i)
    }

    return result
  }, [])

  return (
    <Table<TermoModel> dataSource={dataSource}>
      <Table.Column<TermoModel>
        dataKey={'time'}
        title={'Дата и время измерения'}
        width={'300px'}
        sticky
        render={(record) => record.time}
        sortable
      />

      <Table.Column<TermoModel>
        dataKey={'temp'}
        title={'T'}
        width={'50px'}
        sticky
        render={(record) => record.criticalTemperature}
      />

      <Table.ColumnGroup group={'Глубина'}>
        {depths.map((depth, index) => {
          return (
            <Table.Column<TermoModel>
              dataKey={`${depth}`}
              key={index}
              width={'50px'}
              title={`${depth}`}
              render={(record) => record.data[depth]?.value || ''}
            />
          )
        })}
      </Table.ColumnGroup>
    </Table>
  )
}

export default TermoTable
