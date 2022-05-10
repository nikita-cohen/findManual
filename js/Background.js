chrome.storage.local.get(['history_list', 'change_url'], (result) => {
    if (!result.history_list) {
        chrome.storage.local.set({'history_list' : []});
    }
    if (!result.change_url) {
        chrome.storage.local.set({'change_url' : 1});
    }
})

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url) {
            const url = new URL(changeInfo.url);
            if (url.host === "www.walmart.com") {
                chrome.storage.local.get('change_url' , (result) => {
                    if (result.change_url === 1) {
                        chrome.storage.local.set({'change_url' : 0});
                    } else {
                        chrome.storage.local.set({'change_url' : 1});
                    }
                })
            }
        }
    }
);
