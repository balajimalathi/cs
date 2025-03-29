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

## **Conclusion**

* **Normalization** reduces redundancy using functional dependencies.
* **Query processing** optimizes SQL execution for performance.
* **Transaction management** ensures database consistency using **ACID** properties.
* **Concurrency control** prevents data corruption in multi-user environments.
* **Database recovery** restores data after failures.
* **Object databases** extend relational models with object-oriented features.
* **Database security** protects against unauthorized access.

This covers the core concepts in *Database System Concepts* by Silberschatz, Korth, and Sudarshan. Let me know if you need further details!
