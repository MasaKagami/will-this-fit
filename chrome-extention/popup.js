console.log("This is a popup!")

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(url => {
        // Extract the hostname from the URL and remove 'www.' if present
        let hostname = new URL(url).hostname.replace(/^www\./, '');
        document.getElementById('websiteUrl').textContent = hostname;
    });
});

function getCurrentTabUrl(callback) {
    // Query for the active tab in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Since there can only be one active tab in the current window, take the first one
        var tab = tabs[0];
        // Check if the tab has a URL (all tabs should have this, but just in case)
        if (tab.url) {
            // Execute the callback function with the tab's URL
            callback(tab.url);
        }
    });
}

// popup.js
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getProductType"}, function(response) {
            if(response && response.productType) {
                // Assuming you have generic images named after the product types in your assets folder
                const imageUrl = `../assets/${response.productType}.png`;
                document.getElementById('productImage').src = imageUrl;
                document.getElementById('productImage').style.display = 'block'; // Make sure to display the image
            } else {
                // Hide the image element or display a default image if no product type is identified
                document.getElementById('productImage').style.display = 'none';
            }
        });
    });
});