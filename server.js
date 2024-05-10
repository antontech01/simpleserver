const { createServer } = require("http")
const os = require('os')

const getRandomDelay = () => Math.floor(Math.random() * 1000) + 500;

const server = createServer((req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    if (req.url === '/spec' && req.method === 'GET') {
        setTimeout(()=>{
            const systemSpec = {
                cpu: os.cpus(),
                    os: {
                        platform: os.platform(),
                        type: os.type(),
                        release: os.release(),
                        totalMemory: os.totalmem(),
                        freeMemory: os.freemem()
            }
        }
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(systemSpec))
        }, getRandomDelay())
        
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found\n');
    }
}
);

server.listen(3000, () => {
    console.log('Listening on the server')
});