function testSetup() {
	var testCases = TestSuite.initialize();
	var testUi = generateUI(testCases);
	document.body.appendChild(testUi);

	runAllTests();
}

function generateUI(testCases) {
	var fragment = document.createDocumentFragment();
	for (let testCase of testCases) {
		var testCaseUi = generateTestCaseUI(testCase);
		fragment.appendChild(testCaseUi);
	}
    return fragment;
}

function generateTestCaseUI(testCase) {
	var div = document.createElement("div");
	div.className = "test-case";

	var button = div.appendChild(document.createElement("button"));
	button.type = "button";
	button.className = "test-button";
	button.innerHTML = "Run";
	button.addEventListener("click", function() {
		status.className = "status running";
		errorMessage.innerHTML = "";

		setTimeout(function() {
			try {
				testCase.test();
				status.className = "status pass";
			} catch (error) {
				status.className = "status fail";
				errorMessage.innerHTML = "Error: " + error.message;
			} 
		}, 0);
	}, false);

	var status = div.appendChild(document.createElement("span"));
	status.className = "status running";

	var testName = div.appendChild(document.createElement("span"));
	testName.innerHTML = testCase.name;

	var errorMessage = div.appendChild(document.createElement("span"));
	errorMessage.className = "error";

	return div;
}

function runAllTests() {
	var testButtons = document.querySelectorAll(".test-button");
	for (let i = 0; i < testButtons.length; i++) {
		let testButton = testButtons[i];
		setTimeout(function() {
			testButton.click();
		}, 0);
	}
}

var TestSuite = function() {
	var suite = {};
	var testCases = new Set();

	suite.initialize = function() {
		for (var prop in this) {
			if (this.hasOwnProperty(prop) && this[prop] instanceof Function) {
				if (prop.startsWith("test")) {
					testCases.add({
						name: prop,
						test: this[prop]
					});
				}
			}
		}
		return testCases;
	};

	function assertEquals(expected, actual, message) {
		message = message || "";
		if (expected !== actual) {
			throw new Error("Expected '" + expected + "' but found '" + actual + "'. " + message);
		}
	}

	suite.testSimple = function() {
		var test = "a";
		var expected = "a";
		assertEquals(expected, homework(test));
	};

	return suite;
}();