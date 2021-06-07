// const BASE_URL = "https://abufulan.co.ke/";
const BASE_URL = "http://127.0.0.1:8000/";


const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form .form-control");
const searchBtn = document.querySelector(".search-form .search-icon");

const searchFormMd = document.querySelector("#search-md");
const searchInputMd = document.querySelector("#search-md .form-control");
const searchBtnMd = document.querySelector("#search-md .search-icon");

const categoriesDropdown = document.querySelector("#categories");
const featuredContent = document.querySelector("#featuredContent");


function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const buildQuery = (name, value) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has(name)) {
        urlParams.delete(name);
        urlParams.append(name, value);
    } else {
        urlParams.append(name, value);
    }

    window.location.href = new URL(`${BASE_URL}catalogue?${urlParams.toString()}`);
}

const getProducts = async (params) => {
    try {
        const url = new URL(`${BASE_URL}products?${params}`);
        const res = await fetch(url);
        return res.json();
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

searchForm && searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBtn.click();
});

searchBtn && searchBtn.addEventListener("click", async () => {
    buildQuery("search", searchInput.value)
})

// for the md. lg screen size form
searchFormMd.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBtnMd.click();
});

searchBtnMd.addEventListener("click", async () => {
    buildQuery("search", searchInputMd.value)
})

const fillProducts = async (params) => {
    const response = await getProducts(params);
    const data = response.products;
    featuredContent.innerHTML = "";

    data.map((item) => {
        featuredContent.insertAdjacentHTML(
            "beforeend",
            `
            <div class="col-md-15 col-sm-4 col-xs-6">
                <div class="product-item ver2">
                    <div class="prod-item-img bd-style-2">
                        <a href="javascript:void(0)"><img src="/media/${item.image}" alt=${item.name}
                                class="img-responsive"></a>
                        <div class="button">
                            <a href="javascript:void(0)" class="addcart">ADD TO CART</a>
                            <a href="javascript:void(0)" class="view"><i class="fa fa-eye" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div class="prod-info">
                        <h3><a href="javascript:void(0)">${item.name}</a></h3>
                        <div class="ratingstar sm">
                            <a href="javascript:void(0)"><i class="fa fa-star-b fa-1" aria-hidden="true"></i></a>
                            <a href="javascript:void(0)"><i class="fa fa-star-b fa-1" aria-hidden="true"></i></a>
                            <a href="javascript:void(0)"><i class="fa fa-star-b fa-1" aria-hidden="true"></i></a>
                            <a href="javascript:void(0)"><i class="fa fa-star-b fa-1" aria-hidden="true"></i></a>
                            <a href="javascript:void(0)"><i class="fa fa-star-o fa-1" aria-hidden="true"></i></a>
                            <span class="number">(4)</span>
                        </div>
                        <div class="p-price">
                            <span class="price old">Ksh. ${commaThousand(item.old_price)}</span>
                            <span class="price">Ksh. ${commaThousand(item.price)}</span>
                        </div>
                    </div>
                </div>
            </div>`
        );
    });
};

fillProducts(null);
fillCategoryDropdown();