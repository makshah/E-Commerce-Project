import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {detailsProduct} from '../actions/productActions'


function ProductScreen(props){
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return ()=>{
            //
        };
    }, []);

    const handleAddToCart = () =>{
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }


    return (
    <div>
            <div className="back-to-result">
                <Link to="/"> Back to results</Link>
            </div>
            {loading? <div>Loading...</div>:
            error? <div>{error}</div>:
            (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>
                    <div className="details-info"> 
                        <ul>
                            <li>
                                <h2>{product.name}</h2>
                            </li>
                            <li>
                                <h4>{product.brand}</h4>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews} Reviews)
                            </li>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Status: {product.countInStock>0? "In Stock " + product.countInStock + " left": "Out of Stock"}
                            </li>
                            <li>
                                Qty: {product.countInStock>0? 
                                product.countInStock> 0 && <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                  {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>)}
                                </select>
                            : "Out of Stock"}
                            </li>
                            <li>
                                {product.countInStock>0 && <button onClick={handleAddToCart} className="button-primary">Add to cart</button>
                                }  
                            </li>
                            
                        </ul>
                    </div>
                </div>
            )}
</div>
    )
}
export default ProductScreen;