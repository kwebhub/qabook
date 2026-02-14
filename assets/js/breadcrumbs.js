export function initBreadcrumbs() {
  const container = document.getElementById("breadcrumbs-container");
  if (!container) return;
  const path = window.location.pathname;
  const segments = path
    .split("/")
    .filter((s) => s && !s.includes("index.html") && !s.includes("qabook"));
  if (segments.length === 0) {
    container.innerHTML = "";
    return;
  }
  const origin = window.location.origin;
  const basePath = "/qabook";
  const breadcrumbList = [
    {
      name: "Home",
      item: origin + basePath + "/",
    },
  ];
  let html = `
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <a href="${basePath}/">
          <svg class="breadicon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
<path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
</svg>
        </a>
      </li>`;
  let currentPath = basePath;
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    currentPath += `/${segment}`;
    let name = segment.replace(".html", "").replace(/-/g, " ");
    name = decodeURIComponent(name.charAt(0).toUpperCase() + name.slice(1));
    if (isLast) {
      html += `<li class="breadcrumbs__item">${name}</li>`;
      breadcrumbList.push({ name, item: window.location.href });
    } else {
      html += `<li class="breadcrumbs__item"><a href="${currentPath}">${name}</a></li>`;
      breadcrumbList.push({ name, item: origin + currentPath });
    }
  });
  html += `</ul>`;
  container.innerHTML = html;
  generateSchema(breadcrumbList);
}
function generateSchema(items) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
}
