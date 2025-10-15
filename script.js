// ===== SMOOTH SCROLLING FUNCTION =====
function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== FORM SUBMISSION WITH EMAIL SERVICE =====
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Get form data
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        message: this.querySelector('textarea[name="message"]').value,
        timestamp: new Date().toLocaleString(),
        subject: 'New Contact Form Submission from AARUBY Website'
    };

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';

    try {
        // Method 1: Using EmailJS (Recommended - No backend needed)
        // Sign up at emailjs.com and replace with your service ID and template ID
        await sendViaEmailJS(formData);
        
    } catch (error) {
        console.log('EmailJS error, trying alternative method...');
        // Method 2: Using Formspree (Alternative)
        try {
            await sendViaFormspree(formData);
        } catch (formspreeError) {
            // Method 3: Using Web3Forms (Last resort)
            try {
                await sendViaWeb3Forms(formData);
            } catch (web3Error) {
                handleError(formStatus, submitBtn);
            }
        }
    }
});

// ===== METHOD 1: EMAILJS SERVICE =====
async function sendViaEmailJS(formData) {
    // EmailJS Configuration
    // Step 1: Go to emailjs.com, sign up free
    // Step 2: Create email service (Gmail, Outlook, etc.)
    // Step 3: Create email template
    // Step 4: Copy your IDs below
    
    const SERVICE_ID = 'service_aaruby'; // Replace with your EmailJS Service ID
    const TEMPLATE_ID = 'template_aaruby'; // Replace with your EmailJS Template ID
    const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your EmailJS Public Key
    
    // Load EmailJS library if not already loaded
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => {
            script.onload = resolve;
        });
    }
    
    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);
    
    // Send email
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: 'hello@aaruby.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: formData.timestamp
    });
    
    if (response.status === 200) {
        handleSuccess('Email sent successfully!');
    }
}

// ===== METHOD 2: FORMSPREE SERVICE =====
async function sendViaFormspree(formData) {
    // Formspree Configuration
    // Step 1: Go to formspree.io, sign up free
    // Step 2: Create new form, connect to your email
    // Step 3: Copy your form endpoint below
    
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
        })
    });
    
    if (response.ok) {
        handleSuccess('Message sent successfully!');
    } else {
        throw new Error('Formspree error');
    }
}

// ===== METHOD 3: WEB3FORMS SERVICE =====
async function sendViaWeb3Forms(formData) {
    // Web3Forms Configuration
    // Step 1: Go to web3forms.com, sign up free
    // Step 2: Get your access key
    // Step 3: Replace YOUR_WEB3FORMS_KEY below
    
    const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY'; // Replace with your Web3Forms Access Key
    
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'hello@aaruby.com',
            redirect: window.location.href
        })
    });
    
    const result = await response.json();
    if (result.success) {
        handleSuccess('Message sent successfully!');
    } else {
        throw new Error('Web3Forms error');
    }
}

// ===== SUCCESS HANDLER =====
function handleSuccess(message) {
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('contactForm');
    
    formStatus.textContent = message;
    formStatus.classList.add('success');
    formStatus.classList.remove('error');
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    
    // Reset form
    form.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
    }, 5000);
}

// ===== ERROR HANDLER =====
function handleError(formStatus, submitBtn) {
    formStatus.textContent = 'Error sending message. Please try again or email us directly.';
    formStatus.classList.add('error');
    formStatus.classList.remove('success');
    
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
}

// ===== NAVIGATION ACTIVE STATE =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items for fade-in animation
document.querySelectorAll('.category-card, .feature-item, .cert-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== SMOOTH LINK CLICKS FROM NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target && target !== '#') {
            scrollTo(target.substring(1));
        }
    });
});

// ===== FORM VALIDATION =====
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
});

function validateField(field) {
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.style.borderColor = '#EF4444';
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
    } else if (field.type === 'tel') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (field.value && !phoneRegex.test(field.value)) {
            field.style.borderColor = '#EF4444';
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
    }
}

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ===== COUNTER ANIMATION (Optional) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}