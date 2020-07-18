var modelController = function() {
    
    var Income = function(id, description, value ){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value/totalIncome) * 100);
        }else{ 
            this.percentage = -1;
        }
    } 

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    function addItem(type, desc, value) {
        var newItem;
        var ID = 0;

        if(data.allItem[type].length > 0){
            var lastIndex = data.allItem[type].length - 1;
            ID = data.allItem[type][lastIndex].id + 1;
        } else{
            ID = 0;
        }

        if(type === "inc") {
            newItem = new Income(ID, desc, parseFloat(value));
        }else if (type === "exp"){
            newItem = new Expense(ID, desc, parseFloat(value));
        }

        data.allItem[type].push(newItem);

        return newItem;
    }

    function deleteBudget(type, id) {
        var ids, index;
        ids = data.allItem[type].map( function(item){
            return item.id
        })

        index = ids.indexOf(id);

        if(index != -1) {
            data.allItem[type].splice(index, 1);
        }
    }

    function calculateTotalSum(type) {
        var sum = 0;

        data.allItem[type].forEach(function(item){
            sum = sum + item.value;
        });
        return  sum;
    }

    function calculateBudget() {
        // Расчитываем все расходы
        data.totals.inc = calculateTotalSum("inc");

        // Расчитываем все расходы
        data.totals.exp = calculateTotalSum("exp");

        // Расчитываем бюджет 
        data.budget = data.totals.inc - data.totals.exp;

        if(data.totals.inc > 0){
            // Расчитываем % расходов от общего бюджета
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        }else {
            data.percentage = -1;
        }
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalsInc: data.totals.inc,
            totalsExp: data.totals.exp,
            percentage: data.percentage
        }
    }

    function calculatePercentages() {
        data.allItem.exp.forEach(function(item) {
            item.calcPercentage(data.totals.inc);
        })
    }
    
    function getAllIdsAndPercentages() {
        var allPers = data.allItem.exp.map(function(item) {
            return [item.id, item.percentage];
        })
        return allPers;
    }

    var data = {
        allItem: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: addItem,
        deleteBudget: deleteBudget,
        calculateBudget: calculateBudget,
        getBudget:  getBudget,
        calculatePercentages: calculatePercentages,
        getAllIdsAndPercentages: getAllIdsAndPercentages,
        test: function() {
            console.log(data);
        }
    }

}();