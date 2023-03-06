let abi = {
    "abi": [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "newColor",
            "type": "string"
        }],
        "name": "changeColor",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
        }, {
            "internalType": "string[]",
            "name": "newColors",
            "type": "string[]"
        }],
        "name": "changeMultipleColors",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "generateCharacter",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getTokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "tokenIdToColor",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
}
let provider;
let contract;
let signer;
let accountAddress;


// CONNECT METAMASK BUTTON
let METAMASK_ID = localStorage.getItem('metamask') ?? '';

//CONNECT CONTRACT
if (window.ethereum && METAMASK_ID.length > 0) {
    connectContract()
}

function connectContract() {
    let contractAddress = "0x54f2dd7c40c5012163F4423f7A84f13e1a14F30a";

    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(function(result) {
        console.log(result)
        if (result['chainId'] === 80001) {
            provider.listAccounts().then(function(result) {
                console.log(result);
                accountAddress = result[0]; // figure out the user's Eth address

                provider.getBalance(String(result[0])).then(function(balance) {
                    var myBalance = (balance / ethers.constants.WeiPerEther).toFixed(4);
                    console.log("Your Balance: " + myBalance);
                });
            })
        }
    })
    // get a signer object so we can do things that need signing
    signer = provider.getSigner();
    // init contract,
    contract = new ethers.Contract(contractAddress, abi.abi, signer);
    contract.connect(signer)
}


$('#btn-metamask').on('click', function(e) {
    //window.ethereum ? signIn() : alert("Install MetaMask browser extension!");

    if (window.ethereum) {
        signIn();
    } else {
        $("#btn-metamask").removeClass('disabled');
        $('#metamask-note').html("Install MetaMask browser extension!");
    }
});

const signIn = async () => {
    let accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    }).catch(error => alert(JSON.stringify(error.message)));
    connectContract()

    $("#mm-address").html(accounts[0]);
    METAMASK_ID = accounts[0]
    $('#metamask-id').html(`${METAMASK_ID}`);
    localStorage.setItem('metamask', `${METAMASK_ID}`);
    $("#buy-btn").removeClass('disabled');
    $("#btn-metamask").addClass('disabled');
}


//COLOR PICKER
let color = $("#picker")[0].value;
$("#picker").on('change', function(e) {
    color = $(this)[0].value;
});


// SELECTED PIXEL
// let selectedPixels = ''
let selectedPixels = [];
let selectedColors = [];


// BUY PIXEL BUTTON
async function buyPixel(pixels, colors) {
    if (pixels.length > 0) {
        console.log(pixels);
        console.log(colors);

        let tx = await contract.changeMultipleColors(
            pixels,
            colors, // pass the colors array to the smart contract
            {
                value: ethers.utils.parseEther("0"), // price of the transaction
                from: accountAddress, // address which will be charged for the transaction
                gasPrice: ethers.utils.parseEther("0.0000001"), // price of gas fee
                gasLimit: 200000 * pixels.length // over 9 (hundred) thousand(s)
            });
        await tx.wait().then((receipt) => {
            if (receipt.status === 1) {
                $('#pixelPurchaseLabel').html("Success");
                $('#pixel-info').hide();
                $('#buy-btn').hide();
                $('#pixel-success').show();
                $("#modalPixels").empty();
                selectedPixels = [];
                selectedColors = [];
                //alert(`Transaction successful: ${receipt.transactionHash}`)
            }
        }).catch((error) => {

            $('#pixelPurchaseLabel').html("Fail")
            $('#pixel-info').hide();
            $('#buy-btn').hide();
            $('#pixel-fail').show();
            alert(`Transaction unsuccessful. Error: ${error}`)
        })

        $.ajax({
            url: '/buy-pixel',
            type: 'POST',
            data: {
                metamask_id: METAMASK_ID,
                pixels: pixels,
                color: color
            },
            success: async function(response) {

            },
            error: function(response) {}
        });
    }
}

// CREATE D3 SVG
let map = document.getElementById('#map');
let size = 100;
let start_zoom = 15;
let zoom = d3.zoom().scaleExtent([start_zoom, 100]).translateExtent([
    [0, 0],
    [size, size]
]);

let svg = d3.select('svg')
    .attr('viewbox', "0 0 " + size + " " + size)
    .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(start_zoom))
    .call(zoom.on('zoom', (event) => {
        svg.attr('transform', d3.event.transform);
    }))
    .append("g")
    .attr('transform', `translate(${0}, ${0})scale(${start_zoom})`);

// DRAW INITIAL PIXELS (size*size)
let y = 0;
for (let i = 0; i < size * size; i++) {
    let x = i % size
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (i % size == 0) y += 1

    svg.append('rect')
        .attr("class", "pixel")
        .attr("id", "pixel-" + i)
        .attr("x", x)
        .attr("y", y)
        .attr("width", 1)
        .attr("height", 1)


        // ZA KUPOVINU PIXELA, on purchase button click
        .on("click", function(e) {
            let p = d3.select(this)
            let pId = parseInt(d3.select(this).attr('id').replace("pixel-", ""));
            let pColor = d3.select(this).attr('fill');

            if (selectedPixels.some((pixelId) => pixelId === pId)) {
                d3.select(this).attr('fill', PIXEL_COLORS[pId]);
                selectedPixels = selectedPixels.filter((pixel) => pixel !== pId);
                selectedColors = selectedColors.filter((color) => color !== pColor);
            } else {
                d3.select(this).attr('fill', color);
                selectedPixels.push(pId);
                selectedColors.push(color);
            }
        });
}

let $progBar = $('#myBar');
let progbarCount = 0;

let DATA = {};
let PIXEL_COLORS = [];

// Function to sort object properties by key
function sortObject(obj) {
    const sorted = {};
    Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b)).forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
}

// Radix sort function
function radixSort(arr) {
    const maxDigitCount = Math.max(...arr.map(n => Math.floor(Math.log10(n)) + 1));
    for (let k = 0; k < maxDigitCount; k++) {
        const buckets = Array.from({
            length: 10
        }, () => []);
        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / Math.pow(10, k)) % 10;
            buckets[digit].push(arr[i]);
        }
        arr = [].concat(...buckets);
    }
    return arr;
}

for (let i = 0; i < 65; i++) {
    let res = $.ajax(`/get-mint-data/${i + 1}`).done(function(data) {
        DATA[i + 1] = data[i + 1];

        // Update progress bar
        progbarCount += 1.5385;
        $progBar.css('width', `${progbarCount}%`);
        if ($progBar.prop('style')['width'] === '100.002%') {
            console.log(`success: ${i + 1} pixels loaded`);
            $progBar.css('display', 'none');
            $('#myProgress').css('display', 'none');
        }

        // Update pixel colors
        PIXEL_COLORS.push(data[i + 1]);
        const sortedData = sortObject(DATA);
        const sortedPixels = [];
        for (const key in sortedData) {
            sortedPixels.push(sortedData[key]);
        }
        const sortedPixelColors = radixSort(PIXEL_COLORS);
        for (let j = 0; j < sortedPixels.length; j++) {
            $(`#pixel-${j}`).attr("fill", sortedPixelColors[j]);
        }
    });
}


$modalPixels = $("#modalPixels");
$('#close-modal').on("click", function(e) {
    $modalPixels.empty();
    selectedPixels = [];
    selectedColors = [];
});

document.getElementById("buyPixels").addEventListener("click", function(e) {
    e.preventDefault();
    // selected pixels sadrzi id atribut pixela (0, 15, 17...)
    if (selectedPixels.length > 0) {
        $('#pixelPurchaseLabel').html("Pixel Purchase")
        count = 0;

        selectedColors.forEach((c, i) => {
            const rowId = `row-${i}`;
            const pixelId = selectedPixels[i];
            const pixelColor = PIXEL_COLORS[pixelId];
            $modalPixels.append(`
              <div id="${rowId}" class='row'>
                <p class='col-5' id="${pixelId}" data-pixel-original-color="${pixelColor}" style='display:flex;align-items:center;'>Pixel color - <span class='pixel' style='background-color:${c};'></span></p>
                <p class='col-2'>x1</p>
                <p class='col-3'>0.02MATIC</p>
                <p class='col-2' style='font-size: 22px;'><i class='fa-solid fa-square-xmark' style='color:red;' title='Delete pixel'></i></p>
              </div>
            `);
            count += 0.02;

            $(`#${rowId} .fa-square-xmark`).click(function() {
                // Get the parent div element with the class .row
                const $parentDiv = $(this).parent().parent();
                // Find the p element with the class .col-5 and get the id attribute
                const pixelId = $parentDiv.find('.col-5').attr('id');
                // console.log(pixelId);
                // Get the original color of the pixel
                let originalColor = PIXEL_COLORS[pixelId];
                // console.log("ORIGINAL COLOR:"+originalColor);
                // Revert the color of the pixel on the SVG to the original color
                d3.select(`#pixel-${pixelId}`).attr('fill', originalColor);
                // Get the index of the row that was clicked
                const index = $parentDiv.index();
                // Remove the pixel and color from the arrays and remove the row
                selectedPixels.splice(index, 1);
                selectedColors.splice(index, 1);
                $parentDiv.remove();
            });


        });

        // Save the selected pixels and colors in the arrays
        selectedPixels = [...selectedPixels, ...selectedPixels];
        selectedColors = [...selectedColors, ...selectedColors];

        $('#metamask-note').html("");
        $('#pixel-success').hide();
        $('#pixel-fail').hide();
        $('#pixel-info').show();
        $('#buy-btn').show();
        $("#totalBuy").html('Total estimate: ' + count + 'MATIC')

        if (METAMASK_ID != '') {
            $("#buy-btn").removeClass('disabled');
            $('#metamask-id').html(`${METAMASK_ID}`);
            $("#btn-metamask").addClass('disabled');
        } else {
            $("#buy-btn").addClass('disabled');
            $('#metamask-id').html(`Connect MetaMask`);
            $("#btn-metamask").removeClass('disabled');
        }
        $("#pixelPurchase").modal('show');

        $('#buy-btn').on('click', function(e) {
            buyPixel(selectedPixels, selectedColors);
        })

    } else {
       // alert("Please choose either one or more pixels to purchase.")
    }
});