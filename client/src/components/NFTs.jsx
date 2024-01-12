import React from "react";
import { PINATA_IMAGE } from "../utils/constant";
import Button from "./common/Button";
import useEther from "../providers/useEther";
import parseTimeStamp from "../utils/parseTimeStamp";
import { PiPlusCircle } from "react-icons/pi";

const NFT = (nft) => {
    const { contract } = useEther();

    // const { title, subtitle, description, imageHash, mintPrice, maxPerWallet, totalLimit, totalSupply, isLimited, createdAt, mintingEnabled, enabledAt } = nft
    const enableMinting = async () => {
        try {
            await contract.enableMinting(nft.id);
            console.log(`Minting enabled of ${nft.id}`);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div
            title={nft.description}
            className="w-[300px] aspect-square outline-4 outline-offset-8 outline outline-primary mt-20">
            {nft.tokenId && <div className="text-sm">
                <div><span className="mr-2 font-semibold">Token ID:</span> <span >{nft.tokenId.toString()}</span></div>
                <div><span className="mr-2 font-semibold">Minted At:</span> <span >{parseTimeStamp(nft.mintedAt)}</span></div>
            </div>}
            <img
                className="w-[300px] aspect-square"
                src={PINATA_IMAGE + nft.imageHash}
                alt="nft"
            />
            {!nft.minted && <div className="pb-2 mt-4 font-semibold text-center">
                <p >{nft.id}</p>
                <p>{nft.title}</p>
                <p>{nft.subtitle}</p>
            </div>}
            {!nft?.minted ? nft.admin ? (
                <Button onClick={enableMinting} className="py-4" dark={!nft.mintingEnabled}>
                    {nft.mintingEnabled ? "Disable Minting" : "Enable Minting"}
                </Button>
            ) : (
                <Button to={`/mint/${nft.id}`} className="py-4" dark>
                    Mint Now
                </Button>
            ) : <Button icon={<div className="text-2xl"><PiPlusCircle /></div>} className="py-4 text-emerald-900 bg-black/5" >
                Add for Fusion
            </Button>}
        </div>
    );
};

const NFTs = ({ nfts, admin, minted }) => {
    return (
        <section className="px-8 pb-8">
            <div className="grid grid-cols-3 w-[80%] 2xl:w-[60%] m-auto">
                {nfts.map((nft) => (
                    <NFT key={minted ? nft.tokenId : nft.id} {...nft} admin={admin} minted={minted} />
                ))}
            </div>
        </section>
    );
};

export default NFTs;
