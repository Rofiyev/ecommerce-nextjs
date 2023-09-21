import React from "react";
import { IProduct } from "../interface";
import { urlFor } from "../lib/client";
import Link from "next/link";

const Product: React.FC<{ product: IProduct }> = ({
  product: { name, image, slug, price },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image[0]).url()}
            width={250}
            height={250}
            className="product-image"
            alt=""
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
