document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('preferences', function(data) {
        const preferences = data.preferences;
        const container = document.getElementById('savedPreferences');

        if (preferences && preferences.length) {
            preferences.forEach(pref => {
                const prefElement = document.createElement('div');
                prefElement.className = 'preference-item';
                prefElement.innerHTML = `
                    <p><strong>Clothing Type:</strong> ${pref.type}</p>
                    <p><strong>Brand:</strong> ${pref.brand}</p>
                    <p><strong>Size:</strong> ${pref.size}</p>
                `;
                container.appendChild(prefElement);
            });
        } else {
            container.textContent = 'No preferences saved.';
        }
    });
    document.querySelector('.back-arrow').addEventListener('click', function() {
        window.location.href = 'options.html'; // Directly navigate to options.html
    });
});
