for (krElem of document.getElementsByTagName("KR")) {
    krElem.outerHTML = "<a href=\"https://krunker.io\" style=\"color:#fff\">" + krElem.innerHTML + "</a>"
}

var btns = ["about", "invite", "stats"],
    apiUrl = "https://discord.com/api/v8",
    inviteCode = "KvDqXEu",
    statsDiv = document.getElementById("statsDiv");

for (btn of btns) {
    window[`${btn}Btn`] = document.getElementById(`${btn}Btn`);
    window[`${btn}Holder`] = document.getElementById(`${btn}Holder`);
}

updateStats = () => {
    fetch(apiUrl + `/invites/${inviteCode}?with_counts=true`, {
        "headers": {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            statsDiv.innerHTML = `
<style>
.serverImg {
    float: right; 
    background-image: url(https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=1024);
    height: 125px;
    width: 125px;
    background-size: 125px 125px;
    object-fit: contain;
    z-index: -1;
}
.serverImg:hover {
    background-image: url(https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.${data.guild.features.includes("ANIMATED_ICON") ? "gif" : "png"}?size=1024);
}
</style>
<div class="serverImg"></div>
<h3>Member Count</h3>
<p>${data.approximate_member_count}</p>
<h3>Online Users</h3>
<p>${data.approximate_presence_count}</p>
<h3>Verification Level</h3>
<p>${data.guild.verification_level}</p>
        `;
        })
}
updateStats();

showAbout = () => {
    aboutBtn.style.opacity = "0.8";
    statsBtn.style.opacity = "";
    aboutHolder.style.display = "";
    statsHolder.style.display = "none";
}
showStats = () => {
    statsBtn.style.opacity = "0.8";
    aboutBtn.style.opacity = "";
    statsHolder.style.display = "";
    aboutHolder.style.display = "none";
    updateStats();
}

aboutBtn.onclick = showAbout;
statsBtn.onclick = showStats;