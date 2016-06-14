var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({ 
	id: String,
    fName: String,
  	lName: String,
  	age: { type: Number, min: 0 },
  	tittle: String,
  	gender: String,
  	manager: {type:String, default: "not assigned"},

  		location: String,
  		homePhone: { type: String, trim: true }, 
  		workPhone: { type: String, trim: true },
  		cellPhone: { type: String, trim: true },
  		email: { type: String, lowercase: true, trim: true },

  		// dirReports: [String],

  	startDate: { type: Date, default: Date.now },
	profilePic: { type: String, default: '575f947e28c38e441ec233e9'},
  	avalMang: { type: Boolean, default: true }
});

module.exports = mongoose.model('empSchema', empSchema);