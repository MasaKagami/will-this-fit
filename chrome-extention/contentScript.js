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
    const urlProductType = getProductTypeFromUrl();
    if (urlProductType) return urlProductType;
    const metaProductType = getProductTypeFromMetaTags();
    if (metaProductType) return metaProductType;
    const titleProductType = getProductTypeFromTitle();
    if (titleProductType) return titleProductType;
    return null; // Return null if no specific product type is identified
}

function getProductTypeFromUrl() {
    const content = window.location.href.toLowerCase();
    let productType = '';
    if (content.includes("t-shirt") || content.includes("tee")) {
        productType = "t-shirt";
    } else if (content.includes("sweatshirt") || content.includes("hoodie") || content.includes("sweatshirts") || content.includes("hoodies")) {
        productType = "sweatshirt";
    } else if (content.includes("jeans")) {
        productType = "jeans";
    } else if (content.includes("sneakers") || content.includes("shoes")) {
        productType = "sneakers";
    } else if (content.includes("dress")) {
        productType = "dress";
    }
    // Add more conditions as needed
    return productType;
}

function getProductTypeFromMetaTags() {
    const metaTags = document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[property="og:title"');
    for (let tag of metaTags) {
        const content = tag.getAttribute('content').toLowerCase();
        let productType = '';
        if (content.includes("t-shirt") || content.includes("tee")) {
            productType = "t-shirt";
        } else if (content.includes("sweatshirt") || content.includes("hoodie") || content.includes("sweatshirts") || content.includes("hoodies")) {
            productType = "sweatshirt";
        } else if (content.includes("jeans")) {
            productType = "jeans";
        } else if (content.includes("sneakers") || content.includes("shoes")) {
            productType = "sneakers";
        } else if (content.includes("dress")) {
            productType = "dress";
        }
        // Add more conditions as needed
    }
    return productType;
}

function getProductTypeFromTitle() {
    const content = document.title.toLowerCase();
    let productType = '';
    if (content.includes("t-shirt") || conetent.includes("tee")) {
        productType = "t-shirt";
    } else if (content.includes("sweatshirt") || content.includes("hoodie") || content.includes("sweatshirts") || content.includes("hoodies")) {
        productType = "sweatshirt";
    } else if (content.includes("jeans")) {
        productType = "jeans";
    } else if (content.includes("sneakers") || content.includes("shoes")) {
        productType = "sneakers";
    } else if (content.includes("dress")) {
        productType = "dress";
    }
    // Add more conditions as needed
    // Add more conditions as needed for other product types
    return productType;
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
