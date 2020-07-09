import React from 'react';
import { FaSpinner } from  'react-icons/fa';

import './Loading.css';

const Loading = () => {
  return(
    <div className="loading">
      <FaSpinner size={100} color="#FFFFFF" className="icon-spin" />
    </div>
  )
}

export default Loading;