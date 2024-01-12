import { useCallback, useEffect, useState } from 'react'
import NFTs from '../components/NFTs'
import useEther from '../providers/useEther';
import parseProxyResult from '../utils/parseProxyResult';
import MetaMaskStatus from '../components/MetaMaskStatus';

const AdminPage = () => {
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
    useEffect(() => {
        if (account != null && contract != null) {
            loadNfts(contract)
        } else {
            console.log("MetaMask is not connected")
        }
    }, [account, contract, loadNfts])

    if (!account) {
        return <MetaMaskStatus />
    }

    return (
        <div>
            <section className="flex flex-col py-8 px-28">
                <div className='w-[70%] flex flex-col gap-2 text-center m-auto'>
                    <h2 className='text-xl font-bold uppercase text-primary'>Welcome To</h2>
                    <h1 className='text-5xl font-bold text-black uppercase'>The Time Reserve Note</h1>
                    <p className='mt-4'>When you purchase a Time Reserve Note, youre not simply buying a rare piece of art, you are also buying a fraction of time that will give you access to a network of benefits and offers that will increase over time. Your Time Reserve Note will serve as your digital identity and all-purpose key to a memorable time travel experience.</p>
                </div>

            </section>
            <NFTs nfts={nfts} admin />
        </div>
    )
}

export default AdminPage