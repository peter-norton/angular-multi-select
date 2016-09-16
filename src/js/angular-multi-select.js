/*
 Multiple-select directive for AngularJS
 (c) 2013 Alec LaLonde (https://github.com/alalonde/angular-multi-select)
 License: MIT
 */
(function (angular) {
    'use strict';

    angular.module('multi-select', ["template/multiSelect.html"])
        .directive('multiSelect', ['$q', '$parse', function ($q, $parse) {

            function getAvailableCountries() {
              var countries = [
                ["Afghanistan", "AF", "AFG", "004"],
                ["Aland Islands", "AX", "ALA", "248"],
                ["Albania", "AL", "ALB", "008"],
                ["Algeria", "DZ", "DZA", "012"],
                ["American Samoa", "AS", "ASM", "016"],
                ["Andorra", "AD", "AND", "020"],
                ["Angola", "AO", "AGO", "024"],
                ["Anguilla", "AI", "AIA", "660"],
                ["Antarctica", "AQ", "ATA", "010"],
                ["Antigua and Barbuda", "AG", "ATG", "028"],
                ["Argentina", "AR", "ARG", "032"],
                ["Armenia", "AM", "ARM", "051"],
                ["Aruba", "AW", "ABW", "533"],
                ["Australia", "AU", "AUS", "036"],
                ["Austria", "AT", "AUT", "040"],
                ["Azerbaijan", "AZ", "AZE", "031"],
                ["Bahamas", "BS", "BHS", "044"],
                ["Bahrain", "BH", "BHR", "048"],
                ["Bangladesh", "BD", "BGD", "050"],
                ["Barbados", "BB", "BRB", "052"],
                ["Belarus", "BY", "BLR", "112"],
                ["Belgium", "BE", "BEL", "056"],
                ["Belize", "BZ", "BLZ", "084"],
                ["Benin", "BJ", "BEN", "204"],
                ["Bermuda", "BM", "BMU", "060"],
                ["Bhutan", "BT", "BTN", "064"],
                ["Bolivia", "BO", "BOL", "068"],
                ["Bosnia and Herzegovina", "BA", "BIH", "070"],
                ["Botswana", "BW", "BWA", "072"],
                ["Bouvet Island", "BV", "BVT", "074"],
                ["Brazil", "BR", "BRA", "076"],
                ["British Virgin Islands", "VG", "VGB", "092"],
                ["British Indian Ocean Territory", "IO", "IOT", "086"],
                ["Brunei Darussalam", "BN", "BRN", "096"],
                ["Bulgaria", "BG", "BGR", "100"],
                ["Burkina Faso", "BF", "BFA", "854"],
                ["Burundi", "BI", "BDI", "108"],
                ["Cambodia", "KH", "KHM", "116"],
                ["Cameroon", "CM", "CMR", "120"],
                ["Canada", "CA", "CAN", "124"],
                ["Cape Verde", "CV", "CPV", "132"],
                ["Cayman Islands", "KY", "CYM", "136"],
                ["Central African Republic", "CF", "CAF", "140"],
                ["Chad", "TD", "TCD", "148"],
                ["Chile", "CL", "CHL", "152"],
                ["China", "CN", "CHN", "156"],
                ["Hong Kong, Special Administrative Region of China", "HK", "HKG", "344"],
                ["Macao, Special Administrative Region of China", "MO", "MAC", "446"],
                ["Christmas Island", "CX", "CXR", "162"],
                ["Cocos (Keeling) Islands", "CC", "CCK", "166"],
                ["Colombia", "CO", "COL", "170"],
                ["Comoros", "KM", "COM", "174"],
                ["Congo (Brazzaville)", "CG", "COG", "178"],
                ["Congo, Democratic Republic of the", "CD", "COD", "180"],
                ["Cook Islands", "CK", "COK", "184"],
                ["Costa Rica", "CR", "CRI", "188"],
                ["Côte d'Ivoire", "CI", "CIV", "384"],
                ["Croatia", "HR", "HRV", "191"],
                ["Cuba", "CU", "CUB", "192"],
                ["Cyprus", "CY", "CYP", "196"],
                ["Czech Republic", "CZ", "CZE", "203"],
                ["Denmark", "DK", "DNK", "208"],
                ["Djibouti", "DJ", "DJI", "262"],
                ["Dominica", "DM", "DMA", "212"],
                ["Dominican Republic", "DO", "DOM", "214"],
                ["Ecuador", "EC", "ECU", "218"],
                ["Egypt", "EG", "EGY", "818"],
                ["El Salvador", "SV", "SLV", "222"],
                ["Equatorial Guinea", "GQ", "GNQ", "226"],
                ["Eritrea", "ER", "ERI", "232"],
                ["Estonia", "EE", "EST", "233"],
                ["Ethiopia", "ET", "ETH", "231"],
                ["Falkland Islands (Malvinas)", "FK", "FLK", "238"],
                ["Faroe Islands", "FO", "FRO", "234"],
                ["Fiji", "FJ", "FJI", "242"],
                ["Finland", "FI", "FIN", "246"],
                ["France", "FR", "FRA", "250"],
                ["French Guiana", "GF", "GUF", "254"],
                ["French Polynesia", "PF", "PYF", "258"],
                ["French Southern Territories", "TF", "ATF", "260"],
                ["Gabon", "GA", "GAB", "266"],
                ["Gambia", "GM", "GMB", "270"],
                ["Georgia", "GE", "GEO", "268"],
                ["Germany", "DE", "DEU", "276"],
                ["Ghana", "GH", "GHA", "288"],
                ["Gibraltar", "GI", "GIB", "292"],
                ["Greece", "GR", "GRC", "300"],
                ["Greenland", "GL", "GRL", "304"],
                ["Grenada", "GD", "GRD", "308"],
                ["Guadeloupe", "GP", "GLP", "312"],
                ["Guam", "GU", "GUM", "316"],
                ["Guatemala", "GT", "GTM", "320"],
                ["Guernsey", "GG", "GGY", "831"],
                ["Guinea", "GN", "GIN", "324"],
                ["Guinea-Bissau", "GW", "GNB", "624"],
                ["Guyana", "GY", "GUY", "328"],
                ["Haiti", "HT", "HTI", "332"],
                ["Heard Island and Mcdonald Islands", "HM", "HMD", "334"],
                ["Holy See (Vatican City State)", "VA", "VAT", "336"],
                ["Honduras", "HN", "HND", "340"],
                ["Hungary", "HU", "HUN", "348"],
                ["Iceland", "IS", "ISL", "352"],
                ["India", "IN", "IND", "356"],
                ["Indonesia", "ID", "IDN", "360"],
                ["Iran, Islamic Republic of", "IR", "IRN", "364"],
                ["Iraq", "IQ", "IRQ", "368"],
                ["Ireland", "IE", "IRL", "372"],
                ["Isle of Man", "IM", "IMN", "833"],
                ["Israel", "IL", "ISR", "376"],
                ["Italy", "IT", "ITA", "380"],
                ["Jamaica", "JM", "JAM", "388"],
                ["Japan", "JP", "JPN", "392"],
                ["Jersey", "JE", "JEY", "832"],
                ["Jordan", "JO", "JOR", "400"],
                ["Kazakhstan", "KZ", "KAZ", "398"],
                ["Kenya", "KE", "KEN", "404"],
                ["Kiribati", "KI", "KIR", "296"],
                ["Korea, Democratic People's Republic of", "KP", "PRK", "408"],
                ["Korea, Republic of", "KR", "KOR", "410"],
                ["Kuwait", "KW", "KWT", "414"],
                ["Kyrgyzstan", "KG", "KGZ", "417"],
                ["Lao PDR", "LA", "LAO", "418"],
                ["Latvia", "LV", "LVA", "428"],
                ["Lebanon", "LB", "LBN", "422"],
                ["Lesotho", "LS", "LSO", "426"],
                ["Liberia", "LR", "LBR", "430"],
                ["Libya", "LY", "LBY", "434"],
                ["Liechtenstein", "LI",  "LIE", "438"],
                ["Lithuania", "LT",  "LTU", "440"],
                ["Luxembourg", "LU",  "LUX", "442"],
                ["Macedonia, Republic of", "MK",  "MKD", "807"],
                ["Madagascar", "MG",  "MDG", "450"],
                ["Malawi", "MW",  "MWI", "454"],
                ["Malaysia", "MY",  "MYS", "458"],
                ["Maldives", "MV",  "MDV", "462"],
                ["Mali", "ML",  "MLI", "466"],
                ["Malta", "MT",  "MLT", "470"],
                ["Marshall Islands", "MH",  "MHL", "584"],
                ["Martinique", "MQ",  "MTQ", "474"],
                ["Mauritania", "MR",  "MRT", "478"],
                ["Mauritius", "MU",  "MUS", "480"],
                ["Mayotte", "YT",  "MYT", "175"],
                ["Mexico", "MX",  "MEX", "484"],
                ["Micronesia, Federated States of", "FM",  "FSM", "583"],
                ["Moldova", "MD",  "MDA", "498"],
                ["Monaco", "MC",  "MCO", "492"],
                ["Mongolia", "MN",  "MNG", "496"],
                ["Montenegro", "ME",  "MNE", "499"],
                ["Montserrat", "MS",  "MSR", "500"],
                ["Morocco", "MA",  "MAR", "504"],
                ["Mozambique", "MZ",  "MOZ", "508"],
                ["Myanmar", "MM",  "MMR", "104"],
                ["Namibia", "NA",  "NAM", "516"],
                ["Nauru", "NR",  "NRU", "520"],
                ["Nepal", "NP",  "NPL", "524"],
                ["Netherlands", "NL",  "NLD", "528"],
                ["Netherlands Antilles", "AN",  "ANT", "530"],
                ["New Caledonia", "NC",  "NCL", "540"],
                ["New Zealand", "NZ",  "NZL", "554"],
                ["Nicaragua", "NI",  "NIC", "558"],
                ["Niger", "NE",  "NER", "562"],
                ["Nigeria", "NG",  "NGA", "566"],
                ["Niue", "NU",  "NIU", "570"],
                ["Norfolk Island", "NF",  "NFK", "574"],
                ["Northern Mariana Islands", "MP",  "MNP", "580"],
                ["Norway", "NO",  "NOR", "578"],
                ["Oman", "OM",  "OMN", "512"],
                ["Pakistan", "PK",  "PAK", "586"],
                ["Palau", "PW",  "PLW", "585"],
                ["Palestinian Territory, Occupied", "PS",  "PSE", "275"],
                ["Panama", "PA",  "PAN", "591"],
                ["Papua New Guinea", "PG",  "PNG", "598"],
                ["Paraguay", "PY",  "PRY", "600"],
                ["Peru", "PE",  "PER", "604"],
                ["Philippines", "PH",  "PHL", "608"],
                ["Pitcairn", "PN",  "PCN", "612"],
                ["Poland", "PL",  "POL", "616"],
                ["Portugal", "PT",  "PRT", "620"],
                ["Puerto Rico", "PR",  "PRI", "630"],
                ["Qatar", "QA",  "QAT", "634"],
                ["Réunion", "RE",  "REU", "638"],
                ["Romania", "RO",  "ROU", "642"],
                ["Russian Federation", "RU",  "RUS", "643"],
                ["Rwanda", "RW",  "RWA", "646"],
                ["Saint-Barthélemy", "BL",  "BLM", "652"],
                ["Saint Helena", "SH",  "SHN", "654"],
                ["Saint Kitts and Nevis", "KN",  "KNA", "659"],
                ["Saint Lucia", "LC",  "LCA", "662"],
                ["Saint-Martin (French part)", "MF",  "MAF", "663"],
                ["Saint Pierre and Miquelon", "PM",  "SPM", "666"],
                ["Saint Vincent and Grenadines", "VC",  "VCT", "670"],
                ["Samoa", "WS",  "WSM", "882"],
                ["San Marino", "SM",  "SMR", "674"],
                ["Sao Tome and Principe", "ST",  "STP", "678"],
                ["Saudi Arabia", "SA",  "SAU", "682"],
                ["Senegal", "SN",  "SEN", "686"],
                ["Serbia", "RS",  "SRB", "688"],
                ["Seychelles", "SC",  "SYC", "690"],
                ["Sierra Leone", "SL",  "SLE", "694"],
                ["Singapore", "SG",  "SGP", "702"],
                ["Slovakia", "SK",  "SVK", "703"],
                ["Slovenia", "SI",  "SVN", "705"],
                ["Solomon Islands", "SB",  "SLB", "090"],
                ["Somalia", "SO",  "SOM", "706"],
                ["South Africa", "ZA",  "ZAF", "710"],
                ["South Georgia and the South Sandwich Islands", "GS",  "SGS", "239"],
                ["South Sudan", "SS",  "SSD", "728"],
                ["Spain", "ES",  "ESP", "724"],
                ["Sri Lanka", "LK",  "LKA", "144"],
                ["Sudan", "SD",  "SDN", "736"],
                ["Suriname *", "SR",  "SUR", "740"],
                ["Svalbard and Jan Mayen Islands", "SJ",  "SJM", "744"],
                ["Swaziland", "SZ",  "SWZ", "748"],
                ["Sweden", "SE",  "SWE", "752"],
                ["Switzerland", "CH",  "CHE", "756"],
                ["Syrian Arab Republic (Syria)", "SY",  "SYR", "760"],
                ["Taiwan, Republic of China", "TW",  "TWN", "158"],
                ["Tajikistan", "TJ",  "TJK", "762"],
                ["Tanzania *, United Republic of", "TZ",  "TZA", "834"],
                ["Thailand", "TH",  "THA", "764"],
                ["Timor-Leste", "TL",  "TLS", "626"],
                ["Togo", "TG",  "TGO", "768"],
                ["Tokelau", "TK",  "TKL", "772"],
                ["Tonga", "TO",  "TON", "776"],
                ["Trinidad and Tobago", "TT",  "TTO", "780"],
                ["Tunisia", "TN",  "TUN", "788"],
                ["Turkey", "TR",  "TUR", "792"],
                ["Turkmenistan", "TM",  "TKM", "795"],
                ["Turks and Caicos Islands", "TC",  "TCA", "796"],
                ["Tuvalu", "TV",  "TUV", "798"],
                ["Uganda", "UG",  "UGA", "800"],
                ["Ukraine", "UA",  "UKR", "804"],
                ["United Arab Emirates", "AE",  "ARE", "784"],
                ["United Kingdom", "GB",  "GBR", "826"],
                ["United States of America", "US",  "USA", "840"],
                ["United States Minor Outlying Islands", "UM",  "UMI", "581"],
                ["Uruguay", "UY",  "URY", "858"],
                ["Uzbekistan", "UZ",  "UZB", "860"],
                ["Vanuatu", "VU",  "VUT", "548"],
                ["Venezuela (Bolivarian Republic of)", "VE",  "VEN", "862"],
                ["Viet Nam", "VN",  "VNM", "704"],
                ["Virgin Islands, US", "VI",  "VIR", "850"],
                ["Wallis and Futuna Islands", "WF",  "WLF", "876"],
                ["Western Sahara", "EH",  "ESH", "732"],
                ["Yemen", "YE",  "YEM", "887"],
                ["Zambia", "ZM",  "ZMB", "894"],
                ["Zimbabwe", "ZW",  "ZWE", "716"]
              ];

              var countryObjs = [];
              for (var i = 0; i < countries.length; i++) {
                var c = countries[i];
                countryObjs.push({
                  name: c[0],
                  alpha2: c[1],
                  alpha3: c[2],
                  numeric: c[3],
                });
              }
              return countryObjs;
            }

            function appendSelected(entities) {
                var newEntities = [];
                angular.forEach(entities, function (entity) {
                    var appended = entity;
                    appended.selected = false;
                    newEntities.push(appended);
                });
                return newEntities;
            }

            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    selectedLabel: "@",
                    availableLabel: "@",
                    selectedPlaceholder:"@",
                    availablePlaceholder:"@",
                    model: "=ngModel",
                    config: "="
                },
                templateUrl: "template/multiSelect.html",
                link: function (scope, elm, attrs, controllers) {
                    scope.available = getAvailableCountries();
                    scope.selected = {
                        available: [],
                        current: []
                    };

                    if (!scope.selectedLabel) { scope.selectedLabel = "Selected"; }
                    if (!scope.availableLabel) { scope.availableLabel = "Available"; }
                    if (!scope.selectedPlaceholder) { scope.selectedPlaceholder = "Search"; }
                    if (!scope.availablePlaceholder) { scope.availablePlaceholder = "Search"; }

                    /* Filters out items in original that are also in toFilter. Compares by reference. */
                    function filterOut(original, toFilter) {
                        var filtered = [];
                        angular.forEach(original, function (entity) {
                            var match = false;
                            for (var i = 0; i < toFilter.length; i++) {
                                if (scope.renderItem(toFilter[i]) == scope.renderItem(entity)) {
                                    match = true;
                                    break;
                                }
                            }
                            if (!match) {
                                filtered.push(entity);
                            }
                        });
                        return filtered;
                    }

                    function parseExpression(item, expr) {
                        var displayComponents = expr.match(/(.+)\s+as\s+(.+)/);
                        var ctx = {};
                        ctx[displayComponents[1]] = item;
                        return $parse(displayComponents[2])(ctx);
                    }

                    var requiredMin, inputModel;

                    function ensureMinSelected() {
                        if (requiredMin && scope.model) {
                            scope.numSelected = scope.model.length;
                            inputModel.$setValidity('min', scope.numSelected >= requiredMin);
                        }
                    }

                    scope.refreshAvailable = function () {
                        if (scope.model && scope.available) {
                            scope.available = filterOut(scope.available, scope.model);
                            scope.selected.available = appendSelected(scope.available);
                            scope.selected.current = appendSelected(scope.model);
                        }
                    };

                    scope.add = function () {
                        if (!scope.model.length)
                            scope.model = [];
                        scope.model = scope.model.concat(scope.selected(scope.selected.available));
                    };
                    scope.addAll = function () {
                        if (!scope.model.length) {
                            scope.model = [];
                        }
                        scope.model = scope.model.concat(scope.available);
                    };
                    scope.remove = function () {
                        var selected = scope.selected(scope.selected.current);
                        scope.available = scope.available.concat(selected);
                        scope.model = filterOut(scope.model, selected);
                    };
                    scope.removeAll = function () {
                        scope.available = scope.available.concat(scope.model);
                        scope.model = filterOut(scope.model, scope.model);
                    };
                    scope.selected = function (list) {
                        var found = [];
                        angular.forEach(list, function (item) {
                            if (item.selected === true) found.push(item);
                        });
                        return found;
                    };

                    //Watching the model, updating if the model is a resolved promise
                    scope.watchModel = function () {
                        if (scope.model && scope.model.hasOwnProperty('$promise') && !scope.model.$resolved) {
                            scope.model.then(function (results) {
                                scope.$watch('model', scope.watchModel);
                            });
                        }
                        else {
                            scope.refreshAvailable();
                            scope.$watch('model', scope.refreshAvailable);
                        }
                    };

                    //Watching the list of available items. Updating if it is a resolved promise, and refreshing the
                    //available list if the list has changed
                    var _oldAvailable = {};
                    scope.watchAvailable = function () {
                        if (scope.available && scope.available.hasOwnProperty('$promise') && !scope.available.$resolved) {
                            scope.available.$promise.then(function (results) {
                                scope.$watch('available', scope.watchAvailable);
                            });
                        }
                        else {
                            //We only want to refresh the list if the list of available items has changed
                            //and the variable is defined
                            if (scope.available && scope.available != _oldAvailable) {
                                scope.refreshAvailable();
                                _oldAvailable = scope.available;
                            }
                        }
                    };

                    scope.$watch("available", scope.watchAvailable);
                    scope.$watch("model", scope.watchModel);

                    scope.renderItem = function (item) {
                        return parseExpression(item, attrs.display);
                    };

                    scope.renderTitle = function (item) {
                        if (attrs.title) {
                            return parseExpression(item, attrs.title);
                        }
                        return "";
                    };

                    if (scope.config && angular.isDefined(scope.config.requiredMin)) {
                        var inputs = elm.find("input");
                        var validationInput = angular.element(inputs[inputs.length - 1]);
                        inputModel = validationInput.controller('ngModel');
                    }

                    scope.$watch('config.requiredMin', function (value) {
                        if (angular.isDefined(value)) {
                            requiredMin = parseInt(value, 10);
                            ensureMinSelected();
                        }
                    });

                    scope.$watch('model', function (selected) {
                        ensureMinSelected();
                    });
                }
            };
        }]);

    angular.module("template/multiSelect.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/multiSelect.html",
            '<div class="multiSelect">' +
            '<div class="select">' +
            '<label class="control-label" for="multiSelectAvailable">{{ availableLabel }} ' +
            '{{ availableLabel==""?"": "(" +available.length +")" }}</label>' +
            '<input ng-model="searchAvailable" class="search" placeholder="{{availablePlaceholder}}">' +
                '<ul class = "availableList">' +
                    '<li ng-repeat="entity in available|filter:searchAvailable" ng-class="{\'selected\':selected.available[$index].selected}">' +
                        '<div class="flag" id="{{entity.alpha3}}"></div>' +
                        '<label class="checkbox" title="{{ renderTitle(entity) }}">' +
                            '<input type="checkbox" ng-model="selected.available[$index].selected"> ' +
                         '{{ renderItem(entity) }}' +
                        '</label>' +
                    '</li>' +
                '</ul>' +
            '</div>' +

            '<div class="select buttons">' +
                '<button class="btn mover left" ng-click="remove()" title="Remove selected" ' +
                    'ng-disabled="!selected(selected.current).length">' +
                    '<i class="fa fa-chevron-left"></i>' +
                '</button>' +
                '<button class="btn mover left-all" ng-click="removeAll()" title="Remove selected" ' +
                    'ng-disabled="!model.length">' +
                    '<i class="fa fa-chevron-left first"></i>' +
                    '<i class="fa fa-chevron-left second"></i>' +
                '</button>' +
                '<button class="btn mover right" ng-click="add()" title="Add selected" ' +
                    'ng-disabled="!selected(selected.available).length">' +
                    '<i class="fa fa-chevron-right"></i>' +
                '</button>' +
                '<button class="btn mover right-all" ng-click="addAll()" title="Add selected" ' +
                    'ng-disabled="!available.length">' +
                    '<i class="fa fa-chevron-right first"></i>' +
                    '<i class="fa fa-chevron-right second"></i>' +
                '</button>' +
                '</div>' +
            '<div class="select">' +
                '<label class="control-label" for="multiSelectSelected">{{ selectedLabel }} ' +
                    '{{selectedLabel==""?"":"("+model.length+")"}}</label>' +
                    '<input ng-model="searchSelected" class="search" placeholder="{{selectedPlaceholder}}">' +
                    '<ul class ="selectedList">' +
                        '<li ng-repeat="entity in model | filter:searchSelected" ng-class="{\'selected\':selected.current[$index].selected}">' +
                            '<div class="flag" id="{{entity.alpha3}}"></div>' +
                            '<label class="checkbox" title="{{ renderTitle(entity) }}">' +
                               '<input type="checkbox" ng-model="selected.current[$index].selected"> ' +
                                '{{ renderItem(entity) }}' +
                            '</label>' +
                        '</li>' +
                    '</ul>' +
                    '</ul>' +
            '</div>' +
            '<input type="number" name="numSelected" ng-model="numSelected" ' +
            'style="display: none">' +
            '</div>');
    }])
    ;
})(angular);