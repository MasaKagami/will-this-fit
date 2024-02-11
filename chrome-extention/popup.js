// popup.js

console.log("Popup script loaded!");

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "checkShoppingSite"}, function(response) {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError);
                showPlaceholderImage(); // Show placeholder as a fallback
                return;
            }
            
            if (response && response.isShoppingSite) {
                displayShoppingSiteContent(tabs[0].id);
            } else {
                showPlaceholderImage();
            }
        });
    });

    updateRecommendationCount();
});

function displayShoppingSiteContent(tabId) {
    getCurrentTabUrl(url => {
        let hostname = new URL(url).hostname.replace(/^www\./, '');
        document.getElementById('websiteUrl').textContent = hostname;
        document.getElementById('websiteUrl').parentNode.style.display = 'block';
    });

    chrome.tabs.sendMessage(tabId, {action: "getProductType"}, function(response) {
        if (response && response.productType) {
            const imageUrl = `../assets/${response.productType}.gif`;
            const productImage = document.getElementById('productImage');
            if (productImage) {
                productImage.src = imageUrl;
                productImage.style.display = 'block';
            } else {
                console.error('productImage element not found!');
            }
        } else {
            document.getElementById('productImage').style.display = 'none';
        }
    });
    
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) {
        dynamicContent.style.display = 'block';
    } else {
        console.error('dynamicContent element not found!');
    }

    document.getElementById('placeholderImage').style.display = 'none';
}

function showPlaceholderImage() {
    const placeholderImage = document.getElementById('placeholderImage');
    if (placeholderImage) {
        placeholderImage.style.display = 'block';
    } else {
        console.error('placeholderImage element not found!');
    }

    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) {
        dynamicContent.style.display = 'none';
    } else {
        console.error('dynamicContent element not found!');
    }
}

function updateRecommendationCount() {
    document.getElementById('recommendationCount').innerHTML = `<span class="count-number">10</span> in Total`;
}

function getCurrentTabUrl(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab.url) {
            callback(tab.url);
        }
    });
}
