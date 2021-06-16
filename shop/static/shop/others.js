const BASE_URL = "https://abufulan.co.ke/";
// const BASE_URL = "http://127.0.0.1:8000/";

const categoriesDropdown = document.querySelector("#categories");

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

const getCategoriesAndBrands = async () => {
    try {
        const url = new URL(`${BASE_URL}categorybrands`);
        const res = await fetch(url);
        const result = await res.json();
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

fillCategoryDropdown();
