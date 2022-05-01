const $tabs = document.querySelectorAll("li");//tab
const $list = document.getElementById("list");//내용
const CONTENT_NUM = 10;
let amount = CONTENT_NUM;

const tabContent = {0: viewContents, 1:recentContents, 2:popularContents} ;

const tabName = {0: "recent", 1: "view", 2: "popular"};
let tabNum = 0;
let selectedTab = $tabs[tabNum];

window.onload = () => {
    selectTab();
    displayPage();
}
function activateTab(tab) { //tab active로 변경하는 함수
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
    const tabNum = Array.from($tabs).indexOf(tab);
    return tabNum;
}

function selectTab() { //tab 선택 
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event) => {
            $list.innerHTML = "";
            tabNum = activateTab(event.target.parentElement);
            displayPage();
        });
    }
}

function drawContents(data, pages){ //내용 그리기
    let cardindex = 0;
    const ul = document.createElement('ul');
    for(const content of data){
        if(cardindex>=pages) break;
        const li = document.createElement('li');
        const card = new makeContents(content);
        li.innerHTML = card.createDOM(++cardindex);
        ul.append(li);
    }
    $list.innerHTML = "";
    $list.append(ul);
}

function displayPage(){
    const contents = tabContent[tabNum];
    drawContents(contents, 10);
}


function makeContents(data){
    this.id=data["id"];
    this.title=data["title"];
    this.img = data["img"];
    this.cp = data["cp"];
    this.url = data["url"];

    this.createDOM = (cardindex) =>{
        const card = `<a href="${this.url}" class="link_classify">
        <span class="wrap_thumb">
            <span class="thumb_img">
                <img src="${this.img}" class="img_thumb">
            </span>
        </span>
        <div class="info_classify"><span class="emph_number">${cardindex}</span>
        <strong class="tit_thumb">${this.title}</strong></div>
    </a>`;
    return card;
    };
}