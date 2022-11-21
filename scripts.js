const employees = [];

$(() => {
    console.log('document ready');
    readyNow();
});

function readyNow() {
    $('.employee-form').submit(function (event) {
        event.preventDefault();
        addEmployee(event);
    });
};

function addEmployee({target}) {
    console.log('addEmployee, target', target);
    const employee = {};
    $(target)
        .find('input')
        .each(function() {
            employee[this.name] = this.valueAsNumber || this.value;
        });
    console.log('employee', employee);

}

