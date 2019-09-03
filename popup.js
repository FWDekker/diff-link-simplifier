// Reusable refs
const simpleUrlOutput = document.getElementById("simpleUrlOutput");
const simpleUrlCopy = document.getElementById("simpleUrlCopy");
const simpleUrlCopiedMessage = document.getElementById("simpleUrlCopiedMessage");
const wikiUrlOutput = document.getElementById("wikiUrlOutput");
const wikiUrlCopy = document.getElementById("wikiUrlCopy");
const wikiUrlCopiedMessage = document.getElementById("wikiUrlCopiedMessage");

// Select all text on click
simpleUrlOutput.onclick = () => simpleUrlOutput.select();
wikiUrlOutput.onclick = () => wikiUrlOutput.select();

// Copy to clipboard on click
const writeToClipboard = text => {
    navigator.clipboard.writeText(text)
        .then(() => {})
        .catch(err => {
            console.log("Failed to write to clipboard.", err);
        });
};

simpleUrlCopy.onclick = () => {
    simpleUrlOutput.select();
    writeToClipboard(simpleUrlOutput.value);
    wikiUrlCopiedMessage.style.visibility = "hidden";
    simpleUrlCopiedMessage.style.visibility = "visible";
};

wikiUrlCopy.onclick = () => {
    wikiUrlOutput.select();
    writeToClipboard(wikiUrlOutput.value);
    simpleUrlCopiedMessage.style.visibility = "hidden";
    wikiUrlCopiedMessage.style.visibility = "visible";
};

// Add contents to input boxes
chrome.tabs.query({"active": true, "lastFocusedWindow": true}, tabs => {
    const originalUrl = new URL(tabs[0].url);
    const queryParams = new URLSearchParams(originalUrl.search);

    const wikiPath = originalUrl.pathname.substr(0, originalUrl.pathname.lastIndexOf("/"));
    const oldId = queryParams.get("oldid");
    const newId = queryParams.get("diff");

    const wikiUrl = `Special:Diff/${oldId}/${newId}`;
    const simpleUrl = `${originalUrl.protocol}//${originalUrl.hostname}${wikiPath}/${wikiUrl}`;
    
    simpleUrlOutput.value = simpleUrl;
    wikiUrlOutput.value = wikiUrl;
});
