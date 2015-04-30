Items = new Mongo.Collection("items");


//Client Code only
if (Meteor.isClient) {

  //A helper to get items from database
  Template.body.helpers
  ({
    items: function()
    {
    	return Items.find({}, {sort: {createdAt: -1}});
    }
  });

  //handle events in the main form of theFridge.html
  Template.body.events({

  //add new item to fridge items	
  "submit .new-item": function (event) {
    // This function is called when the new item form is submitted

    var text = event.target.text.value;

    Items.insert({
      text: text,
      createdAt: new Date(), // current time
      imageFile: "botton_green.jpg"
    });

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});

  //handle events in an item element of theFridge.html
  Template.item.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Items.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Items.remove(this._id);
  }
});


}