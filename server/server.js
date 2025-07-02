const express = require('express');
const cors = require('cors');

const app = express();
const listenPort = 3000; //port to listen on

const net = require('net');

const HOST = '127.0.0.1';
const PORT = 6742;

const protocolPacketId = 40     // packet id to request protocol handshake
const LEDPacketId = 1052        // packet id to update a single led

const keys = []; // Unpacketed keydata received from website

const delay = (ms) => new Promise(res => setTimeout(res, ms));

//builds update_single_led packet to be sent over tcp
const buildKeyPacket = (ledIndex, { r, g, b}) => {
    const buf = Buffer.alloc(24);
    Buffer.from('ORGB').copy(buf, 0);
    buf.writeUint32LE(0, 4);
    buf.writeUInt32LE(LEDPacketId, 8);   // update single LED code
    buf.writeUInt32LE(8, 12);            // payload length
    buf.writeUInt32LE(ledIndex, 16);     // order of the key 
    buf.writeUInt8(r, 20);
    buf.writeUInt8(g, 21);
    buf.writeUInt8(b, 22);
    buf.writeUInt8(111, 23);               // buffer byte or some shit, we'll see
    return buf;
}

const sendAllPackets = async () => {
    while (keys.length > 0) {
        const packet = keys.shift();
        client.write(packet);

        await delay(1); // unsure if needed
    }

    keys.length = 0; //remove all packets
};

//socket for sending data to openRGB
const client = new net.Socket();

client.connect(PORT, HOST, () => {

    //build the handshake protocol packet
    const protocol = Buffer.alloc(20);
    Buffer.from('ORGB').copy(protocol, 0);   // magic number
    protocol.writeUInt32LE(0, 4);            // device index 0
    protocol.writeUInt32LE(protocolPacketId, 8);           // NET_PACKET_ID_REQUEST_PROTOCOL_VERSION
    protocol.writeUInt32LE(4, 12);           // payload length
    protocol.writeUInt32LE(5, 16);           // max supported protocol version

    console.log(protocol.toString('hex')) //make sure the protocol matches
    client.write(protocol); // now send it
});

//only response it should get is during the handshake
client.on('data', (data) => {
    console.log(data.toString('hex'));
});

client.on('error', (err) => {
    console.error(err);
})

//receive data from website
app.use(cors());            // Enable CORS for all origins
app.use(express.json());    // Parse JSON bodies

app.post('/api/colors', (req, res) => {
    const colors = req.body; // expecting an array of { buttonId, red, green, blue }
    
    if (!Array.isArray(colors)) {
        return res.status(400).send('Expected array');
    }

    let i = 1;
    colors.forEach(({ keyId, red, green, blue }) => {
        const packet = buildKeyPacket(keyId, { r: red, g: green, b: blue });
        keys.push(packet);
    });

    //send the completed list of packets to the backend
    sendAllPackets();

    res.sendStatus(200);
});

app.listen(listenPort, () => {
    console.log(`listening on http://localhost:${listenPort}`);
});