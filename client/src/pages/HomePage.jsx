import { useCallback, useEffect, useState } from 'react'
import BannerBG from "../assets/banner-bg.png";
import Banner from "../assets/banner.png";
import BannerTitle from "../assets/banner-title.png";
import NFTs from '../components/NFTs';
import useEther from '../providers/useEther';
import parseProxyResult from '../utils/parseProxyResult';
import NFTView from '../components/NFTView';
import EmptyNFT from '../components/EmptyNFT';
import MetaMaskStatus from '../components/MetaMaskStatus';

const HomePage = () => {
    const { contract, account } = useEther();
    const [nfts, setNfts] = useState([]);
    const loadNfts = useCallback(async (contract) => {
        try {
            const nfts = await contract.getAllImages();
            setNfts(parseProxyResult(nfts));
        } catch (error) {
            console.error(error);
        }
    }, []);


    // let resultObject = Object.fromEntries(Object.entries(nfts[0]));

    // console.log(resultObject);
    useEffect(() => {
        if (account != null && contract != null) {
            loadNfts(contract)
        } else {
            console.log("MetaMask is not connected")
        }
    }, [account, contract, loadNfts])

    return (
        <div>
            <div className='relative flex justify-center -top-28 -z-10 min-h-[600px]'>
                <img className='absolute -z-10' src={BannerBG} />
                <div className='flex flex-col items-center self-end justify-center'>
                    <img className='w-[70%] m-auto' src={Banner} />
                    <img className='w-[70%]' src={BannerTitle} />
                </div>
            </div>
            {!account ? <MetaMaskStatus /> : nfts.length === 0 ? <EmptyNFT /> : <>
                <NFTView id={nfts[0]?.id} />
                <section className="flex flex-col py-8 px-28">
                    <div className='w-[70%] flex flex-col gap-2 text-center m-auto'>
                        <h2 className='text-xl font-bold uppercase text-primary'>Welcome To</h2>
                        <h1 className='text-5xl font-bold text-black uppercase'>The Time Reserve Note</h1>
                        <p className='mt-4'>When you purchase a Time Reserve Note, you re not simply buying a rare piece of art, you are also buying a fraction of time that will give you access to a network of benefits and offers that will increase over time. Your Time Reserve Note will serve as your digital identity and all-purpose key to a memorable time travel experience.</p>
                    </div>

                </section>
                <NFTs nfts={nfts} />
            </>}
        </div>
    )
}

export default HomePage