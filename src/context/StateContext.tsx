import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { IProduct } from "../interface";

interface StateContextProps {
  showCart: boolean;
  cartItems: IProduct[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  setShowCart: (bool: boolean) => void;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: IProduct, quantity: number) => void;
  toggleCartItemQuantity: (value: string, id: string) => void;
  onRemove: (product: IProduct) => void;
  setCartItems: (value: [] | IProduct[]) => void;
  setTotalPrice: (value: number) => void;
  setTotalQuantities: (value: number) => void;
}

const MyContext = createContext<StateContextProps | undefined>(undefined);

export const StateContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: IProduct | undefined = undefined;
  let index: number | undefined = undefined;

  const onAdd = (product: IProduct, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: IProduct) => item._id === product._id
    );

    setTotalPrice((prev: number) => prev + product.price * quantity);
    setTotalQuantities((prev: number) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: IProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: (cartProduct.quantity || 0) + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product: IProduct) => {
    foundProduct = cartItems.find((item: IProduct) => item._id === product._id);
    const newCartItems = cartItems.filter(
      (item: IProduct) => item._id !== product._id
    );

    if (foundProduct) {
      setTotalPrice(
        (prev: number) =>
          prev - (foundProduct?.price || 0) * (foundProduct?.quantity || 1)
      );
      setTotalQuantities(
        (prev: number) => prev - (foundProduct?.quantity || 0)
      );
    }

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    foundProduct = cartItems.find((item: IProduct) => item._id === id);
    index = cartItems.findIndex((product: IProduct) => product._id === id);

    const newCartItems = cartItems.filter((item: IProduct) => item._id !== id);

    if (value === "inc" && foundProduct) {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: (foundProduct.quantity || 0) + 1 },
      ]);
      setTotalPrice((prev) => prev + (foundProduct?.price || 0));
      setTotalQuantities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct && (foundProduct?.quantity || 0) > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: (foundProduct.quantity || 0) - 1 },
        ]);
        setTotalPrice((prev) => prev - (foundProduct?.price || 0));
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };

  // Quantity change Functions
  const incQty = () => setQty((prev: number) => prev + 1);
  const decQty = () => setQty((prev: number) => (prev - 1 < 1 ? 1 : prev - 1));

  return (
    <MyContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext<StateContextProps | undefined>(MyContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }

  const {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    setShowCart,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
    setCartItems,
    setTotalPrice,
    setTotalQuantities
  } = context;

  return {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    setShowCart,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
    setCartItems,
    setTotalPrice,
    setTotalQuantities
  };
};
