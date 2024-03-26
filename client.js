// hello :)

const net = require('net');

// Define the telegram components (DUMMY)
//
const identifier = 'MCR';
const distance = BigInt(12345678901234); // distance in millimeters
const magnitude = 456123; // magnitude
const phase = 4; // phase
const temperature = 22; // temperature in Celsius
const HOST = '192.168.178.58'; // Server address
const PORT = 54321; // Server port address

// Convert components to byte buffers (so  we can get the exact sizes and structure of byte code)
const identifierBuffer = Buffer.from(identifier, 'ascii');
const distanceBuffer = Buffer.alloc(8);
distanceBuffer.writeBigInt64BE(distance);
const magnitudeBuffer = Buffer.alloc(4);
magnitudeBuffer.writeUInt32BE(magnitude);
const phaseBuffer = Buffer.alloc(1);
phaseBuffer.writeInt8(phase);
const temperatureBuffer = Buffer.alloc(4);
temperatureBuffer.writeInt32LE(temperature);

// Concatenate buffers to form the telegram message
const telegramMessage = Buffer.concat([identifierBuffer, distanceBuffer, magnitudeBuffer, phaseBuffer, temperatureBuffer]);

// Create a new TCP socket
// Note: I am using net.Socket for customizability
// It can also be replaced with createConnection as wrapper to that

function sendTelegram(telegramMessage) {

  const client = new net.Socket();

  // Connect to the server
  client.connect({ host: HOST, port: PORT }, () => {
    console.log('Connected to server');
    // Send the telegram message
    client.write(telegramMessage);
  });

  // Event handlers
  client.on('data', (data) => {
    console.log('Received from server:', data.toString());
    client.end(); // Close the connection once a response is received
  });

  client.on('end', () => {
    console.log('Disconnected from server');
  });

  client.on('error', (err) => {
    console.error('Error:', err);
  });
}

// Simulating a sensor now with 500ms transmit interval
setInterval(() => {
  sendTelegram(telegramMessage);
}, 500);

//sendTelegram(telegramMessage);

