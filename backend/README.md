# Backend set-up

## Requirements

* Raspberry Pi 2/3 (or equivalent)
* SD card with [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest)

## Instructions

1. clone the repository
    ```
    git clone https://github.com/BocHackathon-fintech2/Trustwise.git
    cd Trustwise/backend
    ```
2. install `python3`, `pip`, `gpiozero`  
    ```
    sudo apt-get update && sudo apt-get install python3 pyton3-pip python3-gpiozero
    ```
3. install `web3` library
    ```
    sudo pip3 install web3
    ```
4. install `parity`
    ```
    sudo wget https://releases.parity.io/v1.11.11/armv7-unknown-linux-gnueabihf/parity -O /usr/bin/parity
    sudo chmod +x /usr/bin/parity
    mkdir -p ~/.local/share/io.parity.ethereum/
    ```
5. create a new parity account and unlock it
    ```
    parity account new
    echo "AccountPassword" > /home/pi/.local/share/io.parity.ethereum/pass
    ```
6. set parity as a daemon
    ```
    sudo cp parity.service /etc/systemd/system/parity.service
    ```
7. set the parity configuration
    ```
    cp config.toml ~/.local/share/io.parity.ethereum/config.toml
    ```
8. modify line #9 in parity configuration with your newly created account
    ```
    editor ~/.local/share/io.parity.ethereum/config.toml
    ```
9. set the genesis-block specification
    ```
    cp dev-chain.json > /home/pi/.local/share/io.parity.ethereum/dev-chain.json
    ```
10. modify the genesis-block specification on line #143 with your newly created address
    ```
    editor /home/pi/.local/share/io.parity.ethereum/dev-chain.json
    ```