import Button from "./common/Button";
import Image from "../assets/Picture_4.png";
import { PiPlusFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
const NFTBox = ({ heading = "NFT To Fuse", noInput, big }) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-semibold uppercase">{heading}</h2>
            <div className={twMerge("flex items-center justify-center w-60 aspect-square outline outline-primary", big && "w-72")}>
                <img
                    src={Image}
                    className="object-cover w-[95%] h-[95%]"
                    alt="Image to fuse"
                />
            </div>
            {!noInput && <div className="flex justify-center h-8 mt-2 w-60 outline outline-primary">
                <input
                    className="w-[95%] text-sm h-[95%] outline-none border-none focus:outline-none"
                    type="text"
                    placeholder="Type in token ID here!"
                />
            </div>}
        </div>
    );
};

const Trait = () => {
    return (
        <div className="w-48 h-10 outline-primary outline-dashed">
            <div className="w-[95%] h-[95%] flex justify-center items-center text-primary text-3xl">
                <PiPlusFill />
            </div>
        </div>
    );
};

const FusionView = () => {
    return (
        <section className="p-8 w-[80%] m-auto 2xl:w-[60%]">
            <h1 className="my-8 text-2xl font-semibold text-center uppercase">
                NFT Fusion
            </h1>
            <div className="flex justify-between">
                {/* left/top */}
                <div className="flex gap-8">
                    {/* NFts */}
                    <NFTBox />
                    <NFTBox />
                </div>
                {/* right/botton */}
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold uppercase">Traits To be Transfered</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <Trait />
                        <Trait />
                        <Trait />
                        <Trait />
                        <Trait />
                        <Trait />
                        <Trait />
                        <Trait />
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2 mt-16 w-72">
                    <h2 className="my-4 font-semibold uppercase">Overview</h2>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Token to fuse</div>
                            <div className="text-sm">Token ID</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Token to fuse</div>
                            <div className="text-sm">Token ID</div>
                        </div>
                    </div>
                    <p className="text-[12px] font-medium">The changes will be permanent after fusion on blockchain</p>
                    <p className="text-xs">Note: 0.22 ETH plus gas fee per fusion</p>
                    <div className="w-36">
                        <Button className="border-2 border-black/50">Start Fusion</Button>
                    </div>
                </div>
                <div>
                    <NFTBox heading={"Preview"} noInput big />
                </div>
            </div>
        </section>
    );
};

export default FusionView;
