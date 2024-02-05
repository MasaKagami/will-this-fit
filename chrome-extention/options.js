// Mock data for demonstration purposes
const brands = ['Brand A', 'Brand B', 'Brand C'];
const clothingTypes = {
  'Brand A': ['T-Shirt', 'Pants'],
  'Brand B': ['Sweater', 'Hoodie'],
  'Brand C': ['Jeans', 'Jacket']
};
const specificClothing = {
  'T-Shirt': ['Classic Tee', 'V-Neck'],
  'Pants': ['Slim Fit Jeans', 'Regular Trousers']
};
const sizes = {
  'Classic Tee': ['S', 'M', 'L', 'XL'],
  'V-Neck': ['S', 'M', 'L'],
  'Slim Fit Jeans': ['30', '32', '34', '36'],
  'Regular Trousers': ['28', '30', '32', '34']
};

document.addEventListener('DOMContentLoaded', function() {
  populateBrands();
  loadPreferences();
  document.getElementById('brandSelect').addEventListener('change', updateClothingTypeDropdown);
  document.getElementById('clothingTypeSelect').addEventListener('change', updateSpecificClothingDropdown);
  document.getElementById('clothingItemSelect').addEventListener('change', updateSizeDropdown);
  document.getElementById('sizePreferencesForm').addEventListener('submit', savePreferences);
});

function populateBrands() {
  const brandSelect = document.getElementById('brandSelect');
  brands.forEach(brand => {
    let option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });
}

function updateClothingTypeDropdown() {
  const brand = document.getElementById('brandSelect').value;
  const clothingTypeSelect = document.getElementById('clothingTypeSelect');
  clothingTypeSelect.innerHTML = '<option value="">Select a clothing type</option>';
  clothingTypeSelect.disabled = false;

  clothingTypes[brand].forEach(type => {
    let option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    clothingTypeSelect.appendChild(option);
  });
}

function updateSpecificClothingDropdown() {
  const type = document.getElementById('clothingTypeSelect').value;
  const clothingItemSelect = document.getElementById('clothingItemSelect');
  clothingItemSelect.innerHTML = '<option value="">Select a specific clothing</option>';
  clothingItemSelect.disabled = false;

  specificClothing[type].forEach(item => {
    let option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    clothingItemSelect.appendChild(option);
  });
}

function updateSizeDropdown() {
  const item = document.getElementById('clothingItemSelect').value;
  const sizeSelect = document.getElementById('sizeSelect');
  sizeSelect.innerHTML = '<option value="">Select a size</option>';
  sizeSelect.disabled = false;

  sizes[item].forEach(size => {
    let option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });
}

function loadPreferences() {
  // Use Chrome storage to load saved preferences
  chrome.storage.sync.get(['userPreferences'], function(result) {
    if (result.userPreferences) {
      // Assuming result.userPreferences is an object with brand, clothingType, clothingItem, and size properties
      const { brand, clothingType, clothingItem, size } = result.userPreferences;
      document.getElementById('brandSelect').value = brand;
      updateClothingTypeDropdown();
      document.getElementById('clothingTypeSelect').value = clothingType;
      updateSpecificClothingDropdown();
      document.getElementById('clothingItemSelect').value = clothingItem;
      updateSizeDropdown();
      document.getElementById('sizeSelect').value = size;
    }
  });
}

function savePreferences(e) {
  e.preventDefault();
  const preferences = {
    brand: document.getElementById('brandSelect').value,
    clothingType: document.getElementById('clothingTypeSelect').value,
    clothingItem: document.getElementById('clothingItemSelect').value,
    size: document.getElementById('sizeSelect').value
  };

  // Use Chrome storage to save preferences
  chrome.storage.sync.set({userPreferences: preferences}, function() {
    console.log('Preferences saved');
    // Optionally, provide feedback to the user that preferences have been saved
  });
}
