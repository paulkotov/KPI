import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Toolbar } from 'react-data-grid-addons';
import update from 'immutability-helper';

class Fact extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'pod',
        name: 'Подразделение',
        width: 400,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'pos',
        name: 'Должность',
        width: 350,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'empl',
        name: 'Сотрудник',
        width: 350,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'item1',
        name: 'Пок-ль',
        width: 75,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'ves',
        name: 'Вес%',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan01',
        name: 'План01',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan02',
        name: 'План02',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan03',
        name: 'План03',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: '1kv',
        name: '1кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan04',
        name: 'План04',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan05',
        name: 'План05',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan06',
        name: 'План06',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: '2kv',
        name: '2кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan07',
        name: 'План07',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'plan08',
        name: 'План08',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true

      },{
        key: 'plan09',
        name: 'План09',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: '3kv',
        name: '3кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true  
      },{
        key: 'plan10',
        name: 'План10',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'plan11',
        name: 'План11',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'plan12',
        name: 'План12',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: '4kv',
        name: '4кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'year',
        name: 'Год',
        editable: true,
        width: 75,
        sortable: true    
      }
    ];

    this.state = { 
      rows: [{
        id: 1,
        key: '1',
        pod: 'Отдел логистики',
        pos: 'Юрист',
        empl: 'Анисенко Андрей Михайлович',
        item1: '',
        ves: 75,
        plan01: 0.1,
        plan02: 0.1,
        plan03: 0.1,
        kv1: 1,
        plan04: 0.1,
        plan05: 0.1,
        plan06: 0.1,
        kv2: 1,
        plan07: 0.1,
        plan08: 0.1,
        plan09: 0.1,
        kv3: 1,
        plan10: 0.1,
        plan11: 0.1,
        plan12: 0.1,
        kv4: 1,
        year: 1
      }, {
        id: 2,
        key: '2',
        pod: 'Отдел логистики',
        pos: 'Юрист',
        empl: 'Анисенко Андрей Михайлович',
        item1: '',
        ves: 75,
        plan01: 0.1,
        plan02: 0.1,
        plan03: 0.1,
        kv1: 1,
        plan04: 0.1,
        plan05: 0.1,
        plan06: 0.1,
        kv2: 1,
        plan07: 0.1,
        plan08: 0.1,
        plan09: 0.1,
        kv3: 1,
        plan10: 0.1,
        plan11: 0.1,
        plan12: 0.1,
        kv4: 1,
        year: 1
      }]
    };
  }

  getColumns = () => {
    let clonedColumns = this._columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };
    return clonedColumns;
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  handleAddRow = ({ newRowIndex }) => {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  };

  getSize = () => {
    return this.state.rows.length;
  };

  render() {
    return (
        <ReactDataGrid
          ref={ node => this.grid = node }
          enableCellSelect={true}
          columns={this.getColumns()}
          rowGetter={this.getRowAt}
          rowsCount={this.getSize()}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
          enableRowSelect={true}
          rowHeight={50}
          minHeight={600}
          rowScrollTimeout={200} />
    );
  }
}

Fact.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Fact;