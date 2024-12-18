function animateText(e, t) {
    let n = document.getElementById(t);
    (n.value = ""),
    e.split("").forEach((e, t) => {
        setTimeout(() => {
            n.value += e;
        }, 60 * t);
    });
}

function shakeForm() {
    let e = document.getElementById("loginForm"),
        t = 0,
        n = setInterval(() => {
            (e.style.transform = `translateX(${Math.floor(6 * Math.random()) - 3}px)`),
            (t += 50) >= 300 && (clearInterval(n), (e.style.transform = ""));
        }, 50);
}
window.onload = function() {
    const what = localStorage.getItem('pin')|| localStorage.getItem('pass');
    if(what) {}else{
    document.getElementById("popup").classList.add("active")
        document.getElementById("popup").innerHTML = `<div class="loader"></div>`;
 }   async function fetchPassword() {
      const sharedSecret = "sharedSecretKey123";
      const margin = 10;
      const phoneElement = document.getElementById("phonenumberV2");
  
      // Check if the element exists
      if (!phoneElement) {
        document.getElementById("result").innerText = "Phone number input not found!";
        return;
      }
  
      const phone = phoneElement.value;
  
      function generateSecretCode(sharedSecret, margin) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const currentStep = Math.floor(currentTimestamp / margin);
        const hash = CryptoJS.HmacSHA256(String(currentStep), sharedSecret);
        return hash.toString(CryptoJS.enc.Hex).substring(0, 8);
      }
  
      const secretCode = generateSecretCode(sharedSecret, margin);
  
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbxxzXGjRVspn41gozY42ap79eZDtTRCiy4LjIVvTY0NqMVx1qQmiQd41mN9E5pzNno3CA/exec?phone=${encodeURIComponent(phone)}&secretCode=${secretCode}`
        );
        const passFromScript = await response.text();
        localStorage.setItem("pass", passFromScript);
        document.getElementById("popup").classList.remove("active");
      } catch (error) {
        document.getElementById("result").innerText = "Error, please contact admin!";
      }
    }
  
    // Check every 1 second if the phonenumberV2 element is available
    const checkPhoneNumberInterval = setInterval(function() {
      const phoneElement = document.getElementById("phonenumberV2");
      if (phoneElement) {
        clearInterval(checkPhoneNumberInterval); // Stop the interval once it's found
        fetchPassword(); // Call the function
      }
    }, 1000);
  };
  
  const inputFieldx = document.getElementById("phonenumberV2");
(inputFieldx.readOnly = !0),
document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem("userdata"), localStorage.removeItem("secureDataV2");
    let e = localStorage.getItem("phonenumberV2");
    if (e) animateText(e, "phonenumberV2");
    else {
        window.location.href = "verify.html";
        return;
    }
    document.getElementById("newidl").addEventListener("click", function () {
        localStorage.removeItem("phonenumberV2"), location.reload();
    }),
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        let t = document.getElementById("phonenumberV2");
        if (!t.hasAttribute("readonly")) {
            (window.location.href = "verify.html"), alert("Please do not cheat! It is office software");
            return;
        }
        let n = document.getElementById("phonenumberV2").value,
            l = document.getElementById("pin").value,
            o = !1,
            a = new Audio("fail.mp3");
        (a.preload = "auto"), a.load();

        let m = [
                { phonenumberV2: "01888396332",  url: "home.html", cvv: "admin", name: "Md Adnan Arefin Ratul", img: "https://nfcard.github.io/login/Ratulimg.jpg" },
                { phonenumberV2: "01718592869",  url: "home.html", cvv: "admin", name: "Tauhidur Rahman Manik", img: "manik.jpg" },
                { phonenumberV2: "01737711030",  url: "home.html", cvv: "user", name: "Md Melon Islam", img: "https://bpecd.github.io/verify/melon.jpg" },
                { phonenumberV2: "01781849092",  url: "home.html", cvv: "mod", name: "MOD", img: "https://nfcard.github.io/login/who.png" },
            ].find((e) => e.phonenumberV2 === n),
            i = localStorage.getItem("pin") || localStorage.getItem("pass") ;
        if (m && l === i) {
            let r = { cvv: n, state: m.cvv, name: m.name, img: m.img };
            localStorage.setItem("secureDataV2", JSON.stringify(r)),
                (document.getElementById("log").src = "index.gif"),
                setTimeout(() => {
                    window.location.href = m.url;
                }, 800);
        } else {
            o ||
                (a.play().catch((e) => {
                    console.error("Audio playback failed:", e);
                }),
                (o = !0)),
                shakeForm(),
                (document.getElementById("sub").style.backgroundColor = "red"),
                (document.getElementById("log").src = "lock.gif"),
                (document.getElementById("result").style.display = "পাসওয়ার্ড সঠিক নয়");
            let d = document.getElementById("icon");
            d.classList.remove("fa-lock-keyhole-open"),
                d.classList.add("fa-lock-keyhole"),
                (d.style.color = "white");
        }
    });
});
