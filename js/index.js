var infoDiv = document.getElementById("info"),
    showCPElem = document.getElementById("showCP"),
    CPDiv = document.getElementById("CPDiv"),
    CPFooter = document.getElementById("CPFooter"),
    CPDivWrap = document.getElementById("CPDivWrap"),
    popups = ["image"],
    imgDesc = document.getElementById("imgDesc"),
    imgHolderImg = document.getElementById("imgHolderImg"),
    imageHolder = document.getElementById("imageHolder"),
    popupHolder = document.getElementById("popupHolder");

fetch("https://money-messages.herokuapp.com")
    .then(response => response.text())
    .then(data => document.getElementById("mms").innerHTML = " (online)")
    .catch((error) => {
        console.log(error);
        document.getElementById("mms").innerHTML = " (offline)"
    });

showCPEl = () => {
    //width: 100%; text-align: center; position: absolute; top: 210px; bottom: 0px
    CPDivWrap.style = "width: 100%; position: absolute; top: 275px; bottom: 0px"
    CPFooter.style.display = ""
    showCPElem.onclick = hideCPEl;
    showCPElem.innerHTML = "Show Site Info"
    CPDiv.style.height = ""
    var height = CPDiv.getBoundingClientRect().height,
        cHeight = 0,
        interval = setInterval(() => {
            cHeight = cHeight + 2;
            CPDiv.style.height = `${cHeight}px`
            if (cHeight >= height) {
                CPDiv.style.height = ""
                clearInterval(interval)
            }
        }, 1);
}

hideInfoElem = () => {
    infoDiv.style.height = ""
    var height = infoDiv.getBoundingClientRect().height,
        cHeight = height,
        interval = setInterval(() => {
            cHeight = cHeight - 2;
            infoDiv.style.height = `${cHeight}px`
            if (cHeight <= 0) {
                showCPEl()
                clearInterval(interval)
            }
        }, 1);
}

hideCPEl = () => {
    CPFooter.style.display = "none"
    CPDiv.style.height = ""
    var height = CPDiv.getBoundingClientRect().height,
        cHeight = height,
        interval = setInterval(() => {
            cHeight = cHeight - 2;
            CPDiv.style.height = `${cHeight}px`
            if (cHeight <= 0) {
                showInfoElem()
                clearInterval(interval)
            }
        }, 1);
}

showInfoElem = () => {
    CPDivWrap.style = "display:none;"
    showCPElem.onclick = hideInfoElem;
    showCPElem.innerHTML = "Show Designer Portfolio"
    infoDiv.style.height = ""
    var height = infoDiv.getBoundingClientRect().height,
        cHeight = 0,
        interval = setInterval(() => {
            cHeight = cHeight + 2;
            infoDiv.style.height = `${cHeight}px`
            if (cHeight >= height) {
                clearInterval(interval)
            }
        }, 1);
}

hidePopup = () => {
    for (num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none"
    document.getElementById("popupHolder").style.display = "none"
}

showImagePopup = (elem) => {
    imgHolderImg.src = elem.src
    imgHolderImg.alt = elem.alt
    imgDesc.innerHTML = elem.alt
    imageHolder.style.display = ""
    popupHolder.style.display = ""
    imgHolderImg.style.width = `${(window.innerWidth) - 100}px`;
    imgHolderImg.style.height = `${(window.innerHeight) - 100}px`;
    imageHolder.style.width = `${(window.innerWidth) - 100}px`;
    imageHolder.style.height = `${(window.innerHeight) - 100}px`;

}

showCPElem.onclick = hideInfoElem;

var gImgs = document.getElementById("CPDiv").getElementsByTagName("img")

for (i = 2; i < gImgs.length; i++) {
    gImgs[i].addEventListener("click", function () {
        showImagePopup(this)
    })
}