import Identicon from "react-identicons";
import { truncateAddress } from "@/utils";

export default function Navbar({ connect, address }) {
  return (
    <div className="bg-white">
      <div className="px-5 py-2 flex items-center justify-between shadow-md">
        <h2 className="font-openSans font-bold text-gray-600 font-medium">
          Next3Blog
        </h2>

        {address ? (
          <div className="border border-[#c7cacd] text-gray-600 px-2 py-1 rounded-[12px] inline-flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full overflow-hidden border border-[#c7cacd] flex justify-center ">
              <Identicon string={address} size={30} />
            </div>
            <h2 className="font-openSans text-black text-[12px]">
              {truncateAddress(address)}
            </h2>
          </div>
        ) : (
          <button
            className="group/item border border-[#c7cacd] text-gray-600 px-2 py-1 rounded-[12px] inline-flex items-center cursor-pointer hover:bg-[#1974E7] hover:text-white transition"
            onClick={() => connect()}
          >
            <h2 className="font-openSans group-hover/item:text-white text-[#1974E7] transition">
              Connect Wallet
            </h2>
          </button>
        )}
      </div>
    </div>
  );
}
