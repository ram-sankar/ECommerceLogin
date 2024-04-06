import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const TopBar = () => {
  return (
    <>
      <div className="font-inter bg-white text-black">
        <div className="container mx-auto flex justify-end space-x-6 pt-3">
          <p className="text-right text-xs leading-4">Help</p>
          <p className="text-right text-xs leading-4">Orders & Return</p>
          <p className="text-right text-xs leading-4">Hi, John</p>
        </div>
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Left Side - App Title */}
          <div className="flex items-center">
            <p className="text-left text-2xl font-bold leading-10">ECOMMERCE</p>
          </div>

          {/* Middle Part - Sale, Stock, Buy */}
          <div className="flex flex-grow justify-center space-x-8">
            <p className="text-left text-base font-semibold leading-6">
              Categories
            </p>
            <p className="text-left text-base font-semibold leading-6">Sale</p>
            <p className="text-left text-base font-semibold leading-6">
              Clearance
            </p>
            <p className="text-left text-base font-semibold leading-6">
              New Stock
            </p>
            <p className="text-left text-base font-semibold leading-6">
              Trending
            </p>
          </div>

          {/* Right Side - Help, Orders, Return, Search Icon, Cart Icon */}
          <div className="flex items-center space-x-4">
            <CiSearch size={25} />
            <CiShoppingCart size={25} />
          </div>
        </div>
      </div>
      <div className="flex h-9 w-full items-center justify-center bg-gray-200">
        <span className="font-inter text-black flex items-center space-x-6">
          <span><FaChevronLeft /></span> 
          <span>Get 10% off on business sign up</span>
          <span><FaChevronRight /></span>
        </span>
      </div>
    </>
  );
};
