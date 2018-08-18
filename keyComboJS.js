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

	if (mainKey !== cope.KeyCombo.Keys.ALT &&
		mainKey !== cope.KeyCombo.Keys.CTRL &&
		mainKey !== cope.KeyCombo.Keys.SHIFT) {
		return console.log("Unrecognized key: " + mainKey);
	}
	var codes = [];
	var chars = keyCombo.toUpperCase().split("");

	chars.forEach(function (key) {
		codes.push(key.charCodeAt(0));
	});
	codes = codes.join(',');

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

cope.KeyCombo.checkCombo = function (mainKey, codes) {
	cope.KeyCombo.combos.forEach(function (combo) {
		if (mainKey === combo.mainKey && codes === combo.codes) {
			if (combo.callback && {}.toString.call(combo.callback) === '[object Function]') {
				combo.callback();
				if (mainKey === cope.KeyCombo.Keys.ALT) cope.KeyCombo.checkAlt = [];
				else if (mainKey === cope.KeyCombo.Keys.CTRL) cope.KeyCombo.checkCtrl = [];
				else if (mainKey === cope.KeyCombo.Keys.SHIFT) cope.KeyCombo.checkShift = [];
			}
			else console.log("No function defined for SHIFT combo: " + combo.keys);
		}
	});
};

document.addEventListener("keydown", function (e) {
	cope.KeyCombo.alt = (e.keyCode === 18) ? true : cope.KeyCombo.alt;
	cope.KeyCombo.ctrl = (e.keyCode === 17) ? true : cope.KeyCombo.ctrl;
	cope.KeyCombo.shift = (e.keyCode === 16) ? true : cope.KeyCombo.shift;

	if (e.keyCode !== 16 && e.keyCode !== 17 && e.keyCode !== 18) {
		if (cope.KeyCombo.alt) {
			cope.KeyCombo.checkAlt.push(e.keyCode);
			cope.KeyCombo.checkCombo(cope.KeyCombo.Keys.ALT, cope.KeyCombo.checkAlt.join(','));
		} else if (cope.KeyCombo.ctrl) {
			cope.KeyCombo.checkCtrl.push(e.keyCode);
			cope.KeyCombo.checkCombo(cope.KeyCombo.Keys.CTRL, cope.KeyCombo.checkCtrl.join(','));
		} else if (cope.KeyCombo.shift) {
			cope.KeyCombo.checkShift.push(e.keyCode);
			cope.KeyCombo.checkCombo(cope.KeyCombo.Keys.SHIFT, cope.KeyCombo.checkShift.join(','));
		}
	} else {
		cope.KeyCombo.checkAlt = [];
		cope.KeyCombo.checkCtrl = [];
		cope.KeyCombo.checkShift = [];
	}
}, false);

document.addEventListener("keyup", function (e) {
	cope.KeyCombo.alt = (e.keyCode === 18) ? false : cope.KeyCombo.alt;
	cope.KeyCombo.ctrl = (e.keyCode === 17) ? false : cope.KeyCombo.ctrl;
	cope.KeyCombo.shift = (e.keyCode === 16) ? false : cope.KeyCombo.shift;

	cope.KeyCombo.checkAlt = !cope.KeyCombo.alt ? [] : cope.KeyCombo.checkAlt;
	cope.KeyCombo.checkCtrl = !cope.KeyCombo.ctrl ? [] : cope.KeyCombo.checkCtrl;
	cope.KeyCombo.checkShift = !cope.KeyCombo.shift ? [] : cope.KeyCombo.checkShift;
}, false);
