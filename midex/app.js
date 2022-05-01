const $tabs = document.querySelectorAll("li");
const $list = document.getElementById("list");

const tabName = {0: "recent", 1: "view", 2: "popular"};
let tabNum = 0;
let selectedTab = $tabs[tabNum];

window.onload = () => {
    selectTab();
}
function activateTab(tab) {
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
    const tabNum = Array.from($tabs).indexOf(tab);
    return tabNum;
}

function selectTab() {
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event) => {
            $list.innerHTML = "";
            tabNumber = activateTab(event.target.parentElement);
        });
    }
}
