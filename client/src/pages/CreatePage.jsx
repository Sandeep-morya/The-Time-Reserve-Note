import { useState } from 'react';
import useEther from '../providers/useEther';
import InputField from '../components/common/InputField'; // Import the new component
import { v4 } from "uuid";
import MetaMaskStatus from '../components/MetaMaskStatus';
const initialData = {
    title: '',
    subtitle: '',
    description: '',
    imageHash: '',
    mintPrice: 0,
}
const initialSupply = {
    totalSupply: 0,
    maxPerWallet: 0,
    totalLimit: 0,
    isLimited: false,
}

const CreatePage = () => {
    const { account, contract } = useEther();
    const [imageData, setImageData] = useState(initialData);
    const [imageSupply, setImageSupply] = useState(initialSupply);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageDetails = {
                id: v4(),
                data: { ...imageData, mintPrice: imageData.mintPrice.toString() },
                supply: { ...imageSupply },
                access: {
                    mintingEnabled: false,
                    enabledAt: 0,
                }
            }
            await contract.setImageData(imageDetails);
            console.log('Image data set successfully!');
        } catch (error) {
            console.error('Error setting image data:', error);
        }
    };
    if (!account) {
        return <MetaMaskStatus />
    }

    return (
        <div className="container p-8 mx-auto mt-8 bg-gray-100">

            <h1 className="mb-6 text-3xl font-semibold">Create Image NFT</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                {/* Use InputField component for each input field */}
                <InputField
                    label="Title"
                    id="title"
                    name="title"
                    value={imageData.title}
                    onChange={e => setImageData(x => ({ ...x, title: e.target.value }))}
                />
                <InputField
                    label="Subtitle"
                    id="subtitle"
                    name="subtitle"
                    value={imageData.subtitle}
                    onChange={e => setImageData(x => ({ ...x, subtitle: e.target.value }))}
                />
                <InputField
                    label="Description"
                    id="description"
                    name="description"
                    value={imageData.description}
                    onChange={e => setImageData(x => ({ ...x, description: e.target.value }))}
                    type="textarea"
                />
                <InputField
                    label="Image Hash"
                    id="imageHash"
                    name="imageHash"
                    value={imageData.imageHash}
                    onChange={e => setImageData(x => ({ ...x, imageHash: e.target.value }))}
                />
                <InputField
                    label="Mint Price"
                    id="mintPrice"
                    name="mintPrice"
                    value={imageData.mintPrice}
                    onChange={e => setImageData(x => ({ ...x, mintPrice: e.target.value }))}
                    type="number"
                />
                <InputField
                    label="Max Per Wallet"
                    id="maxPerWallet"
                    name="maxPerWallet"
                    value={imageSupply.maxPerWallet}
                    onChange={e => setImageSupply(x => ({ ...x, maxPerWallet: +e.target.value }))}
                    type="number"
                />
                <InputField
                    label="Total Limit"
                    id="totalLimit"
                    name="totalLimit"
                    value={imageSupply.totalLimit}
                    onChange={e => setImageSupply(x => ({ ...x, totalLimit: +e.target.value }))}
                    type="number"
                />
                <InputField
                    label="Total Supply"
                    id="totalSupply"
                    name="totalSupply"
                    value={imageSupply.totalSupply}
                    onChange={e => setImageSupply(x => ({ ...x, totalSupply: +e.target.value }))}
                    type="number"
                />
                <InputField
                    label="Is Limited"
                    id="isLimited"
                    name="isLimited"
                    value={imageSupply.isLimited}
                    onChange={e => setImageSupply(x => ({ ...x, isLimited: e.target.checked }))}
                    type="checkbox"
                />

                <button
                    type="submit"
                    className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Set Image Data
                </button>
            </form>
        </div>
    );
};

export default CreatePage;
