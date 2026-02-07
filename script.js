const params = new URLSearchParams(window.location.search);
const name = params.get("name");

if (name) {
    document.getElementById("greeting").textContent = `Hello ${name} 👋`;
}
