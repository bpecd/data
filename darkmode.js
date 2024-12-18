const darkModeBtn = document.getElementById('darkmode');
    const currentIcon = document.getElementById('icon-current');
    const newIcon = document.getElementById('icon-new');
    const body = document.body;

    // Load saved dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
      enableDarkMode();
    }

    darkModeBtn.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });

    function enableDarkMode() {
      // Add 'dark' class to body
      body.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');

      // Animate icons
      animateIcons('dark');
    }

    function disableDarkMode() {
      // Remove 'dark' class from body
      body.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');

      // Animate icons
      animateIcons('light');
    }

    function animateIcons(mode) {
      if (mode === 'dark') {
        // Show moon icon smoothly
        newIcon.classList.add('show');
        setTimeout(() => {
          currentIcon.className = 'fas fa-moon-stars';
          newIcon.classList.remove('show');
        }, 500);
      } else {
        // Show sun icon smoothly
        newIcon.classList.add('show');
        setTimeout(() => {
          currentIcon.className = 'fa-solid fa-sun-bright';
          newIcon.classList.remove('show');
        }, 500);
      }
    }
