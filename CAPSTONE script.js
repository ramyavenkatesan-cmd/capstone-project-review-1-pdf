script.js

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadCourses();
    loadProgress();
    updateDashboard();
    checkOfflineStatus();
    initializeAccessibility();
    hideLoadingSpinner();
});

function initializeApp() {
    // Show welcome toast
    showToast('Welcome to RuralEd Hub! Start your learning journey today.');
    
    // Load saved preferences
    loadDarkModePreference();
    loadLanguagePreference();
    loadAccessibilityPreferences();
    
    // Initialize streak counter
    updateStreak();
    
    // Set up event listeners
    setupEventListeners();
}

function hideLoadingSpinner() {
    setTimeout(() => {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }, 1000);
}

// ============================================
// OFFLINE STATUS
// ============================================

function checkOfflineStatus() {
    const offlineNotice = document.getElementById('offlineNotice');
    
    window.addEventListener('offline', () => {
        offlineNotice.style.display = 'block';
    });
    
    window.addEventListener('online', () => {
        offlineNotice.style.display = 'none';
        syncOfflineData();
    });
}

function syncOfflineData() {
    console.log('Syncing offline data...');
    showToast('Back online! Syncing your progress...');
    // Implement sync logic here
}

// ============================================
// LANGUAGE SUPPORT
// ============================================

const translations = {
    en: {
        welcome: 'Welcome! Explore your dashboard.',
        startLearning: 'Start Learning',
        takeAssessment: 'Take Assessment',
        searchPlaceholder: 'Search courses...',
        allCategories: 'All Categories',
        basicFoundations: 'Basic Foundations',
        mathematics: 'Mathematics',
        science: 'Science',
        languages: 'Languages',
        ruralSkills: 'Rural Skills'
    },
    hi: {
        welcome: 'स्वागत है! अपने डैशबोर्ड का अन्वेषण करें।',
        startLearning: 'शिक्षा शुरू करें',
        takeAssessment: 'मूल्यांकन लें',
        searchPlaceholder: 'पाठ्यक्रम खोजें...',
        allCategories: 'सभी श्रेणियां',
        basicFoundations: 'मूल आधार',
        mathematics: 'गणित',
        science: 'विज्ञान',
        languages: 'भाषाएँ',
        ruralSkills: 'ग्रामीण कौशल'
    },
    ta: {
        welcome: 'வரவேற்கிறோம்! உங்கள் டாஷ்போர்டை ஆராயுங்கள்.',
        startLearning: 'கற்றலைத் தொடங்குங்கள்',takeAssessment: 'மதிப்பீட்டை எடுங்கள்',
        searchPlaceholder: 'பாடங்களைத் தேடுங்கள்...',
        allCategories: 'அனைத்து பிரிவுகள்',
        basicFoundations: 'அடிப்படை அடித்தளங்கள்',
        mathematics: 'கணிதம்',
        science: 'அறிவியல்',
        languages: 'மொழிகள்',
        ruralSkills: 'கிராமப்புற திறன்கள்'
    },
    te: {
        welcome: 'స్వాగతం! మీ డాష్‌బోర్డ్‌ను అన్వేషించండి.',
        startLearning: 'చదువు ప్రారంభించండి',
        takeAssessment: 'మూల్యాంకనం తీసుకోండి',
        searchPlaceholder: 'కోర్సులను వెతకండి...',
        allCategories: 'అన్ని వర్గాలు',
        basicFoundations: 'ప్రాథమిక పునాదులు',
        mathematics: 'గణితం',
        science: 'సైన్స్',
        languages: 'భాషలు',
        ruralSkills: 'గ్రామీణ నైపుణ్యాలు'
    },
    bn: {
        welcome: 'স্বাগতম! আপনার ড্যাশবোর্ড অন্বেষণ করুন।',
        startLearning: 'শিক্ষা শুরু করুন',
        takeAssessment: 'মূল্যায়ন নিন',
        searchPlaceholder: 'কোর্স অনুসন্ধান করুন...',
        allCategories: 'সব বিভাগ',
        basicFoundations: 'মৌলিক ভিত্তি',
        mathematics: 'গণিত',
        science: 'বিজ্ঞান',
        languages: 'ভাষা',
        ruralSkills: 'গ্রামীণ দক্ষতা'
    },
    kn: {
        welcome: 'ಸ್ವಾಗತ! ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಅನ್ವೇಷಿಸಿ.',
        startLearning: 'ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
        takeAssessment: 'ಮೌಲ್ಯಮಾಪನ ತೆಗೆದುಕೊಳ್ಳಿ',
        searchPlaceholder: 'ಕೋರ್ಸ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
        allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
        basicFoundations: 'ಮೂಲ ಅಡಿಪಾಯ',
        mathematics: 'ಗಣಿತ',
        science: 'ವಿಜ್ಞಾನ',
        languages: 'ಭಾಷೆಗಳು',
        ruralSkills: 'ಗ್ರಾಮೀಣ ಕೌಶಲ್ಯಗಳು'
    }
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update UI text
    const trans = translations[lang];
    document.querySelector('.toast-body').textContent = trans.welcome;
    
    // Update search placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = trans.searchPlaceholder;
    }
    
    // Reload courses with translated titles
    loadCourses();
    
    showToast(`Language changed to ${lang.toUpperCase()}`);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('langSelect').value = savedLang;
    changeLanguage();
}

// ============================================
// DARK MODE
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const btn = document.getElementById('darkModeToggle');
    if (isDarkMode) {
        btn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
    } else {
        btn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
    }
}

function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
    }
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

let fontSize = 1;
let isHighContrast = false;
let isDyslexiaFont = false;

function initializeAccessibility() {
    fontSize = parseFloat(localStorage.getItem('fontSize')) || 1;
    isHighContrast = localStorage.getItem('highContrast') === 'true';
    isDyslexiaFont = localStorage.getItem('dyslexiaFont') === 'true';
    
    if (fontSize > 1) {
        document.body.classList.add('large-text');
    }
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }
    if (isDyslexiaFont) {
        document.body.classList.add('dyslexia-font');
    }
}

function loadAccessibilityPreferences() {
    // Already handled in initializeAccessibility
}

function toggleFontSize() {
    fontSize = fontSize >= 1.3 ? 1 : fontSize + 0.1;
    document.body.style.fontSize = fontSize + 'em';
    localStorage.setItem('fontSize', fontSize);
    
    if (fontSize > 1) {
        document.body.classList.add('large-text');
        showToast('Font size increased');
    } else {
        document.body.classList.remove('large-text');
        showToast('Font size reset');
    }
}

function toggleContrast() {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    showToast(isHighContrast ? 'High contrast enabled' : 'High contrast disabled');
}

function toggleDyslexiaFont() {
    isDyslexiaFont = !isDyslexiaFont;
    document.body.classList.toggle('dyslexia-font');
    localStorage.setItem('dyslexiaFont', isDyslexiaFont);
    showToast(isDyslexiaFont ? 'Dyslexia-friendly font enabled' : 'Dyslexia-friendly font disabled');
}

function readPage() {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.getElementById('langSelect').value || 'en';
    speechSynthesis.speak(utterance);
    showToast('Reading page content...');
}

// ============================================
// TEXT-TO-SPEECH
// ============================================

function playTTS(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.getElementById('langSelect').value || 'en';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

// ============================================
// COURSES DATA
// ============================================

const coursesData = [
    // Basic Foundations
    { id: 1, title: 'Basic Literacy', category: 'basics', difficulty: 'beginner', description: 'Learn reading and writing fundamentals', duration: '4 weeks' },
    { id: 2, title: 'Basic Numeracy', category: 'basics', difficulty: 'beginner', description: 'Fundamental numbers and counting', duration: '4 weeks' },
    { id: 3, title: 'Life Skills', category: 'basics', difficulty: 'beginner', description: 'Essential skills for daily life', duration: '6 weeks' },
    
    // Mathematics
    { id: 4, title: 'Math Basics', category: 'math', difficulty: 'beginner', description: 'Grades 1-8 mathematics', duration: '8 weeks' },
    { id: 5, title: 'Algebra', category: 'math', difficulty: 'intermediate', description: 'Introduction to algebra', duration: '10 weeks' },
    { id: 6, title: 'Geometry', category: 'math', difficulty: 'intermediate', description: 'Shapes and measurements', duration: '8 weeks' },
    
    // Science
    { id: 7, title: 'Physics', category: 'science', difficulty: 'intermediate', description: 'Basic physics concepts', duration: '10 weeks' },
    { id: 8, title: 'Chemistry', category: 'science', difficulty: 'intermediate', description: 'Introduction to chemistry', duration: '10 weeks' },
    { id: 9, title: 'Biology', category: 'science', difficulty: 'intermediate', description: 'Life sciences basics', duration: '10 weeks' },
    
    // Languages
    { id: 10, title: 'English', category: 'language', difficulty: 'beginner', description: 'English language basics', duration: '12 weeks' },
    { id: 11, title: 'Hindi', category: 'language', difficulty: 'beginner', description: 'Hindi language basics', duration: '12 weeks' },
    { id: 12, title: 'Tamil', category: 'language', difficulty: 'beginner', description: 'Tamil language basics', duration: '12 weeks' },
    { id: 13, title: 'Telugu', category: 'language', difficulty: 'beginner', description: 'Telugu language basics', duration: '12 weeks' },
    
    // Rural Skills
    { id: 14, title: 'Sustainable Farming', category: 'rural', difficulty: 'intermediate', description: 'Modern agricultural techniques', duration: '8 weeks' },
    { id: 15, title: 'Animal Husbandry', category: 'rural', difficulty: 'intermediate', description: 'Livestock management', duration: '6 weeks' },
    { id: 16, title: 'Organic Farming', category: 'rural', difficulty: 'intermediate', description: 'Organic cultivation methods', duration: '8 weeks' },
    
    // Programming
    { id: 17, title: 'Python', category: 'programming', difficulty: 'beginner', description: 'Introduction to Python', duration: '12 weeks' },
    { id: 18, title: 'Java', category: 'programming', difficulty: 'intermediate', description: 'Java programming basics', duration: '14 weeks' },
    { id: 19, title: 'HTML & CSS', category: 'programming', difficulty: 'beginner', description: 'Web development basics', duration: '8 weeks' },
    { id: 20, title: 'JavaScript', category: 'programming', difficulty: 'intermediate', description: 'Interactive web programming', duration: '10 weeks' },
    
    // Social Studies
    { id: 21, title: 'Social Studies', category: 'social', difficulty: 'beginner', description: 'History and geography basics', duration: '8 weeks' },
    { id: 22, title: 'Indian History', category: 'social', difficulty: 'intermediate', description: 'Indian historical events', duration: '10 weeks' },
    
    // Vocational
    { id: 23, title: 'Carpentry Basics', category: 'vocational', difficulty: 'beginner', description: 'Woodworking fundamentals', duration: '6 weeks' },
    { id: 24, title: 'Tailoring', category: 'vocational', difficulty: 'beginner', description: 'Basic sewing and stitching', duration: '8 weeks' },
    { id: 25, title: 'Handicrafts', category: 'vocational', difficulty: 'beginner', description: 'Traditional craft making', duration: '6 weeks' },
    
    // Health
    { id: 26, title: 'Nutrition Education', category: 'health', difficulty: 'beginner', description: 'Healthy eating habits', duration: '4 weeks' },
    { id: 27, title: 'First Aid', category: 'health', difficulty: 'beginner', description: 'Basic first aid skills', duration: '4 weeks' },
    { id: 28, title: 'Yoga & Fitness', category: 'health', difficulty: 'beginner', description: 'Physical wellness practices', duration: '8 weeks' }
];

// ============================================
// LOAD AND DISPLAY COURSES
// ============================================

function loadCourses() {
    const container = document.getElementById('courseContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = createCourseCard(course);
        container.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 course-item';
    col.setAttribute('data-category', course.category);
    col.setAttribute('data-difficulty', course.difficulty);
    col.setAttribute('data-title', course.title.toLowerCase());
    
    const progressId = `progress-${course.id}`;
    const savedProgress = getProgress(course.title) || 0;
    
    col.innerHTML = `
        <div class="card course-card h-100">
            <div class="card-body">
                <h5 class="card-title">${course.title}</h5>
                <p class="card-text">${course.description}</p>
                <p class="text-muted"><i class="bi bi-clock"></i> ${course.duration}</p>
                <span class="badge bg-secondary">${course.difficulty}</span>
                <div class="progress mb-3 mt-3">
                    <div class="progress-bar bg-success" id="${progressId}" 
                         style="width: ${savedProgress}%" 
                         aria-valuenow="${savedProgress}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">${savedProgress}%</div>
                </div>
                <div class="btn-group-vertical w-100" role="group">
                    <button class="btn btn-success btn-sm" onclick="enrollCourse('${course.title}')">
                        <i class="bi bi-journal-plus"></i> Enroll
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="playTTS('${course.title}')">
                        <i class="bi bi-volume-up"></i> Listen
                    </button>
                    <button class="btn btn-info btn-sm" onclick="startQuiz('${course.title}')">
                        <i class="bi bi-clipboard-check"></i> Take Quiz
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="downloadCourse('${course.title}')">
                        <i class="bi bi-download"></i> Download PDF
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="shareWhatsApp('${course.title}')">
                        <i class="bi bi-whatsapp"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// ============================================
// SEARCH AND FILTER COURSES
// ============================================

function searchCourses() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;
    const difficulty = document.getElementById('difficultySelect').value;
    
    const courses = document.getElementsByClassName('course-item');
    
    Array.from(courses).forEach(course => {
        const title = course.getAttribute('data-title');
        const courseCategory = course.getAttribute('data-category');
        const courseDifficulty = course.getAttribute('data-difficulty');
        
        const matchesSearch = title.includes(searchInput);
        const matchesCategory = category === 'all' || courseCategory === category;
        const matchesDifficulty = difficulty === 'all' || courseDifficulty === difficulty;
        
        if (matchesSearch && matchesCategory && matchesDifficulty) {
            course.style.display = '';
        } else {
            course.style.display = 'none';
        }
    });
}

function filterCourses() {
    searchCourses();
}

// ============================================
// COURSE ENROLLMENT
// ============================================

function enrollCourse(courseName) {
    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    if (!enrolledCourses.includes(courseName)) {
        enrolledCourses.push(courseName);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        updateEnrolledList();
        addPoints(10);
        showToast(`Successfully enrolled in ${courseName}!`);
        saveProgress(courseName, 0);
    } else {
        showToast(`You are already enrolled in ${courseName}`);
    }
}

function updateEnrolledList() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const enrolledList = document.getElementById('enrolledList');
    
    if (!enrolledList) return;
    
    enrolledList.innerHTML = '';
    
    if (enrolledCourses.length === 0) {
        enrolledList.innerHTML = '<li class="list-group-item">No courses enrolled yet</li>';
        return;
    }
    
    enrolledCourses.forEach(course => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${course}
            <button class="btn btn-sm btn-primary" onclick="continueCourse('${course}')">
                <i class="bi bi-play-circle"></i>
            </button>
        `;
        enrolledList.appendChild(li);
    });
}

function continueCourse(courseName) {
    showToast(`Continuing ${courseName}...`);
    // Implement course continuation logic
}

// ============================================
// PROGRESS TRACKING
// ============================================

function saveProgress(courseName, progress) {
    let progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    progressData[courseName] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(progressData));
    updateProgressBar(courseName, progress);
    updateOverallProgress();
}

function getProgress(courseName) {
    const progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    return progressData[courseName] || 0;
}

function updateProgressBar(courseName, progress) {
    const course = coursesData.find(c => c.title === courseName);
    if (!course) return;
    
    const progressBar = document.getElementById(`progress-${course.id}`);
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        progressBar.textContent = `${progress}%`;
    }
}

function loadProgress() {
    const progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    for (let courseName in progressData) {
        updateProgressBar(courseName, progressData[courseName]);
    }
}

function updateOverallProgress() {
    const progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const courses = Object.values(progressData);
    const overall = courses.length ? 
        Math.round(courses.reduce((a, b) => a + b, 0) / courses.length) : 0;
    
    const progressElement = document.getElementById('progress');
    if (progressElement) {
        progressElement.textContent = `${overall}%`;
    }
}

// ============================================
// GAMIFICATION
// ============================================

function addPoints(points) {
    let currentPoints = parseInt(localStorage.getItem('points') || '0');
    currentPoints += points;
    localStorage.setItem('points', currentPoints);
    
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
        pointsElement.textContent = currentPoints;
    }
    
    checkBadges(currentPoints);
    updateLevel(currentPoints);
}

function checkBadges(points) {
    let badges = parseInt(localStorage.getItem('badges') || '0');
    
    if (points >= 500 && badges < 5) {
        badges = 5;
        showToast('🎉 Congratulations! You earned the Gold Badge!');
    } else if (points >= 200 && badges < 4) {
        badges = 4;
        showToast('🎉 Congratulations! You earned the Silver Badge!');
    } else if (points >= 100 && badges < 3) {
        badges = 3;
        showToast('🎉 Congratulations! You earned the Bronze Badge!');
    }
    
    localStorage.setItem('badges', badges);
    const badgesElement = document.getElementById('badges');
    if (badgesElement) {
        badgesElement.textContent = badges;
    }
}

function updateLevel(points) {
    const level = Math.floor(points / 100) + 1;
    localStorage.setItem('level', level);
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let streak = parseInt(localStorage.getItem('streak') || '0');
    
    if (lastVisit !== today) {
        const lastDate = new Date(lastVisit);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            streak++;
        } else if (diffDays > 1) {
            streak = 1;
        }
        
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastVisit', today);
    }
    
    const streakElement = document.getElementById('streak');
    if (streakElement) {
        streakElement.textContent = streak;
    }
}

// ============================================
// DOWNLOAD COURSE
// ============================================

function downloadCourse(courseName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(`Course: ${courseName}`, 20, 20);
    
    // Add content
    doc.setFontSize(12);
    doc.text('This is a comprehensive course material for offline learning.', 20, 40);
    doc.text('Content includes:', 20, 50);
    doc.text('- Detailed lessons and explanations', 20, 60);
    doc.text('- Practice exercises and worksheets', 20, 70);
    doc.text('- Quiz questions for self-assessment', 20, 80);
    doc.text('- Additional resources and references', 20, 90);
    
    // Add footer
    doc.setFontSize(10);
    doc.text('RuralEd Hub - Free Education for All', 20, 280);
    
    // Save the PDF
    doc.save(`${courseName.replace(/\s+/g, '_')}_Course.pdf`);
    
    addPoints(5);
    showToast(`Downloaded ${courseName} course material`);
}

// ============================================
// QUIZ FUNCTIONALITY
// ============================================

const quizQuestions = {
    'Basic Literacy': [
        { question: 'What is the first letter of the alphabet?', options: ['A', 'B', 'C', 'D'], correct: 0 },
        { question: 'How many vowels are there in English?', options: ['3', '4', '5', '6'], correct: 2 },
        { question: 'Which word starts with "B"?', options: ['Apple', 'Ball', 'Cat', 'Dog'], correct: 1 }
    ],
    'Basic Numeracy': [
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
        { question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correct: 1 },
        { question: 'What is 3 × 3?', options: ['6', '9', '12', '15'], correct: 1 }
    ],
    'Math Basics': [
        { question: 'What is 15 + 25?', options: ['30', '35', '40', '45'], correct: 2 },
        { question: 'What is 10 × 5?', options: ['45', '50', '55', '60'], correct: 1 },
        { question: 'What is 100 ÷ 4?', options: ['20', '25', '30', '35'], correct: 1 }
    ]
};

let currentQuiz = [];
let currentQuizName = '';

function startQuiz(courseName) {
    currentQuizName = courseName;
    currentQuiz = quizQuestions[courseName] || [
        { question: `Sample question for ${courseName}`, options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 0 }
    ];
    
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    document.getElementById('quizTitle').textContent = `${courseName} Quiz`;
    
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';
    
    currentQuiz.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-4';
        questionDiv.innerHTML = `
            <p class="fw-bold">${index + 1}. ${q.question}</p>
            ${q.options.map((opt, optIndex) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" id="q${index}opt${optIndex}" value="${optIndex}">
                    <label class="form-check-label" for="q${index}opt${optIndex}">
                        ${opt}
                    </label>
                </div>
            `).join('')}
        `;
        quizContent.appendChild(questionDiv);
    });
    
    modal.show();
}

function submitQuiz() {
    let score = 0;
    
    currentQuiz.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
    modal.hide();
    
    addPoints(percentage >= 70 ? 50 : 20);
    showToast(`Quiz completed! Score: ${score}/${currentQuiz.length} (${percentage}%)`);
    
    saveProgress(currentQuizName, Math.min(getProgress(currentQuizName) + 10, 100));
    updateQuizResults(currentQuizName, percentage);
}

function updateQuizResults(courseName, score) {
    const quizResults = document.getElementById('quizResults');
    if (!quizResults) return;
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${courseName}
        <span class="badge ${score >= 70 ? 'bg-success' : 'bg-warning'} rounded-pill">${score}%</span>
    `;
    quizResults.appendChild(li);
}

// ============================================
// FILE UPLOAD
// ============================================

function uploadFile(type) {
    const input = document.getElementById(`${type}Upload`);
    if (!input || !input.files.length) {
        showToast(`Please select a ${type} file to upload`);
        return;
    }
    
    const uploadedContent = document.getElementById('uploadedContent');
    const fileName = input.files[0].name;
    const fileSize = (input.files[0].size / 1024).toFixed(2);
    
    const div = document.createElement('div');
    div.className = 'alert alert-success alert-dismissible fade show';
    div.innerHTML = `
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${fileName} (${fileSize} KB)
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    uploadedContent.appendChild(div);
    
    // Update uploads count
    const uploadsCount = document.getElementById('uploads');
    if (uploadsCount) {
        const current = parseInt(uploadsCount.textContent.replace('+', ''));
        uploadsCount.textContent = `${current + 1}+`;
    }
    
    addPoints(50);
    showToast(`Uploaded ${type}! Earned 50 points.`);
    input.value = '';
}

// ============================================
// AUDIO RECORDING
// ============================================

let mediaRecorder;
let audioChunks = [];

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            
            document.getElementById('recordBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
            
            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });
            
            showToast('Recording started...');
        })
        .catch(error => {
            showToast('Microphone access denied');
            console.error('Error accessing microphone:', error);
        });
}

function stopRecording() {
    mediaRecorder.stop();document.getElementById('recordBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    
    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const uploadedContent = document.getElementById('uploadedContent');
        const div = document.createElement('div');
        div.className = 'alert alert-info alert-dismissible fade show';
        div.innerHTML = `
            <strong>Audio Recording:</strong> 
            <audio controls src="${audioUrl}" class="w-100 mt-2"></audio>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        uploadedContent.appendChild(div);
        
        audioChunks = [];
        addPoints(30);
        showToast('Recording saved successfully!');
    });
}

// ============================================
// FORUM FUNCTIONALITY
// ============================================

function postToForum() {
    const input = document.getElementById('forumInput');
    if (!input || !input.value.trim()) {
        showToast('Please enter a topic');
        return;
    }
    
    const forumList = document.getElementById('forumList');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <strong>You:</strong> ${input.value}
        <small class="text-muted float-end">${new Date().toLocaleTimeString()}</small>
        <button class="btn btn-sm btn-outline-primary float-end me-2" onclick="replyToForum('${input.value}')">
            Reply
        </button>
    `;
    forumList.appendChild(li);
    
    input.value = '';
    addPoints(5);
    showToast('Posted to forum!');
}

function replyToForum(topic) {
    const forumList = document.getElementById('forumList');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <strong>Your Reply:</strong> Re: ${topic}
        <small class="text-muted">Posted just now</small>
    `;
    forumList.appendChild(li);
    
    addPoints(5);
    showToast('Reply posted to forum!');
}

// ============================================
// SOCIAL SHARING
// ============================================

function shareWhatsApp(course) {
    const text = encodeURIComponent(`Check out this course: ${course} on RuralEd Hub! Free education for all!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    addPoints(5);
}

function shareInstagram(course) {
    showToast('Opening Instagram...');
    window.open('https://www.instagram.com/', '_blank');
}

function shareTwitter(course) {
    const text = encodeURIComponent(`Learning ${course} on RuralEd Hub! Free education for a brighter future!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    addPoints(5);
}

// ============================================
// ASSESSMENT SYSTEM
// ============================================

function takeAssessment() {
    const modal = new bootstrap.Modal(document.getElementById('assessmentModal'));
    document.getElementById('assessmentContent').innerHTML = `
        <h5>Select Your Assessment Level</h5>
        <p>This will help us recommend the right courses for you.</p>
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card assessment-card" onclick="startAssessment('basic')">
                    <div class="card-body text-center">
                        <i class="bi bi-1-circle-fill" style="font-size: 3rem; color: #28a745;"></i>
                        <h5 class="mt-3">Basic Level</h5>
                        <p>New to learning</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card assessment-card" onclick="startAssessment('intermediate')">
                    <div class="card-body text-center">
                        <i class="bi bi-2-circle-fill" style="font-size: 3rem; color: #ffc107;"></i>
                        <h5 class="mt-3">Intermediate</h5>
                        <p>Some prior knowledge</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card assessment-card" onclick="startAssessment('advanced')">
                    <div class="card-body text-center">
                        <i class="bi bi-3-circle-fill" style="font-size: 3rem; color: #dc3545;"></i>
                        <h5 class="mt-3">Advanced</h5>
                        <p>Strong foundation</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    modal.show();
}

function startAssessment(level) {
    const assessmentContent = document.getElementById('assessmentContent');
    
    const questions = {
        basic: [
            { question: 'Can you read simple sentences?', type: 'yesno' },
            { question: 'Can you count from 1 to 100?', type: 'yesno' },
            { question: 'Do you know basic addition and subtraction?', type: 'yesno' }
        ],
        intermediate: [
            { question: 'Can you solve basic algebra problems?', type: 'yesno' },
            { question: 'Do you understand grammar rules?', type: 'yesno' },
            { question: 'Can you write essays or paragraphs?', type: 'yesno' }
        ],
        advanced: [
            { question: 'Can you solve complex mathematical problems?', type: 'yesno' },
            { question: 'Do you have experience with any programming language?', type: 'yesno' },
            { question: 'Can you analyze and interpret data?', type: 'yesno' }
        ]
    };
    
    const selectedQuestions = questions[level] || questions.basic;
    
    assessmentContent.innerHTML = `
        <h5>${level.charAt(0).toUpperCase() + level.slice(1)} Level Assessment</h5>
        <p>Answer these questions to help us understand your current level.</p>
        <form id="assessmentForm">
            ${selectedQuestions.map((q, index) => `
                <div class="mb-4">
                    <p class="fw-bold">${index + 1}. ${q.question}</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="q${index}" value="yes" id="q${index}yes" required>
                        <label class="form-check-label" for="q${index}yes">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="q${index}" value="no" id="q${index}no">
                        <label class="form-check-label" for="q${index}no">No</label>
                    </div>
                </div>
            `).join('')}
        </form>
    `;
}

function submitAssessment() {
    const form = document.getElementById('assessmentForm');
    if (!form) {
        showToast('Please select an assessment level first');
        return;
    }
    
    const formData = new FormData(form);
    let yesCount = 0;
    
    for (let value of formData.values()) {
        if (value === 'yes') yesCount++;
    }
    
    const total = formData.size / 2; // Each question has 2 radio buttons
    const percentage = Math.round((yesCount / total) * 100);
    
    let recommendation = '';
    if (percentage >= 70) {
        recommendation = 'You have a strong foundation! We recommend intermediate to advanced courses.';
    } else if (percentage >= 40) {
        recommendation = 'You have basic knowledge! We recommend starting with beginner to intermediate courses.';
    } else {
        recommendation = 'We recommend starting with foundational courses to build your skills.';
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('assessmentModal'));
    modal.hide();
    
    const resultsDiv = document.getElementById('assessmentResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="alert alert-success">
                <h6><i class="bi bi-check-circle"></i> Assessment Complete!</h6>
                <p><strong>Score:</strong> ${yesCount}/${total} (${percentage}%)</p>
                <p><strong>Recommendation:</strong> ${recommendation}</p>
                <button class="btn btn-primary btn-sm" onclick="viewRecommendedCourses(${percentage})">
                    View Recommended Courses
                </button>
            </div>
        `;
    }
    
    addPoints(30);
    showToast('Assessment completed successfully!');
}

function viewRecommendedCourses(score) {
    let difficulty = score >= 70 ? 'intermediate' : score >= 40 ? 'beginner' : 'beginner';
    document.getElementById('difficultySelect').value = difficulty;
    filterCourses();
    
    // Scroll to courses section
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// LIBRARY FUNCTIONALITY
// ============================================

const libraryData = {
    ebooks: [
        { title: 'Mathematics for Beginners', author: 'Dr. Ramesh Kumar', pages: 250 },
        { title: 'Science Fundamentals', author: 'Prof. Meera Patel', pages: 300 },
        { title: 'English Grammar Guide', author: 'Sanjay Sharma', pages: 180 },
        { title: 'Indian History', author: 'Dr. Anita Singh', pages: 400 },
        { title: 'Computer Basics', author: 'Rajesh Verma', pages: 220 }
    ],
    videos: [
        { title: 'Introduction to Algebra', duration: '45 mins', subject: 'Mathematics' },
        { title: 'Physics Experiments', duration: '30 mins', subject: 'Science' },
        { title: 'English Speaking Skills', duration: '1 hour', subject: 'Language' },
        { title: 'Computer Programming Basics', duration: '1.5 hours', subject: 'Technology' }
    ],
    worksheets: [
        { title: 'Math Practice Sheet - Grade 5', pages: 10 },
        { title: 'English Grammar Exercises', pages: 8 },
        { title: 'Science Quiz Questions', pages: 6 },
        { title: 'Social Studies Worksheets', pages: 12 }
    ],
    exams: [
        { title: '10th Standard Math Paper 2023', year: 2023 },
        { title: '12th Standard Physics Paper 2023', year: 2023 },
        { title: 'English Model Paper - Secondary', year: 2024 },
        { title: 'Science Question Bank', year: 2024 }
    ]
};

function openLibrarySection(section) {
    const modal = new bootstrap.Modal(document.getElementById('libraryModal'));
    const libraryContent = document.getElementById('libraryContent');
    const libraryTitle = document.getElementById('libraryTitle');
    
    const sectionTitles = {
        ebooks: 'E-Books',
        videos: 'Video Lessons',
        worksheets: 'Worksheets',
        exams: 'Past Exam Papers'
    };
    
    libraryTitle.textContent = sectionTitles[section];
    
    const data = libraryData[section] || [];
    
    libraryContent.innerHTML = `
        <div class="row">
            ${data.map((item, index) => `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h6>${item.title}</h6>
                            ${item.author ? `<p class="text-muted mb-1"><i class="bi bi-person"></i> ${item.author}</p>` : ''}
                            ${item.pages ? `<p class="text-muted mb-1"><i class="bi bi-file-text"></i> ${item.pages} pages</p>` : ''}
                            ${item.duration ? `<p class="text-muted mb-1"><i class="bi bi-clock"></i> ${item.duration}</p>` : ''}
                            ${item.subject ? `<p class="text-muted mb-1"><i class="bi bi-bookmark"></i> ${item.subject}</p>` : ''}
                            ${item.year ? `<p class="text-muted mb-1"><i class="bi bi-calendar"></i> ${item.year}</p>` : ''}
                            <button class="btn btn-sm btn-primary" onclick="downloadLibraryItem('${item.title}', '${section}')">
                                <i class="bi bi-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.show();
}

function downloadLibraryItem(title, type) {
    showToast(`Downloading ${title}...`);
    addPoints(10);
    
    // Simulate download
    setTimeout(() => {
        showToast(`${title} downloaded successfully!`);
    }, 1500);
}

// ============================================
// MENTORSHIP FUNCTIONALITY
// ============================================

function findMentor() {
    const modal = new bootstrap.Modal(document.getElementById('mentorModal'));
    modal.show();
}

function connectMentor(mentorName) {
    showToast(`Connection request sent to ${mentorName}!`);
    addPoints(15);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('mentorModal'));
    modal.hide();
}

function joinStudyGroup() {
    showToast('Study Group feature coming soon! You can create or join groups for collaborative learning.');
}

function peerTutoring() {
    showToast('Peer Tutoring feature coming soon! Help others and learn together.');
}

function careerGuidance() {
    showToast('Career Guidance feature coming soon! Get expert advice on your career path.');
}

// ============================================
// PARENT COMMUNITY
// ============================================

function joinParentForum() {
    showToast('Welcome to the Parent Community! Connect with other parents.');
    addPoints(10);
}

function viewParentResources() {
    showToast('Loading parent resources...');
    // Implement resource viewing logic
}

function viewSuccessStories() {
    showToast('Loading success stories...');
    // Implement success stories display
}

// ============================================
// TEACHER DASHBOARD
// ============================================

function createLesson() {
    showToast('Lesson created successfully!');
    addPoints(50);
}

let questionCount = 0;

function addQuestion() {
    questionCount++;
    const questionsDiv = document.getElementById('quizQuestions');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'card mb-3';
    questionDiv.innerHTML = `
        <div class="card-body">
            <h6>Question ${questionCount}</h6>
            <input type="text" class="form-control mb-2" placeholder="Enter question">
            <input type="text" class="form-control mb-2" placeholder="Option 1">
            <input type="text" class="form-control mb-2" placeholder="Option 2">
            <input type="text" class="form-control mb-2" placeholder="Option 3">
            <input type="text" class="form-control mb-2" placeholder="Option 4">
            <select class="form-select">
                <option>Select correct answer</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
            </select>
        </div>
    `;
    questionsDiv.appendChild(questionDiv);
}

function saveQuiz() {
    showToast('Quiz saved successfully!');
    addPoints(40);
}

function createAssignment() {
    showToast('Assignment created successfully!');
    addPoints(30);
}

// ============================================
// HEALTH & WELLNESS
// ============================================

function openHealthModule(module) {
    const modules = {
        nutrition: 'Nutrition Education: Learn about balanced diet, food groups, and healthy eating habits.',
        fitness: 'Physical Fitness: Discover exercise routines, yoga poses, and sports activities.',
        mental: 'Mental Health: Understand stress management, emotional wellness, and mindfulness techniques.'
    };
    
    showToast(modules[module]);
    addPoints(10);
}

// ============================================
// CERTIFICATE GENERATION
// ============================================

function downloadCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    
    // Certificate border
    doc.setLineWidth(5);
    doc.setDrawColor(40, 167, 69);
    doc.rect(10, 10, 277, 190);
    
    // Certificate content
    doc.setFontSize(40);
    doc.setTextColor(40, 167, 69);
    doc.text('Certificate of Achievement', 148, 50, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', 148, 80, { align: 'center' });
    
    doc.setFontSize(30);
    doc.setTextColor(40, 167, 69);
    doc.text('Student Name', 148, 110, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully completed the course requirements', 148, 130, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text('RuralEd Hub Learning Platform', 148, 150, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 148, 170, { align: 'center' });
    
    doc.save('RuralEd_Certificate.pdf');
    
    addPoints(100);
    showToast('Certificate downloaded successfully!');
}

// ============================================
// DASHBOARD UPDATE
// ============================================

function updateDashboard() {
    updateEnrolledList();
    updateOverallProgress();
    
    // Update stats
    const points = localStorage.getItem('points') || '0';
    const badges = localStorage.getItem('badges') || '0';
    
    if (document.getElementById('points')) {
        document.getElementById('points').textContent = points;
    }
    if (document.getElementById('badges')) {
        document.getElementById('badges').textContent = badges;
    }
    
    // Update analytics
    updateLearningAnalytics();
}

function updateLearningAnalytics() {
    const strengthsList = document.getElementById('strengthsList');
    const improvementList = document.getElementById('improvementList');
    
    if (strengthsList) {
        strengthsList.innerHTML = `
            <li>Mathematics - 85% average</li>
            <li>Science - 80% average</li>
            <li>Regular learning streak</li>
        `;
    }
    
    if (improvementList) {
        improvementList.innerHTML = `
            <li>English Grammar - Practice more</li>
            <li>Programming - Complete exercises</li>
            <li>Time management - Set daily goals</li>
        `;
    }
    
    // Update certificate progress
    updateCertificateProgress();
}

function updateCertificateProgress() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const progress1 = Math.min((enrolledCourses.length / 5) * 100, 100);
    
    const cert1 = document.getElementById('certProgress1');
    if (cert1) {
        cert1.style.width = `${progress1}%`;
    }
    
    const points = parseInt(localStorage.getItem('points') || '0');
    const quizResults = document.getElementById('quizResults');
    const quizCount = quizResults ? quizResults.children.length : 0;
    const progress2 = Math.min((quizCount / 10) * 100, 100);
    
    const cert2 = document.getElementById('certProgress2');
    if (cert2) {
        cert2.style.width = `${progress2}%`;
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message) {
    const toastElement = document.getElementById('mainToast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Close navbar on mobile after clicking link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function resetAllData() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

function exportProgress() {
    const data = {
        enrolledCourses: localStorage.getItem('enrolledCourses'),
        courseProgress: localStorage.getItem('courseProgress'),
        points: localStorage.getItem('points'),
        badges: localStorage.getItem('badges'),
        streak: localStorage.getItem('streak')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ruraled_progress.json';
    link.click();
    
    showToast('Progress data exported successfully!');
}

function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                Object.keys(data).forEach(key => {
                    if (data[key]) {
                        localStorage.setItem(key, data[key]);
                    }
                });
                location.reload();
            } catch (error) {
                showToast('Error importing data. Please check the file format.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Alt + D: Toggle dark mode
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Alt + S: Focus search
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
    }
    
    // Alt + H: Go to home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape: Close all modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
});

// ============================================
// SERVICE WORKER FOR OFFLINE SUPPORT
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cRuralEd Hub - Education Platform', 'color: #28a745; font-size: 24px; font-weight: bold;');
console.log('%cEmpowering rural education through technology', 'color: #666; font-size: 14px;');
console.log('%cKeyboard Shortcuts:', 'color: #333; font-size: 16px; font-weight: bold; margin-top: 10px;');
console.log('Alt + D: Toggle Dark Mode');
console.log('Alt + S: Focus Search');
console.log('Alt + H: Go to Home');
console.log('Esc: Close Modals');

// ============================================
// END OF SCRIPT
// ============================================
