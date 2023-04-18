let abi = ABI
let provider;
let contract;
let signer;
let accountAddress;

$('#metamask_id').val(`CONNECT METAMASK`);


// CONNECT METAMASK BUTTON
let METAMASK_ID = '';
$.ajax({
    url:'buy/get-mid',
    type: 'GET',
    async: false
}).done(function(d) { 
    METAMASK_ID=d;
}).catch(function (e){
    METAMASK_ID = '';
})
localStorage.setItem('metamask', `${METAMASK_ID}`);

//CONNECT CONTRACT
if (window.ethereum && METAMASK_ID.length > 0) {
    connectContract()
}

function connectContract() {
    let contractAddress = "0x53734b36FE7E9f35FD15c7BE1ccA054E9bFaEb3E";

    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(function (result) {
        if (result['chainId'] === 80001) {
            provider.listAccounts().then(function (result) {
                accountAddress = result[0]; // figure out the user's Eth address
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
    if (window.ethereum) {
        signIn();
    } else {
        $("#btn-metamask").removeClass('disabled');
        $('#metamask-note').html("Install MetaMask browser extension!");
    }
});

const signIn = async () => {
    let accounts = await window.ethereum.request({ method: "eth_requestAccounts" }).catch(error => alert(JSON.stringify(error.message)));
    connectContract()

    $("#mm-address").html(accounts[0]);
    METAMASK_ID = accounts[0]
    $('#metamask_id').html(`${METAMASK_ID}`);
    $('#metamask_id').val(`${METAMASK_ID}`);

    $("#buy-btn").removeClass('disabled');
    $("#btn-metamask").addClass('disabled');
}
