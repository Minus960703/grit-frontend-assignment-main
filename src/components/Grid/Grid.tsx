import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, { useState } from 'react'

interface ColumnDefsProps {
  field: string;
}

interface GridProps {
  columnDefs: ColumnDefsProps[];
  rowData: [];
}

function Grid({columnDefs, rowData}: GridProps) {
  return (
    <div className="ag-theme-alpine" style={{ width: 600, height: 400, margin: '0 auto' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  )
}

export { Grid };