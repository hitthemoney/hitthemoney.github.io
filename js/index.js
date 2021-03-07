const infoDiv = document.getElementById("info"),
    showCPElem = document.getElementById("showCP"),
    showCPFlip = document.getElementById("showCPFlip"),
    CPDiv = document.getElementById("CPDiv"),
    CPFooter = document.getElementById("CPFooter"),
    imgDesc = document.getElementById("imgDesc"),
    imgHolderImg = document.getElementById("imgHolderImg"),
    imageHolder = document.getElementById("imageHolder"),
    popupHolder = document.getElementById("popupHolder"),
    navBar = document.getElementById("navBar"),
    social = document.getElementById("social"),
    title = document.getElementById("title"),
    mainFlex = document.getElementById("mainFlex"),
    popups = ["image"],
    CPStates = ["Designer Portfolio", "Site Info"],
    onScrollClass = "onScroll",
    secTransTime = 1000,
    secNavTransTime = 350,
    rootElem = document.documentElement,
    sleepMS = (ms = 0) => new Promise(r => setTimeout(r, ms)),
    hidePopups = () => {
        for (let num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none";
        document.getElementById("popupHolder").style.display = "none";
    },
    showImagePopup = (elem) => {
        imgHolderImg.src = elem.src;
        imgHolderImg.alt = elem.alt;
        imgDesc.innerHTML = elem.alt;
        imageHolder.style.display = "";
        popupHolder.style.display = "";

        imageHolder.style = "";
        imgHolderImg.style = "";
    },
    showDesignerPortfolio = async () => {
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?gfx";
            window.history.pushState({
                path: newUrl
            }, "", newUrl);
        }

        const infoBox = infoDiv.getBoundingClientRect();
        showCPElem.style = "margin-top: 15px;"
        infoDiv.style = `height: ${infoBox.height}px; margin-top: 0px !important;`;
        CPDiv.style = "transition: none !important;";
        CPFooter.style = "opacity: 0";
        await sleepMS(0);
        const CPBox = CPDiv.getBoundingClientRect();
        CPFooter.style = "opacity: 1";
        infoDiv.style.height = "0px";
        CPDiv.style = `height: ${CPBox.height}px`;
        // Wait for the transition to finish
        await sleepMS(secTransTime);
        scrollToTop();
        CPDiv.style = "";
        showCPFlip.style.transform = "rotateY(360deg)";
        // Wait for the second transition to finish half way
        await sleepMS(secTransTime / 4);
        showCPElem.onclick = showInfo;
        showCPFlip.innerHTML = CPStates[1];
        infoDiv.style.display = "none";
    },
    showInfo = async () => {
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "";
            window.history.pushState({
                path: newUrl
            }, "", newUrl);
        }
        const CPBox = CPDiv.getBoundingClientRect();
        CPDiv.style = `height: ${CPBox.height}px; margin-top: 0px !important;`;
        infoDiv.style = "margin: 0px; transition: none !important; visibility: hidden; position: absolute; z-index: -9999";
        CPFooter.style = "opacity: 0";
        setTimeout(() => {
            CPFooter.style = "display: none";
        }, 500);
        await sleepMS(0);
        const infoBox = infoDiv.getBoundingClientRect();
        CPDiv.style.height = "0px";
        infoDiv.style = "margin: 0px; height: 0px";
        await sleepMS(1000);
        showCPElem.style = ""
        infoDiv.style = `height: ${infoBox.height}px`;
        // Wait for the transition to finish
        await sleepMS(secTransTime);
        showCPFlip.style.transform = "rotateY(0deg)";
        // Wait for the second transition to finish half way
        await sleepMS(secTransTime / 4);
        showCPElem.onclick = showDesignerPortfolio;
        showCPFlip.innerHTML = CPStates[0];
        CPDiv.style.display = "none";
        infoDiv.style = "";
    },
    cloneNavBar = () => {
        const navClone = navBar.cloneNode(true);
        navClone.id = "secondaryNavBar";
        navClone.style.display = "none";
        const titleClone = ([...navClone.childNodes].find(el => el.id === "title"));
        titleClone.addEventListener("load", (event) => {
            /**
             * @type {Document}
             */
            const tcDocument = event.target.contentDocument;
            /**
             * @type {SVGElement}
             */
            const tcSVG = tcDocument.children[0];
            tcSVG.style = "transition: all 0.4s; opacity: 1; cursor: pointer; transform: scale(1.0);"
            tcSVG.addEventListener("click", scrollToTop);
            tcSVG.addEventListener("mouseenter", (event) => {
                /**
                 * @type {SVGElement}
                 */
                const el = event.target;
                el.style.opacity = 0.8;
                el.style.transform = "scale(0.985)";
            });
            tcSVG.addEventListener("mouseleave", (event) => {
                /**
                 * @type {SVGElement}
                 */
                const el = event.target;
                el.style.opacity = 1.0;
                el.style.transform = "scale(1.0)";
            });
        })
        window.secondaryNavBar = navClone;
        document.body.appendChild(secondaryNavBar);
    },
    refreshPage = () => {
        window.location.href = "/"
    },
    scrollToTop = () => {
        window.document.documentElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    };

title.addEventListener("load", (event) => {
    event.target.contentDocument.getElementById("Layer_2_1_").onclick = refreshPage;
});

fetch("./imgs/social.svg")
    .then(response => response.text())
    .then(data => {
        social.outerHTML = data;
        cloneNavBar();
    })
    .catch((error) => {
        console.error(error);
    });

let gImgs = document.getElementById("CPDiv").getElementsByTagName("img")

for (i = 0; i < gImgs.length; i++) {
    gImgs[i].addEventListener("click", function () {
        showImagePopup(this)
    })
}

let isScrolling;
let onSecondaryNav = false;

window.addEventListener("scroll", async (event) => {
    let navBox = navBar.getBoundingClientRect();
    // console.log(rootElem.scrollTop, navBox.height, rootElem.scrollTop > navBox.height);
    if (window.secondaryNavBar) {
        if (rootElem.scrollTop > navBox.height) {
            if (!onSecondaryNav) {
                onSecondaryNav = true;
                window.secondaryNavBar.style = `opacity: 0; transition: ${secNavTransTime}ms all;`;
                await sleepMS(0);
                window.secondaryNavBar.style.opacity = 1;
            }
        } else {
            if (onSecondaryNav) {
                onSecondaryNav = false;
                window.secondaryNavBar.style = `opacity: 0; transition: ${secNavTransTime}ms all;`;
                await sleepMS(secNavTransTime);
                window.secondaryNavBar.style.display = "none";
            }
        }
    }
    document.body.classList.add(onScrollClass);
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        let tempStyle = document.createElement("style");
        document.head.appendChild(tempStyle);
        let i = 99;
        let fadeInterval = setInterval(() => {
            if (i < 2) {
                tempStyle.remove();
                document.body.classList.remove(onScrollClass);
                return clearInterval(fadeInterval);
            }
            tempStyle.innerHTML = `
            ::-webkit-scrollbar-thumb {
                background-color: rgba(255, 102, 0, ${i / 100}) !important;
            }
            `
            i -= 2;
        }, 1);
    }, 750);
}, false);

document.head.appendChild(Object.assign(document.createElement("style"), {
    id: "js-injected-style",
    innerHTML: `
#mainFlex > * {
    transition: ${secTransTime}ms all;
}    
    `
}))

let url = new URL(window.location.href);

if (url.searchParams.get("gfx") !== null) {
    showDesignerPortfolio();
} else {
    showCPElem.onclick = showDesignerPortfolio;
}