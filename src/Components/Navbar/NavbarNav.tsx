import { useState } from "react";
import NavLogo from "/assets/Logo.png";
import EwalletCards from "../MetaMask/EwalletCard";
import { useAccount } from "wagmi";
import SearchBars from "./SearchBar";
import CartBars from "./CartBar";
import { CartCounts } from "./CartCount";
import { Account } from "../MetaMask/Account";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useEffect } from "react";
import DownloadApps from "./DownloadApp";

const NavbarNavs: React.FC = () => {
  const [card, setCard] = useState<boolean>(false);
  const [accountCard, setAccountCard] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [downloadCard, setDownloadCard] = useState<boolean>(false);

  const cartItemsFromStore = useSelector(
    (state: RootState) => state.cart.itemList
  );

  useEffect(() => {
    setCartItems(cartItemsFromStore);
  }, [cartItemsFromStore]);

  // Button Group Component
  const Connect: React.FC = () => {
    return (
      <div className="flex justify-center items-center flex-row h-[45px]">
        <SearchBars />
        {isConnected ? (
          <>
            <div className="flex flex-row gap-2 mx-2">
              <button
                className="flex items-center justify-center gap-1 px-5 py-[10px] font-semibold rounded-xl text-colorWhite text-md bg-colorGrayDark/50 hover:bg-colorGrayDark"
                onClick={() => setDownloadCard(!downloadCard)}
              >
                <i className="ri-import-line"></i> Install Apps
              </button>
              <button
                className="flex items-center justify-center gap-1 px-5 py-2 font-semibold rounded-xl text-colorWhite text-md bg-colorGrayDark/50 hover:bg-colorGrayDark"
                onClick={() => setAccountCard(!accountCard)}
              >
                <i className="text-xl ri-user-fill"></i>
              </button>
              {isConnected
                ? accountCard && (
                    <div className="absolute top-20 right-64">
                      <Account />
                    </div>
                  )
                : null}
            </div>
            <button className="flex items-center justify-center gap-1 px-5 py-2 font-semibold rounded-l-xl text-colorWhite text-md bg-colorGrayDark/50 hover:bg-colorGrayDark">
              <i className="text-xl ri-eth-fill"></i> 0
            </button>
            <button
              className="flex items-center justify-center px-5 py-2 text-gray-300 rounded-r-xl bg-colorGrayDark/50 hover:bg-colorGrayDark"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="text-xl ri-shopping-cart-2-fill"></i>
              {cartItems.length > 0 && <CartCounts />}
            </button>
            {showCart && <CartBars />}
          </>
        ) : (
          <>
            <div className="relative z-20" onScroll={() => setCard(!card)}>
              <button
                className="flex items-center justify-center gap-1 px-5 py-2 font-semibold rounded-xl text-colorWhite text-md bg-colorGrayDark/50 hover:bg-colorGrayDark"
                onClick={() => setCard(!card)}
              >
                <i className="text-xl ri-wallet-line"></i> Login
              </button>
            </div>
            <button
              className="flex items-center justify-center gap-1 px-5 py-[10px] font-semibold rounded-xl text-colorWhite text-md bg-colorGrayDark/50 hover:bg-colorGrayDark ml-2"
              onClick={() => setDownloadCard(!downloadCard)}
            >
              <i className="ri-import-line"></i> Install Apps
            </button>
          </>
        )}
      </div>
    );
  };

  const Nav: React.FC = () => (
    <div className="flex justify-center items-center flex-row h-[45px]">
      <img
        src={NavLogo}
        alt="Navbar Logo"
        className="h-[45px] cursor-pointer hover:opacity-80"
        onClick={() => window.location.assign("/")}
      />
      <hr className="w-8 text-xl font-bold rotate-90" />
      <button
        className="flex items-center justify-center px-5 py-2 font-semibold text-gray-300 text-md rounded-l-xl bg-colorGrayDark/50 hover:bg-colorGrayDark hover:text-gray-200"
        onClick={() => window.location.assign("/")}
      >
        Home
      </button>
      <button
        className="flex items-center justify-center px-5 py-2 font-semibold text-gray-300 text-md rounded-r-xl bg-colorGrayDark/50 hover:bg-colorGrayDark hover:text-gray-200"
        onClick={() => window.location.assign("/explore")}
      >
        Explore
      </button>
    </div>
  );

  return (
    <nav className="fixed z-20 flex flex-row items-center justify-around w-full h-24 drop-shadow-xl bg-colorViolet/20 backdrop-blur-xl">
      <Nav />
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="relative z-20">
          <Connect />

          {card && (
            <div className="fixed">
              <EwalletCards />
            </div>
          )}
          {downloadCard && <DownloadApps />}
        </div>
      </div>
    </nav>
  );
};

export default NavbarNavs;
