const pageContainer = document.getElementById("page_container");
const pages = document.getElementsByClassName("inputPage");
const buttonPrev = document.getElementById("button_previouse_page");
const buttonNext = document.getElementById("button_next_page");
const buttonAddPayGrpoupTVL = document.getElementById("button_add_pay_group_tvl");

var inputFields = Array.from(document.getElementsByClassName("inputField"));
let payGroupsTVL = Array.from(document.getElementsByClassName("payGroupTvl"));

var selectedPage = 0;

function _updateWindows(prevSel)
{
    switch(selectedPage)
    {
        case -1:
            selectedPage++;
            break;
        case pages.length:
            selectedPage--;
            break;
        default:
            break;
    }
    _scrollToWindow(pages[selectedPage], pages[prevSel]);
    pages[prevSel].setAttribute("selected","false");
    pages[selectedPage].setAttribute("selected","true");
}

function _scrollToWindow(element, prevElement)
{
    var toScroll = element.offsetLeft; //position des element

    if(element.offsetLeft > prevElement.offsetLeft)
    {
        //beim wechsel vom linken aufs rechte page muss die differenz der Breiten abgezogen werden,
        //da das linke element kleiner wird
        toScroll += element.scrollWidth - prevElement.scrollWidth;
    }

    toScroll -= prevElement.scrollWidth /2; //element wird Zentriert

    pageContainer.scroll({left: toScroll});
}

//Buttons
buttonPrev.addEventListener('click', function(){
    var temp = selectedPage;
    selectedPage--;
    _updateWindows(temp);
});

buttonNext.addEventListener('click', function(){
    var temp = selectedPage;
    selectedPage++;
    _updateWindows(temp);
});

buttonAddPayGrpoupTVL.addEventListener('click', function(){
    let nextGroup = document.getElementsByClassName("payGroupTvl")[0].cloneNode(true);

    Array.from(nextGroup.getElementsByClassName("inputField")).forEach(function(element) {
        element.setAttribute("id", element.getAttribute("id").slice(0, -1) + payGroupsTVL.length);
        element.firstElementChild.setAttribute("for", element.firstElementChild.getAttribute("for").slice(0, -1) + payGroupsTVL.length);
        element.firstElementChild.nextElementSibling.setAttribute("id", element.firstElementChild.nextElementSibling.getAttribute("id").slice(0, -1) + payGroupsTVL.length);
        element.firstElementChild.nextElementSibling.setAttribute("name", element.firstElementChild.nextElementSibling.getAttribute("name").slice(0, -1) + payGroupsTVL.length);
    });

    nextGroup.getElementsByClassName("inputField")[0].

    document.getElementById("page_staff_costs_tvl").appendChild(nextGroup);
});