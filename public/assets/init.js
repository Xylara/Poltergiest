if (localStorage.getItem("cookiesEnabled") == "true") {
    Object.keys(localStorage)
  .filter(key => key.startsWith('__uv$'))
  .forEach(key => localStorage.removeItem(key));
}

