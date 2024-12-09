// Request Notification Permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    } else {
        console.log('Notifications are not supported by your browser.');
    }
}

// Send Notification
function sendNotification(title, body, tag) {
    if (Notification.permission === 'granted') {
        const options = {
            body: body,
            icon: 'logo.png', // Replace with your app's logo
            tag: tag // Prevent duplicate notifications
        };
        new Notification(title, options);
    }
}

// Notify User (Notification + Alert)
function notifyUser(title, body, tag) {
    sendNotification(title, body, tag);
    setTimeout(function() {
        alert(`${title}: ${body}`);
    }, 1500);

}

// Check Reminders
function checkReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const now = new Date();

    reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.time);
        // Process reminders not already shown or notified
        if (now >= reminderTime && !reminder.shown && !reminder.notified) {
            notifyUser('Reminder', reminder.message, reminder.tag); // Notify user
            reminder.shown = true; // Mark reminder as shown
            reminder.notified = true; // Mark reminder as notified
        }
    });

    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Periodically Check Reminders
setInterval(checkReminders, 1000);

// On Page Load
document.addEventListener('DOMContentLoaded', requestNotificationPermission);
