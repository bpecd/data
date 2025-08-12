document.addEventListener('DOMContentLoaded', async function () {
    const storedPhoneNumber = localStorage.getItem('phonenumberV2');
   if (storedPhoneNumber) {
       animateText(storedPhoneNumber, 'phonenumber');
   }
    // else {
// window.location.href = "verify.html";
  //  }
let audioPlayed = false;
    const audioElement = new Audio('https://bpecd.github.io/data/nyr.mp3');

    // Preload the audio
    audioElement.preload = 'auto';
    audioElement.load();
   
    function playAudio() {
        if (!audioPlayed) {
            audioElement.play().catch(error => console.error('Audio playback failed:', error));
            audioPlayed = true;
        }
    }

    // Clear local storage on load
    localStorage.removeItem('secureDataV2');

    function animateText(text, elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = '';
            text.split('').forEach((char, index) => {
                setTimeout(() => element.value += char, index * 40);
            });
        }
    }

    
    // Fetch and process CSV data
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1crclEqWJhNx16c4CNz2zT6Mr-qpkZOA-H_DKBzxK_UA/gviz/tq?tqx=out:csv';

    async function fetchCSV() {
        try {
            document.getElementById("popup").classList.add("active");
            const response = await fetch(csvUrl);
            const csvText = await response.text();

            // Parse CSV
            const rows = csvText.split('\n').filter(row => row.trim() !== '');
            const data = rows.map(row => {
                return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                    .map(cell => cell.replace(/^"|"$/g, '').trim());
            });
            return data;
        } catch (error) {
            window.location.href = 'index.html';
            return null;
        }
    }

    function normalizeNumber(number) {
        return number.replace(/[-\s+]/g, '').trim();
    }

    async function matchData() {
        const csvData = await fetchCSV();
        if (!csvData) return false;
        const storedPhoneNumber = document.getElementById('phonenumber').value;
        const pinInput = document.getElementById('pin').value; // Use the masked PIN

      //  if (!storedPhoneNumber) {
      //      window.location.href = "https://upburl.github.io/app/verify.html";
      //      return false;
      //  }

        const normalizedInput = normalizeNumber(storedPhoneNumber);

        const matchedRow = csvData.find(row => {
            const phoneNumbers = row[1].split(/[,\s]+/);
            return phoneNumbers.some(num => normalizeNumber(num) === normalizedInput);
        });

        if (matchedRow) {
            const matchedRowIndex = csvData.indexOf(matchedRow) +1;
        localStorage.setItem('rownumber', matchedRowIndex);
        localStorage.setItem("pin",matchedRow[5]);
            if (matchedRow[1] === document.getElementById('phonenumber').value &&pinInput === matchedRow[5]  ) {
                const secureDataV2 = {
                    cvv: matchedRow[1],
                    name: matchedRow[3],
                    state: matchedRow[6],
                    img: matchedRow[4],
                     mail: matchedRow[2]
                };
                if(matchedRow[6] !== '123'){
                localStorage.setItem('phonenumberV2',document.getElementById('phonenumber').value);
                localStorage.setItem('secureDataV2', JSON.stringify(secureDataV2));
                                setTimeout(() => document.getElementById("popup").classList.remove("active"),
window.location.href = 'home.html', 300);
                }else{const popup = document.getElementById('no-connection-popup2');
        if (popup) popup.style.display = 'block';
                      document.getElementById("popup").classList.remove("active");
        const result = document.getElementById('result');
        if (result) result.innerText = 'আপনার একাউন্ট বন্ধ করে দেওয়া হয়েছে (অফিসে যোগাযোগ করুন)';
        const image = document.getElementById('mypic');
        if (image) image.src = 'https://bpecd.github.io/data/lock.gif';
   }
                return true; // Success
            } else {
                handleFailure();
                return false;
            }
        } else {
            handleFailure();
            return false;
        }
    }

    function handleFailure() {
                const popup = document.getElementById('no-connection-popup2');
        if (popup) popup.style.display = 'block';
        const result = document.getElementById('result');
        if (result) result.innerText = 'আপনার নম্বর অথবা পিন সঠিক নয়';
        const image = document.getElementById('mypic');
        if (image) image.src = 'https://bpecd.github.io/data/lock.gif';
    }

    // Form submit handler
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const isValid = await matchData();
        if (!isValid) {
            document.getElementById("popup").classList.remove("active");
    
        }
    });

    // Close popup listener
    const closePopup = document.getElementById('close-popup2');
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            document.getElementById('no-connection-popup2').style.display = 'none';
        });
    }
});
