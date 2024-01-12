import React, { useCallback, useEffect, useState } from 'react'
import useEther from '../providers/useEther'
import { parseEther } from 'ethers';
import Button from './common/Button';
import { PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { PINATA_IMAGE } from '../utils/constant';
import MetaMaskStatus from './MetaMaskStatus';
import { SiEthereum } from "react-icons/si";
import parseProxyImage from '../utils/parseProxyImageData';

const NFTView = ({ id }) => {
    const { account, contract } = useEther()
    const [mintAmount, setMintAmount] = useState(1);
    const [nft, setNft] = useState(null);

    const handleMint = async (mintAmount) => {
        if (window.ethereum && contract != null && account != null) {
            try {
                // Convert the mintPrice string to a numeric value
                const mintPriceNumeric = parseFloat(nft.mintPrice);

                // Calculate the total value in ether
                const totalValue = mintPriceNumeric * mintAmount;

                // Convert the total value to a string and directly pass it to parseEther
                const mintValue = parseEther(totalValue.toString()).toString();

                // Perform the minting transaction
                const response = await contract.mint(nft.id, BigInt(mintAmount), { value: mintValue });
                console.log(response);

                // Show a success message to the user
                console.log("Minting successful!");
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMaskk and  Connect")
        }

    }

    const increase = () => setMintAmount(prev => prev < 5 ? prev + 1 : prev);
    const decrease = () => setMintAmount(prev => prev > 1 ? prev - 1 : prev);

    const getNFT = useCallback(async (id, contract) => {
        try {
            const x = await contract.images(id);
            const data = parseProxyImage(x)
            setNft(data);

        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (id && contract) {
            getNFT(id, contract);
        } else {
            console.log("Wallet not found");
        }
    }, [id, contract, getNFT])

    if (nft == null || !id) {
        return <MetaMaskStatus />
    }
    return (
        <div className='p-28'>
            <div className='flex items-center justify-between gap-16' >
                <div className='flex flex-col items-start justify-start flex-1 gap-8'>
                    <div>
                        <h2 className='text-xl font-bold uppercase text-primary'>{nft.title}</h2>
                        <h1 className='text-5xl font-bold text-black uppercase'>{nft.subtitle}</h1>
                        <p className='mt-4 text-justify'>{nft.description}</p>
                        <div className='flex items-center self-start gap-4 mt-4 border-4 border-black w-max'>

                            <div className='flex'><span className='mx-2 text-sm font-bold uppercase'>Price: </span>{nft.mintPrice}ETH / Per NFT</div>
                            <div className='flex items-center justify-center w-8 h-10 text-2xl text-white bg-black'>
                                <SiEthereum />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-center justify-between gap-4 border-4 border-black'>
                        {account != null ?
                            <>
                                <div className='flex items-center gap-4 px-8 text-xl'>
                                    <button disabled={mintAmount == 1} onClick={decrease}><PiMinusBold /></button>
                                    <span>{mintAmount}</span>
                                    <button disabled={mintAmount == 5} onClick={increase}><PiPlusBold /></button>
                                </div>
                                <p className='font-bold'>MAX {`(${nft.maxPerWallet})`}</p>
                                <Button className="text-white" onClick={handleMint.bind(this, mintAmount)} dark>MINT NOW</Button>
                            </> : <h1 className='p-2 px-8 text-xl font-bold'>You are not connected Yet</h1>}
                    </div>
                </div>

                <img className='w-[400px] aspect-square outline-4 outline-offset-8 outline outline-primary' src={PINATA_IMAGE + nft.imageHash} alt='nft' />

            </div>

        </div>
    )
}

export default NFTView