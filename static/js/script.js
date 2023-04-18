let numMinted = 152;

//COLOR PICKER
let color = $("#picker")[0].value;
$("#picker").on('change', function (e) {
    selectedFile = "";
    $("#image").empty();
    $("#image").attr("src", null);
    $("#image").css("display", "none");

    color = $(this)[0].value;
});


// SELECTED PIXEL
let selectedPixels = [];
let selectedColors = [];


// BUY PIXEL BUTTON
async function buyPixel(pixels, colors) {

    if (pixels.length > 0) {
        console.log(pixels);
        console.log(colors);

        let tx = await contract.changeMultiple(
            pixels,
            colors, // pass the colors array to the smart contract
            {
                value: ethers.utils.parseEther("0"), // price of the transaction
                from: accountAddress, // address which will be charged for the transaction
                gasPrice: ethers.utils.parseEther("0.000000001000000016"), // price of gas fee
                gasLimit: 18408638 // over 9 (hundred) thousand(s)
            });
        await tx.wait().then((receipt) => {
            if (receipt.status === 1) {
                $.ajax({
                    url: '/buy-pixel',
                    type: 'POST',
                    data: {
                        pixels: selectedPixels
                    }
                });
                $('#pixelPurchaseLabel').html("Success");
                $('#pixel-info').hide();
                $('#buy-btn').hide();
                $('#pixel-success').show();
                $("#modalPixels").empty();
                //remove border
                for (i in selectedPixels) {
                    $('#pixel-'+(parseInt(selectedPixels[i])-1)).attr('style', 'stroke: null');
                }
                selectedPixels = [];
                selectedColors = [];
            }
        }).catch((error) => {

            $('#pixelPurchaseLabel').html("Fail")
            $('#pixel-info').hide();
            $('#buy-btn').hide();
            $('#pixel-fail').show();
            //alert(`Transaction unsuccessful. Error: ${error}`)
        })
    }
}


// CREATE D3 SVG
let map = document.getElementById('#map');
let size = 30;
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
    if (i % size == 0) y += 1

    let id = "pixel-" + i;
    svg.append('rect')
        .attr("class", "pixel")
        .attr("id", id)
        .attr("x", x)
        .attr("y", y)
        .attr("width", 1)
        .attr("height", 1)
        .attr('fill', '#120F0F')
        // ZA KUPOVINU PIXELA, on purchase button click
        .on("click", function (e) {
            let p = d3.select(this)
            let pId = parseInt(d3.select(this).attr('id').replace("pixel-", ""));
            let pColor = d3.select(this).attr('fill');

            if (selectedPixels.some((pixelId) => pixelId === pId+1)) {
                let c=''
                let imgHref=''
                let index = selectedPixels.indexOf(pId+1)

                if (DATA[pId + 1] != undefined){
                    c =`url(#${pId})`
                    imgHref = DATA[pId + 1]
                } else {
                    c='#120F0F'
                    imgHref = ''
                }
                d3.select(this).attr("fill", c);
                d3.select(this).style('stroke', null);
                d3.select(this).style('stroke-width', null);
                $(`#${i} image`).attr("href", imgHref)

                selectedPixels.splice(index, 1);
                selectedColors.splice(index, 1);

                selectedFile = "";
                if (selectedColors.every((color) => !color.startsWith('d')))
                    hasImage = false
            } else {
                if (selectedFile !== "") {
                    if (selectedPixels.map((pixel) => pixel.length > 10).length >= 2) {
                        $("#uploadImage").modal('show');
                    } else {
                        $(`#${pId} image`).attr("href", selectedFile).attr("width", 1).attr("height", 1)
                        d3.select(this).attr("fill", `url(#${pId})`);
                        d3.select(this).style('stroke', 'white').style('stroke-width', '0.1px');
                        selectedPixels.push(pId+1);
                        selectedColors.push(selectedFile);
                        hasImage = true
                    }
                }
                else {
                    d3.select(this).attr('fill', color);
                    d3.select(this).style('stroke', 'white').style('stroke-width', '0.1px');
                    selectedPixels.push(pId+1);
                    selectedColors.push(color);
                }
            }
            var pixelCount = selectedPixels.length;
            $("#pixelCount").html(`${pixelCount}`);
        });
    svg.append("defs").append("pattern").attr("id", `${i}`).attr("patternUnits", "userSpaceOnUse").attr("width", 1).attr("height", 1).append("image")

}

let $progBar = $('#myBar');
let progbarCount = 0;

// fetch data
let hasImage = false
let DATA = {};
let PIXEL_COLORS = [];
let p = 100 / numMinted

// Generate a sequence of random integers within the range of [1, numMinted]
let fetchOrder = Array.from({length: numMinted}, (_, i) => i);
fetchOrder = fetchOrder.sort(() => Math.random() - 0.5);

// Fetch mint data for each integer in the shuffled sequence
for (let i = 0; i < numMinted; i++) {
  let fetchIndex = fetchOrder[i];

  let res = $.ajax(`/get-mint-data/${fetchIndex+1}`).done(function (data) {
    DATA[fetchIndex+1] = data[fetchIndex+1];
    $(`#${fetchIndex} image`).attr("href", DATA[fetchIndex+1]).attr("width", 1).attr("height", 1);
    $(`#pixel-${fetchIndex}`).attr("fill", `url(#${fetchIndex})`);
    PIXEL_COLORS.push(DATA[fetchIndex+1]);
    progbarCount += p;
    $progBar.css('width', `${progbarCount}%`);
    if ($progBar.prop('style')['width'] === '100%') {
      console.log(`success: ${i+1} pixels loaded`);
      $progBar.css('display', 'none');
      $('#myProgress').css('display', 'none');
    }
  });
}

$modalPixels = $("#modalPixels");
$('#close-modal').on("click", function (e) {
    $modalPixels.empty();
});

var selectedFile = "";
const input = document.getElementById('file');
$collectionDiv = $("#collection-body");

input.addEventListener('change', function () {
    let file = input.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function () {
        let dataUrl = reader.result;
        let fName = file.name.replace('.svg', '');
        localStorage.setItem(fName.replace(' ','-'), dataUrl);
        let $imgP=$(`<div id="img-${fName}" class="d-flex my-3 justify-content-between align-items-center">`)
        $collectionDiv.append($imgP);
        $imgP.on('click', function(){
            $("#collection-body").children().removeAttr("style");
             $(this).css('border', "solid 2px darkblue");
            $(this).css('border-radius', "500px");
            selectedFile = dataUrl;
        })
        $imgP.append(`<img class='m-4' src='${dataUrl}' width="50" height="50" /><p class="m-4">${fName}</p><a id="remove-${fName}" class="m-5"><i class="fa-solid fa-x"></i></a></div>`);
        document.getElementById(`remove-${fName}`).addEventListener("click", function (e) {
            localStorage.removeItem(fName);
           $(`#img-${fName}`).remove();
        });
    });

    reader.readAsDataURL(file);
});
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    if (key !== 'metamask') {
       $collectionDiv.append(`<div id="img-${key}" class="d-flex my-3 justify-content-between align-items-center"><img class='m-4' src='${value}' width="50" height="50" /><p class="m-4">${key}</p><a id="remove-${key}" class="m-5"><i class="fa-solid fa-x"></i></a></div>`);
       document.getElementById(`remove-${key}`).addEventListener("click", function (e) {
            localStorage.removeItem(key);
           $(`#img-${key}`).remove();
        });
        document.getElementById(`img-${key}`).addEventListener("click", function (e) {
            $("#collection-body").children().removeAttr("style");
            $(this).css('border', "solid 2px darkblue");
            $(this).css('border-radius', "500px");
            selectedFile = value;
        });
    }
}

const gallery = ["heart", "smile", "sun"];
for (let i = 0; i < gallery.length; i++) {
    let key = gallery[i];
    
    document.getElementById(`img-${key}`).addEventListener("click", function (e) {
        $("#collection-body").children().removeAttr("style");
        $(this).css('border', "solid 2px darkblue");
        $(this).css('border-radius', "500px");

       const image = document.getElementById(`${key}-svg`);

       fetch(image.src)
           .then((res) => res.blob())
           .then((blob) => {
               const reader = new FileReader();
               reader.onloadend = () => {
                selectedFile = reader.result;
               };
               reader.readAsDataURL(blob);
           });
    });
}

document.getElementById("btn-use").addEventListener("click", function (e) {
    e.preventDefault();
    if (selectedFile !== "") {
        $("#image").empty();
        $("#image").attr("src", `${selectedFile}`);
        $("#image").css("display", "flex");
    }
});

document.getElementById("myCollection").addEventListener("click", function (e) {
    e.preventDefault();
    if (selectedPixels.map((pixel) => pixel.length > 10).length >= 2) {
        $("#uploadImage").modal('show');
        //alert("Can't place more uploaded images");
    } else {
    $("#myCollectionModal").modal('show');
    }
});

document.getElementById("buyPixels").addEventListener("click", function (e) {
    e.preventDefault();

    if (selectedPixels.length > 0) {
        $('#pixelPurchaseLabel').html("Pixel Purchase")
        count = 0;

        selectedColors.forEach(c => {
            $modalPixels.append(`<p class='col-5'>Pixel -`);
            $modalPixels.append(c.length > 10 ? `<img class='col-2' style="width: 50px; height: 25px; margin-right: 10px;" src=${c} />` : `<span class='col-2' style="width: 25px; height: 25px; background-color: ${c};" />`)
            $modalPixels.append(`<p class='col-2'>x1`);
            $modalPixels.append(`<p class='col-3'>0.01 MATIC`);
            count += 0.01
        });
        $('#metamask-note').html("");
        $('#pixel-success').hide();
        $('#pixel-fail').hide();
        $('#pixel-info').show();
        $('#buy-btn').show();
        $("#totalBuy").html('Total estimate: ' + count + 'MATIC')

        if (METAMASK_ID != '') {
            $("#buy-btn").removeClass('disabled');
            $('#metamask_id').html(`${METAMASK_ID}`);
            $("#btn-metamask").addClass('disabled');
        } else {
            $("#buy-btn").addClass('disabled');
            $('#metamask_id').html(`Connect MetaMask`);
            $("#btn-metamask").removeClass('disabled');
        }
        $("#pixelPurchase").modal('show');

        $('#buy-btn').on('click', function (e) {
            buyPixel(selectedPixels, selectedColors);
        })

    } else {
        $("#buyPixel").modal('show');
        //alert("Please choose either one or more pixels to purchase.")
    }
});
