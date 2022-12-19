function startNavigation() {
    document.getElementById("webviewTag").src = document.getElementById("urlbox").value
}

function back() {
    document.getElementById("webviewTag").goBack()
}

function forward() {
    document.getElementById("webviewTag").goForward()
}

function refresh() {
    document.getElementById("webviewTag").reload()
}

document.getElementById("webviewTag").addEventListener("did-navigate", () => {
    document.getElementById("urlbox").value = document.getElementById("webviewTag").getURL()
})
document.getElementById("webviewTag").addEventListener("did-navigate-in-page", () => {
    document.getElementById("urlbox").value = document.getElementById("webviewTag").getURL()
})

document.getElementById("webviewTag").addEventListener("page-title-updated", (title) => {
    document.title = title.title + " - OnTop Browser"
})