// contentScript.js

// Function to check if the current page is a clothing product page
// This is a simplified example; you'll need to adjust the logic based on the actual page structures you're targeting
function isProductPage() {
    // Example: Check if the URL contains certain keywords indicative of a product page
    const urlContainsProductKeywords = /product|item|clothing|shop/.test(window.location.href.toLowerCase());
    
    // Example: Check for the presence of specific HTML elements unique to product pages (e.g., size selection dropdown)
    const pageHasProductDetails = document.querySelector('.product-size-selector') !== null;

    return urlContainsProductKeywords && pageHasProductDetails;
}

// Function to send a message to the background script
function notifyBackgroundPage() {
    chrome.runtime.sendMessage({action: "productPageDetected"}, function(response) {
        console.log("Message sent to background:", response);
    });
}

// Main logic
if (isProductPage()) {
    console.log("Product page detected.");
    notifyBackgroundPage();
} else {
    console.log("Not a product page.");
}

