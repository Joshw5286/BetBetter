$(document).ready(function () {
    accumulatorTracker.updateStake();
    accumulatorTracker.getActiveSelections();
    accumulatorTracker.updatePotentialWinnings();
    //console.log(accumulatorTracker.combinations);
    $(".bet-status").on("click", function () {
        accumulatorTracker.updateActiveSelections();
        accumulatorTracker.updatePotentialWinnings();
    });
});

class AccumulatorTracker {
    stake = 1;

    totalStake;

    totalOdds = 0;

    combinations = [];

    allSelections = [
        {
            id: 1,
            description: "test 1",
            odds: 2.9,
            hasFailed: false
        },
        {
            id: 2,
            description: "test 2",
            odds: 3.1,
            hasFailed: false
        },
        {
            id: 3,
            description: "test 3",
            odds: 1.4,
            hasFailed: false
        }
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

        this.displaySelections();
    }

    updateStake() {
        this.stake = parseInt($("#bet-stake").val());
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
                combinedOdds = parseFloat(combinedOdds).toFixed(2);
            });

            betWinnings = this.stake * combinedOdds;
            totalWinnings += betWinnings;

            let betType = combination.length + " fold";

            console.log(betType + " = " + betWinnings);
            //console.log(betWinnings + " winnings for combination: " + JSON.stringify(combination));
        }

        this.totalOdds = totalOdds;
        return totalWinnings;
    }

    getAllCombinations() {
        let totalOdds = 0;
        let totalWinnings = 0;
        this.combinations = [];

        this.activeSelections.forEach((b1) => {

            //Add single bet
            this.combinations.push([b1]);

            let otherSelections = this.activeSelections.filter(x => x.id != b1.id);

            let comboToAdd = [b1];
            otherSelections.forEach((b2) => {
                comboToAdd.push(b2);
                if (!this.isCombinationAlreadyAdded(comboToAdd)) {
                    this.combinations.push(Object.assign([], comboToAdd));
                }
            });

            //while (otherSelections.length > 0) {
            //    let currentCombinations = [];

            //    currentCombinations.push(b1);

            //    otherSelections.forEach((b2) => {
            //        currentCombinations.push(b2);
            //    });

            //    currentCombinations = currentCombinations.sort((a, b) => {
            //        if (a.id < b.id) {
            //            return -1;
            //        }
            //    });

            //    if (!this.isCombinationAlreadyAdded(currentCombinations)) {
            //        this.combinations.push(currentCombinations);
            //    }
            //    otherSelections.shift();
            //}

            //this.combinations.push([b1]);
        });
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