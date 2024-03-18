//=====================================================================================================================
// Globals
//=====================================================================================================================
// Hexagon Formulas:
// Height = (coordSpacing + 2) * dy
//        = (coordSpacing + 2) * Math.sin(Math.PI/3) * size
// Size = Height / ( (coordSpacing + 2) * Math.sin(Math.PI/3) )
// Width = (coordSpacing * dx) + (2 * size)
//       = (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2 * size) + (2 * size)
//       = ( (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2) + 2 ) * size
// Size = Width / ( (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2) + 2 )

var size = null;
const hexWidthVal = (1 + Math.cos(Math.PI / 3)) / 2;
const hexHeightVal = Math.sin(Math.PI / 3);
var dx = size * hexWidthVal;
var dy = size * hexHeightVal;

var mapCanvas;
var drawingContext;
var canvasCenterX;
var canvasCenterY;

var catanMap = new CatanMap();

var mapStyle = "new";
var defaultFillStyle = "#ffffff";
var strokeStyle = "#000000";
var lineWidth = 3;
var resourceTypeToColor = {
    "ore": "#787878",
    "clay": "#902C11",
    "wool": "#73b900",
    "wood": "#2b3914",
    "grain": "#E0E000",
    "desert": "#F2F0A0",
    "none": "#ffffff"
};

//=====================================================================================================================
// Image preload arrays
//=====================================================================================================================
var resourceTypeToImageCanvas = {
    "ore": null,
    "clay": null,
    "wool": null,
    "wood": null,
    "grain": null,
    "desert": null
};

var newResourceTypeToImageCanvas = {
    "ore": null,
    "clay": null,
    "wool": null,
    "wood": null,
    "grain": null,
    "desert": null
};

var dockTypeToImageCanvas = {
    "oredock": null,
    "claydock": null,
    "wooldock": null,
    "wooddock": null,
    "graindock": null,
    "tripledock": null
};

//=====================================================================================================================
// Map Arrays
//=====================================================================================================================
//#region Map Arrays

var normalMap = new MapDefinition();
normalMap.resourceDict = {
    "desert": 1,
    "wood": 4,
    "clay": 3,
    "wool": 4,
    "grain": 4,
    "ore": 3
};
normalMap.dockDict = {
    "wooddock": 1,
    "claydock": 1,
    "wooldock": 1,
    "graindock": 1,
    "oredock": 1,
    "tripledock": 4
};
normalMap.numberDict = {
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 1
}
normalMap.coordinatesArray = [
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [4, -2],
    [4, 0],
    [4, 2]
];

var expandedMap = new MapDefinition();
expandedMap.resourceDict = {
    "desert": 2,
    "wood": 6,
    "clay": 5,
    "wool": 6,
    "grain": 6,
    "ore": 5
}
expandedMap.dockDict = {
    "wooddock": 1,
    "claydock": 1,
    "wooldock": 2,
    "graindock": 1,
    "oredock": 1,
    "tripledock": 5
};
expandedMap.numberDict = {
    2: 2,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    8: 3,
    9: 3,
    10: 3,
    11: 3,
    12: 2
}
expandedMap.coordinatesArray = [
    [-6, -2],
    [-6, 0],
    [-6, 2],
    [-4, -3],
    [-4, -1],
    [-4, 1],
    [-4, 3],
    [-2, -4],
    [-2, -2],
    [-2, 0],
    [-2, 2],
    [-2, 4],
    [0, -5],
    [0, -3],
    [0, -1],
    [0, 1],
    [0, 3],
    [0, 5],
    [2, -4],
    [2, -2],
    [2, 0],
    [2, 2],
    [2, 4],
    [4, -3],
    [4, -1],
    [4, 1],
    [4, 3],
    [6, -2],
    [6, 0],
    [6, 2]
];

var doubleMap = new MapDefinition();
doubleMap.resourceDict = {
    "desert": 2,
    "wood": 8,
    "clay": 6,
    "wool": 8,
    "grain": 8,
    "ore": 6
}
doubleMap.dockDict = {
    "wooddock": 2,
    "claydock": 2,
    "wooldock": 2,
    "graindock": 2,
    "oredock": 2,
    "tripledock": 8
};
doubleMap.numberDict = {
    2: 2,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 2
}
doubleMap.coordinatesArray = [
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-4, -4],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-2, -5],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [0, -6],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [2, 5],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [4, 4],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3]
];

var doublePeanutMap = new MapDefinition();
doublePeanutMap.resourceDict = {
    "desert": 2,
    "wood": 8,
    "clay": 6,
    "wool": 8,
    "grain": 8,
    "ore": 6
}
doublePeanutMap.dockDict = {
    "wooddock": 2,
    "claydock": 2,
    "wooldock": 2,
    "graindock": 2,
    "oredock": 2,
    "tripledock": 8
};
doublePeanutMap.numberDict = {
    2: 2,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 2
}
doublePeanutMap.coordinatesArray = [
    [-8, 1],
    [-8, 3],
    [-8, 5],
    [-6, 0],
    [-6, 2],
    [-6, 4],
    [-6, 6],
    [-4, -1],
    [-4, 1],
    [-4, 3],
    [-4, 5],
    [-4, 7],
    [-2, 0],
    [-2, 2],
    [-2, 4],
    [-2, 6],
    [0, -5],
    [0, -3],
    [0, -1],
    [0, 1],
    [0, 3],
    [0, 5],
    [2, -6],
    [2, -4],
    [2, -2],
    [2, 0],
    [4, -7],
    [4, -5],
    [4, -3],
    [4, -1],
    [4, 1],
    [6, -6],
    [6, -4],
    [6, -2],
    [6, 0],
    [8, -5],
    [8, -3],
    [8, -1]
];

var expandedDoubleMap = new MapDefinition();
expandedDoubleMap.resourceDict = {
    "desert": 3,
    "wood": 10,
    "clay": 8,
    "wool": 10,
    "grain": 10,
    "ore": 8
}
expandedDoubleMap.dockDict = {
    "wooddock": 2,
    "claydock": 2,
    "wooldock": 3,
    "graindock": 2,
    "oredock": 2,
    "tripledock": 9
};
expandedDoubleMap.numberDict = {
    2: 3,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    8: 5,
    9: 5,
    10: 5,
    11: 5,
    12: 3
}
expandedDoubleMap.coordinatesArray = [
    [-8, -2],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-4, -4],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-2, -5],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [0, -6],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [2, 5],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [4, 4],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3],
    [8, -4],
    [8, -2],
    [8, 0],
    [8, 2]
]

var expandedDoublePeanutMap = new MapDefinition();
expandedDoublePeanutMap.resourceDict = {
    "desert": 3,
    "wood": 10,
    "clay": 8,
    "wool": 10,
    "grain": 10,
    "ore": 8
}
expandedDoublePeanutMap.dockDict = {
    "wooddock": 2,
    "claydock": 2,
    "wooldock": 3,
    "graindock": 2,
    "oredock": 2,
    "tripledock": 9
};
expandedDoublePeanutMap.numberDict = {
    2: 3,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    8: 5,
    9: 5,
    10: 5,
    11: 5,
    12: 3
}
expandedDoublePeanutMap.coordinatesArray = [
    [-10, -1],
    [-10, 1],
    [-10, 3],
    [-10, 5],
    [-8, -2],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-8, 6],
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [0, -2],
    [0, 0],
    [0, 2],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3],
    [8, -6],
    [8, -4],
    [8, -2],
    [8, 0],
    [8, 2],
    [10, -5],
    [10, -3],
    [10, -1],
    [10, 1]
];

var expandedDoubleWideMap = new MapDefinition();
expandedDoubleWideMap.resourceDict = {
    "desert": 3,
    "wood": 10,
    "clay": 8,
    "wool": 10,
    "grain": 10,
    "ore": 8
}
expandedDoubleWideMap.dockDict = {
    "wooddock": 2,
    "claydock": 2,
    "wooldock": 3,
    "graindock": 2,
    "oredock": 2,
    "tripledock": 9
};
expandedDoubleWideMap.numberDict = {
    2: 3,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    8: 5,
    9: 5,
    10: 5,
    11: 5,
    12: 3
}
expandedDoubleWideMap.coordinatesArray = [
    [-10, 1],
    [-10, 3],
    [-10, 5],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-8, 6],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-6, 7],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [6, -7],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [8, -6],
    [8, -4],
    [8, -2],
    [8, 0],
    [10, -5],
    [10, -3],
    [10, -1]
];

var triplePeanutMap = new MapDefinition();
triplePeanutMap.resourceDict = {
    "desert": 3,
    "wood": 12,
    "clay": 9,
    "wool": 12,
    "grain": 12,
    "ore": 9
}
triplePeanutMap.dockDict = {
    "wooddock": 3,
    "claydock": 3,
    "wooldock": 3,
    "graindock": 3,
    "oredock": 3,
    "tripledock": 12
};
triplePeanutMap.numberDict = {
    2: 3,
    3: 6,
    4: 6,
    5: 6,
    6: 6,
    8: 6,
    9: 6,
    10: 6,
    11: 6,
    12: 3
}
triplePeanutMap.coordinatesArray = [
    [-10, -1],
    [-10, 1],
    [-10, 3],
    [-8, -2],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-8, 6],
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-6, 7],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-4, 8],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [-2, 7],
    [0, -6],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [2, -7],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [4, -8],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [6, -7],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3],
    [8, -6],
    [8, -4],
    [8, -2],
    [8, 0],
    [8, 2],
    [10, -3],
    [10, -1],
    [10, 1]
];

var tripleWideMap = new MapDefinition();
tripleWideMap.resourceDict = {
    "desert": 3,
    "wood": 12,
    "clay": 9,
    "wool": 12,
    "grain": 12,
    "ore": 9
}
tripleWideMap.dockDict = {
    "wooddock": 3,
    "claydock": 3,
    "wooldock": 3,
    "graindock": 3,
    "oredock": 3,
    "tripledock": 12
};
tripleWideMap.numberDict = {
    2: 3,
    3: 6,
    4: 6,
    5: 6,
    6: 6,
    8: 6,
    9: 6,
    10: 6,
    11: 6,
    12: 3
}
tripleWideMap.coordinatesArray = [
    [-10, 1],
    [-10, 3],
    [-8, -2],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-8, 6],
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-6, 7],
    [-4, -4],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-2, -5],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [0, -6],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [2, 5],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [4, 4],
    [6, -7],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3],
    [8, -6],
    [8, -4],
    [8, -2],
    [8, 0],
    [8, 2],
    [10, -3],
    [10, -1]
];

var expandedTripleWideMap = new MapDefinition();
expandedTripleWideMap.resourceDict = {
    "desert": 4,
    "wood": 14,
    "clay": 11,
    "wool": 14,
    "grain": 14,
    "ore": 11
}
expandedTripleWideMap.dockDict = {
    "wooddock": 3,
    "claydock": 3,
    "wooldock": 4,
    "graindock": 3,
    "oredock": 3,
    "tripledock": 13
};
expandedTripleWideMap.numberDict = {
    2: 4,
    3: 7,
    4: 7,
    5: 7,
    6: 7,
    8: 7,
    9: 7,
    10: 7,
    11: 7,
    12: 4
}
expandedTripleWideMap.coordinatesArray = [
    [-10, -1],
    [-10, 1],
    [-10, 3],
    [-10, 5],
    [-8, -2],
    [-8, 0],
    [-8, 2],
    [-8, 4],
    [-8, 6],
    [-6, -3],
    [-6, -1],
    [-6, 1],
    [-6, 3],
    [-6, 5],
    [-6, 7],
    [-4, -4],
    [-4, -2],
    [-4, 0],
    [-4, 2],
    [-4, 4],
    [-4, 6],
    [-4, 8],
    [-2, -5],
    [-2, -3],
    [-2, -1],
    [-2, 1],
    [-2, 3],
    [-2, 5],
    [-2, 7],
    [0, -6],
    [0, -4],
    [0, -2],
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [2, -7],
    [2, -5],
    [2, -3],
    [2, -1],
    [2, 1],
    [2, 3],
    [2, 5],
    [4, -8],
    [4, -6],
    [4, -4],
    [4, -2],
    [4, 0],
    [4, 2],
    [4, 4],
    [6, -7],
    [6, -5],
    [6, -3],
    [6, -1],
    [6, 1],
    [6, 3],
    [8, -6],
    [8, -4],
    [8, -2],
    [8, 0],
    [8, 2],
    [10, -5],
    [10, -3],
    [10, -1],
    [10, 1]
];

//#endregion

//=====================================================================================================================
// Functions
//=====================================================================================================================

window.onresize = function(event) {
    sizeCanvas();
    catanMap.resize();
    catanMap.draw();
}

function init() {
    loadTileImages(function() {
        var button = $('button#gen-map-button')[0];
        $(button).click(generate);
        button.disabled = false;
        button.innerHTML = "GENERATE A NEW MAP";
    });
    addCanvas();
}

function preloadImages(arr, callback) {
    //http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml
    var newimages = [],
        loadedimages = 0;
    var postaction = function() {};
    var arr = (typeof arr != "object") ? [arr] : arr;
    function imageloadpost() {
        loadedimages++;
        if (loadedimages == arr.length) {
            callback(newimages); //call postaction and pass in newimages array as parameter
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image();
        newimages[i].src = arr[i];
        newimages[i].onload = function() {
            imageloadpost();
        }
        newimages[i].onerror = function() {
            imageloadpost();
        }
    }
}

function loadTileImages(callback) {
    // Import retro tile images
    var rTypes = [];
    var imgPaths = [];
    for (var key in resourceTypeToImageCanvas) {
        rTypes.push(key);
        imgPaths.push("images/" + key + ".png");
    }
    preloadImages(imgPaths, function(images) {
        for (var i = 0; i < imgPaths.length; i += 1) {
            var img = images[i];
            var imgCanvas = document.createElement("canvas");
            var imgContext = imgCanvas.getContext("2d");

            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
            imgContext.drawImage(img, 0, 0);

            resourceTypeToImageCanvas[rTypes[i]] = imgCanvas;
        }
        callback();
    });

    // Import new tile images
    var nrTypes = [];
    nrImgPaths = [];
    for (var key in newResourceTypeToImageCanvas) {
        nrTypes.push(key);
        nrImgPaths.push("images/new" + key + ".png");
    }
    preloadImages(nrImgPaths, function(images) {
        for (var i = 0; i < nrImgPaths.length; i += 1) {
            var img = images[i];
            var imgCanvas = document.createElement("canvas");
            var imgContext = imgCanvas.getContext("2d");

            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
            imgContext.drawImage(img, 0, 0);

            newResourceTypeToImageCanvas[nrTypes[i]] = imgCanvas;
        }
        callback();
    });

    // Import dock tile images
    var dTypes = [];
    var dImgPaths = [];
    for (var key in dockTypeToImageCanvas) {
        dTypes.push(key);
        dImgPaths.push("images/" + key + ".png");
    }
    preloadImages(dImgPaths, function(images) {
        for (var i = 0; i < dImgPaths.length; i += 1) {
            var img = images[i];
            var imgCanvas = document.createElement("canvas");
            var imgContext = imgCanvas.getContext("2d");

            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
            imgContext.drawImage(img, 0, 0);

            dockTypeToImageCanvas[dTypes[i]] = imgCanvas;
        }
        callback();
    });
}

function generate() {
    var mapDef;
    switch ($("input:radio['name=game-type']:checked").val()) {
        case "expanded":
            mapDef = expandedMap;
            break;
        case "double":
            mapDef = doubleMap;
            break;
        case "doublepeanut":
            mapDef = doublePeanutMap;
            break;
        case "expandeddouble":
            mapDef = expandedDoubleMap;
            break;
        case "expandeddoublepeanut":
            mapDef = expandedDoublePeanutMap;
            break;
        case "expandeddoublewide":
            mapDef = expandedDoubleWideMap;
            break;
        case "triplepeanut":
            mapDef = triplePeanutMap;
            break;
        case "triplewide":
            mapDef = tripleWideMap;
            break;
        case "expandedtriplewide":
            mapDef = expandedTripleWideMap;
            break;
        default:
            mapDef = normalMap;
    }

    catanMap.defineMap(mapDef);

    mapStyle = $('input[name=mapStyle]:checked').val();

    var retry;
    do {
        retry = catanMap.generate();
    } while (retry);

    catanMap.resize();
    catanMap.draw();
}

//=====================================================================================================================
// MapDefinition
//=====================================================================================================================

function MapDefinition() {
    this.resourceDict = null;
    this.numberDict = null;
    this.coordinatesArray = null;
}

MapDefinition.prototype.checkValidity = function() {
    var cArrLen = this.coordinatesArray.length;
    var rDictLen = this.sumDictVals(this.resourceDict);
    var nDictLen = this.sumDictVals(this.numberDict);
    var numDeserts = this.resourceDict["desert"];

    // Changed to allow the field to be smaller than the number of available tiles
    return (cArrLen <= rDictLen) && (rDictLen == (nDictLen + numDeserts));
}

MapDefinition.prototype.sumDictVals = function(dict) {
    var sum = 0;
    for (var key in dict) {
        sum += dict[key];
    }
    return sum;
}

//=====================================================================================================================
// CatanMap
//=====================================================================================================================

function CatanMap() {
    this.mapDefinition = null;
    this.hexTiles = null;
    this.dockHexTiles = null;
    this.coordToTile = {};
    this.coordSpan = [0, 0];
    this.coordCenter = [0, 0];
}

CatanMap.prototype.generate = function() {
    this.coordToTile = {};

    if (this.mapDefinition) {

        this.hexTiles = [];
        this.dockHexTiles = [];

        // Dock test
        // var oceanTiles = this.findUniqueAdjacentNonMapTiles();
        // console.log("Ocean: " + oceanTiles.length);
        // for (var i = 0; i < oceanTiles.length; i += 1) {
        //     var dockHexTile = new HexTile();
        //     dockHexTile.setDockType("tripledock");
        //     dockHexTile.setCoordinate.apply(dockHexTile, oceanTiles[i]);
        //     dockHexTile.dockRotation = 4;
        //     this.dockHexTiles.push(dockHexTile);
        // }

        // var coastalTiles = this.findTilesWithNotSixAdjacentTiles();
        // console.log("Coastal: " + coastalTiles.length);

        var numTiles = this.mapDefinition.coordinatesArray.length;

        var tileCoordinates = this.mapDefinition.coordinatesArray.copy();

        var tileNumbers = [];
        for (var key in this.mapDefinition.numberDict) {
            for (var i = 0; i < this.mapDefinition.numberDict[key]; i += 1) {
                tileNumbers.push(parseInt(key));
            }
        }

        var tileTypes = [];
        for (var key in this.mapDefinition.resourceDict) {
            if (key != "desert") {
                for (var i = 0; i < this.mapDefinition.resourceDict[key]; i += 1) {
                    tileTypes.push(key);
                }
            }
        }

        // Place desert tiles
        var newCoords = null;
        var numDeserts = this.mapDefinition.resourceDict["desert"];
        for (var i = 0; i < numDeserts; i += 1) {
            //console.log("Desert Count: " + (i + 1) + "/" + numDeserts);
            var desertHexTile = new HexTile();
            desertHexTile.setResourceType("desert");
            var invalid = false;
            do {
                invalid = false;
                newCoords = tileCoordinates.random(false);
                desertHexTile.setCoordinate.apply(desertHexTile, newCoords);
                if ($('input[name=desertAvoidCoast]:checked').val()) {
                    invalid |= this.isCoastal(newCoords);
                }
                if ($('input[name=desertAvoidTouching]:checked').val()) {
                    invalid |= this.hasSameTypeNeighbour(desertHexTile);
                    //console.log("Same type: " + this.hasSameTypeNeighbour(desertHexTile));
                }
            } while (invalid);
            tileCoordinates.remove(newCoords);
            desertHexTile.setCoordinate.apply(desertHexTile, newCoords);
            this.hexTiles.push(desertHexTile);
            this.coordToTile[newCoords.toString()] = desertHexTile;
        }

        if ($('input[name=preventAdjacentLowNumbers]:checked').val() == "avoid") {
            // Move all non-productive tile numbers (2 and 12) to the front
            // of the tileNumbers array
            var nonProductiveIdx = [];
            nonProductiveIdx = nonProductiveIdx.concat(tileNumbers.indexOfArray(2), tileNumbers.indexOfArray(12));
            for (var i = 0; i < nonProductiveIdx.length; i += 1) {
                tileNumbers.swap(i, nonProductiveIdx[i]);
            }
        }

        // Move all highly productive tile numbers (6 and 8) to the front
        // of the tileNumbers array
        var highlyProductiveIdx = [];
        highlyProductiveIdx = highlyProductiveIdx.concat(tileNumbers.indexOfArray(6), tileNumbers.indexOfArray(8));
        for (var i = 0; i < highlyProductiveIdx.length; i += 1) {
            tileNumbers.swap(i, highlyProductiveIdx[i]);
        }

        // Handle all other tiles
        for (var i = 0; i < (numTiles - numDeserts); i += 1) {
            var newHexTile = new HexTile();
            newHexTile.setNumber(tileNumbers[i]);
            newHexTile.setResourceType(tileTypes.random(true));

            var invalid;

            if (newHexTile.isHighlyProductive()) {
                var tmpCoords = [];
                do {
                    newCoords = tileCoordinates.random(true);
                    newHexTile.setCoordinate.apply(newHexTile, newCoords);
                    invalid = this.hasHighlyProductiveNeighbors(newHexTile);
                    if (invalid) {
                        tmpCoords.push(newCoords);
                    }
                } while (invalid);
                tileCoordinates = tileCoordinates.concat(tmpCoords);
            } else if (newHexTile.isNonProductive() && ($('input[name=preventAdjacentLowNumbers]:checked').val() == "avoid")) {
                var tmpCoords = [];
                do {
                    newCoords = tileCoordinates.random(true);
                    newHexTile.setCoordinate.apply(newHexTile, newCoords);
                    invalid = this.hasNonProductiveNeighbors(newHexTile);
                    if (invalid) {
                        tmpCoords.push(newCoords);
                    }
                } while (invalid);
                tileCoordinates = tileCoordinates.concat(tmpCoords);
            } else {
                invalid = true;
                var tmpCoords = [];
                while (invalid && tileCoordinates.length > 0) {
                    newCoords = tileCoordinates.random(true);
                    newHexTile.setCoordinate.apply(newHexTile, newCoords);
                    invalid = this.doesFormTriangle(newHexTile) || this.doesFormChain(newHexTile) || this.hasSameNumberedNeighbour(newHexTile);

                    if (invalid) {
                        if (tileCoordinates.length === 0) {
                            // console.log("gotcha! Try again!");
                            return true;
                        } else {
                            tmpCoords.push(newCoords);
                        }
                    }
                }
                tileCoordinates = tileCoordinates.concat(tmpCoords);
            }

            this.hexTiles.push(newHexTile);
            this.coordToTile[newCoords.toString()] = newHexTile;
        } // end for loop
        return false;
    } else {
        console.log("No map definition.");
        return false;
    }
}

CatanMap.prototype.defineMap = function(mapDefinition) {
    if (mapDefinition.checkValidity()) {

        this.mapDefinition = mapDefinition;

        var coordRangeX = [0, 0];
        var coordRangeY = [0, 0];

        for (var i = 0; i < mapDefinition.coordinatesArray.length; i += 1) {
            var coord = mapDefinition.coordinatesArray[i];
            coordRangeX = [Math.min(coordRangeX[0], coord[0]), Math.max(coordRangeX[1], coord[0])];
            coordRangeY = [Math.min(coordRangeY[0], coord[1]), Math.max(coordRangeY[1], coord[1])];
        }

        this.coordSpan = [coordRangeX[1] - coordRangeX[0], coordRangeY[1] - coordRangeY[0]];
        this.coordCenter = [this.coordSpan[0] / 2, this.coordSpan[1] / 2];

        //console.log("Draw: cx0:" + coordRangeX[0] + ", cx1:" + coordRangeX[1] + ", cy0:" + coordRangeY[0] + ", cy1:" + coordRangeY[1]);
    } else {
        console.log("Invalid map definition.");
    }
}

CatanMap.prototype.draw = function() {
    if (this.hexTiles) {
        drawingContext.clear();
        for (var i = 0; i < this.hexTiles.length; i += 1) {
            this.hexTiles[i].draw();
        }
    }
    if (this.dockHexTiles) {
        //drawingContext.clear();
        for (var i = 0; i < this.dockHexTiles.length; i += 1) {
            this.dockHexTiles[i].draw();
        }
    }
}

CatanMap.prototype.resize = function() {
    // Hexagon Formulas:
    // Height = (coordSpacing + 2) * dy
    //        = (coordSpacing + 2) * Math.sin(Math.PI/3) * size
    // Size = Height / ( (coordSpacing + 2) * Math.sin(Math.PI/3) )
    // Width = (coordSpacing * dx) + (2 * size)
    //       = (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2 * size) + (2 * size)
    //       = ( (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2) + 2 ) * size
    // Size = Width / ( (coordSpacing * (1 + Math.cos(Math.PI/3)) / 2) + 2 )

    var wSize = (mapCanvas.width) / ((this.coordSpan[0] + 3) * hexHeightVal);
    var hSize = (mapCanvas.height) / ((this.coordSpan[1] + 3) * hexWidthVal);
    if (mapStyle == "retro") {
        wSize = (mapCanvas.width) / ((this.coordSpan[0] + 3) * hexWidthVal);
        hSize = (mapCanvas.height) / ((this.coordSpan[1] + 3) * hexHeightVal);
    }

    //size = Math.floor(Math.min(wSize, hSize));
    size = Math.min(wSize, hSize);

    dx = size * hexWidthVal;
    dy = size * hexHeightVal;

    // console.log("Resize1: W:" + wSize + ", H:" + hSize + ", S:" + size + ", X:" + dx + ", Y:" + dy);
    // console.log("Resize2: CS0:" + this.coordSpan[0] + ", CS1:" + this.coordSpan[1] + ", wTrg:" + hexWidthVal + ", hTrg:" + hexHeightVal);
}

CatanMap.prototype.getAdjacentTilesByCoords = function(x, y) {
    var adjTiles = [];

    // (+0,+2), (+2,+1), (+2,-1), (+0,-2), (-2,-1), (-2,1)
    var xshift = [0, 2,  2,  0, -2, -2];
    var yshift = [2, 1, -1, -2, -1,  1];

    for (var i = 0; i < 6; i += 1) {
        var adjTile = this.coordToTile[[x + xshift[i], y + yshift[i]].toString()];
        // Will be null if no hex tile found at that coordinate
        if (adjTile) {
            adjTiles.push(adjTile);
        }
    }

    return adjTiles;
}

CatanMap.prototype.findTilesWithNotSixAdjacentTiles = function() {
    var result = [];

    var xshift = [0, 2,  2,  0, -2, -2];
    var yshift = [2, 1, -1, -2, -1,  1];
    
    for (var i = 0; i < this.mapDefinition.coordinatesArray.length; i++) {
        var count = 0;
        var tileCoord = this.mapDefinition.coordinatesArray[i];
        
        // Check adjacent tiles
        for (var j = 0; j < 6; j++) {
            var adjacentX = tileCoord[0] + xshift[j];
            var adjacentY = tileCoord[1] + yshift[j];
            
            // Check if the adjacent tile exists in the array
            if (this.mapDefinition.coordinatesArray.some(coord => coord[0] === adjacentX && coord[1] === adjacentY)) {
                count++;
            }
        }
        
        // If the count of adjacent tiles is not 6, add the tileCoord to the result list
        if (count !== 6) {
            result.push(tileCoord);
        }
    }
    
    return result;
}

CatanMap.prototype.findUniqueAdjacentNonMapTiles = function() {
    var result = [];
    var xshift = [0, 2,  2,  0, -2, -2];
    var yshift = [2, 1, -1, -2, -1,  1];
    
    // Function to check if a coordinate is in the coordinatesArray
    var isInCoordinatesArray = function(x, y) {
        return this.mapDefinition.coordinatesArray.some(coord => coord[0] === x && coord[1] === y);
    }.bind(this);
    
    // Function to check if a coordinate is already in the result
    var isInResult = function(x, y) {
        return result.some(coord => coord[0] === x && coord[1] === y);
    };
    
    for (var i = 0; i < this.mapDefinition.coordinatesArray.length; i++) {
        var tileCoord = this.mapDefinition.coordinatesArray[i];
        
        // Check adjacent tiles
        for (var j = 0; j < 6; j++) {
            var adjacentX = tileCoord[0] + xshift[j];
            var adjacentY = tileCoord[1] + yshift[j];
            
            // Check if the adjacent tile exists in the coordinatesArray and not in result
            if (!isInCoordinatesArray(adjacentX, adjacentY) && !isInResult(adjacentX, adjacentY)) {
                result.push([adjacentX, adjacentY]);
            }
        }
    }
    
    return result;
};

CatanMap.prototype.isCoastal = function(tileCoord) {
    var count = 0;
    var xshift = [0, 2,  2,  0, -2, -2];
    var yshift = [2, 1, -1, -2, -1,  1];
    
    // Check adjacent tiles
    for (var j = 0; j < 6; j++) {
        var adjacentX = tileCoord[0] + xshift[j];
        var adjacentY = tileCoord[1] + yshift[j];
        
        // Check if the adjacent tile exists in the array
        if (this.mapDefinition.coordinatesArray.some(coord => coord[0] === adjacentX && coord[1] === adjacentY)) {
            count++;
        }
    }
    
    return !(count === 6);
}

CatanMap.prototype.AdjacentTiles = function(tile) {
    var tileX = tile.gridX;
    var tileY = tile.gridY;

    return this.getAdjacentTilesByCoords(tileX, tileY);
}

CatanMap.prototype.getAdjacentTiles = function(tile) {
    var tileX = tile.gridX;
    var tileY = tile.gridY;

    return this.getAdjacentTilesByCoords(tileX, tileY);
}

CatanMap.prototype.hasHighlyProductiveNeighbors = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (adjacentTiles[i].isHighlyProductive()) {
            return true;
        }
    }
    return false;
}

CatanMap.prototype.hasNonProductiveNeighbors = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (adjacentTiles[i].isNonProductive()) {
            return true;
        }
    }
    return false;
}

CatanMap.prototype.hasSameNumberedNeighbour = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (tile.number === adjacentTiles[i].number) {
            return true;
        }
    }
    return false;
}

CatanMap.prototype.hasSameTypeNeighbour = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (tile.resourceType == adjacentTiles[i].resourceType) {
            return true;
        }
    }
    return false;
}

CatanMap.prototype.doesFormTriangle = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        var j = (i + 1) % adjacentTiles.length;
        if (tile.resourceType === adjacentTiles[i].resourceType && adjacentTiles[i].resourceType === adjacentTiles[j].resourceType) {
            return true;
        }
    }
    return false;
}

// TODO look into issues with this function
CatanMap.prototype.doesFormChain = function(tile) {
    var adjacentTiles = this.getAdjacentTiles(tile);

    var count = 0;
    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (tile.resourceType === adjacentTiles[i].resourceType) {
            count = count + 1;
        }
    }

    if (count >= 2) {
        //console.log("tile: " + tile.number + ", " + tile.resourceType + " -> true");
        return true;
    }

    for (var i = 0; i < adjacentTiles.length; i += 1) {
        if (tile.resourceType === adjacentTiles[i].resourceType) {
            var ad2 = this.getAdjacentTiles(adjacentTiles[i]);
            for (var j = 0; j < ad2.length; j += 1) {
                if (tile.gridX === ad2[j].gridX && tile.gridY === ad2[j].gridY) {
                    continue;
                }

                if (tile.resourceType === ad2[j].resourceType) {
                    //console.log("tile: " + tile.number + ", " + tile.resourceType + " -> true");
                    return true;
                }
            }
        }
    }

    //console.log("tile: " + tile.number + ", " + tile.resourceType + " -> false");
    return false;
}

//=====================================================================================================================
// HexTile
//=====================================================================================================================

function HexTile() {
    this.gridX;
    this.gridY;
    this.xCenter;
    this.yCenter;
    this.resourceType = "none";
    this.dockType = "none";
    this.dockRotation = 0;
    this.fillStyle = defaultFillStyle;
    this.number;
}

HexTile.prototype.strokeStyle = strokeStyle;

HexTile.prototype.lineWidth = lineWidth;

HexTile.prototype.hexColorMap = resourceTypeToColor;

HexTile.prototype.size = size;

HexTile.prototype.setResourceType = function(resourceType) {
    if (this.hexColorMap[resourceType]) {
        this.resourceType = resourceType;
        this.fillStyle = this.hexColorMap[resourceType];
    } else {
        console.log("Unrecognized resource type:", resourceType);
    }
}

HexTile.prototype.setDockType = function(dockType) {
    if (dockTypeToImageCanvas[dockType]) {
        this.dockType = dockType;
    } else {
        console.log("Unrecognized resource type:", dockType);
    }
}

HexTile.prototype.isHighlyProductive = function() {
    return ((this.number == 6) || (this.number == 8));
}

HexTile.prototype.isNonProductive = function() {
    return ((this.number == 2) || (this.number == 12));
}

HexTile.prototype.setNumber = function(number) {
    this.number = number;
}

HexTile.prototype.setCoordinate = function(x, y) {
    this.gridX = x;
    this.gridY = y;
}

HexTile.prototype.draw = function() {
    this.xCenter = canvasCenterX + dx * this.gridX;
    this.yCenter = canvasCenterY + dy * this.gridY;

    var angle = Math.PI / 6;
    if (mapStyle == "retro") {
        angle = 0;
    }
    var rotatedPoint = rotatePoint(canvasCenterX, canvasCenterY, angle, this.xCenter, this.yCenter);
    this.xCenter = rotatedPoint.outX;
    this.yCenter = rotatedPoint.outY;
    // console.log("Draw: x:" + this.xCenter + ", y:" + this.yCenter + ", xC:" + canvasCenterX + ", yC:" + canvasCenterY + ", xO:" + rotatedPoint.outX + ", yO:" + rotatedPoint.outY);

    this.drawBase(angle);
    // Don't draw number if desert
    if (this.number) {
        this.drawNumber();
    }
}

HexTile.prototype.drawBase = function(angle) {

    if (mapStyle == "retro") {
        drawingContext.lineWidth = 10;
        drawingContext.fillStyle = "rgba(255,255,255,0)";
        drawingContext.strokeStyle = "#FAEB96";
    } else if (mapStyle == "new") {
        drawingContext.lineWidth = 3;
        drawingContext.fillStyle = "rgba(255,255,255,0)";
        drawingContext.strokeStyle = "rgba(227, 221, 150, 255)";
    } else {
        drawingContext.lineWidth = this.lineWidth;
        drawingContext.fillStyle = this.fillStyle;
        drawingContext.strokeStyle = this.strokeStyle;
    }

    var angleOffset = Math.PI / 6;
    if (angle == Math.PI / 6) {
        angleOffset = Math.PI;
    }

    var hexWasDrawn = false;
    if (dockTypeToImageCanvas[this.dockType] != null) {
        drawingContext.strokeStyle = "blue";
    }
    // else {
    //     if (catanMap.isCoastal([this.gridX, this.gridY])) {
    //         drawingContext.strokeStyle = "red";
    //     }
    // }

    // Begin Path and start at top of hexagon
    drawingContext.beginPath();
    drawingContext.moveTo(
        this.xCenter + size * Math.sin(angleOffset),
        this.yCenter - size * Math.cos(angleOffset)
    );
    // Move clockwise and draw hexagon
    var newAngle;
    for (var i = 1; i <= 6; i += 1) {
        newAngle = i * Math.PI / 3;
        drawingContext.lineTo(this.xCenter + size * Math.sin(newAngle + angleOffset), this.yCenter - size * Math.cos(newAngle + angleOffset));
    }
    drawingContext.closePath();
    hexWasDrawn = true;

    if ((mapStyle == "retro") || (mapStyle == "new")) {
        var imgCanvas = resourceTypeToImageCanvas[this.resourceType]
        if (mapStyle == "new")
        {
            imgCanvas = newResourceTypeToImageCanvas[this.resourceType];
        }

        if (dockTypeToImageCanvas[this.dockType]) {
            var imgCanvas = dockTypeToImageCanvas[this.dockType];
            angle = (Math.PI / 3) * (this.dockRotation) + ((mapStyle == "new") ? Math.PI / 6 : 0);
        }

        if (imgCanvas != null)
        {
                drawingContext.save();
                drawingContext.translate(this.xCenter, this.yCenter);
                drawingContext.rotate(angle);
                drawingContext.drawImage(imgCanvas, -(size), -dy, 2 * size, 2 * dy);
                drawingContext.restore();
        }
    } else {
        
        if (hexWasDrawn) {
            drawingContext.fill();
        }
    }

    if (hexWasDrawn) {
        drawingContext.stroke();
    }
}

HexTile.prototype.drawNumber = function() {
    drawingContext.fillStyle = "rgba(227, 221, 150, 255)";//"#FFFFFF";
    drawingContext.strokeStyle = "rgba(113, 110, 75, 128)";//"#000000";
    drawingContext.lineWidth = size * 0.02;

    drawingContext.beginPath();
    drawingContext.arc(this.xCenter, this.yCenter, 0.375 * size, 0, 2 * Math.PI, false);
    drawingContext.closePath();
    drawingContext.fill();
    drawingContext.stroke();

    if (this.isHighlyProductive()) {
        drawingContext.fillStyle = "#D90000";
    } else {
        drawingContext.fillStyle = "#000000";
    }
    
    // Dynamically scale the font size
    // 0.55 for 2 and 12
    // 0.95 for 6 and 8
    var scale = 0.95 - ((Math.abs(7 - this.number) - 1) * ((0.95 - 0.55) / 4));
    var fontSizePt = Math.ceil(30 / 40 * (scale * size - 8) + 6);
    drawingContext.font = fontSizePt + "px 'Nazanin LT Bold'";
    drawingContext.textAlign = "center";
    drawingContext.fillText(
        this.number.toString(),
        this.xCenter - 0.5,// - textWidth / 2,
        this.yCenter + Math.ceil(0.35 * fontSizePt / 2)//this.yCenter + Math.ceil(0.85 * fontSizePt / 2)
    );

    // Draw dots
    var dotCount = 6 - Math.floor(Math.abs(7 - this.number));
    var dotY = this.yCenter + (0.2 * size);
    var dotSize = 0.027 * size;
    for (var i = 0; i < dotCount; i += 1) {
        var dotX = this.xCenter - (0.08 * size * (dotCount - 1) / 2) + (0.08 * size * i);
        drawingContext.beginPath();
        drawingContext.arc(dotX, dotY, dotSize, 0, 2 * Math.PI, false);
        drawingContext.arc(dotX, dotY, dotSize, 0, 2 * Math.PI, false);
        drawingContext.closePath();
        drawingContext.fill();
    }
}

//=====================================================================================================================
// Misc Functions and Modifiers
//=====================================================================================================================
Array.prototype.random = function(removeElem) {
    var idx = Math.floor(Math.random() * this.length);
    var val = this[idx];
    if (removeElem) {
        this.splice(idx, 1);
    }
    return val;
}

Array.prototype.remove = function(val) {
    var idx = this.indexOf(val);
    if (idx !== -1) {
        this.splice(idx, 1);
        return true; // Indicate successful removal
    }
    return false; // Indicate that value was not found
}

Array.prototype.copy = function() {
    return this.slice();
}

Array.prototype.indexOfArray = function(val) {
    var arr = [];
    var sIdx = 0;
    var tmpCopy = this.copy();
    do {
        var rIdx = tmpCopy.indexOf(val);
        var valid = (rIdx >= 0);
        if (valid) {
            tmpCopy.splice(0, rIdx + 1);
            arr.push(sIdx + rIdx);
            sIdx += rIdx + 1;
        }
    } while (valid);
    return arr;
}

Array.prototype.swap = function(idx1, idx2) {
    var tmp = this[idx1];
    this[idx1] = this[idx2];
    this[idx2] = tmp;
}

function rotatePoint(xCenter, yCenter, angle, x, y) {
    // Translate the point to the origin
    var translatedX = x - xCenter;
    var translatedY = y - yCenter;

    // Apply rotation formula
    var rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle);
    var rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle);

    // Translate back to the original coordinate system
    var outX = rotatedX + xCenter;
    var outY = rotatedY + yCenter;

    return { outX: outX, outY: outY };
}

function addCanvas() {
    //$(mapCanvas).attr("width", 600);
    //$(mapCanvas).attr("height", 400);
    mapCanvas = document.createElement("canvas");
    drawingContext = mapCanvas.getContext('2d');
    mapCanvas.id = "map-canvas";

    sizeCanvas();

    document.getElementById("map-container").appendChild(mapCanvas);
}

function sizeCanvas() {
    var mapContainer = $("div#map-container")[0];
    $(mapCanvas).attr("width", $(mapContainer).width()*2);
    $(mapCanvas).attr("height", $(mapContainer).height()*2);
    canvasCenterY = mapCanvas.height / 2;
    canvasCenterX = mapCanvas.width / 2;
}

// http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
CanvasRenderingContext2D.prototype.clear = CanvasRenderingContext2D.prototype.clear || function(preserveTransform) {
    if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
        this.restore();
    }
};
