import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import TNM from './abis/tnm.json'

// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState('')

  const loadBlockchainData = async () => {

  }

  // useEffect is a React hook that runs once when the component loads
  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>

      <Navigation account={account} setAccount={setAccount} />

      <h2>Welcome to THORName Marketplace</h2>

    </div>
  );
}

export default App;
