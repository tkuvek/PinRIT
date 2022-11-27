// CONNECT METAMASK BUTTON
let METAMASK_ID = ''
$('#btn-metamask').on('click', function(e) {
    window.ethereum ? signIn() : alert("Install MetaMask browser extension!");
})
const signIn = async () => {
    accounts = await window.ethereum.request({method: "eth_requestAccounts"}).catch(error => alert(JSON.stringify(error.message)));
    $("#mm-address").html(accounts[0]);
    METAMASK_ID = accounts[0]
}


//COLOR PICKER
let color = $("#picker")[0].value;
$("#picker").on('change', function(e){
    color = $(this)[0].value;
});


// SELECTED PIXEL
let selectedPixel = ''


// BUY PIXEL BUTTON
function buyPixel() {
    if (selectedPixel != '') {
        $.ajax({
            url: '/buy-pixel',
            type: 'POST',
            data: {
                metamask_id: METAMASK_ID,
                pixel: selectedPixel,
                color: color
            },
            success: function (response) {
            },
            error: function (response) {
            }
        });
    }
}


// CREATE D3 SVG
let map = document.getElementById('#map');
let size=100;
let start_zoom=15;
let zoom = d3.zoom().scaleExtent([start_zoom,100])

let svg = d3.select('svg')
    .attr('viewbox', "0 0 "+size +" "+ size)
    .call(zoom.transform, d3.zoomIdentity.translate(0,0).scale(start_zoom))
    .call(zoom.on('zoom', (event) => {
        svg.attr('transform', d3.event.transform);
     }))
    .append("g")
    .attr('transform', `translate(${0}, ${0})scale(${start_zoom})`);

// DRAW INITIAL PIXELS (size*size)
let y = 0;
for(let i=0; i<size*size; i++){
    let x = i%size
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    if(i%size == 0) y+=1

    svg.append('rect')
    .attr("class", "pixel")
    .attr("id", "pixel-"+i)
    .attr("x", x)
    .attr("y", y)
    .attr("width", 1)
    .attr("height", 1)
   // .attr("fill", "#"+randomColor)
   .attr("fill", "#000000")

    
    // TRIGGER ON CLICK pixel actions
    .on("click", function(e) {
        // change color
        let p = d3.select(this).attr("fill" , color);
        selectedPixel = p.attr('id')

        console.log("selected pixel id: "+p.attr('id')+" , color to change:"+color)

        // todo: add to buy button
        buyPixel()
    });

}

