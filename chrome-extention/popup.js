// popup.js

// Logs a message when the popup script loads.
console.log("Popup script loaded!");

// This function is called when the DOM content of the popup has been fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    // Query the current active tab in the browser.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Send a message to the content script in the active tab to check if it's a shopping site.
        chrome.tabs.sendMessage(tabs[0].id, {action: "checkShoppingSite"}, function(response) {
            if (chrome.runtime.lastError) {
                // Log any errors if the message couldn't be sent or there was no listener in the content script.
                console.error("Error sending message:", chrome.runtime.lastError.message);
                showPlaceholderImage(); // Show placeholder as a fallback
                return;
            }
            
            if (response && response.isShoppingSite) {
                // If the response indicates we're on a shopping site, display relevant info.
                displayShoppingSiteContent(tabs[0].id);
            } else {
                showPlaceholderImage();
            }
        });
    });

    // Update the recommendation count, which should always be visible.
    updateRecommendationCount();
});

// Displays content specific to shopping sites.
function displayShoppingSiteContent(tabId) {
    // Extract and display the current tab's URL hostname, removing 'www' prefix.
    getCurrentTabUrl(url => {
        let hostname = new URL(url).hostname.replace(/^www\./, '');
        document.getElementById('websiteUrl').textContent = hostname;
        document.getElementById('websiteUrl').parentNode.style.display = 'block'; // Ensure the URL container is visible.
    });

    // Request the product type from the content script.
    chrome.tabs.sendMessage(tabId, {action: "getProductType"}, function(response) {
        if (response && response.productType) {
            // If a product type was found, display the corresponding image.
            const imageUrl = `../assets/${response.productType}.gif`;
            document.getElementById('productImage').src = imageUrl;
            document.getElementById('productImage').style.display = 'block';
        } else {
            // If no product type was found, ensure the product image is hidden.
            document.getElementById('productImage').style.display = 'none';
        }
    });
    
    // Show dynamic content for shopping sites.
    document.getElementById('dynamicContent').style.display = 'block';
    // Hide the placeholder image.
    document.getElementById('placeholderImage').style.display = 'none';
}

// Shows the placeholder image and hides dynamic content.
function showPlaceholderImage() {
    document.getElementById('placeholderImage').style.display = 'block'; // Show placeholder image.
    document.getElementById('dynamicContent').style.display = 'none'; // Hide dynamic content.
}

// Updates the recommendation count.
function updateRecommendationCount() {
    // Here, you'll fetch or compute the recommendation count.
    // For demonstration, we're setting a static value.
    document.getElementById('recommendationCount').innerHTML = `<span class="count-number">10</span> in Total`;
}

// Fetches the current tab's URL and passes it to a callback function.
function getCurrentTabUrl(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab.url) {
            callback(tab.url);
        }
    });
}
