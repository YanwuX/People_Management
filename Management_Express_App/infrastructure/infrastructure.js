
module.exports = function() {

    this.getAvailableManager = function (empData, CurrData) {
        var result = [];
        empData.forEach(function(emp) {
            if(emp.manager == undefined || emp._id == CurrData) return;
            if(emp._id != CurrData && emp.manager != CurrData) {
                result.push(emp);
                getAvailableManager(empData, emp.manager);
            }
            console.log('doing shit');
        });
        return result;
    };
};
