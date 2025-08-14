// Global variables
let uploadedImages = [];
let currentView = 'grid';

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const controlsSection = document.getElementById('controlsSection');
const resultsSection = document.getElementById('resultsSection');
const statsSection = document.getElementById('statsSection');
const imagesGrid = document.getElementById('imagesGrid');
const ragSection = document.getElementById('ragSection');
const loadingModal = document.getElementById('loadingModal');
const thresholdSlider = document.getElementById('threshold');
const thresholdValue = document.getElementById('thresholdValue');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateThresholdDisplay();
});

// Initialize all event listeners
function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Analysis controls
    document.getElementById('analyzeBtn').addEventListener('click', analyzeImages);
    thresholdSlider.addEventListener('input', updateThresholdDisplay);
    
    // View controls
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
}

// Process uploaded files
function processFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        showNotification('Please select valid image files (JPG, PNG, GIF, WebP)', 'error');
        return;
    }
    
    imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                id: Date.now() + Math.random(),
                file: file,
                name: file.name,
                size: formatFileSize(file.size),
                url: e.target.result,
                status: 'pending',
                score: null,
                category: null
            };
            
            uploadedImages.push(imageData);
        };
        reader.readAsDataURL(file);
    });
    
    showNotification(`${imageFiles.length} image(s) uploaded successfully!`, 'success');
    showControls();
    renderImages();
}

// Show controls section
function showControls() {
    controlsSection.style.display = 'block';
    resultsSection.style.display = 'block';
    statsSection.style.display = 'block';
}

// Update threshold display
function updateThresholdDisplay() {
    thresholdValue.textContent = `${thresholdSlider.value}%`;
}

// Analyze images with AI simulation
async function analyzeImages() {
    if (uploadedImages.length === 0) {
        showNotification('Please upload images first', 'error');
        return;
    }
    
    showLoadingModal();
    
    // Simulate AI analysis with different algorithms based on selected type
    const analysisType = document.getElementById('analysisType').value;
    const threshold = parseInt(thresholdSlider.value);
    
    for (let i = 0; i < uploadedImages.length; i++) {
        const image = uploadedImages[i];
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        // Generate AI analysis results
        const analysis = await simulateAIAnalysis(image, analysisType, threshold);
        
        image.score = analysis.score;
        image.category = analysis.category;
        image.status = analysis.status;
        image.analysis = analysis.details;
        
        // Update progress
        updateAnalysisProgress(i + 1, uploadedImages.length);
    }
    
    hideLoadingModal();
    renderImages();
    updateStatistics();
    showNotification('Image analysis completed!', 'success');
}

// Simulate AI analysis
async function simulateAIAnalysis(image, analysisType, threshold) {
    // Simulate different analysis types
    let score, category, status, details;
    
    switch (analysisType) {
        case 'quality':
            score = Math.random() * 100;
            details = {
                sharpness: Math.random() * 100,
                brightness: Math.random() * 100,
                contrast: Math.random() * 100,
                noise: Math.random() * 100
            };
            break;
            
        case 'content':
            score = Math.random() * 100;
            const contentTypes = ['Nature', 'Urban', 'Portrait', 'Abstract', 'Document', 'Product'];
            details = {
                primaryContent: contentTypes[Math.floor(Math.random() * contentTypes.length)],
                confidence: Math.random() * 100,
                tags: generateRandomTags()
            };
            break;
            
        case 'object':
            score = Math.random() * 100;
            const objects = ['Person', 'Car', 'Building', 'Animal', 'Plant', 'Object'];
            details = {
                detectedObjects: objects.slice(0, Math.floor(Math.random() * 3) + 1),
                objectCount: Math.floor(Math.random() * 5) + 1,
                detectionConfidence: Math.random() * 100
            };
            break;
            
        case 'custom':
            score = Math.random() * 100;
            details = {
                customScore: Math.random() * 100,
                priority: Math.random() > 0.5 ? 'High' : 'Low',
                category: Math.random() > 0.5 ? 'Important' : 'Regular'
            };
            break;
    }
    
    // Determine category based on score and threshold
    if (score >= threshold + 20) {
        category = 'green';
        status = 'green';
    } else if (score >= threshold - 20) {
        category = 'amber';
        status = 'amber';
    } else {
        category = 'red';
        status = 'red';
    }
    
    return { score: Math.round(score), category, status, details };
}

// Generate random tags for content analysis
function generateRandomTags() {
    const allTags = ['bright', 'dark', 'colorful', 'monochrome', 'detailed', 'blurry', 'sharp', 'textured', 'smooth', 'complex', 'simple'];
    const numTags = Math.floor(Math.random() * 4) + 1;
    const tags = [];
    
    for (let i = 0; i < numTags; i++) {
        const tag = allTags[Math.floor(Math.random() * allTags.length)];
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }
    
    return tags;
}

// Update analysis progress
function updateAnalysisProgress(current, total) {
    const modalContent = loadingModal.querySelector('.modal-content p');
    modalContent.textContent = `Processing image ${current} of ${total}...`;
}

// Render images in grid view
function renderImages() {
    if (currentView === 'grid') {
        renderGridView();
    } else {
        renderRAGView();
    }
}

// Render grid view
function renderGridView() {
    imagesGrid.innerHTML = '';
    
    uploadedImages.forEach(image => {
        const imageCard = createImageCard(image);
        imagesGrid.appendChild(imageCard);
    });
}

// Create image card for grid view
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';
    
    const statusClass = image.status ? `status-${image.status}` : '';
    const statusText = image.status ? image.status.toUpperCase() : 'PENDING';
    
    card.innerHTML = `
        <img src="${image.url}" alt="${image.name}" loading="lazy">
        <div class="image-info">
            <div class="image-name">${image.name}</div>
            <div class="image-size">${image.size}</div>
            <div class="image-status">
                <span class="status-indicator ${statusClass}"></span>
                ${statusText}
                ${image.score ? `(${image.score}%)` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Render RAG view
function renderRAGView() {
    const redImages = document.getElementById('redImages');
    const amberImages = document.getElementById('amberImages');
    const greenImages = document.getElementById('greenImages');
    
    redImages.innerHTML = '';
    amberImages.innerHTML = '';
    greenImages.innerHTML = '';
    
    uploadedImages.forEach(image => {
        const ragItem = createRAGItem(image);
        
        switch (image.category) {
            case 'red':
                redImages.appendChild(ragItem);
                break;
            case 'amber':
                amberImages.appendChild(ragItem);
                break;
            case 'green':
                greenImages.appendChild(ragItem);
                break;
        }
    });
}

// Create RAG item
function createRAGItem(image) {
    const item = document.createElement('div');
    item.className = 'rag-image-item';
    
    const analysisType = document.getElementById('analysisType').value;
    let scoreText = '';
    
    if (image.analysis) {
        switch (analysisType) {
            case 'quality':
                scoreText = `Sharpness: ${Math.round(image.analysis.sharpness)}%`;
                break;
            case 'content':
                scoreText = `Content: ${image.analysis.primaryContent}`;
                break;
            case 'object':
                scoreText = `Objects: ${image.analysis.detectedObjects.join(', ')}`;
                break;
            case 'custom':
                scoreText = `Priority: ${image.analysis.priority}`;
                break;
        }
    }
    
    item.innerHTML = `
        <img src="${image.url}" alt="${image.name}" loading="lazy">
        <div class="rag-image-info">
            <div class="rag-image-name">${image.name}</div>
            <div class="rag-image-score">Score: ${image.score}% | ${scoreText}</div>
        </div>
    `;
    
    return item;
}

// Switch between grid and RAG views
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Show/hide sections
    const gridSection = document.querySelector('.view-section');
    gridSection.style.display = view === 'grid' ? 'block' : 'none';
    ragSection.style.display = view === 'rag' ? 'block' : 'none';
    
    // Render appropriate view
    renderImages();
}

// Update statistics
function updateStatistics() {
    const redCount = uploadedImages.filter(img => img.category === 'red').length;
    const amberCount = uploadedImages.filter(img => img.category === 'amber').length;
    const greenCount = uploadedImages.filter(img => img.category === 'green').length;
    const totalCount = uploadedImages.length;
    
    document.getElementById('redCount').textContent = redCount;
    document.getElementById('amberCount').textContent = amberCount;
    document.getElementById('greenCount').textContent = greenCount;
    document.getElementById('totalCount').textContent = totalCount;
}

// Show loading modal
function showLoadingModal() {
    loadingModal.classList.add('show');
}

// Hide loading modal
function hideLoadingModal() {
    loadingModal.classList.remove('show');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add some sample images for demonstration
function addSampleImages() {
    const sampleImages = [
        {
            name: 'Sample Nature.jpg',
            size: '2.5 MB',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            status: 'green',
            score: 85,
            category: 'green',
            analysis: { sharpness: 90, brightness: 80, contrast: 85, noise: 15 }
        },
        {
            name: 'Sample Portrait.png',
            size: '1.8 MB',
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            status: 'amber',
            score: 65,
            category: 'amber',
            analysis: { sharpness: 70, brightness: 60, contrast: 75, noise: 25 }
        },
        {
            name: 'Sample Urban.jpg',
            size: '3.2 MB',
            url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
            status: 'red',
            score: 35,
            category: 'red',
            analysis: { sharpness: 40, brightness: 30, contrast: 45, noise: 60 }
        }
    ];
    
    sampleImages.forEach((sample, index) => {
        const imageData = {
            id: Date.now() + index,
            name: sample.name,
            size: sample.size,
            url: sample.url,
            status: sample.status,
            score: sample.score,
            category: sample.category,
            analysis: sample.analysis
        };
        
        uploadedImages.push(imageData);
    });
    
    showControls();
    renderImages();
    updateStatistics();
}

// Optional: Add sample images for demonstration (uncomment to enable)
// addSampleImages();
