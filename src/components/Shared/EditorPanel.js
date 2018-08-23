import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';
const ButtonGroup = Button.Group;
// import styled from 'styled-components';

const panelSyles = {
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center',
  margin: 10+'px' 
};

class EditorPanel extends Component {
  static propTypes = {
    enableSave: PropTypes.bool,
    enableUndo: PropTypes.bool,
    saveChanges: PropTypes.func,
    undoChanges: PropTypes.func
  }
  state = { 
    enableSave: this.props.enableSave,
    enableUndo: this.props.enableUndo
  }

  onSaveClick = () => {
    this.props.saveChanges();
  }

  onUndoClick = () => {
    this.props.undoChanges();
  }

  render(){
    const { enableSave, enableUndo } = this.props;
    return(
      <div className="panel">
        <ButtonGroup style={panelSyles}>
          <Button className="save" 
                  size="large" 
                  onClick={ this.onSaveClick }
                  disabled={!enableSave}
          >Сохранить изменения</Button>
          <Button className="undo"  
                  size="large" 
                  onClick={ this.onUndoClick }
                  disabled={!enableUndo}
          >Отменить изменения</Button>
        </ButtonGroup>
      </div>  
    );
  }
}

export default EditorPanel;
