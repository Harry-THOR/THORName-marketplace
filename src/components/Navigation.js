import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account) 
    }

    return (
        <nav>

            <div className="nav__brand">
                <h1>THORName Marketplace</h1>
            </div>

            <input
                type='text'
                className='nav__search'
            />
            
            {account ? (
                <button
                    type='button'
                    className="nav__connect"
                >
                    {account.slice(0, 3)}...{account.slice(-4)}
                </button>
            ) : (
                <button
                    type='button'
                    className="nav__connect"
                    onClick={connectHandler}
                >
                    Connect Wallet
                </button>
            )}

            <ul className="nav__links">
                <li className="nav__link">
                    <a href="#buy">Buy</a>
                </li>
                <li className="nav__link">
                    <a href="#sell">Sell</a>
                </li>
            </ul>

        </nav>
    );
}

export default Navigation;