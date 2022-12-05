import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
  return (
    <div style={{textAlign: 'center', height: 200}}>
      <Spinner  style={{ width: '3rem', height: '3rem', margin: 50}}  color="success" />{' '}
    </div>
  );
}

export default Loading