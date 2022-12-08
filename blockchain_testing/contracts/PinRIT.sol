// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract PinRIT is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) public tokenIdToColor;

    constructor() ERC721("PinRIT", "PRIT") {}

    function generateCharacter(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        bytes memory svg = abi.encodePacked(
            '<svg id="',
            tokenId.toString(),
            '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<rect width="100%" height="100%" fill="',
            getColor(tokenId),
            '" />',
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getColor(uint256 tokenId) internal view returns (string memory) {
        string memory color = tokenIdToColor[tokenId];
        return color;
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenIdToColor[newItemId] = "black";

        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "PinRIT Croatia #',
            tokenId.toString(),
            '",',
            '"description": "Editable pixel art",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function changeColor(uint256 tokenId, string memory newColor) public payable {
        require(_exists(tokenId), "Please use an existing token");
        require(
            ownerOf(tokenId) == msg.sender,
            "You must own the pixel before changing it's color"
        );
        string memory currentColor = tokenIdToColor[tokenId];
        currentColor = newColor;
        tokenIdToColor[tokenId] = currentColor;

        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
