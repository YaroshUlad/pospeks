import { FC } from 'react'

import Table from '@/components/Table'

import { DeformationModel } from '@/models/deformation.model.ts'

interface DeformationTableProps {
  dataSource: DeformationModel[]
}

const DeformationTable: FC<DeformationTableProps> = ({ dataSource }) => {
  return (
    <Table<DeformationModel> dataSource={dataSource}>
      <Table.Column<DeformationModel>
        dataKey={'time'}
        title={'Дата и время измерения'}
        width={'300px'}
        sticky
        sortable
        render={(record) => record.time}
      />
      <Table.Column<DeformationModel>
        dataKey={'loop'}
        title={'Цикл измерения'}
        width={'350px'}
        sortable
        render={() => Math.ceil(Math.random() * 4)}
      />
      <Table.Column<DeformationModel>
        dataKey={'mark'}
        title={'Отметка, м'}
        width={'350px'}
        render={(record) => record.data.value}
      />
      <Table.Column<DeformationModel>
        dataKey={'del'}
        title={'Дельта, м'}
        width={'300px'}
        render={(record) => record.data.delta}
      />
    </Table>
  )
}

export default DeformationTable
