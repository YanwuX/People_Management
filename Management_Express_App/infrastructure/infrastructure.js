
module.exports = function() {

    this.getAvailableManager = function (empData, CurrData) {
        while(CurrData.dircRept.length > 0) {
            var i = 0;
            for(var emp in empData) {
                if(emp._id == dircRept[i]._id) {
                    dircRept[i].avalMang = false;
                    setTimeout( getAvailableManager(empData, dircRept[i]), 0);                    
                };
            };
            i++;
        };
    };

};
