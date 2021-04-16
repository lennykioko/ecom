const BASE_URL = `http://localhost:1337`

const mainContent = document.querySelector("#mainDisplay");

const searchForm1 = document.querySelector("#searchForm1");
const searchInput1 = document.querySelector("#searchInput1");

const searchForm2 = document.querySelector("#searchForm2");
const searchInput2 = document.querySelector("#searchInput2");


const dropBtn = document.querySelector("#dropdownCatBtn");
const searchBtn = document.querySelector("#searchBtn");
const catDropdown = document.querySelector("#categoryDropdown");
const carouselContent = document.querySelector("#carousel");


catDropdown.addEventListener("click", (event) => {
    dropBtn.value = event.target.textContent;
    dropBtn.textContent = event.target.textContent;
});


searchForm1.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch();
});

searchForm2.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch();
});

function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const loader = `<div class="mx-auto vh-100 text-center d-flex justify-content-center">
  <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;


const getSearchItems = async () => {
    mainContent.innerHTML = loader;

    try {
        let productsUrl = new URL(`${BASE_URL}/products/`);
        let search = searchInput.value

        let url = `${productsUrl}name_in=${search}&brand_in=${search}&description_in=${search}&price_in=${search}`

        const res = await fetch(url);
        mainContent.innerHTML = "";
        return res.json();
    } catch(err) {
        console.log(err);
    }
};

searchBtn.addEventListener("click", async () => {
    response = await getSearchItems();
    data = response.data;

    data.map((item) => {
        mainContent.insertAdjacentHTML(
            "beforeend",
            `<div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border-secondary">
            <img class="card-img-top img-thumbnail img-fluid" src="/media/${ item.product_image }" alt="${ item.product_name }">
            <div class="card-body">
            <h5 class="card-title text-capitalize">${ item.product_name }</h5>
            <h5><small class="text-muted">KES </small>${ commaThousand(item.price) }</h5>
            </div>
            </div>
            </div>`
        );
    });
});