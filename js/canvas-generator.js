/**
 * Modern Canvas Generator Module
 * Professional design with clean typography and modern aesthetics
 */

class CanvasGenerator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.eventLogo = null;
        this.loadEventLogo();
    }

    /**
     * Load the event logo
     */
    loadEventLogo() {
        const logoImg = new Image();
        logoImg.src = 'assets/logo.png';
        
        logoImg.onload = () => {
            this.eventLogo = logoImg;
        };
        
        logoImg.onerror = () => {
            console.warn('Event logo failed to load, continuing without it');
        };
    }

    /**
     * Main generation method with modern design
     */
    async generate(data, croppedImage) {
        // Set canvas dimensions
        this.canvas.width = 1080;
        this.canvas.height = 1080;

        // Modern gradient background
        this.drawModernBackground();

        // Subtle decorative elements
        this.drawModernBorder();

        // Top section: Event branding
        this.drawEventHeader();

        // Main content: Vendor showcase
        await this.drawVendorShowcase(croppedImage, data);

        // Bottom section: Event details
        this.drawEventFooter();

        return this.canvas;
    }

    /**
     * Draw modern gradient background
     */
    drawModernBackground() {
        // Sophisticated gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#2C1810');
        gradient.addColorStop(0.5, '#3D2419');
        gradient.addColorStop(1, '#1A0F0A');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Subtle overlay pattern
        this.ctx.fillStyle = 'rgba(200, 169, 97, 0.02)';
        for (let i = 0; i < 50; i++) {
            this.ctx.fillRect(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                2, 2
            );
        }
    }

    /**
     * Draw minimal modern border
     */
    drawModernBorder() {
        // Outer border - gold accent
        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Corner accents
        const cornerLength = 60;
        const corners = [
            {x: 30, y: 30}, // Top-left
            {x: this.canvas.width - 30, y: 30}, // Top-right
            {x: 30, y: this.canvas.height - 30}, // Bottom-left
            {x: this.canvas.width - 30, y: this.canvas.height - 30} // Bottom-right
        ];

        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 6;
        
        corners.forEach((corner, i) => {
            if (i === 0) { // Top-left
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x, corner.y + cornerLength);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x + cornerLength, corner.y);
                this.ctx.stroke();
            } else if (i === 1) { // Top-right
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x - cornerLength, corner.y);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x, corner.y + cornerLength);
                this.ctx.stroke();
            } else if (i === 2) { // Bottom-left
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x, corner.y - cornerLength);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x + cornerLength, corner.y);
                this.ctx.stroke();
            } else { // Bottom-right
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x - cornerLength, corner.y);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x, corner.y - cornerLength);
                this.ctx.stroke();
            }
        });
    }

    /**
     * Draw event header section
     */
    drawEventHeader() {
        const centerX = this.canvas.width / 2;
        let currentY = 100;

        // Event logo (if available)
        if (this.eventLogo) {
            const logoSize = 120;
            this.ctx.drawImage(
                this.eventLogo,
                centerX - logoSize / 2,
                currentY,
                logoSize,
                logoSize
            );
            currentY += logoSize + 30;
        } else {
            currentY += 20;
        }

        // Event title - modern typography
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '600 44px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.letterSpacing = '1px';
        this.ctx.fillText("St Anne's Trade & Job Fair", centerX, currentY);
        currentY += 50;

        // Edition badge - clean design
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        this.ctx.fillRect(centerX - 140, currentY - 30, 280, 40);
        
        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(centerX - 140, currentY - 30, 280, 40);
        
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '500 22px Arial, sans-serif';
        this.ctx.fillText('2ND EDITION', centerX, currentY - 5);
        currentY += 40;

        // Divider line
        this.drawDivider(centerX, currentY + 10);
    }

    /**
     * Draw vendor showcase section
     */
    async drawVendorShowcase(image, data) {
        const centerX = this.canvas.width / 2;
        let currentY = 340;

        // Call-to-action text
        this.ctx.fillStyle = '#E8D4A0';
        this.ctx.font = 'italic 32px Georgia, serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Patronize us at...', centerX, currentY);
        currentY += 60;

        // Vendor photo with modern styling
        const photoSize = 340;
        const photoY = currentY;
        
        // Photo shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        this.ctx.shadowBlur = 30;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 10;
        
        await this.drawModernVendorImage(image, centerX, photoY, photoSize);
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        currentY = photoY + photoSize / 2 + 50;

        // Business name - prominent
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 52px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        
        const businessName = this.wrapText(data.business.toUpperCase(), 35);
        businessName.forEach((line, i) => {
            this.ctx.fillText(line, centerX, currentY + (i * 60));
        });
        currentY += businessName.length * 60 + 20;

        // Person info - clean layout
        this.ctx.fillStyle = '#E8D4A0';
        this.ctx.font = '400 30px Arial, sans-serif';
        this.ctx.fillText(data.name, centerX, currentY);
        currentY += 45;

        // Role and entity - subtle
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '500 26px Arial, sans-serif';
        this.ctx.fillText(`${data.role} • ${data.entityType}`, centerX, currentY);
    }

    /**
     * Draw vendor image with modern circular styling
     */
    async drawModernVendorImage(image, centerX, centerY, size) {
        const radius = size / 2;

        // Outer glow
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
        this.ctx.fill();

        // Main gold border
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.fill();

        // White inner ring
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();

        // Clip for image
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();

        // Calculate image dimensions
        const aspectRatio = image.width / image.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (aspectRatio > 1) {
            drawHeight = size - 8;
            drawWidth = (size - 8) * aspectRatio;
            drawX = centerX - drawWidth / 2;
            drawY = centerY - (size - 8) / 2;
        } else {
            drawWidth = size - 8;
            drawHeight = (size - 8) / aspectRatio;
            drawX = centerX - (size - 8) / 2;
            drawY = centerY - drawHeight / 2;
        }

        this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        this.ctx.restore();
    }

    /**
     * Draw event footer section
     */
    drawEventFooter() {
        const centerX = this.canvas.width / 2;
        const bottomY = this.canvas.height - 100;

        // Divider above footer
        this.drawDivider(centerX, bottomY - 60);

        // Date - prominent
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = 'bold 36px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('November 30, 2025', centerX, bottomY);

        // Venue - clean
        this.ctx.fillStyle = '#E8D4A0';
        this.ctx.font = '400 24px Arial, sans-serif';
        this.ctx.fillText('St Anne Parish Hall & Ground, Itire', centerX, bottomY + 40);
    }

    /**
     * Draw decorative divider
     */
    drawDivider(centerX, y) {
        const lineWidth = 200;
        
        // Left line
        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - lineWidth, y);
        this.ctx.lineTo(centerX - 20, y);
        this.ctx.stroke();

        // Center diamond
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, y - 6);
        this.ctx.lineTo(centerX + 6, y);
        this.ctx.lineTo(centerX, y + 6);
        this.ctx.lineTo(centerX - 6, y);
        this.ctx.closePath();
        this.ctx.fill();

        // Right line
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 20, y);
        this.ctx.lineTo(centerX + lineWidth, y);
        this.ctx.stroke();
    }

    /**
     * Wrap text to fit within specified width
     */
    wrapText(text, maxChars) {
        if (text.length <= maxChars) return [text];
        
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= maxChars) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) lines.push(currentLine);
        return lines;
    }

    /**
     * Get canvas as data URL
     */
    getDataURL() {
        return this.canvas.toDataURL('image/png', 1.0);
    }

    /**
     * Download the canvas as an image
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
