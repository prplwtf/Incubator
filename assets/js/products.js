function LoadProducts(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = jsyaml.load(xhr.responseText)
      callback(result)
    }
    if (xhr.readyState == 4 && xhr.status == 404) {
      Show404()
    }
  }
  xhr.send()
}

function DisplayCategories(products) {
  var productList = document.querySelector("#RepositoryContainer")

  products.forEach(function (product) {
    var listItem = document.createElement("div")
    listItem.className = "col-sm-12 col-md-6 col-lg-4 mb-4"

    listItem.innerHTML = `
      <a href="?category=${product.id}" class="link-underline-none">
        <div class="card overflow-hidden bg-dark-subtle rounded-3">
          <div class="btn-group position-absolute" style="right: 11px; top: 0px;">
          </div>
          <div class="card-body">
            <h5 class="card-title text-truncate">
              ${product.name}
              <i class="bi bi-arrow-right float-end"></i>
            </h5>
            <p class="card-text text-truncate">
              ${product.description}
            </p>
          </div>
        </div>
      </a>
    `

    productList.appendChild(listItem)
  })
}

function DisplayCategoryContent(products) {
  var categoryList = document.querySelector("#CategoryContainer")
  var productList = document.querySelector("#RepositoryContainer")

  products.forEach(function (product) {    
    var listItem = document.createElement("div")

    if(product.type == "category") {
      listItem.className = "col-sm-12 col-md-6 col-lg-4 mb-4"
      listItem.innerHTML = `
        <a href="?category=${url.searchParams.get('category')}/${product.id}" class="link-underline-none">
          <div class="card overflow-hidden bg-dark-subtle rounded-3">
            <div class="btn-group position-absolute" style="right: 11px; top: 0px;">
            </div>
            <div class="card-body">
              <h5 class="card-title text-truncate">
                ${product.name}
                <i class="bi bi-arrow-right float-end"></i>
              </h5>
              <p class="card-text text-truncate">
                ${product.description}
              </p>
            </div>
          </div>
        </a>
      `
      categoryList.appendChild(listItem)
    }

    if(product.type == "egg") {
      listItem.className = "col-sm-12 col-md-6 col-lg-4 mb-4"
      listItem.innerHTML = `
        <a href="egg/?egg=${url.searchParams.get('category')}/${product.id}" class="link-underline-none">
          <div class="card overflow-hidden bg-dark-subtle rounded-3">
            <div class="btn-group position-absolute" style="right: 11px; top: 0px;">
            </div>
            <div class="card-body">
              <h5 class="card-title text-truncate">
                ${product.name}
              </h5>
              <p class="card-text text-truncate">
                ${product.description}
              </p>
            </div>
          </div>
        </a>
      `
      productList.appendChild(listItem)
    }
  })
}