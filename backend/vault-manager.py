#!/usr/bin/env python3

from gpiozero import Motor, LED, Button
from time import sleep
from web3 import Web3, HTTPProvider
from gpiozero import Button

class Vault:
    def __init__(self, open_pin, close_pin, green_led, red_led, button):
        self.button = Button(button)

        self.green = LED(green_led)
        self.green.off()

        self.red = LED(red_led)
        self.red.off()

        self.lock = Motor(forward=open_pin, backward=close_pin)
        self.lock.stop()

    def open(self):
        try:
            self.lock.forward()
            print("opening")

            sleep(1)

            self.lock.backward()
            print("closing")

            sleep(1)

            self.lock.stop()
            print("stop")
        except KeyboardInterrupt:
            self.lock.backward()
            print("closing")

            sleep(1)

            self.lock.stop()
            print("stop")
            raise

web3 = Web3(HTTPProvider(endpoint_uri='http://localhost:8545'))

contract_address = web3.toChecksumAddress('0x855DFeD6df01B9d18C21aEE2ADe7bEF2D36240B6')
contract_abi = '[{"constant":false,"inputs":[],"name":"loanFulfill","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"vaultState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"extraCondition","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"fireExtraCondition","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"agreeAndLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"confirm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"amountToLoan","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loaner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"broker","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paybackAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"cancel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_loaner","type":"address"},{"name":"_amountToLoan","type":"uint256"},{"name":"_deadlineTimestamp","type":"uint256"},{"name":"_paybackAmount","type":"uint256"}],"name":"initializeCollateral","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"deadlineTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"broker","type":"address"},{"indexed":true,"name":"loaner","type":"address"},{"indexed":false,"name":"amountToLoan","type":"uint256"},{"indexed":false,"name":"deadlineTimestamp","type":"uint256"},{"indexed":false,"name":"paybackAmount","type":"uint256"}],"name":"CollateralInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"loaner","type":"address"}],"name":"CollateralAgreedAndLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"broker","type":"address"}],"name":"CollateralConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fulfiller","type":"address"}],"name":"CollateralLoanFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"CallateralCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"WaultUnlocked","type":"event"}]'

contract = web3.eth.contract(address=contract_address, abi=contract_abi)

box = Vault(17, 18, 3, 2, 15)

while True:
    contract_state = contract.functions.vaultState().call()
    if (contract_state==1) or (contract_state==2):
        box.red.off()
        box.green.on()
        print("box is unlocked, waiting to be opened")
        if (box.button.is_pressed):
            box.green.off()
            box.open()
            box.green.on()
            
    else:
        box.green.off()
        box.red.on()

    sleep(0.25)
