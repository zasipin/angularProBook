describe("First Test", function(){
	// set up scenario
	var counter;

	beforeEach(function(){
		counter = 0;
	});

	it("increments value", function(){
		// Act
		counter++;
		// Assert - verify result
		expect(counter).toEqual(1);
	});

	it("decrements value", function(){
		// Act
		counter--;
		// Assert - verify result
		expect(counter).toEqual(-1);
	});

});