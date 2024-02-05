// Function to check if the current page is a clothing product page
function isProductPage() {
    // Example: Check if the URL contains certain keywords indicative of a product page
    const urlContainsProductKeywords = /product|item|clothing|shop/.test(window.location.href.toLowerCase());
    
    // Example: Check for the presence of specific HTML elements unique to product pages (e.g., size selection dropdown)
    const pageHasProductDetails = document.querySelector('.product-size-selector') !== null;

    return urlContainsProductKeywords && pageHasProductDetails;
}

// Function to determine the product type based on page content
//work on this
function getProductType() {
    const title = document.title.toLowerCase();
    const url = window.location.href.toLowerCase();
    // Placeholder logic - refine based on actual page content or structure
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

// Example: Send a message to the background script if a product page is detected
if (isProductPage()) {
    chrome.runtime.sendMessage({action: "productPageDetected", productType: getProductType()}, function(response) {
        console.log("Background script response:", response);
    });
}