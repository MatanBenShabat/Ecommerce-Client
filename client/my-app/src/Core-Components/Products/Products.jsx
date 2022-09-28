import axios from "axios";
import { useEffect, useState } from "react";

const  Products = () => {
    const [products, setProducts] = useState("");
    let array = []
    const getProducts = () => {
        axios
          .get("http://localhost:5000/api-products/products")
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                array.push(res.data[i].product)
            }
            setProducts(array)
            console.log(products);
          });
      };
      
  useEffect(() => {
    getProducts();

  }, []); 
    return(
        <div className="products-container">
            <h1>Products</h1>
            {products.map((item,i)=>{
                <ul key={i}>
                    <li>{item.productsName}</li>
                </ul>
            })}
        </div>
    )
}

export default Products