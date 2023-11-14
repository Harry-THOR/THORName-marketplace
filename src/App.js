import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import tnmABI from './abis/tnm.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [tnm, setTnm] = useState(null)
  const [account, setAccount] = useState(null)
  const [thornames, setTHORNames] = useState([])

  const loadBlockchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    //console.log('Network:', network)

    // Get a javascript version of the smart contract
    const tnm = new ethers.Contract(
      config[network.chainId].tnm.address,
      tnmABI, 
      provider
    )
    setTnm(tnm)

    // Load names
    const products = []
    
    for(var i = 1; i < 10; i++) { // mapping id starts at 1
      const product = await tnm.products(i)
      
      products.push(product)
    }

    // Display all items in thornames category
    const thornames = products.filter((product) => product.category === 'THORNames')
    setTHORNames(thornames)
    //console.log(thornames)


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
