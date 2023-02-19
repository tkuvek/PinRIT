let abi = {
    "abi":  [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"newColor","type":"string"}],"name":"changeColor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"generateCharacter","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenIdToColor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
}

let provider;
let contract;
let signer;
let accountAddress;

let DATA = {};
(async () => {
    let res = await $.ajax('/get-mint-data').done(function (data) {
        DATA = data
        console.log(DATA)

        // CONNECT METAMASK BUTTON
        let METAMASK_ID = ''
        $('#btn-metamask').on('click', function (e) {
            window.ethereum ? signIn() : alert("Install MetaMask browser extension!");

        })
        const signIn = async () => {
            let accounts = await window.ethereum.request({ method: "eth_requestAccounts" }).catch(error => alert(JSON.stringify(error.message)));

            let contractAddress = "0x2E81d5bB5aC7EeB5bE89119d9eDB3C8950fEEeAf";

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
            // initi contract,
            contract = new ethers.Contract(contractAddress, abi.abi, signer);
            contract.connect(signer)
            $("#mm-address").html(accounts[0]);
            METAMASK_ID = accounts[0]
        }


        //COLOR PICKER
        let color = $("#picker")[0].value;
        $("#picker").on('change', function (e) {
            color = $(this)[0].value;
        });


        // SELECTED PIXEL
        let selectedPixel = ''


        // BUY PIXEL BUTTON
        async function buyPixel() {
            if (selectedPixel != '') {
                tokenId = parseInt(selectedPixel.replace("pixel-", "")) + 1 // incremented selected pixel because first token is #1, not #0
                let tx = await contract.changeColor(
                    tokenId, color, 
                    {
                        value: ethers.utils.parseEther("0"), // price of the transaction
                        from: accountAddress, // address which will be charged for the transaction
                        gasPrice: ethers.utils.parseEther("0.0000001"), // price of gas fee
                        gasLimit: 900000 // over 9 (hundred) thousand(s)
                    });

                await tx.wait().then((receipt) => {
                    if (receipt.status === 1) {
                        alert(`Transaction successful: ${receipt.transactionHash}`)
                    }
                }).catch((error) => {
                    alert(`Transaction unsuccessful. Error: ${error}`)
                })

                $.ajax({
                    url: '/buy-pixel',
                    type: 'POST',
                    data: {
                        metamask_id: METAMASK_ID,
                        pixel: selectedPixel,
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

        console.log(DATA.length)
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
                .attr("fill", DATA[i + 1] ? DATA[i + 1] : "#000000")


                // TRIGGER ON CLICK pixel actions
                .on("click", function (e) {
                    // change color
                    let p = d3.select(this).attr("fill", color);
                    selectedPixel = p.attr('id')

                    console.log("selected pixel id: " + p.attr('id') + " , color to change:" + color)

                    // todo: add to buy button
                    buyPixel()
                });

        }


    });
})();
// getData()

