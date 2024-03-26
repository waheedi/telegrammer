const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Telegram Client connected');

  // Event handler for data received from client
  socket.on('data', (data) => {
    console.log('Received telegram message from client:', data);


    // different checks is needed here but as this is not a required task
    // I will leave it with a simple data check
    if(data){
      // Parse the telegram message
      const identifier = data.slice(0, 3).toString('ascii');
      const distance = data.readBigUInt64BE(3);
      const magnitude = data.readUInt32BE(11);
      const phase = data.readInt8(15);
      const temperature = data.readInt32LE(16);

      // Print the parsed components
      console.log('Identifier:', identifier);
      console.log('Distance:', distance.toString());
      console.log('Magnitude:', magnitude);
      console.log('Phase:', phase);
      console.log('Temperature:', temperature);

      // Send a response back to the client if needed
      socket.write('Telegram message received by server.');
    }
  });

  // Event handler for client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Event handler for errors
  socket.on('error', (err) => {
    console.error('Error:', err);
  });
});

// Start listening on port 12345
const PORT = 54321;
const HOST = '192.168.178.58'; // Listen on all available network interfaces
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

// Event handler for server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
