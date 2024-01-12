import { createContext, useCallback, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constant";

export const EtherContext = createContext({});

const EtherProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    const connect = useCallback(async () => {

        if (window.ethereum) {
            let provider = new ethers.BrowserProvider(window.ethereum);
            if (provider) {
                const signer = await provider.getSigner();
                setAccount(await signer.getAddress());
                setContract(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
            } else {
                console.log("Provider Empty");
            }
            setProvider(provider);
        } else {
            console.log("Please install MetaMaskk and  Connect");
        }
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            connect();
            window.ethereum.on("chainChanged", connect);
            window.ethereum.on("accountsChanged", connect);
        } else {
            console.log("MetaMask not installed; using read-only defaults")
            // const provider = ethers.getDefaultProvider();
        }
    }, [connect])
    const values = { account, contract, provider, connect }
    console.log(values)

    return (
        <EtherContext.Provider value={values}>
            {children}
        </EtherContext.Provider>
    );
};
export default EtherProvider;
