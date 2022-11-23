const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// const { interface, bytecode } = require('../compile');
const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // inbox = await new web3.eth.Contract(JSON.parse(interface))
    inbox = await new web3.eth.Contract(abi)
                            .deploy({ data: evm.bytecode.object, arguments: ['Hi There']})
                            .send({ from: accounts[0], gas: '1000000'})
})

describe('Inbox', () => { 
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There');
    })

    it('can change the message', async () => {
        const transaction = await inbox.methods.setMessage('Bye There').send({ from: accounts[0] });
        console.log(transaction);
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye There');

    });
})