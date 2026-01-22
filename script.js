const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

const controlTopic = 'soujanya/led/control';
const statusTopic  = 'soujanya/led/status';

const toggle = document.querySelector('input[type="checkbox"]');
const statusText = document.querySelector('.status');

client.on('connect', () => {
  console.log('Connected to MQTT');
  client.subscribe(statusTopic);
});

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    client.publish(controlTopic, 'ON');
  } else {
    client.publish(controlTopic, 'OFF');
  }
});

client.on('message', (topic, message) => {
  if (topic === statusTopic) {
    const state = message.toString();
    statusText.innerText = state;
    toggle.checked = (state === 'ON');
  }
});
