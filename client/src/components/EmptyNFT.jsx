import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const EmptyNFT = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="mb-4 text-4xl font-bold text-gray-700">
                No NFTs Found
            </div>
            <div className="mb-8 text-lg text-gray-600">
                Explore and mint your unique NFTs now!
            </div>
            <div className="text-6xl text-gray-300">
                <AiOutlineEye />
            </div>
            <div className="mt-4 text-lg text-gray-600">
                Keep an eye out for new releases!
            </div>
        </div>
    );
};

export default EmptyNFT;
