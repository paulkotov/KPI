import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popconfirm } from 'antd';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import StructureModal from '../Modals/StructureModal';

// import { Spinner } from './Spinner';
// import { data } from '../../redux/reducers/structure';
import { loadStructData, updateDept } from '../../lib/services/structure';

import 'antd/lib/button/style/index.css';
// import 'antd/lib/popconfirm/style/index.css';
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import 'react-sortable-tree/style.css';
import EditorPanel from '../Shared/EditorPanel';

// const alertNodeInfo = ({ node }) => {
//   // const objectString = Object.keys(node)
//   //   .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
//   //   .join(',\n   ');

//   // global.alert(
//   //   'Info passed to the button generator:\n\n' +
//   //     `node: {\n   ${objectString}\n},\n` +
//   //     `path: [${path.join(', ')}],\n` +
//   //     `treeIndex: ${treeIndex}`
//   // );
//   console.log(`id: ${node.id}`);
//   console.log(node);
// };

class Structure extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [],
      isEditModalShown: false,
      selectedNode: null,
      editedNodes: [],
      deletedNodes: []
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data){
      this.setState({
        treeData: this.props.data
      });
    }
  }

  async componentDidMount(){
    const { addData } = this.props.services;
    const data = await loadStructData();
    addData(data);
  }

  toggleEditModal = () => {
    this.setState({
      isEditModalShown: !this.state.isEditModalShown
    });
    if (!this.state.isEditModalShown){
      this.setState({
        selectedNode: null
      });
    }
  }

  handleAdd = async node => {
    const { count, dataSource } = this.state;
    const newData = {
      parent_id: node.id,
      name: node.name
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    const response = await updateDept(newData);
    return response;
  }
  

  render() {
    const { searchString, searchFocusIndex, searchFoundCount, isEditModalShown, selectedNode } = this.state;
    const getNodeKey = ({ treeIndex }) => treeIndex;
        // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
        searchQuery &&
        node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
  
    const selectPrevMatch = () =>
        this.setState({
          searchFocusIndex:
            searchFocusIndex !== null
              ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
              : searchFoundCount - 1,
        });
  
    const selectNextMatch = () =>
        this.setState({
          searchFocusIndex:
            searchFocusIndex !== null
              ? (searchFocusIndex + 1) % searchFoundCount
              : 0,
        });
    // 'U+1F525';
    return (
      <div style={{ height: 900+'px', width: 1000+'px' }}>
        { isEditModalShown && selectedNode !== 'null' &&
          <StructureModal isEditModalShown={isEditModalShown} 
            toggleEditModal={this.toggleEditModal} 
            nodeHandler={null}
            data={selectedNode}
          /> 
        }
          <form style={{ display: 'inline-block' }}
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <input
              id="find-box"
              type="text"
              placeholder="Search..."
              style={{ fontSize: '1rem' }}
              value={searchString}
              onChange={event =>
                this.setState({ searchString: event.target.value })
              }
            />

            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            >
              &lt;
            </button>

            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
          <EditorPanel enabled={ true }/>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            searchMethod={customSearchMethod}
            searchQuery={searchString}
            canDrag={false}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            generateNodeProps={({ node, path }) => ({
              title: (
                <span>{`${node.id}. ${node.name}`}</span>
              ),
              buttons: [
                <Button
                  onClick={() => {
                    this.toggleEditModal(); 
                    this.setState({
                      selectedNode: node
                    });
                  }
                  }
                  style={{ marginRight: 10+'px' }}
                >
                  <Icon type="edit" />
                </Button>,
                <Button
                  onClick={ () => {
                    this.toggleEditModal(); 
                    this.setState({
                      selectedNode: node
                    });
                  }
                  }
                  style={{ marginRight: 10+'px' }}
                >
                  <Icon type="plus-circle-o" />
                </Button>,
                <Popconfirm
                  title="Удалить?"
                  onConfirm={() => {
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }));
                    this.setState({
                      deletedNodes: [
                        ...this.state.deletedNodes,
                        node
                      ]
                    });
                  }
                  }
                  onCancel={() => console.log('None')}
                  okText="Да" cancelText="Нет"
                >
                  <Button
                  type="danger"
                    style={{ marginRight: 10+'px' }}
                  >
                    <Icon type="close-circle-o" />
                  </Button>
                </Popconfirm>,
              ],
            })}
          />
        </div>
    );
  }
}

Structure.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Structure;