Array.prototype.next = function() {
    return this[++this.current];
};
Array.prototype.prev = function() {
    return this[--this.current];
};
Array.prototype.current = 0;

var StepperView = Backbone.View.extend({
  el: ".stepper",
  events: {
    "click .next": "next",
    "click .prev": "prev"
  },

  initialize: function() {
    this.model.on("change", this.render, this);
    this.render();
  },

  render: function() {
    var currentStep = this.model.getCurrentStep();
    $('.step').hide();
    $('*[data-step='+this.model.getCurrentStep()+']').show();

    if(this.model.get('current') == 0) {
        this.$('.prev').prop('disabled', true);
    } else {
        this.$('.prev').prop('disabled', false);
    }

    if(this.model.get('current') == this.model.get('steps').length - 1) {
        this.$('.next').prop('disabled', true);
    } else {
        this.$('.next').prop('disabled', false);
    }
  },

  next: function() {
    this.model.next();
  },

  prev: function() {
    this.model.prev();
  }
});

var StepperModel = Backbone.Model.extend({
    initialize: function() {
        var steps = ["first", "second", "third"]
        this.set('steps', steps);
        this.set('current', steps.current);
    },
    getCurrentStep: function() {
        var currentStep = this.get('current');
        return this.get('steps')[currentStep];
    },
    next: function() {
        this.set('current', this.get('current') + 1);
    },
    prev: function() {
        this.set('current', this.get('current') - 1);
    }
});

var PaymentFormView = Backbone.View.extend({
    el: '#payment-form',
    events: {
        'submit': 'submit'
    },
    submit: function(e) {
        var self = this;
        e.preventDefault();
        console.log(this.$('input').val());

        var indicator = $('<p/>', {'text': 'submitting'});
        this.$el.append(indicator);
        setTimeout(function(){
            self.model.next();
            self.$(indicator).remove();
        }, 3000);
    }
});

$(function(){
    var stepperModel = new StepperModel;
    var paymentFormView = new PaymentFormView({model: stepperModel});
    var stepper = new StepperView({model: stepperModel});
});
