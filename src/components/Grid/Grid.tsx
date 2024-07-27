import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, { useState } from 'react'
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';

interface ColumnDefsProps {
  field: string;
}

interface GridProps {
  columnDefs: ColumnDefsProps[];
  rowData: [];
  onCellClicked: (parmas: CellClickedEvent) => void;
}

function Grid({ columnDefs, rowData, onCellClicked }: GridProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleCellClicked = (params: CellClickedEvent) => {
    setSelectedRowIndex(params.rowIndex);
    onCellClicked(params);
  };


  const getRowStyle = (params: RowClassParams) => {
    if (params.node.rowIndex === selectedRowIndex) {
      return { backgroundColor: '#E5E9F7' };
    }
    return null;
  };

  return (
    <div className="ag-theme-alpine" style={{ width: 800, height: 261, margin: '0 auto' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellClicked={handleCellClicked}
        getRowStyle={getRowStyle}
      >
      </AgGridReact>
    </div>
  )
}

export { Grid };