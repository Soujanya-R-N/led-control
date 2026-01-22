const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// UNIQUE MQTT TOPICS
const controlTopic = "soujanya/led/control";
const ledStatusTopic = "soujanya/led/status";
const deviceStatusTopic = "soujanya/device/status";

const toggle = document.querySelector("input[type='checkbox']");
const statusText = document.querySelector(".status");
const deviceStatusText = document.querySelector(".device-status");

client.on("connect", () => {
  console.log("MQTT Connected");
  client.subscribe(ledStatusTopic);
  client.subscribe(deviceStatusTopic);
});

// Toggle LED
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    statusText.innerText = "ON";
    client.publish(controlTopic, "ON");
  } else {
    statusText.innerText = "OFF";
    client.publish(controlTopic, "OFF");
  }
});

// Receive messages
client.on("message", (topic, message) => {
  const msg = message.toString();

  if (topic === ledStatusTopic) {
    statusText.innerText = msg;
    toggle.checked = (msg === "ON");
  }

  if (topic === deviceStatusTopic) {
    deviceStatusText.innerText = "Device: " + msg;
  }
});
