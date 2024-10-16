﻿$(document).ready(function () {
    accumulatorTracker.updateStake();
    accumulatorTracker.getActiveSelections();
    accumulatorTracker.updatePotentialWinnings();
    //console.log(accumulatorTracker.combinations);

    $(document).on("click", ".bet-status", function () {
        accumulatorTracker.updateActiveSelections();
        accumulatorTracker.updatePotentialWinnings();
    });

    $(document).on("keydown", "#add-bet-form input", function (e) {
        if (e.key === "Enter") {
            accumulatorTracker.addSelection();
        }
    });
});

class AccumulatorTracker {
    stake = 1;

    totalStake;

    totalOdds = 0;

    combinations = [];

    allSelections = [
        //{
        //    id: 1,
        //    description: "test 1",
        //    odds: 2.9,
        //    hasfailed: false
        //},
        //{
        //    id: 2,
        //    description: "test 2",
        //    odds: 3.1,
        //    hasfailed: false
        //},
        //{
        //    id: 3,
        //    description: "test 3",
        //    odds: 1.4,
        //    hasfailed: false
        //},
        //{
        //    id: 4,
        //    description: "test 4",
        //    odds: 2,
        //    hasfailed: false
        //}
    ];

    activeSelections = [];

    getActiveSelections() {
        this.activeSelections = this.allSelections.filter(x => x.hasFailed != true);
    }

    displaySelections() {
        let betTableBody = $("#bet-table-body");
        let html;

        betTableBody.html("");

        this.allSelections.forEach(function (bet) {
            html += `<tr><td>${bet.description}</td><td>${bet.odds}</td><td><input type="checkbox" class="bet-status" id="${bet.id}"/></td></tr>`
        });

        betTableBody.html(html);
    }

    addSelection() {
        let betDescription = $("#bet-description").val();
        let betOdds = $("#bet-odds").val();

        let id = this.allSelections.length + 1;

        let selection = {
            id: id,
            description: $("#bet-description").val(),
            odds: $("#bet-odds").val(),
            hasFailed: false
        }

        this.allSelections.push(selection);

        this.updateActiveSelections();
        this.updatePotentialWinnings();
        this.updateTotalStake();
        this.displaySelections();

        $("#bet-description").val("");
        $("#bet-odds").val("");
    }

    updateStake() {
        let stakeInput = parseFloat($("#bet-stake").val());
        this.stake = stakeInput;

        this.updateTotalStake();
        this.updateActiveSelections();
        this.updatePotentialWinnings();
    }

    updateTotalStake() {
        debugger;

        let totalStake = this.stake * this.combinations.length;
        $("#total-stake").text(totalStake);

    }

    updateActiveSelections() {
        let allBets = $(".bet-status");
        let activeSelections = this.allSelections;

        allBets.each(function () {
            if (this.checked) {
                activeSelections = activeSelections.filter(x => x.id != this.id);
            }
        });

        this.activeSelections = activeSelections;
    }

    updatePotentialWinnings() {
        this.updateActiveSelections();
        let potentialWinnings = this.calculatePotentialWinnings();

        let currencyConverter = new Intl.NumberFormat("en-UK", {
            style: "currency",
            currency: "GBP"
        });

        potentialWinnings = currencyConverter.format(potentialWinnings);

        $("#potential-winnings-value").text(potentialWinnings);
    }

    calculatePotentialWinnings() {

        let totalOdds = 1;
        let totalWinnings = 0;

        this.getAllCombinations();

        for (let i = 0; i < this.combinations.length; i++) {
            let betWinnings = 0;
            let combination = this.combinations[i];

            let combinedOdds = 1;

            combination.forEach((c) => {
                combinedOdds = combinedOdds * c.odds;
                //combinedOdds = parseFloat(combinedOdds).toFixed(2);
            });

            betWinnings = this.stake * combinedOdds;
            totalWinnings += betWinnings;

            let betType = combination.length + " fold";
        }

        this.totalOdds = totalOdds;
        return totalWinnings;
    }

    getAllCombinations() {
        this.combinations = [];
        let result = [];

        let arr = this.activeSelections;

        let totalCombinations = 1 << arr.length; // 2^n combinations

        for (let i = 0; i < totalCombinations; i++) {
            let combination = [];

            for (let j = 0; j < arr.length; j++) {
                if (i & (1 << j)) {
                    combination.push(arr[j]); // Add object to combination if the bit is set
                }
            }
            if (combination != null && combination.length > 0) {
                result.push(combination); // Add the current combination to result
            }
        }

        this.combinations = result;
    }

    isCombinationAlreadyAdded(combinationsToAdd) {

        if (this.combinations.length <= 0) {
            return false;
        }
        //Sort combo
        combinationsToAdd = combinationsToAdd.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
        });

        for (var i2 = 0; i2 < this.combinations.length; i2++) {

            let c = this.combinations[i2];

            if (JSON.stringify(c) === JSON.stringify(combinationsToAdd)) {
                return true;
            }
        }
    }
}