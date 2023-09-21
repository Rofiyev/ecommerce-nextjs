export interface IProduct {
  _createdAt: string;
  detail: string;
  _updatedAt: string;
  image: [
    {
      asset: {
        _ref: string;
        _type: string;
      };
      _key: string;
      _type: string;
    }
  ];
  price: number;
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  slug: { _type: string; current: string };
}

export interface IHeroBanner {
  buttonText: string;
  desc: string;
  discount: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
