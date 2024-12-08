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
            (e.style.transform = `translateX(${Math.floor(6 * Math.random()) - 3}px)`), (t += 50) >= 300 && (clearInterval(n), (e.style.transform = ""));
        }, 50);
}
const inputFieldx = document.getElementById("phoneNumber");
(inputFieldx.readOnly = !0),
    document.addEventListener("DOMContentLoaded", function () {
        localStorage.removeItem("userdata"), localStorage.removeItem("secureData");
        let e = localStorage.getItem("phoneNumber");
        if (e) animateText(e, "phoneNumber");
        else {
            window.location.href = "verify.html";
            return;
        }
        document.getElementById("newidl").addEventListener("click", function () {
            localStorage.removeItem("phoneNumber"), location.reload();
        }),
            document.getElementById("loginForm").addEventListener("submit", function (e) {
                e.preventDefault();
                let t = document.getElementById("phoneNumber");
                if (!t.hasAttribute("readonly")) {
                    (window.location.href = "verify.html"), alert("Please do not cheat! It is a office software");
                    return;
                }
                let n = document.getElementById("phoneNumber").value,
                    l = document.getElementById("pin").value,
                    o = !1,
                    a = new Audio("fail.mp3");
                (a.preload = "auto"), a.load();
                let m = [
                        { phoneNumber: "01888396332", pin: "369369", url: "home.html", cvv: "admin", name: "Md Adnan Arefin Ratul", img: "https://nfcard.github.io/login/Ratulimg.jpg" },
                        { phoneNumber: "01718592869", pin: "trmanik592869", url: "home.html", cvv: "admin", name: "Tauhidur Rahman Manik", img: "manik.jpg" },
                        { phoneNumber: "01737711030", pin: "01737711030", url: "home.html", cvv: "user", name: "Md Melon Islam", img: "https://bpecd.github.io/verify/melon.jpg" },
                        { phoneNumber: "01781849092", pin: "1234", url: "home.html", cvv: "mod", name: "MOD", img: "https://nfcard.github.io/login/who.png" },
                    ].find((e) => e.phoneNumber === n),
                    i = localStorage.getItem("pin") || (m ? m.pin : null);
                if (m && l === i) {
                    let r = { cvv: n, state: m.cvv, name: m.name, img: m.img };
                    localStorage.setItem("secureData", JSON.stringify(r)),(document.getElementById("log").src = "index2.gif"),
                        setTimeout(() => {
                            window.location.href = m.url;
                        }, 1050);
                } else {
                    o ||
                        (a.play().catch((e) => {
                            console.error("Audio playback failed:", e);
                        }),
                        (o = !0)),
                        shakeForm(),
                        (document.getElementById("sub").style.backgroundColor = "red"),(document.getElementById("log").src = "lock2.gif"),
                        (document.getElementById("result").style.display = "পাসওয়ার্ড সঠিক নয়");
                    let d = document.getElementById("icon");
                    d.classList.remove("fa-lock-keyhole-open"), d.classList.add("fa-lock-keyhole"), (d.style.color = "white");
                }
            });
    });
