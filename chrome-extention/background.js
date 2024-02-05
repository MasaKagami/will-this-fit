// background.js
// Unified message listener for handling different actions
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "productPageDetected") {
        console.log("Product page detected by content script.");
        
        // Simulated fetch of size recommendation
        fetchSizeRecommendation()
            .then(recommendation => {
                // Log or use the recommendation as needed
                console.log("Recommendation:", recommendation);
                sendResponse({status: "success", message: "Recommendation processed.", recommendation: recommendation});
            })
            .catch(error => {
                console.error("Error fetching size recommendation:", error);
                sendResponse({status: "error", message: "Failed to process recommendation."});
            });
        
        return true; // Asynchronous response
    } else if (request.action === "getProductType") {
        // Simulated product type determination
        // Replace this with actual logic to determine the product type
        const productType = "t-shirt"; // Placeholder
        sendResponse({productType: productType});
        
        return true; // Asynchronous response not strictly needed here, but good practice
    }
});

// Simulated function to fetch size recommendations
function fetchSizeRecommendation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const recommendation = {
                size: "M",
                confidence: "High",
                notes: "Based on your preferences and similar items."
            };
            resolve(recommendation);
        }, 1000); // Simulate network delay
    });
}