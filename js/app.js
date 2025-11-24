/**
 * Main Application Logic
 * Handles form interactions, image cropping, and canvas generation
 */

// Global variables
let cropper = null;
let canvasGenerator = null;
let uploadedImageSrc = null;

// DOM Elements
const form = document.getElementById('cardForm');
const photoInput = document.getElementById('photo');
const fileName = document.getElementById('fileName');
const cropperSection = document.getElementById('cropperSection');
const cropperImage = document.getElementById('cropperImage');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const downloadBtn = document.getElementById('downloadBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const entityTypeSelect = document.getElementById('entityType');
const entityLabel = document.getElementById('entityLabel');

// Cropper control buttons
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const rotateLeftBtn = document.getElementById('rotateLeft');
const rotateRightBtn = document.getElementById('rotateRight');
const resetBtn = document.getElementById('reset');

/**
 * Initialize the application
 */
function init() {
    // Initialize canvas generator
    canvasGenerator = new CanvasGenerator('previewCanvas');
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Parish Trade Fair App initialized');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Photo upload
    photoInput.addEventListener('change', handlePhotoUpload);
    
    // Entity type change - update label dynamically
    entityTypeSelect.addEventListener('change', updateEntityLabel);
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Cropper controls
    zoomInBtn.addEventListener('click', () => cropper && cropper.zoom(0.1));
    zoomOutBtn.addEventListener('click', () => cropper && cropper.zoom(-0.1));
    rotateLeftBtn.addEventListener('click', () => cropper && cropper.rotate(-45));
    rotateRightBtn.addEventListener('click', () => cropper && cropper.rotate(45));
    resetBtn.addEventListener('click', resetCropper);
    
    // Download and regenerate
    downloadBtn.addEventListener('click', handleDownload);
    regenerateBtn.addEventListener('click', handleRegenerate);
}

/**
 * Handle photo upload
 */
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        photoInput.value = '';
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        photoInput.value = '';
        return;
    }
    
    // Display file name
    fileName.textContent = `Selected: ${file.name}`;
    fileName.style.color = '#C8A961';
    
    // Read and display image for cropping
    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImageSrc = event.target.result;
        initializeCropper(uploadedImageSrc);
    };
    reader.readAsDataURL(file);
}

/**
 * Initialize Cropper.js
 */
function initializeCropper(imageSrc) {
    // Destroy existing cropper if any
    if (cropper) {
        cropper.destroy();
    }
    
    // Show cropper section
    cropperSection.style.display = 'block';
    
    // Set image source
    cropperImage.src = imageSrc;
    
    // Initialize cropper with options
    cropper = new Cropper(cropperImage, {
        aspectRatio: 1, // Square aspect ratio for circular display
        viewMode: 2,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        responsive: true,
        background: false,
        modal: true,
        minCropBoxWidth: 200,
        minCropBoxHeight: 200,
    });
    
    // Scroll to cropper section smoothly
    setTimeout(() => {
        cropperSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/**
 * Reset cropper to initial state
 */
function resetCropper() {
    if (cropper) {
        cropper.reset();
    }
}

/**
 * Update entity label when entity type changes
 */
function updateEntityLabel() {
    const selectedType = entityTypeSelect.value;
    if (selectedType) {
        entityLabel.textContent = selectedType;
    }
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate cropper exists
    if (!cropper) {
        alert('Please upload and adjust your photo first');
        return;
    }
    
    // Show loading state
    showLoading(true);
    setButtonLoading(true);
    
    try {
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            role: document.getElementById('role').value,
            entityType: document.getElementById('entityType').value,
            business: document.getElementById('business').value.trim()
        };
        
        // Validate all fields
        if (!formData.name || !formData.role || !formData.entityType || !formData.business) {
            throw new Error('Please fill in all required fields');
        }
        
        // Get cropped image
        const croppedImage = await getCroppedImage();
        
        // Generate the promotional image
        await canvasGenerator.generate(formData, croppedImage);
        
        // Show preview
        showPreview();
        
    } catch (error) {
        console.error('Error generating image:', error);
        alert('Error generating image: ' + error.message);
    } finally {
        // Hide loading state
        showLoading(false);
        setButtonLoading(false);
    }
}

/**
 * Get cropped image as Image object
 */
function getCroppedImage() {
    return new Promise((resolve, reject) => {
        try {
            // Get cropped canvas from Cropper.js
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 800,
                height: 800,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
            });
            
            // Convert to Image object
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load cropped image'));
            img.src = croppedCanvas.toDataURL('image/png');
            
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Show preview section
 */
function showPreview() {
    preview.style.display = 'block';
    
    // Smooth scroll to preview
    setTimeout(() => {
        preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/**
 * Handle download button click
 */
function handleDownload() {
    try {
        const businessName = document.getElementById('business').value.trim()
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase();
        
        const filename = `${businessName}_promotion.png`;
        canvasGenerator.download(filename);
        
        // Show success message (optional)
        showTemporaryMessage('Image downloaded successfully!');
        
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading image. Please try again.');
    }
}

/**
 * Handle regenerate button click
 */
function handleRegenerate() {
    // Hide preview
    preview.style.display = 'none';
    
    // Scroll back to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Show/hide loading overlay
 */
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

/**
 * Set button loading state
 */
function setButtonLoading(loading) {
    if (loading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        generateBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        generateBtn.disabled = false;
    }
}

/**
 * Show temporary success message
 */
function showTemporaryMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Add animations for message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
      }
