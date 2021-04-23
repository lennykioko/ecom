const BASE_URL = `http://127.0.0.1:8000`
let products;

const mainContent = document.querySelector("#mainContent");

const searchForm1 = document.querySelector("#searchForm1");
const searchInput1 = document.querySelector("#searchInput1");

const searchForm2 = document.querySelector("#searchForm2");
const searchInput2 = document.querySelector("#searchInput2");

const quickview = document.querySelector("#quickview-wrapper");


searchForm1.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(searchInput1.value);
});

searchForm2.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(searchInput2.value);
});

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
        let url = search ? new URL(`${BASE_URL}/ajax/?search=${search}`) : new URL(`${BASE_URL}/ajax/`);

        const res = await fetch(url);
        mainContent.innerHTML = "";
        return res.json();
    } catch(err) {
        console.log(err);
    }
};

const handleSearch = async (search) => {
    const response = await getSearchItems(search);
    const data = response.data
    console.log(data)
    products = response.data

    data?.map((item) => {
      mainContent.insertAdjacentHTML(
          "beforeend",
          `<div class="col-lg-4 col-md-6">
              <div class="product-item">
                  <div class="product-img">
                      <a href="#" data-toggle="modal" onclick="setProduct(${item.id})" data-target="#productModal">
                          <img src="/media/${ item.product_image }" alt="${item.product_name}"/>
                      </a>
                  </div>
                  <div class="product-info">
                      <h6 class="product-title">
                          <a href="#" data-toggle="modal" onclick="setProduct(${item.id})" data-target="#productModal">${item.product_name}</a>
                      </h6>
                      <div class="pro-rating">
                          <a href="#"><i class="zmdi zmdi-star"></i></a>
                          <a href="#"><i class="zmdi zmdi-star"></i></a>
                          <a href="#"><i class="zmdi zmdi-star"></i></a>
                          <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                          <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                      </div>
                      <h3 class="pro-price">KSh ${ commaThousand(item.price) }</h3>
                      <ul class="action-button">
                          <li>
                              <a href="#" data-toggle="modal" onclick="setProduct(${item.id})" class="read-more" data-target="#productModal" title="Read More">
                                  <i class="zmdi zmdi-eye"></i>
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>`
        );
    });
};


const setProduct = async (item_id) => {
    let item = products.filter(item => item.id == item_id);
    item = item[0]
    quickview.innerHTML =
      `<div class="modal fade" id="productModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="modal-product clearfix">
                  <div class="product-images">
                    <div class="main-image images">
                        <img alt="" src="/media/${ item.product_image }">
                    </div>
                  </div><!-- .product-images -->

                  <div class="product-info">
                    <h1>${item.product_name}</h1>
                    <div class="price-box-3">
                        <div class="s-price-box">
                            <span class="new-price">KSh ${ commaThousand(item.price) }</span>
                            <span class="old-price">KSh ${ commaThousand(item.old_price) }</span>
                        </div>
                    </div>
                    <a href="tel:0722650647" class="see-all font-weight-bold ">0722 650 647</a>
                    <div class="quick-add-to-cart">
                        <button class="single_add_to_cart_button" type="button">Call Now</buton>
                    </div>
                    <div class="quick-desc">
                        ${item.description}
                    </div>

                  </div><!-- .product-info -->
                </div><!-- .modal-product -->
            </div><!-- .modal-body -->
            </div><!-- .modal-content -->
        </div><!-- .modal-dialog -->
    </div>`;
};


// empty search returns all
handleSearch();
