import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title, products, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>
            <hr />

            <div className='cards'>
                {products.map((product, index) => {
                    return (
                        <div className='card' key={index} onClick={() => togglePop(product)}>
                            <div className='card__image'>
                                <img src={product.image} alt='THORName' />
                            </div>
                            <div className='card__info'>
                                <h4>{product.name}</h4>
                                <Rating value={product.rating} />
                                <p>{ethers.utils.formatUnits(product.cost.toString(), 'ether')} ETH</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default Section;