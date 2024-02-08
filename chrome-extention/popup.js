console.log("This is a popup!");

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Check if the current site is a shopping site
        chrome.tabs.sendMessage(tabs[0].id, {action: "checkShoppingSite"}, function(response) {
            if (response && response.isShoppingSite) {
                // Shopping site detected, display the website URL and attempt to fetch the product type
                getCurrentTabUrl(url => {
                    let hostname = new URL(url).hostname.replace(/^www\./, '');
                    document.getElementById('websiteUrl').textContent = hostname;
                    document.getElementById('websiteUrl').style.display = 'block'; // Ensure visibility
                });

                chrome.tabs.sendMessage(tabs[0].id, {action: "getProductType"}, function(response) {
                    if (response && response.productType) {
                        const imageUrl = `../assets/${response.productType}.png`;
                        document.getElementById('productImage').src = imageUrl;
                        document.getElementById('productImage').style.display = 'block'; // Show specific product image
                    } else {
                        document.getElementById('productImage').style.display = 'none'; // Hide if no product type identified
                    }
                });
                document.getElementById('dynamicContent').style.display = 'block'; // Show dynamic content for shopping sites
                document.getElementById('placeholderImage').style.display = 'none'; // Ensure the placeholder image is hidden
            } else {
                // Not a shopping site, hide the website URL and show placeholder
                document.getElementById('websiteUrl').style.display = 'none';
                showPlaceholderImage();
            }
        });
    });

    // This function is called regardless of the site type to ensure the recommendation count is always updated
    updateRecommendationCount();
});

function getCurrentTabUrl(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab.url) {
            callback(tab.url);
        }
    });
}

function showPlaceholderImage() {
    const productImage = document.getElementById('productImage');
    const dynamicContent = document.getElementById('dynamicContent');

    if (productImage) {
        productImage.src = "../assets/placeholder.png"; // Set the source for the placeholder image
        productImage.style.display = 'block'; // Ensure the placeholder image is visible
    } else {
        console.error('productImage element not found!');
    }

    if (dynamicContent) {
        dynamicContent.style.display = 'none'; // Hide the dynamic content if the element exists
    } else {
        console.error('dynamicContent element not found!');
    }
}

function updateRecommendationCount() {
    // Implement logic to fetch and display the recommendation count
    // Placeholder for demonstration; adapt based on how your extension tracks or retrieves this count
    var count = "10"; // Example dynamic count
    document.getElementById('recommendationCount').innerHTML = `<span class="count-number">${count}</span> in Total`;
}