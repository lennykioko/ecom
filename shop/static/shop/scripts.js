const searchInput = document.querySelector("#searchInput");
const dropBtn = document.querySelector("#dropdownCatBtn");
const searchForm = document.querySelector("#searchForm");
const searchBtn = document.querySelector("#searchBtn");
const catDropdown = document.querySelector("#categoryDropdown");
const carouselContent = document.querySelector("#carousel");
const mainContent = document.querySelector("#mainDisplay");


catDropdown.addEventListener("click", (event) => {
    dropBtn.value = event.target.textContent;
    dropBtn.textContent = event.target.textContent;
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBtn.click();
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
        let url = new URL(`${window.location.href}ajax/`);
        url.search = new URLSearchParams({
            category: dropBtn.value,
            search: searchInput.value
        });

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
