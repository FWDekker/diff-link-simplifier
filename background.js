chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {queryContains: "diff="}}),
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {queryContains: "oldid="}})
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
