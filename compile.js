const path = require('path');
const fs = require('fs')
const sol = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// module.exports = sol.compile(source, 1).contracts[':Inbox'];

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(sol.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
].Inbox;



