import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, urlFor } from "../../lib/client";
import { IProduct } from "../../interface";
import { ParsedUrlQuery } from "querystring";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails: React.FC<ProductDetailsPage> = ({
  product,
  products,
}) => {
  const { image, name, detail, price } = product;
  const [index, setIndex] = useState<number>(0);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).url()}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((img, i: number) => (
              <img
                key={i}
                src={urlFor(img).url()}
                alt={`Images-${i}`}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{detail}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item: IProduct) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  ProductDetailsPage,
  ProductDetailsPageParams
> = async ({ params }) => {
  if (!params || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }

  const query = `*[_type == 'product' && slug.current == '${params.slug}'][0]`;
  const productsQuery = "*[_type == 'product']";

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const productsQuery = "*[_type == 'product']";

  const products = await client.fetch(productsQuery);
  const paths = products.map((product: any) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface ProductDetailsPage {
  products: IProduct[];
  product: IProduct;
}

interface ProductDetailsPageParams extends ParsedUrlQuery {
  slug: string;
}

export default ProductDetails;
