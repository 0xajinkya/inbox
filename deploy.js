const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
// const { interface, bytecode } = require('./compile')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
    'jealous style seat enjoy mountain shuffle critic crumble mobile they join violin',
    'https://goerli.infura.io/v3/14c91fab096348649c68966c7f0a20e6'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting To Deploy From Account', accounts[0])

    // const result = await new web3.eth.Contract(JSON.parse(interface))
    const result = await new web3.eth.Contract(abi)
                    .deploy( { data: evm.bytecode.object, arguments: ['Hi There!']} )
                    .send( { gas: '1000000', from: accounts[0]});

    console.log('Contract Deployed To ', result.options.address);
    provider.engine.stop();
};

deploy();