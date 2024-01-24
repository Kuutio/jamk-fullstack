var koko = document.getElementById("koko");
var hinta = document.getElementById("hinta");

function main() {
    renderHouses();
}

koko.addEventListener("click", update);
hinta.addEventListener("click", update);

function update() {
    let housediv = document.getElementById("houses");
    housediv.replaceChildren();
    main();
}




async function getHouseData() {

    let adr = "talotiedot.json";
    try {
        let data = await fetch(adr);
        return await data.json();
    } catch (error) {
        console.log(error);
        console.log("error FFS");
    }
}

async function renderHouses() {
    let houses = await getHouseData();
    //console.log(houses);

    let housediv = document.getElementById("houses");

    houses.forEach(house => {

        if (koko.checked == true) {
            if (house.size > 200) {
                return;
            }
        }

        if (hinta.checked == true) {
            if (house.price > 1000000) {
                return;
            }
        }

        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        let size = document.createElement('p');
        let price = document.createElement('p');
        let text = document.createElement('p');

        size.className = 'text';
        price.className = 'text';
        text.className = 'text';
        header.className = 'header';

        header.innerHTML = house.address;
        size.innerHTML = house.size + " m2";
        price.innerHTML = new Intl.NumberFormat('fi-FI').format(house.price) + " euroa";
        text.innerHTML = house.text;

        //console.log(address, " ", size, " ", price, " ", text)


        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(size);
        housecontainer.appendChild(text);
        housecontainer.appendChild(price);

        housediv.appendChild(housecontainer);


    });
}


main()