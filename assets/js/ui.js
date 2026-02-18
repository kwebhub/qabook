export function initUI() {
  const body = document.body;
  const REPO_NAME = "/qabook";
  const menuMap = {
    dropup: "show-dropup",
    search: "show-search",
    home: "home-redirect",
  };
  const closeAll = () => {
    body.className = "";
    body.style.overflow = "";
  };
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.closest(".close") ||
      target.classList.contains("search") ||
      target.classList.contains("dropup")
    ) {
      closeAll();
      return;
    }
    const btn = target.closest("[id]");
    if (!btn) return;
    const action = menuMap[btn.id];
    if (action === "home-redirect") {
      window.location.href = REPO_NAME;
      return;
    }
    if (action) {
      body.className = action;
      body.style.overflow = "hidden";
      if (action === "show-dropup") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
  const searchForm = document.querySelector(".search__content");
  if (searchForm) {
    const searchInput = searchForm.querySelector("input");
    const updateSearchState = () => {
      searchForm.classList.toggle("is-dirty", !!searchInput?.value.trim());
    };
    searchInput?.addEventListener("input", updateSearchState);
    searchForm.addEventListener("reset", () => {
      setTimeout(updateSearchState, 0);
    });
  }
}
