function EggRender(url, callback) {
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

function DisplayEggInformation(egg) {
  document.querySelector("#EggName").innerHTML = egg.name
  document.querySelector("#EggDescription").innerHTML = egg.description

  document.querySelector("#EggDownloadContainer").innerHTML = `
    <div class="dropdown" id="EggDownloadDropdown">
      <button class="btn btn-danger float-end dropdown-toggle" type="button" id="EggDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
        Downloads
      </button>
      <ul class="dropdown-menu px-2" aria-labelledby="EggDropdownMenu">
        ${egg.downloads.map(download => `
          <li>
            <a class="dropdown-item rounded-2" download href="../repository/${url.searchParams.get('egg')}/${download.url}">
              ${download.name}
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
  `

  if(egg.readme == true) {
    RenderMarkdown(`../repository/${url.searchParams.get('egg')}/README.md`, "#EggReadme")
  } else {
    document.querySelector("#EggReadme").classList.add("d-none")
  }

  document.querySelector("#EggContainer").classList.remove("d-none")
}