---
title: Normalization
editUrl: false
---

***

## **1. Normalization for Relational Databases**

Normalization is the process of organizing relational database tables to minimize redundancy and dependency by dividing larger tables into smaller, related ones. It primarily relies on **functional dependencies** and is achieved through **normal forms (1NF, 2NF, 3NF, BCNF, etc.)**.

### **Functional Dependencies**

A functional dependency (FD) is a constraint between two sets of attributes in a relation. Formally, an attribute *Y* is functionally dependent on *X* (denoted as *X → Y*) if for each value of *X*, there is at most one corresponding value of *Y*.

For example, in a student table:

* `RollNumber → Name, DOB, Department`
  * This means RollNumber uniquely determines a student's details.

### **Normalization Forms**

* **1NF (First Normal Form)**: Ensures <abbr title="must hold only a single attribute">atomicity</abbr> of values—no repeating groups or multivalued attributes.
* **2NF (Second Normal Form)**: Achieved when the table is in 1NF and every non-key attribute is fully functionally dependent on the **entire** primary key.
* **3NF (Third Normal Form)**: Achieved when in 2NF and no transitive dependencies exist (i.e., no non-key attribute depends on another non-key attribute).
* **BCNF (Boyce-Codd Normal Form)**: Stronger version of 3NF where every determinant must be a candidate key.

Higher normal forms include **4NF** (dealing with multi-valued dependencies) and **5NF** (decomposing based on join dependencies).

# **Normalization: Examples**

## **1NF (First Normal Form)**

### **Condition:**

* Ensures **atomicity** (each column holds a single value).
* No **repeating groups** or **multi-valued attributes**.

### **Violation Example (Unnormalized Table)**

Consider a `Students` table where a student can have multiple phone numbers in a single row.

| StudentID | Name  | PhoneNumbers           | Course |
| --------- | ----- | ---------------------- | ------ |
| 1         | Alice | 9876543210, 9123456789 | DBMS   |
| 2         | Bob   | 8765432109             | OS     |

### **Solution (Convert to 1NF)**

* Create a separate row for each phone number.

| StudentID | Name  | PhoneNumber | Course |
| --------- | ----- | ----------- | ------ |
| 1         | Alice | 9876543210  | DBMS   |
| 1         | Alice | 9123456789  | DBMS   |
| 2         | Bob   | 8765432109  | OS     |

***

## **2NF (Second Normal Form)**

### **Condition:**

* Table **must be in 1NF**.
* **All non-key attributes should be fully dependent on the primary key** (no partial dependency).

### **Violation Example**

A `StudentCourses` table where a **student can enroll in multiple courses**, and their **name is stored along with the enrollment**.

| StudentID | Name  | CourseID | CourseName |
| --------- | ----- | -------- | ---------- |
| 1         | Alice | C101     | DBMS       |
| 2         | Bob   | C102     | OS         |

* **Issue:** `Name` depends only on `StudentID`, not `CourseID`.

### **Solution (Convert to 2NF)**

* Create separate tables for Students and Courses.

#### **Students Table**

| StudentID | Name  |
| --------- | ----- |
| 1         | Alice |
| 2         | Bob   |

#### **Courses Table**

| CourseID | CourseName |
| -------- | ---------- |
| C101     | DBMS       |
| C102     | OS         |

#### **Enrollment Table (Mapping Students to Courses)**

| StudentID | CourseID |
| --------- | -------- |
| 1         | C101     |
| 2         | C102     |

***

## **3NF (Third Normal Form)**

### **Condition:**

* Table **must be in 2NF**.
* **No transitive dependency** (a non-key attribute should not depend on another non-key attribute).

### **Violation Example**

A `StudentCourses` table that includes **Instructor Name**, which is dependent on `CourseID`.

| StudentID | CourseID | CourseName | Instructor  |
| --------- | -------- | ---------- | ----------- |
| 1         | C101     | DBMS       | Prof. Smith |
| 2         | C102     | OS         | Prof. John  |

* **Issue:** `Instructor` depends on `CourseID`, **not on StudentID** (transitive dependency).

### **Solution (Convert to 3NF)**

* Move Instructor details to a separate table.

#### **Courses Table**

| CourseID | CourseName |
| -------- | ---------- |
| C101     | DBMS       |
| C102     | OS         |

#### **Instructors Table**

| CourseID | Instructor  |
| -------- | ----------- |
| C101     | Prof. Smith |
| C102     | Prof. John  |

#### **Student-Course Enrollment Table**

| StudentID | CourseID |
| --------- | -------- |
| 1         | C101     |
| 2         | C102     |

***

## **BCNF (Boyce-Codd Normal Form)**

### **Condition:**

* **Stronger version of 3NF**.
* **Every determinant must be a candidate key**.

### **Violation Example**

A `ProfessorsCourses` table where a professor teaches only **one** course, but multiple professors can teach the same course.

| Professor | CourseID | Department |
| --------- | -------- | ---------- |
| Smith     | C101     | CS         |
| John      | C102     | IT         |

* **Issue:** `CourseID` → `Professor` is a **partial dependency** because a course can have multiple professors, but each professor is uniquely tied to a course.

### **Solution (Convert to BCNF)**

* Break into two tables to remove partial dependencies.

#### **Professors Table**

| Professor | Department |
| --------- | ---------- |
| Smith     | CS         |
| John      | IT         |

#### **Course-Professor Table**

| CourseID | Professor |
| -------- | --------- |
| C101     | Smith     |
| C102     | John      |

***

# **Summary Table**

| **Normalization Form**            | **Condition**                                                                                      | **Example of Violation**                                                                      | **Solution**                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **1NF (First Normal Form)**       | Ensures atomicity (no repeating groups or multi-valued attributes).                                | A table storing multiple phone numbers in a single column.                                    | Split into separate rows or create a new table for phone numbers.                     |
| **2NF (Second Normal Form)**      | Must be in 1NF and all non-key attributes should be fully dependent on the **entire** primary key. | A student-course table where student name depends only on StudentID, not CourseID.            | Move student details to a separate table.                                             |
| **3NF (Third Normal Form)**       | Must be in 2NF and should not have transitive dependencies.                                        | Course table storing instructor details, where Instructor depends on CourseID, not StudentID. | Move instructor details to a separate table.                                          |
| **BCNF (Boyce-Codd Normal Form)** | Every determinant must be a **candidate key**.                                                     | Professor-course table where CourseID determines Professor but is not a candidate key.        | Split the table into separate ones for Professors and Course-Professor relationships. |

***

## **2. Algorithms for Query Processing and Optimization**

Query processing involves parsing, optimization, and execution of SQL queries. The goal of query optimization is to **find the most efficient execution plan** for a given SQL query.

### **Steps in Query Processing**

1. **Parsing and Translation**: SQL query is converted into an internal representation (relational algebra tree).
2. **Query Optimization**: The system generates different execution plans and chooses the most efficient one.
3. **Execution Plan Execution**: The chosen plan is executed using indexing, joins, and sorting mechanisms.

### **Query Optimization Techniques**

* **Heuristic Optimization**: Uses rule-based transformations (e.g., pushing selection operations closer to the base tables).

* **Cost-Based Optimization**: Estimates the cost of different query plans using **histograms**, **selectivity**, and **cardinality**.

* **Indexing & Caching**: Uses **B+ Trees** and **hash-based indexing** to speed up retrieval.

* **Join Optimization**: Various join methods such as **nested loop join**, **merge join**, and **hash join** are used based on data size and indexes.

#### 1. Heuristic Optimization

Heuristic optimization follows a **rule-based approach** to optimize queries. It does not calculate costs but applies general transformation rules to improve query performance.

### **Key Heuristic Optimization Techniques**

1. **Pushing Selection Operations Closer to Base Tables**

   * Selections (filters using `WHERE` conditions) should be applied as early as possible in the query execution.
   * This reduces the number of records that need to be processed in later stages.

   **Example:**

   ```sql
   SELECT * FROM Employees WHERE Department = 'IT' AND Salary > 50000;
   ```

   * Instead of first performing a join and then filtering, the optimizer **filters Employees first** before joining with other tables.

2. **Rearranging Join Orders**
   * When multiple tables are joined, joining smaller tables first reduces intermediate results.
   * Example: If `Employees` has **10,000 records** and `Departments` has **50 records**, it is better to filter and join `Departments` first.

3. **Replacing Cartesian Product with Joins**
   * Cartesian Product (cross join) should be avoided unless necessary.
   * **Example of inefficient query**:
     ```sql
     SELECT * FROM Employees, Departments WHERE Employees.DepartmentID = Departments.DepartmentID;
     ```
     * The optimizer rewrites this as an **inner join**, reducing unnecessary computations.

4. **Project Early (Select Required Columns First)**
   * Instead of selecting all columns (`SELECT *`), only fetch the required ones.
   * This reduces the amount of data transferred and processed.

***

## **2. Cost-Based Optimization**

Cost-based optimization uses **statistical information** to estimate the best execution plan by calculating costs based on **histograms, selectivity, and cardinality**.

### **Key Concepts in Cost-Based Optimization**

1. **Histograms and Statistics**
   * Databases maintain histograms to track value distributions in columns.
   * Example: If `Salary` ranges between 20,000 and 200,000, and 70% of employees earn between 40,000-80,000, the optimizer uses this data to estimate how many rows will match a query.

2. **Selectivity & Cardinality Estimation**

   * **Selectivity** = Fraction of rows returned by a condition.
   * **Cardinality** = Total number of rows in a table or intermediate result.
   * If a condition returns **very few records**, an **index scan** is preferred over a **full table scan**.

   **Example:**

   ```sql
   SELECT * FROM Orders WHERE OrderDate = '2024-03-01';
   ```

   * If the `OrderDate` column has an **index**, and only **1% of rows** match this condition, the optimizer prefers an **index scan** over a **full scan**.

3. **Index Selection**
   * The optimizer chooses between **B+ Tree indexing** (for range queries) and **hash indexing** (for exact lookups).
   * Example:
     * **B+ Tree Index** is good for:
       ```sql
       SELECT * FROM Products WHERE Price BETWEEN 100 AND 500;
       ```
     * **Hash Index** is good for:
       ```sql
       SELECT * FROM Users WHERE UserID = 12345;
       ```

4. **Access Path Selection**
   * The optimizer determines whether to use an **index scan**, **sequential scan**, or **bitmap index scan** based on query conditions.
   * Example:
     ```sql
     SELECT * FROM Customers WHERE LastName = 'Smith';
     ```
     * If `LastName` is indexed, it uses an **index scan**.
     * If not indexed, a **full table scan** is required.

***

## **3. Indexing & Caching**

Indexes and caching play a major role in improving query performance.

### **Indexing**

Indexes reduce the number of rows that need to be scanned in a query.

1. **B+ Tree Indexing**
   * Used for **range-based queries** (`BETWEEN`, `<`, `>`, `ORDER BY`).
   * Example:
     ```sql
     SELECT * FROM Employees WHERE Age BETWEEN 30 AND 50;
     ```
     * The optimizer will use a **B+ Tree index** on the `Age` column.

2. **Hash Indexing**
   * Used for **exact match queries** (`=`).
   * Example:
     ```sql
     SELECT * FROM Users WHERE UserID = 1001;
     ```
     * The optimizer will use a **hash index** on the `UserID` column.

### **Caching**

1. **Query Caching**
   * If the same query is executed frequently, results are stored in cache to avoid re-executing it.
   * Example:
     ```sql
     SELECT COUNT(*) FROM Sales WHERE Year = 2024;
     ```
     * If cached, the database returns the stored result instantly.

2. **Materialized Views**
   * Instead of recomputing complex queries every time, results are stored as a **materialized view**.
   * Example:
     ```sql
     CREATE MATERIALIZED VIEW YearlySales AS
     SELECT Year, SUM(Revenue) FROM Sales GROUP BY Year;
     ```
     * Future queries on `YearlySales` are **faster**.

***

## **4. Join Optimization**

Joins are expensive operations, so choosing the right join method is crucial.

### **Types of Join Methods**

1. **Nested Loop Join**
   * Used when **one table is small and another has an index**.
   * Example:
     ```sql
     SELECT * FROM Orders O JOIN Customers C ON O.CustomerID = C.CustomerID;
     ```
     * If `Customers` is small, the optimizer chooses **nested loop join**.

2. **Merge Join**
   * Used when both tables **are sorted on the join key**.
   * Example:
     ```sql
     SELECT * FROM Employees E JOIN Departments D ON E.DeptID = D.DeptID;
     ```
     * If both tables have indexes on `DeptID`, **merge join** is preferred.

3. **Hash Join**
   * Used when **both tables are large** and there are **no indexes**.
   * Example:
     ```sql
     SELECT * FROM Orders O JOIN Shipments S ON O.OrderID = S.OrderID;
     ```
     * If neither table has an index, a **hash join** is used.

***

## **Conclusion**

Query optimization involves multiple techniques such as **heuristic rules, cost estimation, indexing, caching, and join optimization**. By following best practices, query performance can be significantly improved.

Tabular representation of **Query Optimization Techniques**:

| **Optimization Technique**                        | **Description**                                                                           | **Example**                                                                                     | **Use Case**                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Heuristic Optimization**                        | Rule-based optimization that applies transformations without cost calculation.            | Apply selection (`WHERE`) conditions before joining tables.                                     | Used when simple, predefined transformations can improve performance. |
| **Pushing Selection Operations**                  | Apply `WHERE` filters early to reduce data size.                                          | `SELECT * FROM Employees WHERE Department = 'IT' AND Salary > 50000;`                           | Reduces the number of records processed in later operations.          |
| **Rearranging Join Orders**                       | Join smaller tables first to reduce intermediate result size.                             | Joining `Departments (50 rows)` before `Employees (10,000 rows)`.                               | Optimizes multi-table joins for better performance.                   |
| **Replacing Cartesian Product with Joins**        | Avoid unnecessary cross joins, use explicit `JOIN` instead.                               | `SELECT * FROM Employees, Departments WHERE Employees.DepartmentID = Departments.DepartmentID;` | Prevents performance issues caused by large result sets.              |
| **Project Early (Select Required Columns First)** | Avoid `SELECT *` and fetch only required columns.                                         | `SELECT EmployeeID, Name FROM Employees;`                                                       | Reduces memory and I/O overhead.                                      |
| **Cost-Based Optimization**                       | Uses statistics (histograms, selectivity, cardinality) to choose the best execution plan. | Uses `EXPLAIN ANALYZE` to estimate query costs.                                                 | Preferred when accurate cost-based decisions are required.            |
| **Histograms & Statistics**                       | Tracks column value distribution for better estimation.                                   | Index scan is preferred if `OrderDate` is used in a **highly selective query**.                 | Helps in determining when to use indexes.                             |
| **Selectivity & Cardinality Estimation**          | Predicts how many rows match a query condition.                                           | `SELECT * FROM Orders WHERE OrderDate = '2024-03-01';`                                          | Determines whether to use index scan or full table scan.              |
| **Index Selection**                               | Chooses between `B+ Tree` (range queries) and `Hash Index` (exact match).                 | `B+ Tree Index`: `SELECT * FROM Products WHERE Price BETWEEN 100 AND 500;`                      | Ensures optimal access path for queries.                              |
| **Access Path Selection**                         | Selects `index scan`, `sequential scan`, or `bitmap index scan`.                          | `SELECT * FROM Customers WHERE LastName = 'Smith';`                                             | Index scan is used if the column has an index.                        |
| **Indexing & Caching**                            | Uses indexes and caching to speed up query execution.                                     | `B+ Tree Index` for `Age`, Query caching for repeated queries.                                  | Reduces query execution time.                                         |
| **B+ Tree Indexing**                              | Used for `ORDER BY`, range conditions.                                                    | `SELECT * FROM Employees WHERE Age BETWEEN 30 AND 50;`                                          | Efficient for sorting and range-based searches.                       |
| **Hash Indexing**                                 | Used for **exact matches** (`=`).                                                         | `SELECT * FROM Users WHERE UserID = 1001;`                                                      | Faster lookup for key-value queries.                                  |
| **Query Caching**                                 | Stores query results for repeated execution.                                              | `SELECT COUNT(*) FROM Sales WHERE Year = 2024;`                                                 | Avoids recomputation of frequently used queries.                      |
| **Materialized Views**                            | Precomputed query results for faster access.                                              | `CREATE MATERIALIZED VIEW YearlySales AS SELECT Year, SUM(Revenue) FROM Sales GROUP BY Year;`   | Improves performance for aggregated queries.                          |
| **Join Optimization**                             | Selects the most efficient join method.                                                   | Uses `Nested Loop`, `Merge Join`, or `Hash Join` based on data size.                            | Optimizes performance of multi-table queries.                         |
| **Nested Loop Join**                              | Used when one table is **small** and another has an **index**.                            | `SELECT * FROM Orders O JOIN Customers C ON O.CustomerID = C.CustomerID;`                       | Best for small table joins where indexed lookups are efficient.       |
| **Merge Join**                                    | Used when both tables are sorted on the join key.                                         | `SELECT * FROM Employees E JOIN Departments D ON E.DeptID = D.DeptID;`                          | Best for joining sorted tables efficiently.                           |
| **Hash Join**                                     | Used when both tables are large and have **no indexes**.                                  | `SELECT * FROM Orders O JOIN Shipments S ON O.OrderID = S.OrderID;`                             | Best for large joins without indexes.                                 |

This tabular format provides a structured way to understand the different query optimization techniques. Let me know if you need modifications! 🚀

***

## **3. Transaction Processing and Concurrency Control Techniques**

A **transaction** is a logical unit of work that consists of multiple SQL statements executed together.

### **ACID Properties**

Transactions must satisfy:

* **Atomicity**: All changes are either fully committed or fully rolled back.
* **Consistency**: The database moves from one valid state to another.
* **Isolation**: Transactions execute independently of one another.
* **Durability**: Committed changes persist even after system failures.

### **Concurrency Control**

Concurrency control ensures multiple transactions execute safely in a multi-user environment.

* **Locks (Pessimistic Concurrency Control)**
  * Shared (S) locks for read operations.
  * Exclusive (X) locks for write operations.
  * Uses **Two-Phase Locking (2PL)** to ensure serializability.

* **Timestamp-Based Protocols**
  * Uses **timestamps** to ensure that older transactions execute before newer ones.

* **Optimistic Concurrency Control**
  * Allows transactions to execute without restrictions and validates them before commit.

* **Deadlock Prevention & Detection**
  * **Prevention**: Ensuring that a transaction requests all locks at once.
  * **Detection**: Using wait-for graphs to identify and resolve circular wait conditions.

***

## **4. Database Recovery Techniques**

Recovery ensures that a database remains in a consistent state after a crash.

### **Types of Failures**

* **Transaction Failures**: Due to logical errors (e.g., divide by zero).
* **System Failures**: Due to power loss, hardware crash, etc.
* **Disk Failures**: Physical damage to storage media.

### **Recovery Techniques**

* **Log-Based Recovery**: Maintains a **Write-Ahead Log (WAL)** to record all changes before committing.
  * Uses **Undo** (rollback uncommitted transactions).
  * Uses **Redo** (reapply committed changes).

* **Checkpointing**: Periodically saves the state of the database to reduce log size.

* **Shadow Paging**: Maintains copies of database pages to recover from failures.

***

## **5. Object and Object-Relational Databases**

Traditional relational databases store data in **tables**, while object-oriented databases store **objects**.

### **Object-Oriented Databases (OODB)**

* Integrates **object-oriented programming** concepts with databases.
* Supports **encapsulation, inheritance, and polymorphism**.
* Example: **ObjectDB, db4o**.

### **Object-Relational Databases (ORDB)**

* Extends relational databases with object-oriented features like **user-defined types (UDTs)** and **inheritance**.
* Example: **PostgreSQL, Oracle**.

***

## **6. Database Security and Authorization**

Security mechanisms protect a database from unauthorized access and corruption.

### **Key Security Mechanisms**

* **Access Control**: Using **GRANT** and **REVOKE** SQL statements to assign/restrict user permissions.
* **Encryption**: Storing data in an encrypted format.
* **SQL Injection Prevention**: Using prepared statements and input validation.
* **Auditing and Logging**: Tracking database activities for security analysis.

***
