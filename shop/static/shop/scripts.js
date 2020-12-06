searchInput = document.querySelector("#searchInput")
dropBtn = document.querySelector("#dropdownCatBtn");
catDropdown = document.querySelector("#categoryDropdown");
mainContent = document.querySelector("#mainDisplay");


catDropdown.addEventListener("click", (event) => {
    dropBtn.value = event.target.textContent;
    dropBtn.textContent = event.target.textContent;
});

function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$('#searchForm').submit(function(e){
    e.preventDefault();
    $("#searchBtn").click();
});

$(document).ready(function(){
    $("#searchBtn").click(function(){
        $.ajax({
            url: "/ajax/",
            type: "GET",
            data: {
                category: dropBtn.value,
                search: searchInput.value,
            },
            success: function(response) {
                mainContent.innerHTML = "";
                items = response.data
                for(let i=0; i < items.length; i++ ){
                     mainContent.insertAdjacentHTML("beforeend",
                    `<div class="col-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100 border-secondary">
                    <img class="card-img-top img-thumbnail img-fluid" src="/media/${ items[i].product_image }" alt="${ items[i].product_name }">
                    <div class="card-body">
                    <h5 class="card-title text-capitalize">${ items[i].product_name }</h5>
                    <h5><small class="text-muted">KES </small>${ commaThousand(items[i].price) }</h5>
                    </div>
                    </div>
                    </div>`);
                }

            },
            error: function(xhr) {
                console.log(`Error is: ${xhr.statusText}`);
            }
        });

    });

});
