const employees = [];

$(() => {
    console.log('document ready');
    readyNow();
});

function readyNow() {
    $('.employee-form').submit(function(event) {
        event.preventDefault();
        addEmployee(event);
        $(this).get(0).reset();
    });
    $('.employees').on('click', 'button', function(event) {
        removeEmployee(event);
    });    
};

function removeEmployee({target}) {
    console.log('on target:', target);
    const employeeRow = $(target).closest('.employee');
    const employeeId = $(employeeRow).data('id');
    console.log('employeeId', employeeId);
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === employeeId) {
            employees.splice(i, 1);
        }
    }
    console.log('employees after delete', employees);

    $(employeeRow).remove();
    updateTotal();
};

function addEmployee({target}) {
    const employee = {};
    $(target)
        .find('input')
        .each(function() {
            employee[this.name] = this.valueAsNumber || this.value;
        });
    employees.push(employee);
    console.log('employees', employees);
    $('.employees').append(`
        <tr class="employee" data-id="${employee.id}">
            <td>
                ${employee.firstName}
            </td>
            <td>
                ${employee.lastName}
            </td>
            <td>
                ${employee.id}
            </td>
            <td>
                ${employee.jobTitle}
            </td>
            <td class="text-end">
                $${employee.annualSalary.toLocaleString('en-US')}.00
            </td>
            <td>
                <button type="button" class="btn btn-danger float-end delete">Delete</button>
            </td>
        </tr>
    `);
    updateTotal();
};

function updateTotal() {
    let total = 0;
    employees.forEach(employee => total = total + employee.annualSalary);
    console.log('total', total);
    if (total > 20000) {
        $('.total-row').addClass('table-danger');
    } else {
        $('.total-row').removeClass('table-danger');  
    }
    $('.total-monthly').text(`$${total.toLocaleString('en-US')}.00`);
};
