const $tabs = document.querySelectorAll("li");//tab
const $list = document.getElementById("list");//내용
const CONTENT_NUM = 10; //10개씩 보이기
let amount = CONTENT_NUM;
const $showMoreBtn = document.querySelector('.btn'); //더보기 버튼
// const $loadmark = document.getElementById(loading);
const tabName = {0: "recent", 1: "view", 2: "popular"};
let tabNum = 0;//선택된 탭 숫자 
let selectedTab = $tabs[tabNum];
const tabContent = {0: recentContents, 1: viewContents, 2:popularContents} ;
//선택한 탭과 같은 내용이 선택되도록 숫자 일치시킴

window.onload = () => {
    selectTab();
    displayPage();
    $showMoreBtn.addEventListener('click', () => { //더보기
        showmore();
    });
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
            amount = CONTENT_NUM; //10개 지정
            displayPage();
        });
    }
}

function loadingText(){ //로딩 문구 
    return `<div class="text-center" id="loading-mark">
                <span class="glyphicon glyphicon-refresh">로딩중</span>
            </div>`;
}

function displayPage(){ 
    $list.innerHTML += loadingText(); //로딩 문구 넣기
    // $list.innerHTML += $loadmark;
    if(amount >= tabContent[tabNum].length){ //보여주는 콘텐츠 수가 데이터보다 크거나 같아지면 더보기 숨기기 
        $showMoreBtn.style.visibility = 'hidden';
    }else{
        $showMoreBtn.style.visibility = 'visible';
    }
    setTimeout(()=>{

        const contents = tabContent[tabNum]; //데이터 
        drawContents(contents, amount);
    }, 1000); //1초 후에 띄우기

}

function drawContents(data, pages){ //내용 그리기
    let cardindex = 0;
    const ul = document.createElement('ul'); //내용 넣을 ul 추가
    for(const content of data){
        if(cardindex>=pages) break;
        const li = document.createElement('li');
        const card = new makeContents(content);
        li.innerHTML = card.createDOM(++cardindex); //li에 카드(각 콘텐츠) 추가 -> ul에 넣기
        ul.append(li); 
    }
    $list.innerHTML = "";
    $list.append(ul);
}


function makeContents(data){ //넣기
    this.id=data["id"]; //js 파일의 데이터와 매핑
    this.title=data["title"];
    this.img = data["img"];
    this.cp = data["cp"];
    this.url = data["url"];

    this.createDOM = (cardindex) =>{
        const card = `<a href="${this.url}" class="link_c">
        <span class="wrap_thumb">
            <span class="thumb_img">
                <img src="${this.img}" class="img_thumb">
            </span>
        </span>
        <strong class="tit_thumb">${this.title}</strong></div>
    </a>`;
    return card;
    };
}

function showmore(){ //더보기
    amount += CONTENT_NUM;
    displayPage();
}