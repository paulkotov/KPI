import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import EditorPanel from '../Shared/EditorPanel';
import PlanModal from '../Modals/PlanModal';
// import { data } from '../../redux/reducers/plan';

import { Spinner } from '../Shared/Spinner';
import { loadPlanData } from '../../lib/services/plan';

const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

const newPlan = {
  value: '',
  pod: '',
  pos: '',
  empl: '',
  plan_perem_id: '',
  plan_weight: '',
  m1: '',
  m2: '',
  m3: '',
  kv1: '',
  m4: '',
  m5: '',
  m6: '',
  kv2: '',
  m7: '',
  m8: '',
  m9: '',
  kv3: '',
  m10: '',
  m11: '',
  m12: '',
  kv4: '',
  year: ''
};

class Plan extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'pod',
        name: 'Подразделение',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true,
        filterable: true
      },
      {
        key: 'pos',
        name: 'Должность',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true,
        filterable: true
      },
      {
        key: 'empl',
        name: 'Сотрудник',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true,
        filterable: true
      },
      {
        key: 'plan_param_id',
        name: 'Пок-ль',
        width: 75,
        editable: true,
        resizable: true,
        sortable: true,
        filterable: true
      },
      {
        key: 'plan_weight',
        name: 'Вес%',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm1',
        name: 'План01',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm2',
        name: 'План02',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm3',
        name: 'План03',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'kv1',
        name: '1кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm4',
        name: 'План04',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm5',
        name: 'План05',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm6',
        name: 'План06',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'kv2',
        name: '2кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm7',
        name: 'План07',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm8',
        name: 'План08',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true

      },{
        key: 'm9',
        name: 'План09',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'kv3',
        name: '3кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true  
      },{
        key: 'm10',
        name: 'План10',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm11',
        name: 'План11',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm12',
        name: 'План12',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'kv4',
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
      rows: [],
      selectedIndexes: [],
      currentPlan: null,
      originalRows: null,
      filters: {},
      isPlanModalShown: false
    };
  }

  // componentWillReceiveProps(nextprops){
  //   this.setState({
  //     rows: nextprops.data
  //   });
  // }

  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data){
      this.setState({
        rows: this.props.data 
      });
    }
  }

  async componentDidMount(){
    const { addData } = this.props.services;
    const data = await loadPlanData();
    // console.log(data);
    addData(data);
  }

  togglePlanModal = () => {
    this.setState({
      isPlanModalShown: !this.state.isPlanModalShown
    });
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
      ...newPlan,
      value: newRowIndex,
    };

    let rows = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  };

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }
    let rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.state.rows.length;
  };
  
  getCellActions(column, row) {
    if (column.key === 'county' && row.id === 'id_0') {
      return [
        {
          icon: 'glyphicon glyphicon-remove',
          callback: () => { alert('Deleting'); }
        },
        {
          icon: 'glyphicon glyphicon-link',
          actions: [
            {
              text: 'Campaign Linking',
              callback: () => { alert('Navigating to camapign linking'); }
            }
          ]
        }
      ];
    }
  }

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    this.setState({ rows });
  };

  onRowsSelected = (rows) => {
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 ) });
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    // all filters removed
    this.setState({ filters: {} });
  };

  render() {
    const { isPlanModalShown, currentPlan, selectedIndexes } = this.state;
    return (
      <div>
        { this.props.data.length !==0 ?
          <div>
            {
              isPlanModalShown &&
              <PlanModal isAddModalShown={isPlanModalShown}
                          togglePlanModal={this.togglePlanModal}
                          dataHandler={this.handleAdd}
                          data={ currentPlan === null ? newPlan : currentPlan }
              />
            }
            <EditorPanel enableSave={ selectedIndexes.length !== 0 }
                          enableUndo={ null }
                          saveChanges={this.handleSave} 
                          undoChanges={this.handleUndo}
            />   
            <ReactDataGrid
              ref={ node => this.grid = node }
              onGridSort={this.handleGridSort}
              enableCellSelect={true}
              columns={this.getColumns()}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              toolbar={<Toolbar onAddRow={this.togglePlanModal} enableFilter={true}/>}
              enableRowSelect={true}
              rowHeight={50}
              minHeight={600}
              rowScrollTimeout={200} 
              getCellActions={this.getCellActions}
              onAddFilter={this.handleFilterChange}
              onClearFilters={this.onClearFilters}
              rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: this.onRowsSelected,
                onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                  indexes: this.state.selectedIndexes
                }
              }}
            />
          </div> 
        : 
        <Spinner/>
        }
      </div>
    );
  }
}

Plan.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Plan;