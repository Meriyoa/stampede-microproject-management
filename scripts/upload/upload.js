const buttonSort = document.getElementById("button_sort");
const buttonSettings = document.getElementById("button_settings");
const buttonNew = document.getElementById("button_new");

const listSort = document.getElementById("list_sort");
const listSettings = document.getElementById("list_settings");
const listFileSettings = document.getElementById("list_file_settings");

let lists = Array.from(document.getElementsByClassName("SmallList"));
let buttonsFileSettings = Array.from(document.getElementsByClassName("ButtonFileSettings"));

let lastFileSettings = document.getElementById("settings");

buttonSort.addEventListener('click', function(){
    _hideAllOtherLists(listSort);
    if(!listSort.style.display){
        listSort.style.display = "block";
    }else{
        listSort.style.display = "";
    }
});

buttonSettings.addEventListener('click', function(){
    _hideAllOtherLists(listSettings);
    if(!listSettings.style.display){
        listSettings.style.display = "block";
    }else{
        listSettings.style.display = "";
    }
});

buttonNew.addEventListener('click', _createFile);

buttonsFileSettings.forEach(element => {
    element.addEventListener('click', function(){
        _hideAllOtherLists(listFileSettings);
        if(element.getAttribute("id") == lastFileSettings.getAttribute("id")){
            if(!listFileSettings.style.display){
                listFileSettings.style.display = "block";
            }else{
                listFileSettings.style.display = "";
            }
        }else{
            lastFileSettings = element;
            listFileSettings.style.display = "block";
        }
        listFileSettings.style.top = this.parentElement.getBoundingClientRect().top + "px";
    });
});

lists.forEach(element => {
    element.addEventListener('mouseleave', function(){
        this.style.display = '';
    });
});

function _hideAllOtherLists(exeption){
    lists.forEach(element => {
        if (exeption != element) {
            element.style.display = "";
        }
    });
}

function _createFile(){
    let fileName = document.createElement("p");
    fileName.innerHTML = "Datei";

    let butFilSet = document.createElement("div");
    butFilSet.className = ("ButtonFileSettings Button1");
    butFilSet.setAttribute("id", "button_file_settings_" + (buttonsFileSettings.length + 1));
    let imgFilSet = document.createElement("img");
    imgFilSet.setAttribute("src", "./../../assets/upload/document.png");
    imgFilSet.setAttribute("alt", "einstellungen");
    butFilSet.appendChild(imgFilSet);
    
    butFilSet.addEventListener('click', function(){
        _hideAllOtherLists(listFileSettings);
        if(butFilSet.getAttribute("id") == lastFileSettings.getAttribute("id")){
            if(!listFileSettings.style.display){
                listFileSettings.style.display = "block";
            }else{
                listFileSettings.style.display = "";
            }
        }else{
            lastFileSettings = butFilSet;
            listFileSettings.style.display = "block";
        }
        listFileSettings.style.top = this.parentElement.getBoundingClientRect().top + "px";
    });
    buttonsFileSettings.push(butFilSet);

    let butFilPin = document.createElement("div");
    butFilPin.className = ("ButtonFilePin Button1");
    butFilPin.setAttribute("id", "button_file_pin_" + (buttonsFileSettings.length + 1));
    let imgFilPin = document.createElement("img");
    imgFilPin.setAttribute("src", "./../../assets/upload/document.png");
    imgFilPin.setAttribute("alt", "pin");
    butFilPin.appendChild(imgFilPin);

    let file = document.createElement("div");
    file.className = "File";
    // file.appendChild(fileName);
    file.appendChild(butFilSet);
    file.appendChild(butFilPin);

    let inFileName = document.createElement("input");
    inFileName.setAttribute("type", "text");
    inFileName.setAttribute("id", "input_name");
    file.insertBefore(inFileName, butFilSet);

    ['focusout', 'change'].forEach(function(evt){
        inFileName.addEventListener(evt, function(){
            if(inFileName.value) fileName.innerHTML = inFileName.value;
            file.insertBefore(fileName, butFilSet);
            try {file.removeChild(inFileName);} catch{}
        });
    });

    document.getElementById("list_files").appendChild(file);

    inFileName.focus();
}