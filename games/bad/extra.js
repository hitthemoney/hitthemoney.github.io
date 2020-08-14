var popups = ["howTo"]

function hidePopup() {
    for (num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none"
    document.getElementById("popupHolder").style.display = "none"
}


function showHowTo() {
    let howToHolder = document.getElementById("howToHolder");
    howToHolder.style.display = "block";
    document.getElementById("popupHolder").style.display = "block";
}