import express from 'express';
import dotenv from 'dotenv';
import { router } from "./routes/contactRoutes.js";
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000 //  || Math.ceil(Math.random() * 2) + 3000;


app.use(express.json())
app.use("/api/contacts", router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(` localhost:${PORT}`);
    console.log('wait... browser is open');
})




// import userFolder from './userFolder/index.js';
// import os from "os";
// import net from 'net';
// import open from 'open';

// const server = net.createServer();

// server.listen(PORT);
// server.on('error', (err) => {
//     console.log(`Port ${err.code} is not busy`);
//     server.close();
// });

// server.on('close', () => {
//     console.log('Server closed');
// });

// server.close()

// const mac = os.networkInterfaces()

// app.use(express.json())

// app.use('/userfolderapi', userFolder)

// app.use('/', (req, res) => {
//     res.send(new Date());
//     console.log('requested from ip: ' + req.ip);
//     console.log(mac['Wi-Fi'][1].address)
//     console.log(mac['Wi-Fi'][1].mac)
// })

// const serverListen = app.listen(PORT, () => {
//     console.log(mac)
//     // console.log(`Server Running on port "${PORT}" on ip: "${mac['Wi-Fi'][1].address}:${PORT}"`);
//     console.log(` localhost:${PORT}`);
//     // console.log(` ${mac['Wi-Fi'][1].address}:${PORT}`);
//     console.log('wait... browser is open');
//     console.log(serverListen.address().address)
//     console.log(serverListen.address().port)
//     // open(`http://localhost:${port}`);
//     // open(`http://${mac['Wi-Fi'][1].address}:${PORT}`);
// })
// // server()