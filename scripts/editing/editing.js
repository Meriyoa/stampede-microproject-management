const pageContainer = document.getElementById("pageContainer");
const pages = document.getElementsByClassName("inputPage");
const prev = document.getElementById("previouse_page_button");
const next = document.getElementById("next_page_button");
const addFieldButton = document.getElementById("add_field_button");

var inputFields = document.getElementsByClassName("inputField");
var addableFields = document.getElementsByClassName("addable");
var numberFields = document.querySelectorAll("input[type='number']");

var selectedPage = 0;
var visibleInputFields = 0;

numberFields.forEach(function(currentValue){
    currentValue.addEventListener('input', updateSum);
});

function updateSum(){
    var sum = 0;
    numberFields.forEach(function(currentValue){
        sum += currentValue.valueAsNumber ? currentValue.valueAsNumber : 0;
    });

    document.getElementById("summ_display").innerHTML = "Summe: " + sum;
}

function updateWindows(prevSel)
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
    scrollToWindow(pages[selectedPage], pages[prevSel]);
    pages[prevSel].setAttribute("selected","false");
    pages[selectedPage].setAttribute("selected","true");
}

function scrollToWindow(element, prevElement)
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
prev.addEventListener('click', function(){
    var temp = selectedPage;
    selectedPage--;
    updateWindows(temp);
});

next.addEventListener('click', function(){
    var temp = selectedPage;
    selectedPage++;
    updateWindows(temp);
});

addFieldButton.addEventListener('click', function(){
    addableFields[visibleInputFields].style.display = "flex";
    addableFields[visibleInputFields].nextElementSibling.style.display = "block";
    visibleInputFields++;
});