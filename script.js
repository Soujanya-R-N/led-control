// Connect to public MQTT broker
const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// UNIQUE topics
const controlTopic = "soujanya/esp32/led/control";
const statusTopic  = "soujanya/esp32/led/status";

// UI elements
const toggle = document.querySelector("input[type='checkbox']");
const statusText = document.querySelector(".status");

// When MQTT connects
client.on("connect", () => {
  console.log("MQTT Connected");
  client.subscribe(statusTopic);
});

// Toggle → send command
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    statusText.textContent = "ON";
    client.publish(controlTopic, "ON");
  } else {
    statusText.textContent = "OFF";
    client.publish(controlTopic, "OFF");
  }
});

// Receive status from ESP32
client.on("message", (topic, message) => {
  if (topic === statusTopic) {
    const state = message.toString();
    statusText.textContent = state;
    toggle.checked = (state === "ON");
  }
});
