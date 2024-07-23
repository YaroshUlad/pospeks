import Table from '@/components/Table'

interface TableColumn {
  title: string
  width?: string
}

function App() {
  const columns: TableColumn[] = [
    { title: 'asd', width: '350px' },
    { title: 'asd2', width: '350px' },
    { title: 'asd2', width: '350px' },
  ]
  return (
    <div className={'container-fluid '}>
      <div className={'w-50 '} style={{ height: '250px' }}>
        <Table
          // scrollable={true}
          header={
            <>
              <colgroup>
                {columns.map((el, index) => {
                  return <col key={index} width={el.width ? el.width : undefined} />
                })}
              </colgroup>
              <thead>
                {/*<tr>*/}
                {/*  <th colSpan={columns.length + 1}>Глубины</th>*/}
                {/*</tr>*/}

                <tr>
                  {columns.map((el, i) => {
                    return (
                      <th
                        key={i}
                        scope={'col'}
                        style={{
                          position: i === 0 ? 'sticky' : undefined,
                          left: 0,
                          width: '250px',
                        }}
                      >
                        {el.title}
                      </th>
                    )
                  })}
                </tr>
              </thead>
            </>
          }
          // body={
          //   <>
          //     <colgroup>
          //       {columns.map((el, index) => {
          //         return el.width ? (
          //           <col key={index} width={el.width} />
          //         ) : (
          //           <col key={index} width={'auto'} />
          //         )
          //       })}
          //     </colgroup>
          //     <tbody>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //       <tr>
          //         <td>1</td>
          //         <td>Table cell</td>
          //         <td>Table cell</td>
          //       </tr>
          //     </tbody>
          //   </>
          // }
        />
      </div>
    </div>
  )
}

export default App
