describe("Model suite", function() {
  it("Model can be initialized", function() {
    var model = new StepperModel;
    expect(model).toBeDefined();
  });

  it("Model first step is current", function() {
    var model = new StepperModel;
    expect(model.getCurrentStep()).toEqual('first');
  });

  it("Second comes after first", function() {
    var model = new StepperModel;
    model.next();
    expect(model.getCurrentStep()).toEqual('second');
  });

  it("Third comes after second", function() {
    var model = new StepperModel;
    model.next();
    model.next();
    expect(model.getCurrentStep()).toEqual('third');
  });

  it("You can not go over last step", function() {
    var model = new StepperModel;
    model.next();
    model.next();
    model.next();
    model.next();
    expect(model.getCurrentStep()).toEqual('third');
  });

  it("You can not go beyond first step", function() {
    var model = new StepperModel;
    model.prev();
    expect(model.getCurrentStep()).toEqual('first');
  });
});
