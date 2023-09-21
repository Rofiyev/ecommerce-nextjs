import { GetServerSideProps } from "next";
import { FooterBanner, HeroBanner, Product } from "../components";
import { client } from "../lib/client";
import { IHeroBanner, IProduct } from "../interface";

export default function Home({ products, bannerData }: HomePageProps) {
  return (
    <div>
      <HeroBanner heroBanner={bannerData[0]} />
      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: IProduct) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData[0]} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

interface HomePageProps {
  products: IProduct[];
  bannerData: IHeroBanner[];
}
