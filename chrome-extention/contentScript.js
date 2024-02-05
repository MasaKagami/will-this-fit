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

//have to work on this
function getProductType() {
    // Simplified example: Determine product type based on keywords in the page title or URL
    const title = document.title.toLowerCase();
    const url = window.location.href.toLowerCase();
    
    if (title.includes("t-shirt") || url.includes("t-shirt")) {
        return "t-shirt";
    } else if (title.includes("jeans") || url.includes("jeans")) {
        return "jeans";
    }
    // Add more conditions as needed for different product types
    
    return null; // Return null if no specific product type is identified
}

// Listen for a message from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getProductType") {
        sendResponse({productType: getProductType()});
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getProductType") {
        // Perform some asynchronous operation
        someAsyncOperation().then(result => {
            sendResponse({productType: result});
        });
        return true; // Indicates an asynchronous response is expected
    }
});