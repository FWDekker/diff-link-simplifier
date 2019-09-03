// Reusable refs
const simpleUrlOutput = document.getElementById("simpleUrlOutput");
const wikiUrlOutput = document.getElementById("wikiUrlOutput");

// Select all text on click
simpleUrlOutput.onclick = function() { simpleUrlOutput.select() };
wikiUrlOutput.onclick = function() { wikiUrlOutput.select() };

// Add contents to input boxes
chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function (tabs) {
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
