const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const dropdownMenu1 = document.getElementById("dropdown-menu1");
const dropdownMenu2 = document.getElementById("dropdown-menu2");
// Show dropdown on mouse enter
dropdown1.addEventListener("mouseenter", () => {
    dropdownMenu1.classList.add("show");
});

// Hide dropdown on mouse leave
dropdown1.addEventListener("mouseleave", () => {
    dropdownMenu1.classList.remove("show");
});

// Show dropdown on mouse enter
dropdown2.addEventListener("mouseenter", () => {
    dropdownMenu2.classList.add("show");
});

// Hide dropdown on mouse leave
dropdown2.addEventListener("mouseleave", () => {
    dropdownMenu2.classList.remove("show");
});