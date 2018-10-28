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
2. run the `backend-setup` script
    ```
    bash ./backend-setup.sh
    ```
3. unlock the parity account (replace `AccountPassword` with the accounts password)
    ```
    echo "AccountPassword" > /home/pi/.local/share/io.parity.ethereum/pass
    ```
4. modify line #9 in parity configuration with your newly created account
    ```
    editor ~/.local/share/io.parity.ethereum/config.toml
    ```
5. modify line #143 in the genesis-block specification with your newly created address
    ```
    editor /home/pi/.local/share/io.parity.ethereum/dev-chain.json
    ```
6. restart the pi!
    ```
    sudo reboot
    ```
    