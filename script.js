document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.cyber-link')
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href')
      if (href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 80
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }
    })
  })

  const navbar = document.querySelector('.cyber-nav')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)'
    } else {
      navbar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)'
    }
  })

  const progressBars = document.querySelectorAll('.skill-progress')
  const observerOptions = { threshold: 0.5 }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated')
        const width = entry.target.style.width
        entry.target.style.width = '0%'
        setTimeout(() => {
          entry.target.style.width = width
        }, 100)
      }
    })
  }, observerOptions)

  progressBars.forEach(bar => observer.observe(bar))

  const scrollBtn = document.createElement('button')
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.className = 'scroll-to-top'
  scrollBtn.setAttribute('aria-label', 'Scroll to top')
  document.body.appendChild(scrollBtn)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show')
    } else {
      scrollBtn.classList.remove('show')
    }
  })

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  function showToast(message, type = 'success') {
    const toast = document.createElement('div')
    toast.className = `toast-notification toast-${type}`
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `
    document.body.appendChild(toast)
    
    setTimeout(() => toast.classList.add('show'), 10)
    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }

  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.setAttribute('action', 'https://formsubmit.co/carloagan123@gmail.com')
    contactForm.setAttribute('method', 'POST')
    
    const honeypot = document.createElement('input')
    honeypot.type = 'hidden'
    honeypot.name = '_honey'
    contactForm.appendChild(honeypot)

    const captcha = document.createElement('input')
    captcha.type = 'hidden'
    captcha.name = '_captcha'
    captcha.value = 'false'
    contactForm.appendChild(captcha)

    const redirect = document.createElement('input')
    redirect.type = 'hidden'
    redirect.name = '_next'
    redirect.value = window.location.href
    contactForm.appendChild(redirect)

    const subjectField = document.createElement('input')
    subjectField.type = 'hidden'
    subjectField.name = '_subject'
    subjectField.value = 'New Portfolio Contact Message'
    contactForm.appendChild(subjectField)

    contactForm.addEventListener('submit', function(e) {
      const name = this.querySelector('input[placeholder="Your Name"]').value
      const email = this.querySelector('input[placeholder="Your Email"]').value
      const subject = this.querySelector('input[placeholder="Subject"]').value
      const message = this.querySelector('textarea').value

      if (!name || !email || !subject || !message) {
        e.preventDefault()
        showToast('Please fill in all fields', 'error')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        e.preventDefault()
        showToast('Please enter a valid email address', 'error')
        return
      }

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>SENDING...'
      submitBtn.disabled = true

      setTimeout(() => {
        showToast('Message sent successfully! I will get back to you soon.', 'success')
      }, 1000)
    })
  }

  const animateElements = document.querySelectorAll('.cyber-card, .stat-box, .project-card, .education-card, .contact-box')
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out'
      }
    })
  }, { threshold: 0.1 })

  animateElements.forEach(el => fadeInObserver.observe(el))

  const sections = document.querySelectorAll('section[id]')
  
  function highlightNavLink() {
    const scrollPos = window.scrollY + 100
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')
      const navLink = document.querySelector(`.cyber-link[href="#${sectionId}"]`)
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.cyber-link').forEach(link => {
          link.style.color = 'var(--text-primary)'
          link.style.textShadow = 'none'
        })
        if (navLink) {
          navLink.style.color = 'var(--primary)'
          navLink.style.textShadow = '0 0 10px var(--primary)'
        }
      }
    })
  }

  window.addEventListener('scroll', highlightNavLink)

  const navbarToggler = document.querySelector('.navbar-toggler')
  const navbarCollapse = document.querySelector('.navbar-collapse')

  document.querySelectorAll('.cyber-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click()
      }
    })
  })

  console.log(`
    ╔════════════════════════════════════════╗
    ║     CARLO AGAN - IT ANALYST            ║
    ║   Futuristic Portfolio v2.0            ║
    ║   Built with HTML, CSS, JS & Bootstrap║
    ║                                        ║
    ║  Email: carloagan123@gmail.com         ║
    ║  GitHub: CarloAgan123                  ║
    ╚════════════════════════════════════════╝
  `)
})

const style = document.createElement('style')
style.textContent = `
  .toast-notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, rgba(26, 31, 58, 0.95) 0%, rgba(26, 31, 58, 0.85) 100%);
    border: 2px solid var(--primary);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: 'Space Mono', monospace;
    z-index: 2000;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
  }

  .toast-notification.show {
    opacity: 1;
    transform: translateY(0);
  }

  .toast-notification.toast-error {
    border-color: #ff006e;
  }

  .toast-notification.toast-error i {
    color: #ff006e;
  }

  .toast-notification.toast-success i {
    color: var(--primary);
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: var(--darker-bg);
    border: 2px solid var(--secondary);
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    box-shadow: 0 0 30px var(--primary), 0 0 50px rgba(0, 255, 136, 0.4);
    transition: all 0.3s ease;
    z-index: 1999;
    font-weight: 900;
    animation: rocket-idle 2s ease-in-out infinite;
  }

  .scroll-to-top.show {
    display: flex;
  }

  .scroll-to-top:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 0 40px var(--primary), 0 0 60px rgba(0, 255, 136, 0.6), 0 0 80px var(--secondary);
    animation: rocket-launch 0.6s ease-in-out;
  }

  .scroll-to-top::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: rocket-pulse 1.5s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes rocket-idle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  @keyframes rocket-launch {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-20px) scale(1.15); }
    100% { transform: translateY(0px) scale(1); }
  }

  @keyframes rocket-pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  @media (max-width: 576px) {
    .toast-notification {
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
    }

    .scroll-to-top {
      bottom: 1rem;
      right: 1rem;
      width: 55px;
      height: 55px;
      font-size: 1.3rem;
    }
  }
`
document.head.appendChild(style)
