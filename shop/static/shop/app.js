// const BASE_URL = "https://abufulan.co.ke/";
const BASE_URL = "http://127.0.0.1:8000/";

let categories;
let brands;
let products;


const mainContent = document.querySelector("#mainContent");

// const searchForm1 = document.querySelector("#searchForm1");
// const searchInput1 = document.querySelector("#searchInput1");

// const searchForm2 = document.querySelector("#searchForm2");
// const searchInput2 = document.querySelector("#searchInput2");

// const quickview = document.querySelector("#productid1");


// searchForm1.addEventListener("submit", (event) => {
//     event.preventDefault();
//     handleSearch(searchInput1.value);
// });

// searchForm2.addEventListener("submit", (event) => {
//     event.preventDefault();
//     handleSearch(searchInput2.value);
// });

function commaThousand(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const loader = `<div class="mx-auto vh-100 text-center d-flex justify-content-center">
  <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;


const getCategories = async (search) => {
  mainContent.innerHTML = loader;

  try {
    let url = new URL(`${BASE_URL}categories/`);

    const res = await fetch(url);
    mainContent.innerHTML = "";
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getBrands = async (category) => {
  mainContent.innerHTML = loader;

  try {
    let url = category ? new URL(`${BASE_URL}brands?category=${category}`) : new URL(`${BASE_URL}brands/`);

    const res = await fetch(url);
    mainContent.innerHTML = "";
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (search=false, limit=false, feature=false, category=false, brand=false) => {
  mainContent.innerHTML = loader;

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


const handleSearch = async (search) => {
  const response = await getProducts(search);
  const data = response.products;
  console.log(data);
  products = response.products;

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
          <div style="height:70px; overflow:auto"}>${item.description}</div>
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
};

// empty search returns all
handleSearch();
