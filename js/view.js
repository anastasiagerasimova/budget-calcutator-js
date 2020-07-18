var viewController = function() {
    var DOMstrings = {
        form: "#budget-form",
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        incomeContainer: "#income__list",
        expensesContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expenseLabel: "#expense-label",
        expencePercentLabel: "#expence-percent-label",
        budgetTable: "#budget-table",
        monthLabel: "#month",
        yearLabel: "#year",
    }

    function getDomstrings() {
        return DOMstrings;
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
        }
    }

    // ф-я formatNumberприменяется перед вставкой цифр в приложение в шаблоны записей и в общий бюджет displayBudget
    // Приватная ф-я Шаблона
    function formatNumber(num, type) {
        var numSplit, int, dec, newInt, resultNumber;
        // Приводим полученное число к его абсолютному значению
        num = Math.abs(num);

        // Приводим число, к 2 чиселам после десятичной точки.
        num = num.toFixed(2);

        // Разделяем число на две части: на целую часть и дробную часть
        numSplit = num.split(".");
        // На выходе получаем массив, где первый элемент - это целая часить, второй элемент - дробная часть
        int = numSplit[0];
        dec = numSplit[1];

        // Если длина вводимого числа > 3
        if(int.length > 3){
            newInt = "";

            // Разбиваем число на части по 3 значения начиная с конца. В начало каждой части прибавляем ,
            for (var i = 0; i < int.length/3; i++) {
                newInt = "," + int.substring(int.length - 3 * (i + 1), int.length - i * 3) + newInt;
            }

            //Если строка начинается с , удаляем ее
            if(newInt[0] === ",") {
                newInt = newInt.substring(1)
            }

        // Если длина вводимого числа = 0
        } else if(int.length === 0){
            newInt = "0";

        // Если длина вводимого числа < 3
        }else {
            newInt = int;
        }

        resultNumber = newInt + "." + dec;

        if(type === "inc"){
            resultNumber = "+ " + resultNumber;
        } else if(type === "exp") {
            resultNumber = "- " + resultNumber;
        }

        return resultNumber;
    }

    function renderListItem(obj, type) {
        var containerElement, html;
  
        if(type === "inc") {
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        }else if (type === "exp"){
            containerElement = DOMstrings.expensesContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }
        var newHtml = html.replace("%id%",  obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type)); //Вызываем formatNumber в выводе value в записях

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);
    }

    function clearFields() {
        var inputDesc = document.querySelector(DOMstrings.inputDescription);
        var inputValue = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = "";
        inputValue.value = "";

        inputDesc.focus();
    }

    function updateBudget(obj) {
        var type;

        // Определение типа для передачи ф-ии formatNumber
        if(obj.budget > 0){
            type = "inc";
        }else{
            type = "exp";
        }

        //Вызываем formatNumber в выводе значений бюджета в шапке
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalsInc, "inc");
        document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalsExp, "exp");

        if(obj.percentage > 0) {
            document.querySelector(DOMstrings.expencePercentLabel).textContent = obj.percentage + "%";
        }else{
            document.querySelector(DOMstrings.expencePercentLabel).textContent = "--";
        }
    }

    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    }

    function updateItemsPercentages(items){
        items.forEach(function(item) {
            var el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent");

            // Проверяем равны ли проценты флагу -1 или проценты >= 0
            if(item[1] >= 0){
                el.parentElement.style.display = "block"
                el.textContent = item[1] + "%";
            }else {
                el.parentElement.style.display = "none";
            }
        });

    }

    function displayMonth(){
        var now, year, month

        now = new Date();
        // Возвращает поле года в объекте Date
        year = now.getFullYear();
        //возвращает значение поля месяца объекта Date. Возвращаемое значение может принимать значения от 0 (январь) до 11 (декабрь).
        month = now.getMonth();

        monthArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        month =  monthArray[month];

        document.querySelector(DOMstrings.monthLabel).textContent = month;
        document.querySelector(DOMstrings. yearLabel).textContent = year;
    }

    return {
        getDomstrings: getDomstrings,
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth
    }
}();