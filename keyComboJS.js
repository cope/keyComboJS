/* global cope */

cope = {
	KeyCombo: {
		Keys: {
			ALT: 1,
			CTRL: 2,
			SHIFT: 3
		},
		checkAlt: [],
		checkCtrl: [],
		checkShift: [],

		alt: false,
		ctrl: false,
		shift: false,

		combos: []
	}
};

cope.KeyCombo.addCombo = function (mainKey, keyCombo, callback) {
	if (!keyCombo) return console.log("No keys defined.");
	if ([1, 2, 3].indexOf(mainKey) < 0) return console.log("Unrecognized key: " + mainKey);

	var codes = [];
	var chars = keyCombo.toUpperCase().split("");

	chars.forEach(function (key) {
		codes.push(key.charCodeAt(0));
	});
	codes = codes.join(",");

	var found = false;    // check if exists, to override
	cope.KeyCombo.combos.forEach(function (combo) {
		if (mainKey === combo.mainKey && codes === combo.codes) {
			combo.callback = callback;
			found = true;
		}
	});
	if (false === found) {
		cope.KeyCombo.combos.push({
			mainKey: mainKey,
			keyCombo: keyCombo,
			codes: codes,
			callback: callback
		});
	}
};

cope.KeyCombo.addAltCombo = function (keyCombo, callback) {
	cope.KeyCombo.addCombo(cope.KeyCombo.Keys.ALT, keyCombo, callback);
};

cope.KeyCombo.addCtrlCombo = function (keyCombo, callback) {
	cope.KeyCombo.addCombo(cope.KeyCombo.Keys.CTRL, keyCombo, callback);
};

cope.KeyCombo.addShiftCombo = function (keyCombo, callback) {
	keyCombo = keyCombo ? keyCombo.toUpperCase() : null;
	cope.KeyCombo.addCombo(cope.KeyCombo.Keys.SHIFT, keyCombo, callback);
};

cope.KeyCombo.cleanChecks = function (mainKey) {
	if (mainKey === cope.KeyCombo.Keys.ALT) cope.KeyCombo.checkAlt = [];
	else if (mainKey === cope.KeyCombo.Keys.CTRL) cope.KeyCombo.checkCtrl = [];
	else if (mainKey === cope.KeyCombo.Keys.SHIFT) cope.KeyCombo.checkShift = [];
};

cope.KeyCombo.isValidKeyCombo = function (combo, mainKey, codes) {
	return mainKey === combo.mainKey && codes === combo.codes;
};

cope.KeyCombo.isValidComboCallback = function (combo) {
	return combo.callback && {}.toString.call(combo.callback) === "[object Function]";
};

cope.KeyCombo.processValidKeyCombo = function (combo, mainKey) {
	if (cope.KeyCombo.isValidComboCallback(combo)) {
		combo.callback();
		cope.KeyCombo.cleanChecks(mainKey);
	}
	else console.log("No function defined for SHIFT combo: " + combo.keys);
};

cope.KeyCombo.checkCombo = function (combo, mainKey, codes) {
	if (cope.KeyCombo.isValidKeyCombo(combo, mainKey, codes)) cope.KeyCombo.processValidKeyCombo(combo, mainKey);
};

cope.KeyCombo.checkCombos = function (mainKey, codes) {
	cope.KeyCombo.combos.forEach(function (combo) {
		cope.KeyCombo.checkCombo(combo, mainKey, codes);
	});
};

cope.KeyCombo.getKeyCode = function (e) {
	if (e.key) return e.key;
	if (e.keyCode) return e.keyCode;
	if (e.keyIdentifier) return e.keyIdentifier;
	return null;
};

cope.KeyCombo.procesSpecialKeys = function (keyCode) {
	cope.KeyCombo.alt = (keyCode === 18) ? true : cope.KeyCombo.alt;
	cope.KeyCombo.ctrl = (keyCode === 17) ? true : cope.KeyCombo.ctrl;
	cope.KeyCombo.shift = (keyCode === 16) ? true : cope.KeyCombo.shift;
};

cope.KeyCombo.procesSpecialKeysChecks = function () {
	cope.KeyCombo.checkAlt = !cope.KeyCombo.alt ? [] : cope.KeyCombo.checkAlt;
	cope.KeyCombo.checkCtrl = !cope.KeyCombo.ctrl ? [] : cope.KeyCombo.checkCtrl;
	cope.KeyCombo.checkShift = !cope.KeyCombo.shift ? [] : cope.KeyCombo.checkShift;
};

cope.KeyCombo.procesCheckCombos = function (keyCode) {
	if (cope.KeyCombo.alt) {
		cope.KeyCombo.checkAlt.push(keyCode);
		cope.KeyCombo.checkCombos(cope.KeyCombo.Keys.ALT, cope.KeyCombo.checkAlt.join(","));

	} else if (cope.KeyCombo.ctrl) {
		cope.KeyCombo.checkCtrl.push(keyCode);
		cope.KeyCombo.checkCombos(cope.KeyCombo.Keys.CTRL, cope.KeyCombo.checkCtrl.join(","));

	} else if (cope.KeyCombo.shift) {
		cope.KeyCombo.checkShift.push(keyCode);
		cope.KeyCombo.checkCombos(cope.KeyCombo.Keys.SHIFT, cope.KeyCombo.checkShift.join(","));
	}
};

cope.KeyCombo.isNewKeyCode = function (keyCode) {
	return keyCode !== 16 && keyCode !== 17 && keyCode !== 18;
};

document.addEventListener("keydown", function (e) {
	var keyCode = cope.KeyCombo.getKeyCode(e);
	cope.KeyCombo.procesSpecialKeys(keyCode);

	cope.KeyCombo.checkAlt = [];
	cope.KeyCombo.checkCtrl = [];
	cope.KeyCombo.checkShift = [];
	if (cope.KeyCombo.isNewKeyCode(keyCode)) cope.KeyCombo.procesCheckCombos(keyCode);
}, false);

document.addEventListener("keyup", function (e) {
	var keyCode = cope.KeyCombo.getKeyCode(e);
	cope.KeyCombo.procesSpecialKeys(keyCode);
	cope.KeyCombo.procesSpecialKeysChecks();
}, false);
