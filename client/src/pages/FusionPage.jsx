import { useEffect, useState } from 'react'
import useEther from '../providers/useEther'
import NFTs from '../components/NFTs';
import parseProxyImage from '../utils/parseProxyImageData';
import FusionView from '../components/FusionView';
import MetaMaskStatus from '../components/MetaMaskStatus';

const FusionPage = () => {
    const { contract, account } = useEther();
    const [nfts, setNfts] = useState([]);

    const getMintList = async () => {
        if (contract != null) {
            try {
                const data = await contract.showMyMints();
                const mintedArray = Array.from(data)
                let arr = []
                for (let x of mintedArray) {
                    console.log(x)
                    const y = parseProxyImage(x[0]);
                    y.tokenId = x[1][0];
                    y.mintedAt = x[1][1];
                    arr.push(y);
                }
                setNfts(arr);
            } catch (error) {
                console.log(error)
            }
        }

    }

    useEffect(() => {
        if (account) {
            getMintList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    if (!account) {
        return <MetaMaskStatus />
    }
    return (
        <div>
            <FusionView />
            <h1 className='mt-8 text-2xl font-bold text-center'>Total Minted {`(${nfts.length})`}</h1>
            <NFTs nfts={nfts} minted />
        </div>
    )
}

export default FusionPage