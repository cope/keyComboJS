# keyComboJS
=============

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

