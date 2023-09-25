import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from ".";
import { useStateContext } from "../context/StateContext";
import logo from "...@/assets/logo.png";

const Navbar = () => {
  const { showCart, totalQuantities, setShowCart } = useStateContext();
  return (
    <div className="navbar-container">
      <Link href={"/"}>
        <img src={logo.src} className="logo" alt="Logo" />
      </Link>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
