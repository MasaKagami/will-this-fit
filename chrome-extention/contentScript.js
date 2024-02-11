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
    let productType = getProductTypeFromMetaTags();
    if (productType !== '') {
        console.log('Product type identified from meta tags:', productType);
        return productType;
    }

    // If still not found, try to get it from the page title.
    productType = getProductTypeFromTitle();
    if (productType !== '') {
        console.log('Product type identified from page title:', productType);
        return productType;
    }

    // If the product type wasn't found in any of the sources, return null.
    console.log('No product type identified.');
    return '';
}

function getProductTypeFromMetaTags() {
    const metaTags = document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[property="og:title"]');
    for (let tag of metaTags) {
        const content = tag.content.toLowerCase();
        if (content.includes("t-shirt") || content.includes("tee")) {
            return "t-shirt";
        } else if (content.includes("sweatshirt") || content.includes("hoodie") || content.includes("sweatshirts") || content.includes("hoodies")) {
            return "sweatshirt";
        } else if (content.includes("jeans")) {
            return "jeans";
        } else if (content.includes("sneakers") || content.includes("shoes")) {
            return "sneakers";
        } else if (content.includes("dress")) {
            return "dress";
        } else if (content.includes("shorts")) {
            return "short";
        }
        // Add more conditions as needed
    }
    return '';
}

function getProductTypeFromTitle() {
    const title = document.title.toLowerCase();
    if (title.includes("t-shirt") || title.includes("tee")) {
        return "t-shirt";
    } else if (title.includes("sweatshirt") || title.includes("hoodie") || title.includes("sweatshirts") || title.includes("hoodies")) {
        return "sweatshirt";
    } else if (title.includes("jeans")) {
        return "jeans";
    } else if (title.includes("sneakers") || title.includes("shoes")) {
        return "sneakers";
    } else if (title.includes("dress")) {
        return "dress";
    } else if (title.includes("shorts")) {
        return "short";
    }
    // Add more conditions as needed
    // Add more conditions as needed for other product types
    return '';
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
