document.addEventListener('DOMContentLoaded', function() {
  const clothingTypes = ['T-Shirt', 'Sweatshirt', 'Jeans', 'Shorts'];
  const brandsByType = {
      'T-Shirt': ['Uniqlo', 'Gap', 'H&M'],
      'Sweatshirt': ['Uniqlo', 'Gap', 'H&M'],
      'Jeans': ['Uniqlo', 'Gap', 'H&M'],
      'Shorts': ['Uniqlo', 'Gap', 'H&M']
  };
  const sizeOptions = {
      'Tops': ['S', 'M', 'L', 'XL'],
      'Bottoms': ['30', '32', '34', '36'],
  };
  const clothingTypeToSizeCategory = {
      'T-Shirt': 'Tops',
      'Sweatshirt': 'Tops',
      'Jeans': 'Bottoms',
      'Shorts': 'Bottoms',
  };

  populateDropdown('typeSelect', clothingTypes, false);

  document.getElementById('typeSelect').addEventListener('change', function() {
      const selectedType = this.value;
      const associatedBrands = brandsByType[selectedType] || [];
      populateDropdown('brandSelect', associatedBrands, false);
      
      const sizeCategory = clothingTypeToSizeCategory[selectedType];
      const relevantSizes = sizeOptions[sizeCategory] || [];
      populateDropdown('sizeSelect', relevantSizes, false);
  });

  document.getElementById('savePreferences').addEventListener('click', function() {
      const type = document.getElementById('typeSelect').value;
      const brand = document.getElementById('brandSelect').value;
      const size = document.getElementById('sizeSelect').value;

      if (type && brand && size) {
          chrome.storage.sync.set({preferences: {type, brand, size}}, function() {
              console.log('Preferences saved:', {type, brand, size});
          });
      } else {
          console.log('Please make all selections before saving.');
      }
  });
});

function populateDropdown(selectId, options, disabled) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Please select</option>'; // Reset options with a prompt to select
  options.forEach(option => {
      const optElement = document.createElement('option');
      optElement.value = optElement.textContent = option;
      select.appendChild(optElement);
  });
  select.disabled = disabled || options.length === 0;
}