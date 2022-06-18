import React, { useEffect, useState } from "react";
import "./product.scss";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/apiProduct";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ProductContent from "../../components/productContent/ProductContent";

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const apiProduct = async () => {
      try {
        setError(false);
        setLoading(true);
        const product = await getSingleProduct(id);
        setProductData(product);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    apiProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <div>Something went wrong...</div>;
  return (
    <>
      <Navbar />
      {loading ? (
        <div id="product-loading">
          <div className="loading-container">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <ProductContent productData={productData} />
      )}
      <Footer />
    </>
  );
};

export default Product;
