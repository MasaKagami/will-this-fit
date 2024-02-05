console.log("This is a popup!")

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(url => {
        let hostname = new URL(url).hostname.replace(/^www\./, '');
        document.getElementById('websiteUrl').textContent = hostname;
    });
    
    // Request the product type from the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getProductType"}, function(response) {
            if(response && response.productType) {
                const imageUrl = `../assets/${response.productType}.png`;
                document.getElementById('productImage').src = imageUrl;
                document.getElementById('productImage').style.display = 'block';
            } else {
                document.getElementById('productImage').style.display = 'none';
            }
        });
    });
});

function getCurrentTabUrl(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab.url) {
            callback(tab.url);
        }
    });
}