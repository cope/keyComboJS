# keyComboJS
=============

[![codacy](https://img.shields.io/codacy/grade/836a871f782a49498e0b8106ddf596dd.svg)](https://www.codacy.com/project/cope/keyComboJS/dashboard)

Usage:

html:

    <head>
        ...
        <script type="text/javascript" src="js/keyComboJS.min.js"></script>
    </head>

javascript:

    cope.KeyCombo.addShiftCombo("LOG", function () {
        alert("shiftLOG");
    });
    
    cope.KeyCombo.addCtrlCombo("m", function () {
        alert("ctrlM");
    });
    
    cope.KeyCombo.addAltCombo("log", function () {
        alert("altLOG");
    });

