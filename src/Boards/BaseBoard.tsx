import { useEffect, useRef, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';

import styles from './index.module.css';

interface BaseBoardProps<T> {
  size: 'small' | 'large';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
}

export function BaseBoard<T>({ size, columns, data }: BaseBoardProps<T>) {
  const [tableBodyWidth, setTableBodyWidth] = useState<number>(0);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (tableBodyRef.current) {
      setTableBodyWidth(tableBodyRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <table
        style={{
          tableLayout: 'fixed',
          width: '100%',
          borderCollapse: 'collapse',
        }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    padding: size === 'small' ? '10px 0px' : '30px 0 24px 0',
                    textAlign: 'left',
                    fontFamily: 'Microsoft-YaHei',
                    fontSize: size === 'small' ? '16px' : '28px',
                    fontWeight: 700,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* 分割线 */}
        <div className={size === 'small' ? styles.dividerSmall : styles.dividerLarge} style={{ width: tableBodyWidth }}/>
        <tbody ref={tableBodyRef} >
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={size === 'small' ? styles.trSmall : styles.trLarge}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    padding: size === 'small' ? '5px 0px 6px 0px' : '12px 0',
                    fontFamily: 'Arial',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}