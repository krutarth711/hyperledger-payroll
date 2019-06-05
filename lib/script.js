
/**
 * Track the trade of a commodity from one trader to another
 * @param {payroll.fundFill} tx - the trade to be processed
 * @transaction
 */
async function fundFill(tx) {  // eslint-disable-line no-unused-vars
  const managerRegistry = await getParticipantRegistry('payroll.Manager');
  const managerExists = await managerRegistry.exists(tx.manager.managerId);

  const walletRegistry = await getAssetRegistry('payroll.Wallet');
  const walletExists = await walletRegistry.exists(tx.manager.wallet.walletId);

  const fundRegistry = await getAssetRegistry('payroll.Fund');

  if(managerExists){
    if(walletExists){
      if(tx.manager.wallet.value > tx.value){
        tx.manager.wallet.value -= tx.value;
        tx.fund.value += tx.value;

        await walletRegistry.update(tx.manager.wallet);
        await fundRegistry.update(tx.fund);
      }
      else
        throw new Error('Insufficient balance in manager wallet');
    }
    else
      throw new Error('Wallet of manager doesnot exist');
  }  
  else
    throw new Error('Manager does not exist');
}

/**
* Track the trade of a commodity from one trader to another
* @param {payroll.employeeSalary} es - the trade to be processed
* @transaction
*/
async function EmployeeTransaction(es){
const employeeRegistry = await getParticipantRegistry('payroll.Employee');
const employeeExists = await employeeRegistry.exists(es.employee.employeeId);

const walletRegistry = await getAssetRegistry('payroll.Wallet');
const walletExists = await walletRegistry.exists(es.employee.wallet.walletId);

const fundRegistry = await getAssetRegistry('payroll.Fund');

if(employeeExists){
  if(walletExists){
    if(es.employee.status == 'UNPAID'){
      if(es.employee.salary < es.fund.value){
        es.employee.wallet.value += es.employee.salary;
        es.fund.value -= es.employee.salary;
        es.employee.status = 'PAID'

        await walletRegistry.update(es.employee.wallet);
        await fundRegistry.update(es.fund);
        await employeeRegistry.update(es.employee);
      }
      else{
        throw new Error('Insufficient balance in funds. Tell manager to add funds');
      }
    }
    else{
      throw new Error('You are already paid. Try next month!');
    }
  }
  else{
    throw new Error('Wallet of employee does not exist');
  }
}
else{
  throw new Error('Employee does not exist');
}
}

/**
* Track the trade of a commodity from one trader to another
* @param {payroll.statusChange} sc - the trade to be processed
* @transaction
*/
async function statusChange(sc){
const employeeRegistry = await getParticipantRegistry('payroll.Employee');
var employees = await employeeRegistry.getAll();

for(let i=0;i<employees.length;i++){
  
  employees[i].status ='UNPAID';
  await employeeRegistry.update(employees[i]);
}
}

