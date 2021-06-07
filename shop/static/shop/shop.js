const BASE_URL = "https://abufulan.co.ke/";
// const BASE_URL = "http://127.0.0.1:8000/";

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form .form-control");
const searchBtn = document.querySelector(".search-form .search-icon");

const searchFormMd = document.querySelector("#search-md");
const searchInputMd = document.querySelector("#search-md .form-control");
const searchBtnMd = document.querySelector("#search-md .search-icon");

const mainContent = document.querySelector("#mainContent");
const categoriesDropdown = document.querySelector("#categories");

const sideCategories = document.querySelector("#sideCategories");
const sideBrands = document.querySelector("#sideBrands");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let activeCategory = urlParams.get("category") ? urlParams.get("category") : 'All';

const ordersDict = {
    'Newest':'Newest',
    'Oldest': 'Oldest',
    'Featured': 'Featured',
    'DESC': 'Price - High to Low',
    'ASC': 'Price - Low to High'
}

const order = document.querySelector("#orderBy");
order.innerHTML = urlParams.get("order") ? ordersDict[urlParams.get("order")] : 'Newest';


function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const buildQuery = (name, value) => {
    if (urlParams.has(name)) {
        urlParams.delete(name);
        urlParams.append(name, value);
    } else {
        urlParams.append(name, value);
    }

    window.location.href = new URL(`${BASE_URL}catalogue/?${urlParams.toString()}`);
}

const clearQuery = (name) => {
    if (urlParams.has(name)) {
        urlParams.delete(name);
    }

    window.location.href = new URL(`${BASE_URL}catalogue/?${urlParams.toString()}`);
}

const getCategories = async () => {
    try {
        const url = new URL(`${BASE_URL}categories`);
        const res = await fetch(url);
        const result = await res.json();
        return result.categories;
    } catch (err) {
        console.log(err);
    }
};

const getBrandsOfCategory = async (category) => {
    try {
        const url = new URL(`${BASE_URL}brands?category=${category}`);
        const res = await fetch(url);
        const result = await res.json();
        return result.brands;
    } catch (err) {
        console.log(err);
    }
};

const getProducts = async (params) => {
    try {
        const url = new URL(`${BASE_URL}products?${params}`);
        const res = await fetch(url);
        const result = await res.json();
        return result.products;
    } catch (err) {
        console.log(err);
    }
};

const getCategoriesAndBrands = async () => {
    try {
        const url = new URL(`${BASE_URL}categorybrands`);
        const res = await fetch(url);
        result = await res.json();
        return result.categorybrands;
    } catch (err) {
        console.log(err);
    }
};

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBtn.click();
});

searchBtn.addEventListener("click", async () => {
    buildQuery("search", searchInput.value)
});

// for the md. lg screen size form
searchFormMd.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBtnMd.click();
});

searchBtnMd.addEventListener("click", async () => {
    buildQuery("search", searchInputMd.value)
});

const fillCategoryDropdown = async () => {
    const response = await getCategoriesAndBrands();
    categoriesDropdown.innerHTML = "";
    let category = "";
    let brands = "";

    response?.map((item) => {
        brands = "";
        Object.entries(item).forEach(([key, value]) => {
            category = key;
            value?.map((brand) => {
                brands += `<li class="col-inner"><a href="javascript:void(0)" onclick="buildQuery('brands', '${brand.name}')">${brand.name}</a></li>`
            });
        });

        categoriesDropdown.insertAdjacentHTML(
            "beforeend",
            `<li>
                <a href="javascript:void(0)" onclick="buildQuery('category', '${category}')">${category}</a><span class="icon"></span>
                <div class="dropdown-content">
                    <ul class="level1">
                        <li class="sub-menu col-3">
                            <a href="javascript:void(0)" onclick="buildQuery('category', '${category}')">${category}</a>
                            <ul class="level2">
                                ${brands}
                            </ul>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>
            </li>`
        );
    });
};

const fillSideCategories = async () => {
    const response = await getCategories();
    sideCategories.innerHTML =
    `
    <li class=${activeCategory ==  "All" ? 'active' : undefined} value="All">
        <a href="javascript:void(0)" onclick="clearQuery('category'); clearQuery('brands')">All</a>
    </li>
    `;

    response?.map((item) => {
        sideCategories.insertAdjacentHTML(
            "beforeend",
            `<li class=${activeCategory == item.name.toLowerCase()  ? 'active' : undefined} value=${item.name}>
            <a href="javascript:void(0)" onclick="buildQuery('category', '${item.name}')">${item.name}</a>
        </li>`
        );
    });
};

const fillSideBrands = async (category) => {
    const response = await getBrandsOfCategory(category);
    sideBrands.innerHTML = "";
    response?.map((brand) => {
        sideBrands.insertAdjacentHTML(
            "beforeend",
            `<div class="checkbox">
                <label><input type="checkbox" onclick="buildQuery('brands', '${brand.name}')" value=${brand.name}>${brand.name}</label>
            </div>`
        );
    });
};

const fillProducts = async (params) => {
    const response = await getProducts(params);
    mainContent.innerHTML = "";

    response?.map((item) => {
        mainContent.insertAdjacentHTML(
            "beforeend",
            `<div class= "product-list-item">
            <div style="height:270px; display:flex; align-items:center;" class="product-item-img">
                <a href="#"><img src="/media/${item.image}" alt=${item.name}
                class="img-responsive"></a>
                <div class="label label-2 red label-top-20">Hot</div>
                </div>
                <div class="product-item-info">
                <h3 class="black" style="font-weight:bold><a href="javascript:void(0)" title="">${item.name}</a></h3>
                <div style="height:70px; overflow:auto">${item.description}</div>
                <div class="prod-price">
                    <span class="price black">Ksh. ${commaThousand(item.price)}</span>
                </div>
                <div class="button-ver2">
                    <a href="tel:254792029968" class="addcart-ver2" title="Add to cart"><span
                    class="icon"></span>CALL TO ORDER</a>
                </div>
                </div>
            </div>`
        );
    });
};



fillProducts(urlParams.toString());
fillCategoryDropdown();
fillSideCategories();
fillSideBrands(activeCategory);
