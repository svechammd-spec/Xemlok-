// Sidebar button functionality
document.addEventListener('DOMContentLoaded', () => {
    const analyseBtn = document.getElementById('analyseBtn');
    const askAiBtn = document.getElementById('askAiBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const roadmapBtn = document.getElementById('roadmapBtn');
    
    const analyseContent = document.getElementById('analyseContent');
    const askAiContent = document.getElementById('askAiContent');
    const aboutContent1 = document.getElementById('aboutContent1');
    const aboutContent2 = document.getElementById('aboutContent2');
    const aboutContent3 = document.getElementById('aboutContent3');
    const roadmapContent = document.getElementById('roadmapContent');
    
    const buttons = [analyseBtn, askAiBtn, roadmapBtn];
    const contents = [analyseContent, askAiContent, aboutContent1, aboutContent2, aboutContent3, roadmapContent];
    
    // Sidebar dropdown functionality
    const dropdownParent = document.querySelector('.sidebar-dropdown-parent');
    const dropdownItems = document.querySelectorAll('.sidebar-dropdown-item');
    
    if (aboutBtn && dropdownParent) {
        aboutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownParent.classList.toggle('active');
        });
        
        // Handle dropdown item clicks
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const aboutNumber = item.getAttribute('data-about');
                
                // Hide all content sections
                contents.forEach(content => content.classList.add('hidden'));
                
                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Show the specific about content based on data-about attribute
                const aboutContentToShow = document.getElementById(`aboutContent${aboutNumber}`);
                if (aboutContentToShow) {
                    aboutContentToShow.classList.remove('hidden');
                }
                
                // Close dropdown
                dropdownParent.classList.remove('active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownParent.contains(e.target)) {
                dropdownParent.classList.remove('active');
            }
        });
    }
    
    function switchContent(activeIndex) {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all content sections
        contents.forEach(content => content.classList.add('hidden'));
        
        // Show selected content and activate button
        buttons[activeIndex].classList.add('active');
        contents[activeIndex].classList.remove('hidden');
    }
    
    analyseBtn.addEventListener('click', () => switchContent(0));
    askAiBtn.addEventListener('click', () => switchContent(1));
    roadmapBtn.addEventListener('click', () => switchContent(2));
    
    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    // AI responses database
    const aiResponses = {
        'what is xemlok': 'Xemlok is an advanced cryptocurrency analysis platform that helps you make informed decisions about token investments.',
        'how does it work': 'Xemlok analyzes token contracts, liquidity locks, holder distribution, and risk factors to provide comprehensive security assessments.',
        'is it safe': 'Yes! Xemlok uses advanced algorithms to detect potential scams, rug pulls, and security vulnerabilities in token contracts.',
        'price': 'Xemlok offers both free and premium plans. The basic analysis is free, while advanced features are available with our premium subscription.',
        'features': 'Xemlok provides liquidity analysis, contract verification, risk scoring, holder distribution analysis, and AI-powered insights.',
        'tokens': 'Xemlok supports analysis for tokens on multiple blockchains including Ethereum, BSC, Polygon, and more.',
        'help': 'I can help you understand Xemlok\'s features, how to analyze tokens, risk assessment, and answer any questions about our platform!',
        'default': 'That\'s a great question! Xemlok is designed to provide comprehensive token analysis and security insights. Feel free to ask about our features, how we analyze tokens, or anything else about the platform!'
    };
    
    function getAiResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(aiResponses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return aiResponses['default'];
    }
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const profileDiv = document.createElement('div');
        profileDiv.className = 'message-profile';
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'profile-icon';
        
        if (isUser) {
            iconDiv.textContent = 'You';
        } else {
            const aiImg = document.createElement('img');
            aiImg.src = 'x-logo.png';
            aiImg.alt = 'AI';
            aiImg.className = 'ai-avatar-img';
            iconDiv.appendChild(aiImg);
        }
        
        profileDiv.appendChild(iconDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        textP.textContent = text;
        
        contentDiv.appendChild(textP);
        
        if (isUser) {
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(profileDiv);
        } else {
            messageDiv.appendChild(profileDiv);
            messageDiv.appendChild(contentDiv);
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message === '') return;
        
        // Add user message
        addMessage(message, true);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI thinking delay
        setTimeout(() => {
            const aiResponse = getAiResponse(message);
            addMessage(aiResponse, false);
        }, 500);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Token Analysis functionality
    const tokenSearch = document.querySelector('.token-search');
    const analyzeBtn = document.querySelector('.btn-search');
    const analysisResults = document.getElementById('analysisResults');
    let priceChart = null;
    
    console.log('Setting up token analysis...');
    console.log('Token search:', tokenSearch);
    console.log('Analyze button:', analyzeBtn);
    console.log('Analysis results:', analysisResults);
    
    if (!tokenSearch || !analyzeBtn || !analysisResults) {
        console.error('Required elements not found! Check if you are on the analyse.html page.');
        // Don't return - just skip setting up token analysis
    } else {
    
    const recommendations = [
        {
            type: 'safe',
            icon: '✓',
            title: 'Safe to Buy',
            text: 'Based on our comprehensive analysis, this token demonstrates strong security measures and positive market indicators. The smart contract has been verified, liquidity is properly locked, and holder distribution appears healthy. This coin has a big upside potential.',
            contractVerified: '✓ Yes',
            riskScore: 'Low',
            chartData: [75, 15, 10]
        },
        {
            type: 'safe',
            icon: '✓',
            title: 'Safe to Buy',
            text: 'Based on our comprehensive analysis, this token demonstrates strong security measures and positive market indicators. The smart contract has been verified, liquidity is properly locked, and holder distribution appears healthy. This coin has a big upside potential.',
            contractVerified: '✓ Yes',
            riskScore: 'Very Low',
            chartData: [85, 10, 5]
        },
        {
            type: 'warning',
            icon: '⚠',
            title: 'Proceed with Caution',
            text: 'Several moderate risk factors have been identified during our analysis. While not critically dangerous, these signals warrant additional scrutiny. The contract contains some unusual functions that could potentially be exploited.',
            contractVerified: '✗ No',
            riskScore: 'Medium',
            chartData: [50, 35, 15]
        },
        {
            type: 'warning',
            icon: '⚠',
            title: 'Moderate Risk',
            text: 'Mixed signals detected in our comprehensive token evaluation. The project shows both positive and concerning attributes. Contract verification is present but wallet distribution raises questions about potential insider control.',
            contractVerified: '✓ Yes',
            riskScore: 'Medium',
            chartData: [45, 40, 15]
        },
        {
            type: 'danger',
            icon: '✗',
            title: 'High Risk - Not Recommended',
            text: 'Multiple critical red flags detected in our security audit. This token exhibits characteristics commonly associated with potential scams and rug pulls. The smart contract contains hidden ownership functions, liquidity is not properly locked.',
            contractVerified: '✗ No',
            riskScore: 'High',
            chartData: [20, 30, 50]
        },
        {
            type: 'danger',
            icon: '✗',
            title: 'High Risk - Not Recommended',
            text: 'Multiple critical red flags detected in our security audit. This token exhibits characteristics commonly associated with potential scams and rug pulls. The smart contract contains hidden ownership functions, liquidity is not properly locked.',
            contractVerified: '✗ No',
            riskScore: 'Critical',
            chartData: [10, 25, 65]
        }
    ];
    
    
    function analyzeToken() {
        console.log('analyzeToken function called');
        const tokenAddress = tokenSearch.value.trim();
        console.log('Token address length:', tokenAddress.length);
        
        // Validate token address length (must be at least 44 characters)
        if (!tokenAddress || tokenAddress.length < 44) {
            alert('Wrong CA address. This is a wrong contract address of the token.');
            console.log('Validation failed - address too short');
            return; // Stop execution here
        }
        
        console.log('Validation passed - proceeding with analysis');
        
        // Get random recommendation
        const randomIndex = Math.floor(Math.random() * recommendations.length);
        const recommendation = recommendations[randomIndex];
        
        console.log('Recommendation:', recommendation);
        
        // Update icon - use Lottie animations for all recommendation types
        const iconElement = document.getElementById('recommendationIcon');
        console.log('Icon element:', iconElement);
        
        if (iconElement) {
            if (recommendation.type === 'safe') {
                iconElement.innerHTML = `
                    <dotlottie-wc
                        src="https://lottie.host/2bdc44b4-5437-4da3-b7be-82d38819d43d/Obggzx9fKE.lottie"
                        style="width: 105px; height: 105px"
                        autoplay
                        loop
                        speed="0.5"
                    ></dotlottie-wc>
                `;
                // Set up loop with 2 second interval
                const lottieEl = iconElement.querySelector('dotlottie-wc');
                if (lottieEl) {
                    lottieEl.addEventListener('complete', () => {
                        setTimeout(() => {
                            lottieEl.play();
                        }, 2000);
                    });
                }
            } else if (recommendation.type === 'warning' || recommendation.type === 'danger') {
                iconElement.innerHTML = `
                    <dotlottie-wc
                        src="https://lottie.host/685289fb-3cbb-4ebf-a15f-e7ac31092c97/Lz3pm5m8C8.lottie"
                        style="width: 105px; height: 105px"
                        autoplay
                        loop
                        speed="0.5"
                    ></dotlottie-wc>
                `;
                // Set up loop with 2 second interval
                const lottieEl = iconElement.querySelector('dotlottie-wc');
                if (lottieEl) {
                    lottieEl.addEventListener('complete', () => {
                        setTimeout(() => {
                            lottieEl.play();
                        }, 2000);
                    });
                }
            } else {
                iconElement.textContent = recommendation.icon;
            }
        }
        
        // Update text elements
        const titleElement = document.getElementById('recommendationTitle');
        const textElement = document.getElementById('recommendationText');
        
        if (titleElement) titleElement.textContent = recommendation.title;
        if (textElement) textElement.textContent = recommendation.text;
        
        // Show results
        console.log('Showing results...');
        analysisResults.classList.remove('hidden');
        
        // Scroll to results
        analysisResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    if (analyzeBtn) {
        console.log('Adding click event listener to analyze button');
        analyzeBtn.addEventListener('click', (e) => {
            console.log('Analyze button clicked!');
            e.preventDefault();
            analyzeToken();
        });
    } else {
        console.error('Analyze button not found!');
    }
    
    tokenSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            analyzeToken();
        }
    });
    } // Close the else block for token analysis
});
