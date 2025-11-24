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
        // Simple outer border - thin and elegant
        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
        
        // Subtle corner accents - smaller and refined
        const cornerLength = 40;
        const inset = 40;
        const corners = [
            {x: inset, y: inset}, // Top-left
            {x: this.canvas.width - inset, y: inset}, // Top-right
            {x: inset, y: this.canvas.height - inset}, // Bottom-left
            {x: this.canvas.width - inset, y: this.canvas.height - inset} // Bottom-right
        ];

        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 3;
        
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
     * Draw event header section - Minimalist
     */
    drawEventHeader() {
        const centerX = this.canvas.width / 2;
        let currentY = 120;

        // Event title - clean and minimal
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '500 42px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("St Anne's Trade & Job Fair", centerX, currentY);
        currentY += 55;

        // Edition badge - minimalist
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
        this.ctx.fillRect(centerX - 120, currentY - 28, 240, 38);
        
        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(centerX - 120, currentY - 28, 240, 38);
        
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '400 20px Arial, sans-serif';
        this.ctx.fillText('2ND EDITION', centerX, currentY - 5);
    }

    /**
     * Draw vendor showcase section - Minimalist centered design
     */
    async drawVendorShowcase(image, data) {
        const centerX = this.canvas.width / 2;
        let currentY = 300;

        // Large centered vendor photo with glassmorphism
        const photoSize = 480;
        const photoY = currentY + photoSize / 2;
        
        // Photo shadow - enhanced
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 40;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 15;
        
        await this.drawGlassmorphismVendorImage(image, centerX, photoY, photoSize);
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        currentY = photoY + photoSize / 2 + 80;

        // Left side: Entity Type and Business Name
        const leftX = 180;
        
        // Entity type label
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '400 28px Arial, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`${data.entityType}:`, leftX, currentY);
        
        // Business name below
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 38px Arial, sans-serif';
        const businessLines = this.wrapText(data.business.toUpperCase(), 20);
        businessLines.forEach((line, i) => {
            this.ctx.fillText(line, leftX, currentY + 50 + (i * 45));
        });

        // Right side: Person name and role
        const rightX = this.canvas.width - 180;
        
        // Person name
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '400 32px Arial, sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(data.name, rightX, currentY);
        
        // Role in brackets below
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '500 28px Arial, sans-serif';
        this.ctx.fillText(`(${data.role})`, rightX, currentY + 45);
    }

    /**
     * Draw vendor image with glassmorphism effect
     */
    async drawGlassmorphismVendorImage(image, centerX, centerY, size) {
        const radius = size / 2;

        // Outer gradient glow
        const outerGlow = this.ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 30);
        outerGlow.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
        outerGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.2)');
        outerGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2);
        this.ctx.fillStyle = outerGlow;
        this.ctx.fill();

        // Glassmorphism border effect
        const borderGradient = this.ctx.createLinearGradient(
            centerX - radius, centerY - radius,
            centerX + radius, centerY + radius
        );
        borderGradient.addColorStop(0, 'rgba(212, 175, 55, 0.9)');
        borderGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.8)');
        borderGradient.addColorStop(1, 'rgba(212, 175, 55, 0.9)');

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = borderGradient;
        this.ctx.fill();

        // Inner glow/blur effect
        const innerGradient = this.ctx.createRadialGradient(
            centerX, centerY, radius - 10,
            centerX, centerY, radius + 8
        );
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        innerGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = innerGradient;
        this.ctx.fill();

        // White backing
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();

        // Clip for image
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();

        // Calculate image dimensions to fill circle
        const aspectRatio = image.width / image.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (aspectRatio > 1) {
            drawHeight = size - 10;
            drawWidth = (size - 10) * aspectRatio;
            drawX = centerX - drawWidth / 2;
            drawY = centerY - (size - 10) / 2;
        } else {
            drawWidth = size - 10;
            drawHeight = (size - 10) / aspectRatio;
            drawX = centerX - (size - 10) / 2;
            drawY = centerY - drawHeight / 2;
        }

        this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        this.ctx.restore();

        // Subtle 3D highlight on top edge
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - 5, radius + 8, Math.PI, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.restore();
    }

    /**
     * Draw event footer section - Minimalist
     */
    drawEventFooter() {
        const centerX = this.canvas.width / 2;
        const bottomY = this.canvas.height - 120;

        // Date - clean
        this.ctx.fillStyle = '#D4AF37';
        this.ctx.font = '500 32px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('November 30, 2025', centerX, bottomY);

        // Venue - subtle
        this.ctx.fillStyle = 'rgba(232, 212, 160, 0.9)';
        this.ctx.font = '400 22px Arial, sans-serif';
        this.ctx.fillText('St Anne Parish Hall & Ground, Itire', centerX, bottomY + 38);
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
