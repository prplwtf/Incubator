function Show404() {
  document.querySelector("#NotificationDisplay").innerHTML = `
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <i class="bi bi-x-lg flex-shrink-0 me-2"></i>
      <div>The page you are trying to visit does not exist.</div>
    </div>
  `
}
function ShowError() {
  document.querySelector("#NotificationDisplay").innerHTML = `
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <i class="bi bi-exclamation-circle-fill flex-shrink-0 me-2"></i>
      <div>Something went wrong, check your browser console for more information.</div>
    </div>
  `
}
async function RenderMarkdown(url, target) {
  fetch(url)
    .then(b => {
      if (!b.ok) {
        throw new Error(`Network response was not ok: ${b.status}`);
      }
      return b.text();
    })
    .then(markdownContent => {
      document.querySelector(target).innerHTML = marked.parse(markdownContent);
    })
    .catch(c => {
      console.error('Error fetching the Markdown content:', c);
    });
}

function UpOneLevel(url, param) {
  const parsedUrl = new URL(url);
  const params = parsedUrl.searchParams;
  const category = params.get(param);
  
  if (category) {
    const segments = category.split('/');
    segments.pop();
    if (segments.length > 0) {
      params.set('category', segments.join('/'));
    } else {
      params.delete('category');
    }
  }
  
  parsedUrl.search = params.toString();
  return parsedUrl.toString();
}