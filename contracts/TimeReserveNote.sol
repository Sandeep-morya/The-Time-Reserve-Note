// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TimeReserveNote is ERC721, Ownable {
    address payable public withdrawWalletAddress;

    // Struct representing the details of an image NFT
    struct ImageData {
        string title;
        string subtitle;
        string description;
        string imageHash;
        string mintPrice;
    }

    // Struct representing the supply-related details of an image NFT
    struct ImageSupply {
        uint256 totalSupply;
        uint256 maxPerWallet;
        uint256 totalLimit;
        bool isLimited;
    }

    // Struct representing the access-related details of an image NFT
    struct ImageAccess {
        bool mintingEnabled;
        uint256 enabledAt;
    }

    // Struct representing an image NFT
    struct Image {
        string id;
        ImageData data;
        ImageSupply supply;
        uint256 createdAt;
        ImageAccess access;
    }

    struct ImageDetails {
        string id;
        ImageData data;
        ImageSupply supply;
        ImageAccess access;
    }
    struct MintData {
        uint256 tokenId;
        uint256 mintedAt;
        string id;
        address by;
    }

    struct MintedData {
        Image image;
        MintData mintData;
    }

    mapping(string => Image) public images;
    string[] public allImageIds;
    mapping(address => mapping(string => uint256)) public walletMints;
    mapping(address => MintData[]) public allMintedData;

    event ImageSet(string indexed id);

    constructor() ERC721("Time Reserve Note", "TRN") Ownable(msg.sender) {
        withdrawWalletAddress = payable(msg.sender);
    }

    function setImageData(
        ImageDetails memory imageDetails_
    ) external onlyOwner {
        require(
            bytes(images[imageDetails_.id].id).length == 0,
            "Image with this ID already exists"
        );

        images[imageDetails_.id] = Image({
            id: imageDetails_.id,
            data: imageDetails_.data,
            supply: imageDetails_.supply,
            access: imageDetails_.access,
            createdAt: block.timestamp
        });

        allImageIds.push(imageDetails_.id);

        emit ImageSet(imageDetails_.id);
    }

    function enableMinting(string calldata id_) external onlyOwner {
        require(bytes(images[id_].id).length > 0, "Image not found");
        images[id_].access = ImageAccess(true, block.timestamp);
    }

    function addMintData(
        address to_,
        string memory id_,
        uint256 tokenID_,
        uint256 mintedAt_
    ) private {
        allMintedData[to_].push(MintData(tokenID_, mintedAt_, id_, to_));
    }

    function mint(string calldata id_, uint256 quantity_) public payable {
        require(
            images[id_].access.mintingEnabled,
            "Minting is not enabled for this image"
        );

        require(
            images[id_].supply.maxPerWallet >=
                walletMints[msg.sender][id_] + quantity_,
            "Exceeded maximum per wallet limit"
        );

        if (images[id_].supply.isLimited) {
            require(
                images[id_].supply.totalSupply + quantity_ <=
                    images[id_].supply.totalLimit,
                "Exceeded total limit for this image"
            );
        }

        for (uint256 i = 1; i <= quantity_; i++) {
            bytes32 uniqueHash = keccak256(
                abi.encodePacked(msg.sender, block.number, i)
            );
            uint256 newTokenId = uint256(uniqueHash) % (10 ** 16);
            images[id_].supply.totalSupply += 1;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender][id_] += 1;
            addMintData(msg.sender, id_, newTokenId, block.timestamp);
        }
    }

    function getAllImages() external view returns (Image[] memory) {
        Image[] memory result = new Image[](allImageIds.length);

        for (uint256 i = 0; i < allImageIds.length; i++) {
            string memory id = allImageIds[i];
            Image storage image = images[id];

            result[i] = Image({
                id: id,
                data: image.data,
                supply: image.supply,
                access: image.access,
                createdAt: image.createdAt
            });
        }

        return result;
    }

    function showMyMints() external view returns (MintedData[] memory) {
        MintedData[] memory result = new MintedData[](
            allMintedData[msg.sender].length
        );

        for (uint256 i = 0; i < allMintedData[msg.sender].length; i++) {
            string memory id = allMintedData[msg.sender][i].id;
            Image memory image = images[id];
            MintData memory mintData = allMintedData[msg.sender][i];

            result[i] = MintedData({image: image, mintData: mintData});
        }
        return result;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWalletAddress.call{
            value: address(this).balance
        }("");
        require(success, "Withdrawal failed");
    }
}
