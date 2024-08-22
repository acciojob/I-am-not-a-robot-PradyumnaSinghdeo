//your code here
const imageContainer = document.getElementById('image-container');
const buttonsContainer = document.getElementById('buttons-container');
const para = document.getElementById('para');
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];
let selectedClasses = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetState() {
    selectedImages = [];
    selectedClasses = [];
    para.textContent = '';
    buttonsContainer.innerHTML = '';
    renderImages();
}

function renderImages() {
    // Randomly choose one image to repeat
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageClasses = shuffleArray([...images, randomImage]);

    imageContainer.innerHTML = '';

    imageClasses.forEach(imgClass => {
        const img = document.createElement('img');
        img.className = imgClass;
        img.addEventListener('click', () => handleImageClick(imgClass, img));
        imageContainer.appendChild(img);
    });
}

function handleImageClick(imgClass, imgElement) {
    if (selectedImages.length >= 2 || selectedClasses.includes(imgClass)) return;

    selectedImages.push(imgElement);
    selectedClasses.push(imgClass);
    imgElement.classList.add('selected');

    if (selectedImages.length > 0) {
        renderResetButton();
    }

    if (selectedImages.length === 2) {
        renderVerifyButton();
    }
}

function renderResetButton() {
    if (!document.getElementById('reset')) {
        const resetButton = document.createElement('button');
        resetButton.id = 'reset';
        resetButton.textContent = 'Reset';
        resetButton.addEventListener('click', resetState);
        buttonsContainer.appendChild(resetButton);
    }
}

function renderVerifyButton() {
    if (!document.getElementById('verify')) {
        const verifyButton = document.createElement('button');
        verifyButton.id = 'verify';
        verifyButton.textContent = 'Verify';
        verifyButton.addEventListener('click', verifySelection);
        buttonsContainer.appendChild(verifyButton);
    }
}

function verifySelection() {
    const [first, second] = selectedClasses;
    const resultText = first === second 
        ? 'You are a human. Congratulations!' 
        : "We can't verify you as a human. You selected the non-identical tiles.";
    
    para.textContent = resultText;
    buttonsContainer.innerHTML = '';  // Remove buttons after verification
}

// Initialize the state on page load
resetState();
