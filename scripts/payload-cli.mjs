process.env.PAYLOAD_DISABLE_ADMIN = 'true';

const args = process.argv.slice(2);

const cliModule = await import('../node_modules/payload/dist/bin/index.js');

// Use the correct export
await cliModule.bin(args);
