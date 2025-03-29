---
title: Sql
editUrl: false
---

Data Definition and Data Types; Constraints, Queries, Insert, Delete, and Update
Statements; Views, Stored Procedures and Functions; Database Triggers, SQL Injection.

***

## **1. Data Definition and Data Types**

SQL allows defining a database schema using **Data Definition Language (DDL)**.

### **1.1 Data Definition Language (DDL)**

DDL includes commands such as:

* `CREATE` (to create tables, databases, indexes)
* `ALTER` (to modify table structures)
* `DROP` (to delete databases, tables, or indexes)
* `TRUNCATE` (to remove all records but retain table structure)

#### **Example: Creating a Table**

```sql
CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 18),
    Salary DECIMAL(10,2),
    DepartmentID INT REFERENCES Department(DeptID)
);
```

### **1.2 SQL Data Types**

| **Category**         | **Data Types**                                     |
| -------------------- | -------------------------------------------------- |
| **Numeric**          | `INT`, `BIGINT`, `DECIMAL(p,s)`, `FLOAT`, `DOUBLE` |
| **Character/String** | `CHAR(n)`, `VARCHAR(n)`, `TEXT`                    |
| **Date/Time**        | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`            |
| **Boolean**          | `BOOLEAN` (often represented as `TINYINT(1)`)      |
| **Binary**           | `BLOB`, `BINARY`, `VARBINARY`                      |

***

## **2. Constraints in SQL**

Constraints enforce rules at the table level.

| **Constraint**  | **Description**                             |
| --------------- | ------------------------------------------- |
| **PRIMARY KEY** | Uniquely identifies each record             |
| **FOREIGN KEY** | Enforces referential integrity              |
| **NOT NULL**    | Prevents null values                        |
| **UNIQUE**      | Ensures unique values in a column           |
| **CHECK**       | Ensures a condition is met                  |
| **DEFAULT**     | Assigns a default value if none is provided |

#### **Example: Applying Constraints**

```sql
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 18),
    Salary DECIMAL(10,2) DEFAULT 5000.00,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DeptID) ON DELETE CASCADE
);
```

***

## **3. SQL Queries (SELECT Statements)**

SQL queries are used to retrieve data.

### **3.1 Basic SELECT Query**

```sql
SELECT Name, Age FROM Employee WHERE Age > 25;
```

### **3.2 Advanced Queries**

#### **(a) ORDER BY**

Sorts results in ascending (`ASC`) or descending (`DESC`) order.

```sql
SELECT * FROM Employee ORDER BY Salary DESC;
```

#### **(b) GROUP BY & HAVING**

Groups rows and filters aggregated results.

```sql
SELECT DepartmentID, AVG(Salary) FROM Employee GROUP BY DepartmentID HAVING AVG(Salary) > 6000;
```

#### **(c) JOINS**

| **Type**       | **Description**                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **INNER JOIN** | Returns matching records in both tables                                    |
| **LEFT JOIN**  | Returns all records from the left table, plus matching ones from the right |
| **RIGHT JOIN** | Returns all records from the right table, plus matching ones from the left |
| **FULL JOIN**  | Returns all records from both tables                                       |

```sql
SELECT e.Name, d.DeptName
FROM Employee e
INNER JOIN Department d ON e.DepartmentID = d.DeptID;
```

***

## **4. SQL Insert, Delete, and Update Statements**

### **4.1 INSERT Statement**

```sql
INSERT INTO Employee (EmpID, Name, Age, Salary, DepartmentID)
VALUES (101, 'John Doe', 30, 7000, 1);
```

### **4.2 DELETE Statement**

```sql
DELETE FROM Employee WHERE EmpID = 101;
```

### **4.3 UPDATE Statement**

```sql
UPDATE Employee SET Salary = Salary * 1.10 WHERE DepartmentID = 1;
```

***

## **5. SQL Views**

A **view** is a virtual table derived from an SQL query.

### **Creating a View**

```sql
CREATE VIEW HighPaidEmployees AS
SELECT Name, Salary FROM Employee WHERE Salary > 8000;
```

### **Using a View**

```sql
SELECT * FROM HighPaidEmployees;
```

### **Updating a View (If Allowed)**

```sql
UPDATE HighPaidEmployees SET Salary = 9000 WHERE Name = 'John Doe';
```

***

## **6. Stored Procedures and Functions**

Stored procedures and functions encapsulate SQL logic for reuse.

### **6.1 Stored Procedure**

A stored procedure performs operations on data.

```sql
DELIMITER $$

CREATE PROCEDURE GetEmployeesByDept(IN deptID INT)
BEGIN
    SELECT * FROM Employee WHERE DepartmentID = deptID;
END $$

DELIMITER ;
```

**Calling a Stored Procedure:**

```sql
CALL GetEmployeesByDept(1);
```

### **6.2 SQL Functions**

SQL functions return values.

```sql
CREATE FUNCTION GetEmployeeCount(deptID INT) RETURNS INT
BEGIN
    DECLARE count INT;
    SELECT COUNT(*) INTO count FROM Employee WHERE DepartmentID = deptID;
    RETURN count;
END;
```

**Using the Function:**

```sql
SELECT GetEmployeeCount(1);
```

***

## **7. Database Triggers**

A **trigger** is executed automatically when a specific event occurs.

### **Creating a Trigger**

```sql
CREATE TRIGGER BeforeInsertEmployee
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
    IF NEW.Age < 18 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Age must be at least 18';
    END IF;
END;
```

### **Using the Trigger**

```sql
INSERT INTO Employee (EmpID, Name, Age, Salary, DepartmentID)
VALUES (102, 'Jane Doe', 17, 5000, 1);
```

This would trigger an error because of the age constraint.

***

## **8. SQL Injection (Security Concern)**

SQL Injection is an attack where malicious SQL is injected into queries.

### **Example of SQL Injection**

```sql
SELECT * FROM Users WHERE Username = '' OR '1'='1' -- ' AND Password = 'password';
```

This would **bypass authentication**!

### **Preventing SQL Injection**

#### **(a) Using Prepared Statements**

```sql
PREPARE stmt FROM 'SELECT * FROM Users WHERE Username = ? AND Password = ?';
EXECUTE stmt USING 'admin', 'password123';
```

#### **(b) Using ORM (Object-Relational Mapping) Frameworks**

ORMs like Prisma, Sequelize, and Hibernate prevent injections by sanitizing inputs.

#### **(c) Input Validation**

Always **sanitize user input** before processing it in SQL queries.

***

## **Final Summary**

| **SQL Concept**                   | **Description**                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| **DDL (Data Definition)**         | Used to create, modify, and delete database structures.                                            |
| **Data Types**                    | Defines column types (e.g., `VARCHAR`, `INT`, `DATE`).                                             |
| **Constraints**                   | Ensures data integrity (`PRIMARY KEY`, `FOREIGN KEY`, `CHECK`).                                    |
| **Queries (SELECT)**              | Retrieves data with conditions (`WHERE`, `ORDER BY`, `GROUP BY`, `JOIN`).                          |
| **Insert, Delete, Update**        | Modifies table data.                                                                               |
| **Views**                         | Virtual tables for read access and abstraction.                                                    |
| **Stored Procedures & Functions** | Encapsulate logic for reusability.                                                                 |
| **Triggers**                      | Execute automatically before/after data modifications.                                             |
| **SQL Injection**                 | Security vulnerability that needs **prepared statements** and **input validation** for protection. |

Would you like **detailed real-world examples** for any of these? 😊
