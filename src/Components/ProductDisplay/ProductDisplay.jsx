import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt=""/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>63</p>
                </div> 
                <div className="productdisplay-right-prices">
                    <div className="product-display-right-price-old">${product.old_price}</div>
                    <div className="product-display-right-price-new">${product.new_price}</div>
                </div>  
                <div className="display-right-description">
                Elevate your wardrobe with our {product.name} – a chic blend of sophistication and playful flair. 
                The overlap collar adds a touch of elegance, while the peplum hem creates a flattering silhouette. 
                The striped pattern adds a timeless charm, and the flutter sleeves bring a delightful, feminine touch. 
                Effortlessly transition from desk to dinner in this versatile and stylish wardrobe essential.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CARD</button>
                <p className="product-display-right-category"><span>Category :</span>Women, T-shirt, Crop</p>  
                <p className="product-display-right-category"><span>Tags :</span>Modern, Latest</p>            
            </div>
        </div>
    )
}

export default ProductDisplay;