let landingGallery = document.querySelector('.landing-gallery-content');
let menuIcon = document.querySelector('.menu-icon');


class Products {


    async  getProducts() {
        let properties = await fetch("./property.json");
        let data = await properties.json();

        let property = data.property;
        property = property.map(item => {
            const { address, beds, baths, id, image, name, price, relatedImages, type, promo } = item;
            return { address, beds, baths, id, image, name, price, relatedImages, type, promo }
        })
        return property
    }

}
class Display {

    displayPromo(property) {
        let result = '';
        property.forEach(item => {

            if (item.promo) {
                result += `
                 <div class="property-card">
                 <a href="">  <img src="${item.image}" alt=""> </a>
                <div class="property-card-information">
                    <p class="property-address">${item.address}</p>
    
                    <h2 class="property-price"><span>${item.price}</span> (For Sale)</h2>
                    <p class="property-beds">Beds: ${item.beds}</p>
                   
                    <p class="property-size">1,976 m2</p>
                    <p class="property-baths">Baths:${item.baths}</p>
                </div>
            </div> `;
            }
        });
        landingGallery.innerHTML = result

    }






}
document.addEventListener('DOMContentLoaded', () => {
    let products = new Products()
    let display = new Display()

    products.getProducts().then(property => {
        display.displayPromo(property)
    })


})