import Web3 from 'web3';

export const w3 = new Web3(new Web3.providers.HttpProvider("http://raspberrypi.local:8545"))
