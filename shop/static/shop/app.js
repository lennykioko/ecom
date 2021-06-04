// const BASE_URL = "https://abufulan.co.ke/";
const BASE_URL = "http://127.0.0.1:8000/";

let categories;
let brands;
let products;


const mainContent = document.querySelector("#mainContent");
const navigateCategories = document.querySelector("#categories");
const shopSideNavCategories = document.querySelector("#sideNavCategories");
const shopSideNavBrands = document.querySelector("#shopSideNavBrands");

shopSideNavBrands.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target.value);
});

shopSideNavCategories.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event);
});

function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getCategoriesAndBrands = async () => {
    try {
        let url = new URL(`${BASE_URL}categorybrands`);

        let res = await fetch(url);
        res = await res.json();
        return res.categorybrands;
    } catch (err) {
        console.log(err);
    }
};

const getBrands = async (category) => {
    try {
        let url = category ? new URL(`${BASE_URL}brands?category=${category}`) : new URL(`${BASE_URL}brands/`);

        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const getCategories = async (category) => {
    try {
        let url = new URL(`${BASE_URL}categories`);

        let res = await fetch(url);
        res = await res.json();
        return res.categories;
    } catch (err) {
        console.log(err);
    }
};

const getProducts = async (search = false, limit = false, feature = false, category = false, brand = false) => {
    mainContent.innerHTML = "";

    try {
        let url = new URL(`${BASE_URL}products/`);

        // url = search && new URL(`${BASE_URL}products?search=${search}`);
        // url = limit && new URL(`${BASE_URL}products?limit=${limit}`);
        // url = limit && featured && new URL(`${BASE_URL}products?limit=${limit}&featured=${featured}`);
        // url = category && brand && new URL(`${BASE_URL}products?category=${category}&brand=${brand}`);

        const res = await fetch(url);
        mainContent.innerHTML = "";
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const fillCategories = async () => {
    const response = await getCategoriesAndBrands();
    navigateCategories.innerHTML = "";
    let brands = "";
    let categ = "";

    response?.map((item) => {
        brands = "";
        Object.entries(item).forEach(([key, value]) => {
            categ = key;
            value?.map((v) => {
                brands += `<li class="col-inner"><a href=${BASE_URL}?category=${v.name}>${v.name}</a></li>`
            });
        });
        navigateCategories.insertAdjacentHTML(
            "beforeend",
            `<li>
                <a href="#">${categ}</a><span class="icon"></span>
                <div class="dropdown-content">
                    <ul class="level1">
                        <li class="sub-menu col-3">
                            <a href="#">${categ}</a>
                            <ul class="level2">
                            ${brands}
                            </ul>
                        </li>
                    </ul>
                </div>
            </li>`
        );
    });
};

const handleSearch = async (search) => {
    const response = await getProducts(search);
    const data = response.products;
    products = response.products;
    displayProducts(products);
};

const displayProducts = async (data) => {
    data?.map((item) => {
        mainContent.insertAdjacentHTML(
            "beforeend",
            `<div class= "product-list-item">
            <div style="height:270px; display:flex; align-items:center;" class="product-item-img">
                <a href="#"><img src="/media/${item.image}" alt=${item.name}
                class="img-responsive"></a>
                <div class="label label-2 red label-top-20">Hot</div>
                </div>
                <div class="product-item-info">
                <h3 class="black" style="font-weight:bold><a href="#" title="">${item.name}</a></h3>
                <div style="height:70px; overflow:auto">${item.description}</div>
                <div class="prod-price">
                    <span class="price black">Ksh. ${commaThousand(item.price)}</span>
                </div>
                <div class="button-ver2">
                    <a href="tel:254792029968" class="addcart-ver2" title="Add to cart"><span
                    class="icon"></span>CALL TO ORDER</a>
                    <!-- <a href="#" class="quickview" title="quick view"><i class="ion-eye fa-4" aria-hidden="true"></i></a>
                    <a href="#" class="wishlist" title="wishlist"><i class="ion-heart fa-4" aria-hidden="true"></i></a> -->
                </div>
                </div>
            </div>`
        );
    });
}

const fillShopSidNavCategories = async () => {
    const response = await getCategories();
    shopSideNavCategories.innerHTML = "";

    response?.map((item) => {
        shopSideNavCategories.insertAdjacentHTML(
            "beforeend",
            `<li class="" value=${item.name}>
            <a onclick="#" value=${item.name}>${item.name}</a>
        </li>`
        );
    });
};

const fillShopSidNavBrands = async (categoryBrands) => {
    const response = await getCategoriesAndBrands();
    shopSideNavBrands.innerHTML = "";
    categoryBrands?.map((v) => {
        shopSideNavCategories.insertAdjacentHTML(
            "beforeend",
            `<div class="checkbox">
                <label><input type="checkbox" value=${v.name}>${v.name}</label>
            </div>`
        );
    });
};

if (mainContent) handleSearch();
if (shopSideNavCategories) fillShopSidNavCategories();
fillCategories();