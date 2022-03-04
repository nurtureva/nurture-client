import 'antd/dist/antd.css';
import './App.css';
import ProviderTable from '../ProviderTable/ProviderTable'
import React, { useState, useEffect } from 'react';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function App() {
  
  const [providers, setProviders] = useState([]);
  const [filters, setFilters] = useState({
    certs: [], //get these filters from table (maybe make new column section for available filters)
    services: []
  });
  const [loading, setLoading] = useState(true);
  async function getProviders() {
    console.log('change')
    const providers = await fetch(`${process.env.NODE_ENV === 'development' ? "http://localhost:5000/providers": "https://nurture-server.herokuapp.com/providers" }`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return providers.json();
  }

  useEffect(() => {
    console.log(process.env.NODE_ENV)
    getProviders()
    .then(res => {
      setProviders(res);
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const render = () => {
    const visibleProviders = [ ...providers ]
    const antIcon = <LoadingOutlined spin />;
    return (loading ? 
      <Spin indicator={antIcon} /> :
      <div className="nurture-directory-main-container">
        <ProviderTable providers={visibleProviders} />
      </div>
    )
  }

  return render();
}

export default App;
