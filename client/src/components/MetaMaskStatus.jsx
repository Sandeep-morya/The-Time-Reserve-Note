import React from 'react';
import useEther from '../providers/useEther';
import Button from './common/Button';
import MetaMaskIcon from "../assets/metamask-icon.svg";

const MetaMaskStatus = () => {
    const { connect } = useEther()
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-4 text-white">
            <div className='w-72 aspect-square'>
                <img className='object-contain w-full h-full' src={MetaMaskIcon} alt='' />
            </div>
            <h2 className='my-4 text-lg font-semibold text-black uppercase'>MetaMask Not Connected</h2>
            <Button className="px-8 py-4 text-base" onClick={connect}>Connect To MetaMask</Button>
        </div>
    );
};

export default MetaMaskStatus;
