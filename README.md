# St Anne's Parish Trade & Job Fair - Vendor Promotion Generator

A web application that allows vendors to create professional promotional images for the St Anne's Parish Trade & Job Fair event.

## 🎯 Features

- **Interactive Image Cropping**: Users can upload, zoom, rotate, and crop their photos/logos
- **Custom Role Selection**: Choose from CEO, Director, Founder, Representative, etc.
- **Entity Type Selection**: Specify whether it's a Business, Company, Venture, etc.
- **High-Quality Output**: Generates 1080x1080px promotional images
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Instant Download**: Download generated promotional images in PNG format

## 🚀 Live Demo

[Add your Vercel deployment URL here after deployment]

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required (runs entirely in the browser)

## 🛠️ Installation & Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/parish-trade-fair.git
cd parish-trade-fair
```

2. Open `index.html` in your web browser, or use a local server:

Using Python:
```bash
python -m http.server 8000
```

Using Node.js (with http-server):
```bash
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

### Deploy to Vercel

1. Install Vercel CLI (optional):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or simply:
- Push your code to GitHub
- Connect your repository to Vercel
- Vercel will automatically deploy your site

## 📁 Project Structure

```
parish-trade-fair/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Stylesheet
├── js/
│   ├── app.js            # Main application logic
│   └── canvas-generator.js # Canvas generation module
├── assets/
│   └── logo.png          # Event logo (add your own)
├── README.md             # This file
└── vercel.json           # Vercel configuration (optional)
```

## 🎨 Customization

### Adding Your Event Logo

1. Place your event logo in the `assets/` folder
2. Update the logo path in `canvas-generator.js`:

```javascript
loadEventLogo() {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = 'assets/logo.png'; // Update this path
    // ...
}
```

### Changing Colors

The brand colors are defined in `css/styles.css`:
- Primary Brown: `#6B2C1F`
- Dark Brown: `#4A1810`
- Gold: `#C8A961`

### Modifying Canvas Layout

Edit `canvas-generator.js` to adjust:
- Text positions
- Font sizes
- Image dimensions
- Layout elements

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Technologies Used

- HTML5 Canvas API
- Cropper.js (v1.6.1) - Image cropping library
- Vanilla JavaScript (ES6+)
- CSS3 with Flexbox & Grid

## 📝 Usage Instructions

1. **Enter Your Name**: Fill in your full name
2. **Select Your Role**: Choose from CEO, Director, Founder, etc.
3. **Select Entity Type**: Choose Business, Company, Venture, etc.
4. **Enter Business Name**: Provide your business/company name
5. **Upload Photo/Logo**: Upload a square image (recommended 500x500px or larger)
6. **Adjust Image**: Use the cropping tools to zoom, rotate, and position your image
7. **Generate**: Click "Generate Promotion" to create your promotional image
8. **Download**: Click "Download Image" to save your promotional material

## 🐛 Troubleshooting

### Image Not Uploading
- Ensure the file is a valid image format (JPG, PNG, GIF, WebP)
- Check that the file size is under 10MB

### Cropper Not Showing
- Make sure you've uploaded an image first
- Try refreshing the page and uploading again

### Download Not Working
- Check your browser's download settings
- Ensure pop-ups are not blocked

### Low Quality Output
- Upload a higher resolution image (at least 500x500px)
- Use the zoom feature to properly frame your image

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For questions or support, contact:
- Event Organizers: [Add contact details]
- Technical Support: [Add contact details]

## 🎉 Event Details

**St Anne's Parish Trade & Job Fair**
- **Edition**: 2nd Edition - Christmas Bonanza
- **Date**: November 30, 2025
- **Time**: 8:00 AM - 6:00 PM
- **Venue**: St Anne Parish Hall & Ground, Itire, Lagos
- **Church**: St Anne Catholic Church (Itire), The City of the Living God

### Contact Information
- Mr. Benedict: 070 6469 0997
- Ms. Susan: 090 1725 6263
- Parish Priest: Rev. Fr. Charles Orekoya

---

**Made with ❤️ for St Anne's Parish Community**
