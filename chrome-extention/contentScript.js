// Function to check if the current page is a clothing product page
function isProductPage() {
    // Example: Check if the URL contains certain keywords indicative of a product page
    const urlContainsProductKeywords = /product|item|clothing|shop/.test(window.location.href.toLowerCase());
    // Example: Check for the presence of specific HTML elements unique to product pages (e.g., size selection dropdown)
    const pageHasProductDetails = document.querySelector('.product-size-selector') !== null;
    return urlContainsProductKeywords || pageHasProductDetails;
}

// Function to determine the product type based on page content
//work on this
function getProductType() {
    // Attempt to identify product type based on meta tags and structured data
    const metaProductType = getProductTypeFromMetaTags();
    if (metaProductType) return metaProductType;
    
    const titleProductType = getProductTypeFromTitle();
    if (titleProductType) return titleProductType;

    return null; // Return null if no specific product type is identified
}

function getProductTypeFromMetaTags() {
    const metaTags = document.querySelectorAll('meta[name="description"], meta[property="og:description"]');
    for (let tag of metaTags) {
        const content = tag.getAttribute('content').toLowerCase();
        if (content.includes("t-shirt") || content.includes("tee")) {
            return "t-shirt";
        } else if (content.includes("jeans")) {
            return "jeans";
        } else if (content.includes("sneakers") || content.includes("shoes")) {
            return "sneakers";
        } else if (content.includes("dress")) {
            return "dress";
        }
        // Add more conditions as needed
    }
    return null;
}

function getProductTypeFromTitle() {
    const title = document.title.toLowerCase();
    if (title.includes("t-shirt") || title.includes("tee")) {
        return "t-shirt";
    } else if (title.includes("jeans")) {
        return "jeans";
    } else if (title.includes("sneakers") || title.includes("shoes")) {
        return "sneakers";
    } else if (title.includes("dress")) {
        return "dress";
    }
    // Add more conditions as needed for other product types
    return null;
}

// Listen for a message from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getProductType") {
        sendResponse({productType: getProductType()});
    } else if (request.action === "checkShoppingSite") {
        // Determine if the current page is considered a shopping site
        const isShoppingSite = isProductPage();
        sendResponse({isShoppingSite: isShoppingSite});
    }
});

// Example: Send a message to the background script if a product page is detected
// if (isProductPage()) {
//     chrome.runtime.sendMessage({action: "productPageDetected", productType: getProductType()}, function(response) {
//         console.log("Background script response:", response);
//     });
// }

