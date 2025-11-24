/**
 * Modern Canvas Generator with Multiple Templates
 * Production-ready with theme system
 */

class CanvasGenerator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.eventLogo = null;
        this.currentTemplate = 'dark-elegance';
        this.loadEventLogo();
        this.initializeTemplates();
    }

    /**
     * Initialize all available templates
     */
    initializeTemplates() {
        this.templates = {
            'dark-elegance': {
                name: 'Dark Elegance',
                background: {
                    type: 'gradient',
                    colors: ['#2C1810', '#3D2419', '#1A0F0A']
                },
                primaryText: '#FFFFFF',
                secondaryText: '#E8D4A0',
                accent: '#D4AF37',
                border: 'rgba(212, 175, 55, 0.6)',
                borderAccent: '#D4AF37',
                badgeBackground: 'rgba(212, 175, 55, 0.2)',
                badgeBorder: 'rgba(212, 175, 55, 0.5)',
                imageGlow: 'rgba(212, 175, 55, 0.4)'
            },
            'light-modern': {
                name: 'Light Modern',
                background: {
                    type: 'gradient',
                    colors: ['#FAF8F3', '#F5F1E8', '#FFFFFF']
                },
                primaryText: '#2C1810',
                secondaryText: '#5A2419',
                accent: '#C8A961',
                border: 'rgba(107, 44, 31, 0.3)',
                borderAccent: '#6B2C1F',
                badgeBackground: 'rgba(200, 169, 97, 0.15)',
                badgeBorder: 'rgba(107, 44, 31, 0.4)',
                imageGlow: 'rgba(107, 44, 31, 0.3)'
            },
            'minimalist-black': {
                name: 'Minimalist Black',
                background: {
                    type: 'solid',
                    colors: ['#000000']
                },
                primaryText: '#FFFFFF',
                secondaryText: '#CCCCCC',
                accent: '#FFD700',
                border: 'rgba(255, 215, 0, 0.4)',
                borderAccent: '#FFD700',
                badgeBackground: 'rgba(255, 215, 0, 0.1)',
                badgeBorder: 'rgba(255, 215, 0, 0.6)',
                imageGlow: 'rgba(255, 215, 0, 0.4)'
            },
            'royal-blue': {
                name: 'Royal Blue',
                background: {
                    type: 'gradient',
                    colors: ['#0A1628', '#1C2E4A', '#0D1B2A']
                },
                primaryText: '#FFFFFF',
                secondaryText: '#B8CAE0',
                accent: '#FFD700',
                border: 'rgba(255, 215, 0, 0.5)',
                borderAccent: '#FFD700',
                badgeBackground: 'rgba(255, 215, 0, 0.15)',
                badgeBorder: 'rgba(255, 215, 0, 0.6)',
                imageGlow: 'rgba(255, 215, 0, 0.4)'
            },
            'christmas-theme': {
                name: 'Christmas Theme',
                background: {
                    type: 'gradient',
                    colors: ['#1B4332', '#2D6A4F', '#0F2A1F']
                },
                primaryText: '#FFFFFF',
                secondaryText: '#F4E8C1',
                accent: '#FFD700',
                border: 'rgba(255, 215, 0, 0.5)',
                borderAccent: '#C41E3A',
                badgeBackground: 'rgba(196, 30, 58, 0.2)',
                badgeBorder: 'rgba(255, 215, 0, 0.6)',
                imageGlow: 'rgba(255, 215, 0, 0.4)'
            }
        };
    }

    /**
     * Set the current template
     */
    setTemplate(templateId) {
        if (this.templates[templateId]) {
            this.currentTemplate = templateId;
        }
    }

    /**
     * Get current template colors
     */
    getTheme() {
        return this.templates[this.currentTemplate];
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
     * Main generation method with template support
     */
    async generate(data, croppedImage, templateId = null) {
        // Set template if provided
        if (templateId) {
            this.setTemplate(templateId);
        }

        // Set canvas dimensions
        this.canvas.width = 1080;
        this.canvas.height = 1080;

        const theme = this.getTheme();

        // Draw background based on template
        this.drawBackground(theme);

        // Draw border
        this.drawModernBorder(theme);

        // Draw logo at top-left
        this.drawLogo();

        // Draw event header
        this.drawEventHeader(theme);

        // Draw date at top-right
        this.drawDate(theme);

        // Draw vendor showcase
        await this.drawVendorShowcase(croppedImage, data, theme);

        return this.canvas;
    }

    /**
     * Draw background based on template
     */
    drawBackground(theme) {
        if (theme.background.type === 'gradient') {
            const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
            theme.background.colors.forEach((color, index) => {
                gradient.addColorStop(index / (theme.background.colors.length - 1), color);
            });
            this.ctx.fillStyle = gradient;
        } else {
            this.ctx.fillStyle = theme.background.colors[0];
        }
        
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Subtle texture overlay for non-minimalist themes
        if (this.currentTemplate !== 'minimalist-black') {
            this.ctx.fillStyle = `${theme.accent}0D`; // 5% opacity
            for (let i = 0; i < 50; i++) {
                this.ctx.fillRect(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    2, 2
                );
            }
        }
    }

    /**
     * Draw minimal modern border
     */
    drawModernBorder(theme) {
        // Simple outer border
        this.ctx.strokeStyle = theme.border;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
        
        // Corner accents
        const cornerLength = 40;
        const inset = 40;
        const corners = [
            {x: inset, y: inset},
            {x: this.canvas.width - inset, y: inset},
            {x: inset, y: this.canvas.height - inset},
            {x: this.canvas.width - inset, y: this.canvas.height - inset}
        ];

        this.ctx.strokeStyle = theme.borderAccent;
        this.ctx.lineWidth = 3;
        
        corners.forEach((corner, i) => {
            if (i === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x, corner.y + cornerLength);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x + cornerLength, corner.y);
                this.ctx.stroke();
            } else if (i === 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x - cornerLength, corner.y);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x, corner.y + cornerLength);
                this.ctx.stroke();
            } else if (i === 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x, corner.y - cornerLength);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x + cornerLength, corner.y);
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(corner.x - cornerLength, corner.y);
                this.ctx.lineTo(corner.x, corner.y);
                this.ctx.lineTo(corner.x, corner.y - cornerLength);
                this.ctx.stroke();
            }
        });
    }

    /**
     * Draw logo at top-left corner
     */
    drawLogo() {
        if (!this.eventLogo) return;

        const logoSize = 90;
        const logoX = 70;
        const logoY = 70;
        
        // Subtle shadow for logo
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 3;
        
        this.ctx.drawImage(this.eventLogo, logoX, logoY, logoSize, logoSize);
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    /**
     * Draw event header section - centered
     */
    drawEventHeader(theme) {
        const centerX = this.canvas.width / 2;
        let currentY = 120;

        // Event title - clean and minimal
        this.ctx.fillStyle = theme.accent;
        this.ctx.font = '500 42px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("St Anne's Trade & Job Fair", centerX, currentY);
        currentY += 55;

        // Enhanced edition badge with Christmas Bonanza - UPDATED FORMAT
        const badgeWidth = 340;
        const badgeHeight = 65;
        const badgeX = centerX - badgeWidth / 2;
        const badgeY = currentY - 45;

        this.ctx.fillStyle = theme.badgeBackground;
        this.ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
        
        this.ctx.strokeStyle = theme.badgeBorder;
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);
        
        // "2ND EDITION" text
        this.ctx.fillStyle = theme.accent;
        this.ctx.font = 'bold 22px Arial, sans-serif';
        this.ctx.fillText('2ND EDITION', centerX, currentY - 17);
        
        // "- Christmas Bonanza" text (CHANGED from parentheses to dash)
        this.ctx.fillStyle = theme.secondaryText;
        this.ctx.font = 'italic 18px Arial, sans-serif';
        this.ctx.fillText('- Christmas Bonanza', centerX, currentY + 8);
    }

    /**
     * Draw date at top-right corner - NEW FORMAT
     */
    drawDate(theme) {
        const rightX = this.canvas.width - 100;
        const topY = 215;

        this.ctx.textAlign = 'right';
        
        // "30th Nov." on first line
        this.ctx.fillStyle = theme.accent;
        this.ctx.font = 'bold 28px Arial, sans-serif';
        this.ctx.fillText('30th Nov.', rightX, topY);
        
        // "2025" on second line
        this.ctx.fillStyle = theme.secondaryText;
        this.ctx.font = '500 24px Arial, sans-serif';
        this.ctx.fillText('2025', rightX, topY + 32);
    }

    /**
     * Draw vendor showcase section - Minimalist centered design
     */
    async drawVendorShowcase(image, data, theme) {
        const centerX = this.canvas.width / 2;
        let currentY = 300;

        // Large centered vendor photo with glassmorphism
        const photoSize = 480;
        const photoY = currentY + photoSize / 2;
        
        // Enhanced photo shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 40;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 15;
        
        await this.drawGlassmorphismVendorImage(image, centerX, photoY, photoSize, theme);
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        currentY = photoY + photoSize / 2 + 80;

        // Left side: Entity Type and Business Name
        const leftX = 180;
        
        // Entity type label
        this.ctx.fillStyle = theme.accent;
        this.ctx.font = '400 28px Arial, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`${data.entityType}:`, leftX, currentY);
        
        // Business name below
        this.ctx.fillStyle = theme.primaryText;
        this.ctx.font = 'bold 38px Arial, sans-serif';
        const businessLines = this.wrapText(data.business.toUpperCase(), 20);
        businessLines.forEach((line, i) => {
            this.ctx.fillText(line, leftX, currentY + 50 + (i * 45));
        });

        // Right side: Person name and role
        const rightX = this.canvas.width - 180;
        
        // Person name
        this.ctx.fillStyle = theme.primaryText;
        this.ctx.font = '400 32px Arial, sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(data.name, rightX, currentY);
        
        // Role in brackets below
        this.ctx.fillStyle = theme.accent;
        this.ctx.font = '500 28px Arial, sans-serif';
        this.ctx.fillText(`(${data.role})`, rightX, currentY + 45);
    }

    /**
     * Draw vendor image with glassmorphism effect
     */
    async drawGlassmorphismVendorImage(image, centerX, centerY, size, theme) {
        const radius = size / 2;

        // Outer gradient glow
        const outerGlow = this.ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 30);
        const glowColor = theme.imageGlow.replace(')', ', 0)').replace('rgba(', '').split(',').slice(0, 3).join(',');
        outerGlow.addColorStop(0, theme.imageGlow);
        outerGlow.addColorStop(0.5, `rgba(${glowColor}, 0.2)`);
        outerGlow.addColorStop(1, `rgba(${glowColor}, 0)`);
        
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
        borderGradient.addColorStop(0, theme.accent);
        borderGradient.addColorStop(0.5, this.lightenColor(theme.accent, 20));
        borderGradient.addColorStop(1, theme.accent);

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = borderGradient;
        this.ctx.fill();

        // Inner glow effect
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

        // White backing (or light backing for dark images on light backgrounds)
        const backingColor = this.currentTemplate === 'light-modern' ? '#F5F5F5' : '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = backingColor;
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
     * Lighten a hex color by percentage
     */
    lightenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `rgb(${R}, ${G}, ${B})`;
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

    /**
     * Get all available templates
     */
    getAvailableTemplates() {
        return Object.keys(this.templates).map(key => ({
            id: key,
            name: this.templates[key].name
        }));
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasGenerator;
}
