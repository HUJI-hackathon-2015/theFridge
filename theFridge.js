Items = new Mongo.Collection("items");
Recipes = new Mongo.Collection("recipes");

//to be used when more screen would be added to this app
// Router.route('/', function () {
//   this.render('item');
// });

//Client Code only
if (Meteor.isClient) {

  //A helper to get items from database
  Template.body.helpers
  ({
    items: function()
    {
    	return Items.find({});
    },

    recipes: function ()
    {
    	return Recipes.find({});
    }


    // should be a helper to get available recipes
    // need to recreate MongoDB Recipes Collection to treat ingredients as set
 	//   ,
 	// recipe: function ()
 	// {
 	// 	var recipes = Recipes.find({});
 	// 	for (var i = 0; i < recipes.length; i++) 
 	// 	{
 	// 		for (var j = 0; j < recipes[i].ingredients.length; i++) 
 	// 		{
 	// 			console.log(ingredients[j]);
 	// 		};
 	// 	};
 	// 	return 1;
 	// }

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
      imageFile: "botton_green.jpg" //default image
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
  },

  "click .go": function () {
  	console.log('go clicked');
  }
});

}