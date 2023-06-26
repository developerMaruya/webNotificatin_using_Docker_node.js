// console.log("Service worker loaded... worker.js......");

// self.addEventListener('push', function (e) {
//   console.log(">>>> >>>>>>>>>>>");
//   const data = e.data.json();
//   console.log("data is ......");
//   console.log(data);
//   self.registration.showNotification("Abhishek", {
//     body: "From my side",
//     icon: "http://image.ibb.co/frYOFd/tmlogo.png"
//     // icon: "google.png", // Specify the correct path to the icon file
//   });
// });
// console.log("worker end...");


// after click url go to this page
console.log("Service worker loaded... worker.js......");

self.addEventListener('push', function (e) {
  console.log(">>>> >>>>>>>>>>>");
  const data = e.data.json();
  console.log("data is ......");
  console.log(data);

  const options = {
    body: "software developer in iph technologies",

    data: {
      url: "https://in.linkedin.com/company/iph-technologies" 
    }
  };

  self.registration.showNotification("Abhishek", options);
});

self.addEventListener('notificationclick', function (e) {
  const notification = e.notification;
  const url = notification.data.url;

  e.waitUntil(
    clients.openWindow(url)
  );

  notification.close();
});
console.log("worker end...");
