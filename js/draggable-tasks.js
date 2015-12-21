(function(angular) {
    'use strict';
    angular.module('sort', ['angular-sortable-view'])
        .controller('DraggableTasks', ['$scope', '$http', function($scope, $http) {

            // default number of hours
            $scope.hours = 1;

            // know today
            $scope.date = new Date();

            // message is empty per default
            $scope.message = "";

            // define universal save function
            $scope.save = function(target, data) {
                $scope.message = "Speichere...";
                var successCallback = function(response) {
                    $scope.message = "Gespeichert."
                };
                var errorCallback = function(response) {
                    $scope.message = "Speichern fehlgeschlagen.";
                    console.log(response);
                };
                $http.post(target,data).then(successCallback, errorCallback);
            };

            // register saveTasks (on sort callback)
            $scope.saveTasks = function() {
                $scope.save("json.php", $scope.tasks);
            };

            // default data
            $scope.tasks = [{
                title: "Titel",
                category: "Kategorie",
                issuer: "Auftraggeber",
                details: "Ein längerer Text, welcher die Details der Aufgabe konkretisiert."
            }];

            // load data
            var successCallback = function(response) {
                $scope.message = "Laden erfolgreich.";
                $scope.tasks = response.data;
            };
            var errorCallback = function(response) {
                $scope.message = "Laden fehlgeschlagen.";
                console.log(response);
            };
            $http.get("json.php").then(successCallback, errorCallback);

            // register add
            $scope.add = function(title, category, issuer) {
                // thanks to https://stackoverflow.com/questions/4020796
                var newId = 1+Math.max.apply(Math,$scope.tasks.map(function(t){return t.id;}));
                var newTask = {
                    id: newId,
                    title: title,
                    category: category,
                    issuer: issuer,
                    details: ""
                };
                $scope.tasks.push(newTask);
                $scope.saveTasks();
            };

            // register remove
            $scope.remove = function(index) {
                if (confirm("Wirklich entfernen?")) {
                    $scope.tasks.splice(index,1);
                    $scope.saveTasks();
                }
            };

            // register addHours
            $scope.addHours = function(index, date, hours) {
                var task = $scope.tasks[index];
                var newHours = {
                    taskId: task.id, 
                    title: task.title, // optional
                    category: task.category, // optional
                    index: index,
                    date: date,
                    hours, hours
                };
                console.log(newHours);
                $scope.save("json.php?addHours", newHours);
            };
        }])
})(window.angular);
