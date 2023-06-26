const publicVapidKey = "BC2fDFNkRaVbdnplbDy5Q-oPh70eOFg7VWyL_yHrf9GT8B603d0MTd0hpxobxFu8gfzEACIBI-yUmrzENZy9Yac";
console.log("client.js...........");

if ('serviceWorker' in navigator) {
  // Delay of 20 seconds
  registerServiceWorker().catch(console.log);
}

async function registerServiceWorker() {
  console.log("enter registerServiceWorker....");

  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });

  // Check if there's an existing subscription
  const existingSubscription = await register.pushManager.getSubscription();

  if (existingSubscription) {
    console.log("existingSubscription...");
    // Unsubscribe from the existing subscription
    await existingSubscription.unsubscribe();
  }

  // Subscribe with the new VAPID key
  const newSubscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("newSubscription....");

  console.log(newSubscription);

  
    await fetch("/", {
      method: "POST",
      body: JSON.stringify(newSubscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
  
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  console.log(base64)
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  console.log(outputArray)
  console.log(rawData)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
