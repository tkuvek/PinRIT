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

    mapping(uint256 => string[26]) public tokenIdToColors;

    constructor() ERC721("PinRIT Croatia", "PinRIT") {}

    function generateCharacter(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        string[26] memory colors = getColors(tokenId);

        bytes memory svg = abi.encodePacked(
            '<svg id="map" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<rect class="pixel" id="pixel-0" x="0" y="0" width="20" height="20" fill="',
            colors[0],
            '"></rect>',
            '<rect class="pixel" id="pixel-1" x="20" y="0" width="20" height="20" fill="',
            colors[1],
            '"></rect>',
            '<rect class="pixel" id="pixel-2" x="40" y="0" width="20" height="20" fill="',
            colors[2],
            '"></rect>',
            '<rect class="pixel" id="pixel-3" x="60" y="0" width="20" height="20" fill="',
            colors[3],
            '"></rect>',
            '<rect class="pixel" id="pixel-4" x="80" y="0" width="20" height="20" fill="',
            colors[4],
            '"></rect>',
            '<rect class="pixel" id="pixel-5" x="0" y="20" width="20" height="20" fill="',
            colors[5],
            '"></rect>',
            '<rect class="pixel" id="pixel-6" x="20" y="20" width="20" height="20" fill="',
            colors[6],
            '"></rect>',
            '<rect class="pixel" id="pixel-7" x="40" y="20" width="20" height="20" fill="',
            colors[7],
            '"></rect>',
            '<rect class="pixel" id="pixel-8" x="60" y="20" width="20" height="20" fill="',
            colors[8],
            '"></rect>',
            '<rect class="pixel" id="pixel-9" x="80" y="20" width="20" height="20" fill="',
            colors[9],
            '"></rect>',
            // '<rect class="pixel" id="pixel-10" x="0" y="3" width="20" height="20" fill="',
            // colors[10],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-11" x="1" y="3" width="20" height="20" fill="',
            // colors[11],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-12" x="2" y="3" width="1" height="1" fill="',
            // colors[12],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-13" x="3" y="3" width="1" height="1" fill="',
            // colors[13],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-14" x="4" y="3" width="1" height="1" fill="',
            // colors[14],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-15" x="0" y="4" width="1" height="1" fill="',
            // colors[15],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-16" x="1" y="4" width="1" height="1" fill="',
            // colors[16],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-17" x="2" y="4" width="1" height="1" fill="',
            // colors[17],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-18" x="3" y="4" width="1" height="1" fill="',
            // colors[18],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-19" x="4" y="4" width="1" height="1" fill="',
            // colors[19],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-20" x="0" y="5" width="1" height="1" fill="',
            // colors[20],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-21" x="1" y="5" width="1" height="1" fill="',
            // colors[21],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-22" x="2" y="5" width="1" height="1" fill="',
            // colors[22],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-23" x="3" y="5" width="1" height="1" fill="',
            // colors[23],
            // '"></rect>',
            // '<rect class="pixel" id="pixel-24" x="4" y="5" width="1" height="1" fill="',
            // colors[24],
            // '"></rect>',
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

    function getColors(uint256 tokenId)
        internal
        view
        returns (string[26] memory)
    {
        string[26] memory colors = tokenIdToColors[tokenId];
        return colors;
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenIdToColors[newItemId] = [
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red",
            "green",
            "yellow",
            "black",
            "red"
        ];

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

    function changeColor(
        uint256 tokenId,
        string memory newColor,
        uint256 pixelId
    ) public {
        require(_exists(tokenId), "Please use an existing token");
        require(
            ownerOf(tokenId) == msg.sender,
            "You must own the pixel before changing it's color"
        );

        string[26] memory currentColors = tokenIdToColors[tokenId];
        currentColors[pixelId] = newColor;
        tokenIdToColors[tokenId] = currentColors;

        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
