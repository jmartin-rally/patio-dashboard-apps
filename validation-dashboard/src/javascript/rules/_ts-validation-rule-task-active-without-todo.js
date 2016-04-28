Ext.define('CA.techservices.validation.TaskActiveNoToDo',{
    extend: 'CA.techservices.validation.BaseRule',
    alias: 'widget.tstaskactivenotodo',
    config: {
        model: 'Task',
        label: 'Incomplete Task Without ToDo'
    },
    
    getFetchFields: function() {
        return ['ToDo','State'];
    },
    
    getFilters: function() {
        return Rally.data.wsapi.Filter.and([
            {property:'ToDo',operator: '<', value: .0000001 },
            {property:'State',operator: '<', value: 'Completed' }
        ]);
    },
    // return false if the record doesn't match
    // return string if record fails the rule
    applyRuleToRecord: function(record) {
        if ( record.get('ToDo') > 0 || record.get('State') == "Completed" ) {
            return false; 
        }
        return Ext.String.format('Is Active But Has No ToDo (State:{0})', record.get('State'));
    },
    
    getUserFriendlyRuleLabel: function() {        
        return this.label;
    }
});