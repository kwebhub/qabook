export function initBreadcrumbs() {
  const container = document.getElementById("breadcrumbs-container");
  if (!container) return;
  const path = window.location.pathname;
  const segments = path
    .split("/")
    .filter((s) => s && s !== "index.html" && s !== "qabook");
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
          <svg class="breadicon" ... >...</svg>
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
