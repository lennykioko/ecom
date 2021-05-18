const BASE_URL = `${window.location.href}`
let products;

const mainContent = document.querySelector("#mainContent");

const searchForm1 = document.querySelector("#searchForm1");
const searchInput1 = document.querySelector("#searchInput1");

const searchForm2 = document.querySelector("#searchForm2");
const searchInput2 = document.querySelector("#searchInput2");

const quickview = document.querySelector("#productid1");


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
  const data = response.data
  products = response.data

  data?.map((item) => {
    mainContent.insertAdjacentHTML(
      "beforeend",
      `<div class="col-xs-6 col-sm-4 col-lg-2">
          <article>
            <div class="info">
              <span class="add-favorite">
                <a href="#productid1" onclick="setProduct(${item.id})" data-title="Add to favorites"
                  data-title-added="Added to favorites list"><i class="icon icon-heart"></i></a>
              </span>
              <span>
                <a href="#productid1" onclick="setProduct(${item.id})" class="mfp-open" data-title="Quick wiew"><i class="icon icon-eye"></i></a>
              </span>
            </div>
            <div class="btn btn-add">
              <i class="icon icon-cart"></i>
            </div>
            <div class="figure-grid">
              <div class="image">
                <a href="#productid1" class="mf onclick="setProduct(${item.id})" p-open">
                  <img src="/media/${item.product_image}" alt="${item.product_name} width="360" />
                </a>
              </div>
              <div class="text">
                <h2 class="title h5">
                  <a href="product.html">${item.product_name}</a>
                </h2>
                <sub>KSh ${commaThousand(item.old_price)}</sub>
                <sup>KSh ${commaThousand(item.price)}</sup>
                <span class="description clearfix">Samsung Galaxy A12 – 6.5″ – 64GB ROM + 4GB RAM – Dual
                  SIM – Black</span>
              </div>
            </div>
          </article>
        </div>`
    );
  });
};


const setProduct = async (item_id) => {
  let item = products.filter(item => item.id == item_id);
  item = item[0];
  quickview.className = 'popup-main mfp-open';
  quickview.innerHTML =
    `<div class="product">

          <!-- === popup-title === -->

          <div class="popup-title">
            <div class="h1 title">
              ${item.product_name}
              <small>Phones</small>
            </div>
          </div>

          <!-- === product gallery === -->

          <div class="owl-product-gallery">
            <img src="/media/${item.product_image}" alt="${item.product_name}  width="640" />
            <!-- <img src="assets/images/product-10a.png" alt="" width="640" /> -->
          </div>

          <!-- === product-popup-info === -->

          <div class="popup-content">
            <div class="product-info-wrapper">
              <div class="row">

                <!-- === left-column === -->

                <div class="col-sm-6">
                  <div class="info-box">
                    <strong>Maifacturer</strong>
                    <span>Brand name</span>
                  </div>
                  <div class="info-box">
                    <strong>Materials</strong>
                    <span>Wood, Leather, Acrylic</span>
                  </div>
                  <div class="info-box">
                    <strong>Availability</strong>
                    <span><i class="fa fa-check-square-o"></i> in stock</span>
                  </div>
                </div>

                <!-- === right-column === -->

                <div class="col-sm-6">
                  <div class="info-box">

                  </div>
                  <div class="info-box">

                  </div>
                </div>

              </div>
              <!--/row-->
            </div>
            <!--/product-info-wrapper-->
          </div>
          <!--/popup-content-->
          <!-- === product-popup-footer === -->

          <div class="popup-table">
            <div class="popup-cell">
              <div class="price">
                <span class="h3">KSh ${commaThousand(item.price)} <small>KSh ${commaThousand(item.old_price)}</small></span>
              </div>
            </div>
            <div class="popup-cell">
              <div class="popup-buttons">
                <!-- <a href="product.html"><span class="icon icon-eye"></span> <span class="hidden-xs">View
                                        more</span></a> -->
                <a href="javascript:void(0);"><span class="icon icon-phone"></span> <span class="hidden-xs">Call
                    Now</span></a>
              </div>
            </div>
          </div>

        </div>`;
};

// empty search returns all
handleSearch();
