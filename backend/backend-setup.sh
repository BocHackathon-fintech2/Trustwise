#!/bin/bash

apt-get update
apt-get install -y python3 pyton3-pip python3-gpiozero
pip3 install web3
wget https://releases.parity.io/v1.11.11/armv7-unknown-linux-gnueabihf/parity -O /usr/bin/parity
chmod +x /usr/bin/parity
mkdir -p /home/pi/.local/share/io.parity.ethereum/
parity account new
cp parity.service /etc/systemd/system/parity.service
systemctl enable parity.service
cp config.toml ~/.local/share/io.parity.ethereum/config.toml
cp dev-chain.json > /home/pi/.local/share/io.parity.ethereum/dev-chain.json
