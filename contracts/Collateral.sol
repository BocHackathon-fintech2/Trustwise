pragma solidity ^0.4.24;

contract Collateral {

    event CollateralInitialized(
        address indexed broker,
        address indexed loaner,
        uint256 amountToLoan,
        uint256 deadlineTimestamp,
        uint256 paybackAmount
    );

    event CollateralAgreedAndLocked(
        address indexed loaner
    );

    event CollateralConfirmed(
        address indexed broker
    );

    event CollateralLoanFulfilled(
        address indexed fulfiller
    );

    event CallateralCancelled(
        address indexed sender
    );

    event WaultUnlocked(
        address indexed sender
    );

    enum States {Cancelled, Available, Initialized, AgreedAndLocked, Confirmed, LoanFulfilled}

    States public vaultState;

    address public broker;
    address public loaner;
    uint256 public amountToLoan;
    uint256 public deadlineTimestamp;
    uint256 public paybackAmount;

    bool public extraCondition;

    constructor () public {
        vaultState = States.Available;
    }
    
    function initializeCollateral (
        address _loaner, 
        uint256 _amountToLoan, 
        uint256 _deadlineTimestamp, 
        uint256 _paybackAmount
    ) public payable {
        require(vaultState == States.Available, "Vault state should be available");
        require(msg.value == _amountToLoan, "msg.value should be the same as amountToLoan");
        require(_deadlineTimestamp > now, "Deadline should be later than NOW");
        broker = msg.sender;
        loaner = _loaner;
        amountToLoan = _amountToLoan;
        deadlineTimestamp = _deadlineTimestamp;
        paybackAmount = _paybackAmount;
        vaultState = States.Initialized;
        emit CollateralInitialized(broker, loaner, amountToLoan, deadlineTimestamp, paybackAmount);
    }

    function agreeAndLock () public {
        require(vaultState == States.Initialized, "Vault state should be initialized");
        require(msg.sender == loaner, "Message sender should be loaner");
        vaultState = States.AgreedAndLocked;
        emit CollateralAgreedAndLocked(loaner);
    }

    function confirm () public {
        require(vaultState == States.AgreedAndLocked, "Vault state should be agreed and locked");
        require(msg.sender == broker, "Message sender should be broker");
        vaultState = States.Confirmed;
        loaner.transfer(amountToLoan);
        emit CollateralConfirmed(broker);
    }

    function loanFulfill () public payable {
        require(vaultState == States.Confirmed, "Vault state should be confirmed");
        require(msg.value >= paybackAmount, "Value cannot be less than payback amount");
        require(now <= deadlineTimestamp, "Fulfillment should happen before deadline");
        vaultState = States.LoanFulfilled;
        broker.transfer(msg.value);
        emit CollateralLoanFulfilled(msg.sender);
    }

    function cancel () public {
        require((vaultState == States.Initialized) || (vaultState == States.AgreedAndLocked), "State should be either Initialized or AgreedAndLocked");
        require((msg.sender == loaner) || (msg.sender == broker), "Message sender should be either broker or loaner");
        broker.transfer(amountToLoan);
        if (vaultState == States.Initialized) {
            makeAvailbale();
        } else {
            vaultState = States.Cancelled;
        }
        emit CallateralCancelled(msg.sender);
    }

    function unlock () public {
        if ((vaultState == States.Cancelled) || (vaultState == States.LoanFulfilled)) {
            require(msg.sender == loaner, "Message sender should be loaner");
            makeAvailbale();
        } else if (vaultState == States.Confirmed) {
            require((now > deadlineTimestamp) || extraCondition, "Timestamp should be later than deadlineTimestamp or extraCondition");
            require(msg.sender == broker, "Message sender should be broker");
            makeAvailbale();
        } else {
            revert("Cannot run the unlock function");
        }
        emit WaultUnlocked(msg.sender);
    }

    function fireExtraCondition () public {
        extraCondition = true;
    }

    function makeAvailbale() internal {
        vaultState = States.Available;
        extraCondition = false;
        broker = 0x0;
        loaner = 0x0;
        amountToLoan = 0;
        deadlineTimestamp = 0;
        paybackAmount = 0;
    }
}
