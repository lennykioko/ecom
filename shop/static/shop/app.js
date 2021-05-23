const BASE_URL = "http://127.0.0.1:8000/";
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


const getSearchItems = async (search) => {
  mainContent.innerHTML = loader;

  try {
    let url = search ? new URL(`${BASE_URL}ajax/?search=${search}`) : new URL(`${BASE_URL}ajax/`);

    const res = await fetch(url);
    mainContent.innerHTML = "";
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const handleSearch = async (search) => {
  const response = await getSearchItems(search);
  const data = response.data;
  console.log(data);
  products = response.data;

  data?.map((item) => {
    mainContent.insertAdjacentHTML(
      "beforeend",
      `<div class= "product-list-item">
      <div style="height:270px; display:flex; align-items:center;" class="product-item-img">
        <a href="#"><img src="../media/${item.product_image}" alt="images"
          class="img-responsive"></a>
          <div class="label label-2 red label-top-20">Hot</div>
        </div>
        <div class="product-item-info">
          <h3 class="black" style="font-weight:bold><a href="#" title="">${item.product_name}</a></h3>
          <div style="height:50px; overflow:auto"}>${item.description}</div>
          <div class="prod-price">
            <span class="price black">${commaThousand(item.price)}</span>
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
