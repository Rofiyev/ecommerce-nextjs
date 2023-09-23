import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>{new Date().getFullYear()} Rof1yev - Shopping All rights reserverd</p>
      <p className="icons">
        <Link target="_blank" href={"https://www.instagram.com/rof1yev"}>
          <AiFillInstagram />
        </Link>
        <Link
          target="_blank"
          href={"https://www.linkedin.com/in/rofiyev-dilshod-25635a270/"}
        >
          <AiFillLinkedin />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
