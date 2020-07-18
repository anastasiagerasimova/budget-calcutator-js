 var generateTestData = function() {
    var ExampeItem = function(type, desc, sum) {
        this.type = type;
        this.desc = desc;
        this.sum = sum;
     };
    
     var testData = [
         new ExampeItem("inc", "Зарплата", 700),
         new ExampeItem("inc", "Фриланс", 500),
         new ExampeItem("inc", "Партнерская программа", 200),
         new ExampeItem("inc", "Продажи digital", 100),
         new ExampeItem("exp", "Бензин", 50),
         new ExampeItem("exp", "Продукты", 100),
         new ExampeItem("exp", "Рента", 40),
         new ExampeItem("exp", "Развлечения", 70)
     ];
    
     function getRandomInt(max) {
        return Math.floor(Math.random() * max);
     }
    
    function insertInUI() {
        var random = getRandomInt(testData.length);
        var randomItem = testData[random];
    
        document.querySelector("#input__type").value = randomItem.type;
        document.querySelector("#input__description").value = randomItem.desc;
        document.querySelector("#input__value").value = randomItem.sum;
    }
    
    return {
        init: insertInUI
    }
 }();
 generateTestData.init();