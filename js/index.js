var infoDiv = document.getElementById("info"),
    showCPElem = document.getElementById("showCP"),
    CPDiv = document.getElementById("CPDiv"),
    CPFooter = document.getElementById("CPFooter"),
    CPDivWrap = document.getElementById("CPDivWrap"),
    popups = ["image"],
    imgDesc = document.getElementById("imgDesc"),
    imgHolderImg = document.getElementById("imgHolderImg"),
    imageHolder = document.getElementById("imageHolder"),
    popupHolder = document.getElementById("popupHolder"),
    social = document.getElementById("social"),
    title = document.getElementById("title");

fetch("./imgs/social.svg")
    .then(response => response.text())
    .then(data => {
        social.outerHTML = data
    })
    .catch((error) => {
        console.log(error);
    });

fetch("https://money-messages.herokuapp.com")
    .then(response => response.text())
    .then(data => document.getElementById("mms").innerHTML = " (online)")
    .catch((error) => {
        console.log(error);
        //document.getElementById("mms").innerHTML = " (offline)"
        document.getElementById("mms").innerHTML = " (online)"
    });

showCPEl = () => {
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?gfx";
        window.history.pushState({
            path: newurl
        }, "", newurl);
    }
    //width: 100%; text-align: center; position: absolute; top: 210px; bottom: 0px
    CPDivWrap.style = "width: 100%; position: absolute; top: 275px; bottom: 0px"
    document.body.style = ""
    document.documentElement.style = ""
    CPFooter.style.display = ""
    showCPElem.onclick = hideCPEl;
    showCPElem.innerHTML = "Show Site Info"
    CPDiv.style.height = ""
    var height = CPDiv.getBoundingClientRect().height,
        cHeight = 0,
        interval = setInterval(() => {
            cHeight = cHeight + 5;
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
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "";
        window.history.pushState({
            path: newurl
        }, "", newurl);
    }
    CPFooter.style.display = "none"
    CPDiv.style.height = ""
    var height = CPDiv.getBoundingClientRect().height,
        cHeight = height,
        interval = setInterval(() => {
            cHeight = cHeight - 5;
            CPDiv.style.height = `${cHeight}px`
            if (cHeight <= 0) {
                showInfoElem()
                clearInterval(interval)
            }
        }, 1);
}

showInfoElem = () => {
    CPDivWrap.style = "display:none;"
    document.body.style = "overflow-y: auto !important;"
    document.documentElement.style = "overflow-y: auto !important;"
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
    for (num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none";
    document.getElementById("popupHolder").style.display = "none";
}

showImagePopup = (elem) => {
    var imgMinus = 100;
    imgHolderImg.src = elem.src;
    imgHolderImg.alt = elem.alt;
    imgDesc.innerHTML = elem.alt;
    imageHolder.style.display = "";
    popupHolder.style.display = "";

    imageHolder.style = "";
    imgHolderImg.style = "";

    var tempWidth = parseInt(imgHolderImg.width);
    var tempHeight = parseInt(imgHolderImg.height);
    //console.log([tempWidth, tempHeight])

    var imgWidth = (window.innerWidth);
    var imgHeight = (window.innerHeight);

    if (window.innerHeight > window.innerWidth) imgHeight = null
    if (window.innerHeight < window.innerWidth) imgWidth = null

    function initImageStyles() {
        imgHolderImg.style.width = `${imgWidth /*- imgMinus*/}px`;
        imgHolderImg.style.height = `${imgHeight /*- imgMinus*/}px`;
        imageHolder.style.width = `${imgWidth /*- imgMinus*/}px`;
        imageHolder.style.height = `${imgHeight /*- imgMinus*/}px`;
    }
    initImageStyles();

    imgWidth = imgHolderImg.width;
    imgHeight = imgHolderImg.height;

    if (imgHolderImg.width > window.innerWidth) {
        //var widDif = imgHolderImg.width - window.innerWidth;
        //console.log([widDif, imgHolderImg.width])
        //imgHeight -= widDif;
        imgWidth = window.innerWidth;
        imgHeight = (tempHeight / tempWidth) * imgWidth
        initImageStyles();
    }
}

showCPElem.onclick = hideInfoElem;

var gImgs = document.getElementById("CPDiv").getElementsByTagName("img")

for (i = 2; i < gImgs.length; i++) {
    gImgs[i].addEventListener("click", function () {
        showImagePopup(this)
    })
}

var url = new URL(window.location.href);

if (url.searchParams.get("gfx") !== null) {
    infoDiv.style.height = "0px";
    CPDivWrap.style = "width: 100%; position: absolute; top: 275px; bottom: 0px"
    document.body.style = ""
    document.documentElement.style = ""
    CPFooter.style.display = ""
    showCPElem.onclick = hideCPEl;
    showCPElem.innerHTML = "Show Site Info"
    CPDiv.style.height = ""
}