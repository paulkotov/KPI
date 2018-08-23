import React from 'react';

import { Spin, Icon, Alert } from 'antd';
import 'antd/lib/alert/style/index.css';
import 'antd/lib/spin/style/index.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
 
export const Spinner = () => ( 
    <Spin indicator={antIcon} >
    <Alert
      message="Данные загружаются"
      description="Подождите..."
      type="info"
    />
    </Spin> 
);