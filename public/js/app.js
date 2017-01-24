angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    vins: function(Vins) {
                        return Vins.getVins();
                    }
                }
            })
            .when("/new/vin", {
                controller: "NewVinController",
                templateUrl: "vin-form.html"
            })
            .when("/vin/:vinId", {
                controller: "EditVinController",
                templateUrl: "vin.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Vins", function($http) {
        this.getVins = function() {
            return $http.get("/vins").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Impossible de récupérer les vins.");
                });
        }
        this.createVins = function(vin) {
            return $http.post("/vins", vin).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Impossible de créer le vin.");
                });
        }
        this.getVin = function(vinId) {
            var url = "/vins/" + vinId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Impossible de trouver le vin.");
                });
        }
        this.editVin = function(vin) {
            var url = "/vins/" + vin._id;
            console.log(vin._id);
            return $http.put(url, vin).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Impossible de mettre à jour le vin.");
                    console.log(response);
                });
        }
        this.deleteVin = function(vinId) {
            var url = "/vins/" + vinId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Impossible de supprimer le vin.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(vins, $scope) {
        $scope.vins = vins.data;
    })
    .controller("NewVinController", function($scope, $location, Vins) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveVin = function(vin) {
            Vins.createVin(vin).then(function(doc) {
                var contactUrl = "/vin/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditVinController", function($scope, $routeParams, Vins) {
        Vins.getVin($routeParams.vinId).then(function(doc) {
            $scope.vin = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "vin-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveVin = function(vin) {
            Vins.editVin(vin);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteVin = function(vinId) {
            Vins.deleteContact(vinId);
        }
    });
