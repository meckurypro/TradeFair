/**
 * Canvas Generator Module
 * Handles the generation of promotional images on HTML5 Canvas
 */

class CanvasGenerator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.eventLogo = null;
        this.loadEventLogo();
    }

    /**
     * Load the event logo (placeholder for now)
     */
    loadEventLogo() {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        // Placeholder - replace with actual logo path later
        logoImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzZCMkMxRiIvPjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjQzhBOTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MT0dPPC90ZXh0Pjwvc3ZnPg==';
        
        logoImg.onload = () => {
            this.eventLogo = logoImg;
        };
        
        logoImg.onerror = () => {
            console.warn('Event logo failed to load, continuing without it');
        };
    }

    /**
     * Main generation method
     * @param {Object} data - User input data
     * @param {Image} croppedImage - The cropped user image
     */
    async generate(data, croppedImage) {
        // Set canvas dimensions to high quality
        this.canvas.width = 1080;
        this.canvas.height = 1080;

        // Draw background
        this.drawBackground();

        // Draw decorative border
        this.drawBorder();

        // Draw event logo at top (if loaded)
        if (this.eventLogo) {
            this.drawEventLogo();
        }

        // Draw main title
        this.drawMainTitle();

        // Draw event name
        this.drawEventName();

        // Draw vendor photo/logo (larger circle)
        await this.drawVendorImage(croppedImage);

        // Draw business information
        this.drawBusinessInfo(data);

        // Draw event details at bottom
        this.drawEventDetails();

        return this.canvas;
    }

    /**
     * Draw gradient background
     */
    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#6B2C1F');
        gradient.addColorStop(0.5, '#5A2419');
        gradient.addColorStop(1, '#4A1810');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw decorative gold border
     */
    drawBorder() {
        this.ctx.strokeStyle = '#C8A961';
        this.ctx.lineWidth = 10;
        this.ctx.strokeRect(25, 25, this.canvas.width - 50, this.canvas.height - 50);
        
        // Inner border
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
    }

    /**
     * Draw event logo at the top
     */
    drawEventLogo() {
        const logoSize = 100;
        const logoX = this.canvas.width / 2 - logoSize / 2;
        const logoY = 70;
        
        this.ctx.drawImage(this.eventLogo, logoX, logoY, logoSize, logoSize);
    }

    /**
     * Draw the main title "St Anne's Trade & Job Fair"
     */
    drawMainTitle() {
        this.ctx.fillStyle = '#C8A961';
        this.ctx.font = 'bold 38px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("St Anne's Trade & Job Fair", this.canvas.width / 2, 210);
        
        // Subtitle
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('2ND EDITION', this.canvas.width / 2, 245);
    }

    /**
     * Draw "Patronize us at..." text
     */
    drawEventName() {
        this.ctx.fillStyle = '#C8A961';
        this.ctx.font = 'italic 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Patronize us at...', this.canvas.width / 2, 300);
    }

    /**
     * Draw the vendor's image in a large circle
     * @param {Image} image - The cropped vendor image
     */
    async drawVendorImage(image) {
        // Larger photo size (increased from 280 to 380)
        const photoSize = 380;
        const centerX = this.canvas.width / 2;
        const centerY = 540; // Adjusted position
        const radius = photoSize / 2;

        // Create circular clipping path
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();

        // Calculate dimensions to fill the circle
        const aspectRatio = image.width / image.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (aspectRatio > 1) {
            // Image is wider
            drawHeight = photoSize;
            drawWidth = photoSize * aspectRatio;
            drawX = centerX - drawWidth / 2;
            drawY = centerY - photoSize / 2;
        } else {
            // Image is taller or square
            drawWidth = photoSize;
            drawHeight = photoSize / aspectRatio;
            drawX = centerX - photoSize / 2;
            drawY = centerY - drawHeight / 2;
        }

        // Draw the image
        this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        this.ctx.restore();

        // Draw gold border around the circle
        this.ctx.strokeStyle = '#C8A961';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Add outer shadow effect
        this.ctx.strokeStyle = 'rgba(200, 169, 97, 0.3)';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    /**
     * Draw business information (name, person, role)
     * @param {Object} data - User input data
     */
    drawBusinessInfo(data) {
        const centerX = this.canvas.width / 2;
        let currentY = 780;

        // Entity type + Business name (e.g., "BUSINESS: ABC Trading")
        this.ctx.fillStyle = '#C8A961';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        
        const businessText = data.business.toUpperCase();
        this.ctx.fillText(businessText, centerX, currentY);
        currentY += 60;

        // Person's name and role
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '36px Arial';
        
        const personText = `${data.name} - ${data.role}`;
        this.ctx.fillText(personText, centerX, currentY);
        currentY += 50;

        // Entity type label
        this.ctx.fillStyle = '#C8A961';
        this.ctx.font = 'italic 28px Arial';
        this.ctx.fillText(data.entityType, centerX, currentY);
    }

    /**
     * Draw event details at the bottom
     */
    drawEventDetails() {
        const centerX = this.canvas.width / 2;

        // Date
        this.ctx.fillStyle = '#C8A961';
        this.ctx.font = 'bold 34px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('November 30, 2025', centerX, 980);

        // Venue
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '26px Arial';
        this.ctx.fillText('St Anne Parish Hall & Ground, Itire', centerX, 1020);
    }

    /**
     * Get canvas as data URL for download
     * @returns {string} Data URL of the canvas
     */
    getDataURL() {
        return this.canvas.toDataURL('image/png', 1.0);
    }

    /**
     * Download the canvas as an image file
     * @param {string} filename - Name of the file to download
     */
    download(filename = 'vendor-promotion.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = this.getDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasGenerator;
}
