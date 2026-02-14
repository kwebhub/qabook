export function initUI() {
  const body = document.body;
  const REPO_NAME = "/qabook";
  const menuMap = {
    dropup: "show-dropup",
    settings: "show-settings",
    user: "show-user",
    search: "show-search",
    home: "home-redirect",
  };
  const closeAll = () => (body.className = "");
  document.addEventListener("click", (e) => {
    const target = e.target;
    const btn = target.closest("[id]");
    if (!btn) return;
    const action = menuMap[btn.id];
    if (action === "home-redirect") {
      window.location.href = REPO_NAME;
    } else if (action) {
      body.className = action;
    }
    if (target.classList.contains("close")) closeAll();
  });
  window.addEventListener("click", ({ target }) => {
    const activeClass = body.className.replace("show-", "");
    if (activeClass && target.classList.contains(activeClass)) {
      closeAll();
    }
  });
  const searchForm = document.querySelector(".search__content");
  const searchInput = searchForm?.querySelector("input");
  const updateSearchState = () => {
    searchForm?.classList.toggle("is-dirty", !!searchInput?.value.trim());
  };
  searchInput?.addEventListener("input", updateSearchState);
  searchForm?.addEventListener("reset", () => setTimeout(updateSearchState, 0));
}
