This is an example for developing a simple manager-employee payroll system in hyperledger composer.

participants:
Manager
Employee

Assets:
Wallet(employee and manager both have one wallet associated with their id)
Fund(Kind of storage of money)

Transaction:
fundFill:
  Manager can add asset value(here money) to the Fund asset. And only manager can do this. employee can not add in the funds.

employeeSalary
  Employee only can take money from the fund.
  Once employee take the money from funds, its salaryStatus changes from UNPAID to PAID.

statusChange
  After a month (or whenever) manager calls the statusChange function, it changes status of all employees' salaryStatus to      UNPAID.. so that they can again take salary from the funds.
  
