let abi = {
    "abi":  
        [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"newColor","type":"string"}],"name":"changeColor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"string[]","name":"newColors","type":"string[]"}],"name":"changeMultipleColors","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"generateCharacter","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenIdToColor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
}

let provider;
let contract;
let signer;
let accountAddress;




// CONNECT METAMASK BUTTON
let METAMASK_ID = localStorage.getItem('metamask') ?? '';

//CONNECT CONTRACT
if(window.ethereum && METAMASK_ID.length > 0) {
    connectContract()
}

function connectContract() {
    let contractAddress = "0x54f2dd7c40c5012163F4423f7A84f13e1a14F30a";

    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(function (result) {
        console.log(result)
        if (result['chainId'] === 80001) {
            provider.listAccounts().then(function (result) {
                console.log(result);
                accountAddress = result[0]; // figure out the user's Eth address

                provider.getBalance(String(result[0])).then(function (balance) {
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


$('#btn-metamask').on('click', function (e) {
    //window.ethereum ? signIn() : alert("Install MetaMask browser extension!");

    if(window.ethereum) {
        signIn();
    }else{
        $("#btn-metamask").removeClass('disabled');
        $('#metamask-note').html("Install MetaMask browser extension!");
    }
});

const signIn = async () => {
    let accounts = await window.ethereum.request({ method: "eth_requestAccounts" }).catch(error => alert(JSON.stringify(error.message)));
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
$("#picker").on('change', function (e) {
    color = $(this)[0].value;
});


// SELECTED PIXEL
// let selectedPixel = ''
let selectedPixel = [];
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
                        gasLimit: 200000*pixels.length // over 9 (hundred) thousand(s)
                    }); 
                await tx.wait().then((receipt) => {
                    if (receipt.status === 1) {
                        $('#pixelPurchaseLabel').html("Success");
                        $('#pixel-info').hide();
                        $('#buy-btn').hide();
                        $('#pixel-success').show();
                        $("#modalPixels").empty();
                        selectedPixel = [];
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
                    success: async function (response) {
        
                    },
                    error: function (response) {
                    }
                });
            }
        }


        // CREATE D3 SVG
        let map = document.getElementById('#map');
        let size = 100;
        let start_zoom = 15;
        let zoom = d3.zoom().scaleExtent([start_zoom, 100]).translateExtent([[0, 0], [size, size]]);

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
            .on("click", function (e) {
                // change color
                let p = d3.select(this).attr("fill", color);

                selectedPixel.push(parseInt(p.attr('id').replace("pixel-", "")) + 1);
                selectedColors.push(color);

                console.log("selected pixel id: " + p.attr('id') + " , color to change:" + color)

            });
        }

        let $progBar = $('#myBar');
        let progbarCount=0;

        // fetch data
        let DATA = {};
        for (let i = 0; i < 65; i++) {
        
            let res = $.ajax(`/get-mint-data/${i+1}`).done(function (data) {
                DATA = data;
                console.log(DATA);
                $(`#pixel-${i}`).attr("fill", DATA[i+1]);
                progbarCount+=1.5385;
                $progBar.css('width', `${progbarCount}%`);
            });
        }
    


$modalPixels =  $("#modalPixels");
document.getElementById("buyPixels").addEventListener("click", function (e) {
    e.preventDefault();

    if (selectedPixel.length > 0) {
        $('#pixelPurchaseLabel').html("Pixel Purchase")
        count=0;
        // $modalPixels.remove();

        selectedColors.forEach(c => {
            $modalPixels.append(`<p class='col-5'>Pixel color - ${c}`);
            $modalPixels.append(`<p class='col-2'>x1`);
            $modalPixels.append(`<p class='col-3'>0.02MATIC`);
            count+=0.02
        });
        $('#metamask-note').html("");
        $('#pixel-success').hide();
        $('#pixel-fail').hide();
        $('#pixel-info').show();
        $('#buy-btn').show();
        $("#totalBuy").html('Total estimate: '+count+'MATIC')

        if(METAMASK_ID !=  '') {
            $("#buy-btn").removeClass('disabled');
            $('#metamask-id').html(`${METAMASK_ID}`);
            $("#btn-metamask").addClass('disabled');
        }else{
            $("#buy-btn").addClass('disabled');
            $('#metamask-id').html(`Connect MetaMask`);
            $("#btn-metamask").removeClass('disabled');
        }
        $("#pixelPurchase").modal('show');

        $('#buy-btn').on('click', function (e) {
            buyPixel(selectedPixel, selectedColors);
        })

    }else {
            alert("Please choose either one or more pixels to purchase.")
    }
});


// })();
