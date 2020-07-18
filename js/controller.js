var controller = function(budgetCtrl, uiCtrl) {

    function setupEventListeners() {
        var DOM = uiCtrl.getDomstrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);

        // Отслеживаем клик на контенере с записями
        document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem);
    }

    function ctrlAddItem (event) {
        event.preventDefault();

        //1. Получаем данные из формы
        var input = uiCtrl.getInput();
        console.log(input);

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Добавляем полученные данные в модель
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();

            //3. Добавляем запись в UI  
            uiCtrl.renderListItem(newItem, input.type);
            generateTestData.init();
            // uiCtrl.clearFields();

            //4. Пересчитываем и обновляем бюджет
            updateBudget();

            //5. Пересчитываем проценты
            updatePersantages();
        }

    };

    function ctrlDeleteItem(event) {
        var itemID, splitID, type, ID;

        // Проверяем произошел ли клик по кнопке удалить или внутри нее
        if(event.target.closest(".item__remove")) {
            // 1. Нахадим id лишки, в которой находиться кнопка и которую необходимо удалить
            itemID = event.target.closest("li.budget-list__item").id;

            splitID = itemID.split("-");

            // Разбиваем полученный id на type и на номер id
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 2. Удаляем запись из модели
            budgetCtrl.deleteBudget(type, ID);

            //3. Удаляем запись из шаблона
            uiCtrl.deleteListItem(itemID);

             //4. Пересчитываем и обновляем бюджет
            updateBudget();

            //5. Пересчитываем проценты
            updatePersantages();
        }
    }

    function updateBudget() {
        // 1. Расчитать бюджет в модели
        budgetCtrl.calculateBudget();

        // 2. Получить расчитанный бюджет из модели
        var budgetObj = budgetCtrl.getBudget();

        // 3. Отобразить бюджет в шаблоне
        uiCtrl.updateBudget(budgetObj);
    }

    function updatePersantages() {
        //1. В модели посчитать проценты для каждой записи типа exp
        budgetCtrl.calculatePercentages();
        
        //2. Получить данные по процентам из модели 
        var idsAndPercentages = budgetCtrl.getAllIdsAndPercentages()
      
        //3. Передать данные по процентам в шаблон и обновить их там 
        uiCtrl.updateItemsPercentages(idsAndPercentages);
    }

    return {
        init: function(){
            console.log("APP started!")
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updateBudget({
                budget: 0,
                totalsInc: 0,
                totalsExp: 0,
                percentage: 0
            })
        }
    }

}(modelController, viewController);

controller.init();