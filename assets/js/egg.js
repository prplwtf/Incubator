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
  document.querySelector("#EggDownload").href = `../repository/${url.searchParams.get('egg')}/${egg.download}`

  if(egg.readme == true) {
    RenderMarkdown(`../repository/${url.searchParams.get('egg')}/README.md`, "#EggReadme")
  } else {
    document.querySelector("#EggReadme").classList.add("d-none")
  }

  document.querySelector("#EggContainer").classList.remove("d-none")
}