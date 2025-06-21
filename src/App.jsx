import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        console.log("Service Worker registered", reg);
      });
    }
  }, []);

  const subscribeToNotifications = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BP873nMXDI0ghN4zAO0I0NvgQohYBfLGEa9-EQXgtoA0W29HnH1Qrcw1H1n0a7LuGNmNmy1OalcWH7uPo-AXF2A")
    });
    console.log("Push Subscription:", JSON.stringify(sub));

    
    // Append dữ liệu vào div
    const detailsDiv = document.getElementById('subscription-details');
    detailsDiv.innerHTML = JSON.stringify(sub);
    alert("Push đăng ký thành công. Gửi subscription này lên server để lưu lại.");
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">PWA Nhận Thông Báo</h1>
      <p>Click nút bên dưới để đăng ký nhận thông báo đẩy (push notification).</p>
      <button onClick={subscribeToNotifications} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Đăng ký thông báo
      </button>
      <div id="subscription-details"></div>
      
    </div>
  );
}

export default App;