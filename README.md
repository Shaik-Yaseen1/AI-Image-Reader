# AI Image Reader - Smart Image Analysis Tool

A modern, responsive web application that allows users to upload and analyze images using AI-powered categorization with Red, Amber, Green (RAG) classification system.

## 🌟 Features

### 📁 File Upload
- **Drag & Drop**: Simply drag images onto the upload area
- **File Browser**: Click to browse and select multiple images
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Multiple Selection**: Upload multiple images at once

### 🎯 AI Analysis Types
- **Image Quality Analysis**: Evaluates sharpness, brightness, contrast, and noise
- **Content Classification**: Identifies image content types (Nature, Urban, Portrait, etc.)
- **Object Detection**: Detects and counts objects in images
- **Custom Rules**: Apply custom analysis criteria

### 📊 Dual View Modes

#### Grid View
- Responsive grid layout (3-4 images per row)
- Shows image thumbnails with file information
- Color-coded status indicators
- Hover effects and smooth animations

#### RAG View
- **Red Zone**: High priority items requiring attention
- **Amber Zone**: Medium priority items for review
- **Green Zone**: Low priority items that meet criteria
- Color-coded borders and organized columns

### 📈 Real-time Statistics
- Live count of images in each RAG category
- Total image count
- Visual statistics cards with icons

### 🎨 Modern UI/UX
- Clean, glassmorphism design
- Responsive layout for desktop and mobile
- Smooth animations and transitions
- Loading states and progress indicators
- Toast notifications for user feedback

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend required - runs entirely in the browser

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start uploading and analyzing images!

### Usage

1. **Upload Images**
   - Drag and drop images onto the upload area
   - Or click "Choose Files" to browse your computer
   - Supported formats: JPG, PNG, GIF, WebP

2. **Configure Analysis**
   - Select analysis type from the dropdown
   - Adjust sensitivity threshold using the slider
   - Click "Analyze Images" to start processing

3. **View Results**
   - **Grid View**: See all images in a responsive grid
   - **RAG View**: View images categorized by priority
   - Switch between views using the toggle buttons

4. **Monitor Statistics**
   - View real-time counts in the statistics section
   - Track progress during analysis

## 🛠️ Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JS with async/await
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family

### Key Features
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Responsive Design**: Works on all screen sizes
- **Progressive Enhancement**: Graceful degradation
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimized rendering

### AI Analysis Simulation
The application includes a sophisticated AI analysis simulation that:
- Generates realistic scores based on analysis type
- Provides detailed metrics for each image
- Categorizes images into RAG zones based on thresholds
- Simulates processing delays for realistic UX

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted controls and grid layout
- **Mobile**: Touch-friendly interface with stacked layout

## 🎯 RAG Classification System

### Red Zone (High Priority)
- Images requiring immediate attention
- Low quality scores or critical issues
- Items that don't meet quality thresholds

### Amber Zone (Medium Priority)
- Images needing review or improvement
- Moderate quality scores
- Items close to but not meeting thresholds

### Green Zone (Low Priority)
- Images meeting all quality criteria
- High quality scores
- Items that pass all thresholds

## 🔧 Customization

### Adding Real AI Integration
To integrate with real AI services, replace the `simulateAIAnalysis` function in `script.js` with actual API calls to services like:
- Google Cloud Vision API
- Azure Computer Vision
- AWS Rekognition
- TensorFlow.js models

### Styling Customization
Modify `styles.css` to customize:
- Color scheme and branding
- Layout and spacing
- Animations and transitions
- Typography and fonts

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**




