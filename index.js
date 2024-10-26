document.addEventListener('DOMContentLoaded', function() {
    function triggerShake() {
      const container = document.getElementById('loginForm');
      let shakeInterval;
      let shakeTime = 0;
      
      // Function to create the soft left-right shake effect
      function shake() {
        const randomX = Math.floor(Math.random() * 6) - 3; // Small shake between -3px and 3px for X (left-right)
        
        container.style.transform = `translateX(${randomX}px)`; // Only translate along the X-axis
        
        shakeTime += 50; // Shake duration in milliseconds
        if (shakeTime >= 300) { // Shake for 300ms (for a smoother and shorter effect)
          clearInterval(shakeInterval);
          container.style.transform = ''; // Reset the transform property after the shake
        }
      }

      // Start shaking at 50ms intervals
      shakeInterval = setInterval(shake, 50);
    }

    let realPassword = ''; // Define realPassword here to ensure it's in the correct scope

    const passwordField = document.getElementById('pin');

    passwordField.addEventListener('input', (event) => {
        const value = event.target.value;
        const lastChar = value.charAt(value.length - 1);

        // Only process if the last character is not a bullet
        if (lastChar !== '●') {
            realPassword += lastChar;
            setTimeout(() => {
                // Replace the value in the input field with bullets
                event.target.value = '●'.repeat(realPassword.length);
            }, 300);
        }
    });

    passwordField.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && realPassword.length > 0) {
            realPassword = realPassword.slice(0, -1);
        }
    });
localStorage.removeItem("cashoutlink");
        localStorage.removeItem("densionlink");
    localStorage.removeItem('secureData');

    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        animateText(storedPhoneNumber, 'phoneNumber');
    }else{
        window.location.href = "verify.html";
    }
document.getElementById('newidl').addEventListener('click',function(){
    localStorage.removeItem('phoneNumber');
    location.reload()
})
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
    document.body.classList.add('move-down');
   
        const phoneNumber = document.getElementById('phoneNumber').value;
        const pin = realPassword; // Use realPassword here to get the actual pin
                let audioPlayed = false;
const audioElement2 = new Audio('fail.mp3');

// Preload the audio
audioElement2.preload = 'auto';
audioElement2.load();
    const failed = document.getElementById('no-connection-popup2');

    // Predefined account details and their corresponding URLs
    const accountDetails = [
        { phoneNumber: '01888396332', pin: 'ratul', url: 'home.html', cvv: 'mod',name: 'Md Adnan Arefin Ratul', img: 'https://nfcard.github.io/login/Ratulimg.jpg' },
        { phoneNumber: '01718592869', pin: 'manik', url: 'home.html' , cvv: 'admin',name:'Tauhidur Rahman Manik',img:'https://nfcard.github.io/login/who.png'},
        { phoneNumber: '01781849092', pin: 'ratul2', url: 'home.html' , cvv: 'user',name:'Moral Adnan',img:'https://nfcard.github.io/login/who.png'},
        { phoneNumber: '01718592869', pin: '1234', url: 'home.html' , cvv: 'user',name:'Tamjid Ahmed',img:'https://nfcard.github.io/login/who.png'}
    ];

    const localpin = localStorage.getItem("pin");

const matchedAccount = accountDetails.find(account => account.phoneNumber === phoneNumber);
let pass;

if (localpin) {
    pass = localpin;
} else {
    pass = matchedAccount.pin;
}

if (matchedAccount && pin === pass) {
        const secureData = {
            cvv: phoneNumber,
            state: matchedAccount.cvv,
            name: matchedAccount.name,
          img: matchedAccount.img
        };
        localStorage.setItem('secureData', JSON.stringify(secureData));
        // Redirect to the matched URL
       setTimeout(function() { window.location.href = matchedAccount.url;}, 400); 
    } else {
         if (!audioPlayed) {
            audioElement2.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
            audioPlayed = true;
        }     triggerShake();
                failed.style.display = 'block';
document.getElementById('result').innerText = 'আপনার নম্বর অথবা পিন সঠিক নয়';
        var icon = document.getElementById("icon");
        icon.classList.remove("fa-lock-keyhole-open");
        icon.classList.add("fa-lock-keyhole");
    }
});
  });


function animateText(text, elementId) {
    const element = document.getElementById(elementId);
    element.value = ''; // Clear any existing content

    text.split('').forEach((char, index) => {
        setTimeout(() => {
            element.value += char;
        }, index * 40); // 30 ms delay between each character
    });
} // Use realPassword here to get the actual pin
