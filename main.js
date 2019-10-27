
// on mobile- show nav on click menu icon
// popular listing adjust text
// make individual page for property (click on image works)
// main nav bar link to proper page
// make some animation on load and on scroll
// fix search button icon style









let landingGallery = document.querySelector('.landing-gallery-content');
let menuIcon = document.querySelector('.menu-icon');
let addressInput = document.querySelector('.location');
let minPrice = document.querySelector('.min-price');
let maxPrice = document.querySelector('.max-price');
let bedsNum = document.querySelector('.beds');
let searchBar = document.querySelector('.search-btn');
let viewGallery = document.querySelector('.btn-to-gallery');
let propertyType = document.querySelector('.property-type');


class Products {
    // get properties from JSON 
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
                 <a href="#"  onclick="document.location=this.id+'.html';return false;"> 
                  <img id=${item.id} src="${item.image}" alt=""> 
                   </a>
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
    displayAllProperty(property) {
        let result = '';
        property.forEach(item => {
            result += `
                 <div class="property-card">
                 <a href="#"  onclick="document.location=this.id+'.html';return false;"> 
                  <img id=${item.id} src="${item.image}" alt=""> 
                   </a>
                <div class="property-card-information">
                    <p class="property-address">${item.address}</p>
    
                    <h2 class="property-price"><span>${item.price}</span> (For Sale)</h2>
                    <p class="property-beds">Beds: ${item.beds}</p>
                   
                    <p class="property-size">1,976 m2</p>
                    <p class="property-baths">Baths:${item.baths}</p>
                </div>
            </div> `;
        });
        landingGallery.innerHTML = result
    }
    filterProperty(property) {
        let results = '';
        results = property.filter(item => {

            return item.address === addressInput.value
                && item.price >= minPrice.value
                && item.price <= maxPrice.value
                && item.type == propertyType.value
        })
        let filteredProperty = '';

        results.forEach(item => {
            filteredProperty += `<div class="property-card">
            <a href="#"  onclick="document.location=this.id+'.html';return false;"> 
             <img id=${item.id} src="${item.image}" alt=""> 
              </a>
           <div class="property-card-information">
               <p class="property-address">${item.address}</p>
               <h2 class="property-price"><span>${item.price}</span> (For Sale)</h2>
               <p class="property-beds">Beds: ${item.beds}</p>
               <p class="property-size">1,976 m2</p>
               <p class="property-baths">Baths:${item.baths}</p>
           </div>
       </div> `
        })
        landingGallery.innerHTML = filteredProperty
    }
}
// display promo property at landing page init
document.addEventListener('DOMContentLoaded', () => {
    let products = new Products()
    let display = new Display()
    products.getProducts().then(property => {
        display.displayPromo(property)
    })
})
// FILTER 
searchBar.addEventListener('click', () => {
    let products = new Products()
    let display = new Display()
    products.getProducts().then(property => {
        display.filterProperty(property)
    })
})
// DISPLAY ALL 
viewGallery.addEventListener('click', () => {
    let products = new Products()
    let display = new Display()
    products.getProducts().then(property => {
        display.displayAllProperty(property)
    })

})

