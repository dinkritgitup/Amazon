import React, {useEffect, useState} from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/Header/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {productUrl} from '../../Api/endPoints'
import ProductCard from '../../Components/Header/Product/ProductCard';

function Results() {
  const [results,setResults]= useState([]);
  const {categoryName} = useParams();

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1>Results</h1>
        <p>Category/ {categoryName}</p>
        <hr />
        <div className={classes.product_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true}
            />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
