---
title: Data Modeling
editUrl: false
---

Entity-Relationship Diagram, Relational Model - Constraints, Languages, Design, and Programming, Relational Database Schemas, Update Operations and Dealing with Constraint Violations; Relational Algebra and Relational Calculus; Codd Rules.

### Entity-Relationship (ER) Diagram

> An **Entity-Relationship (ER) Diagram** is a visual representation of the database structure. It helps in designing the database by illustrating the entities, their attributes, and relationships between them.

***

#### Components of an ER Diagram

| Component                 | Description                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Entity**                | An object or concept in the database (e.g., Student, Employee). Represented by a **rectangle**.                   |
| **Attributes**            | Characteristics of an entity (e.g., Name, Age). Represented by **ellipses**.                                      |
| **Primary Key**           | A unique attribute that identifies an entity (e.g., Student\_ID). Underlined inside the ellipse.                  |
| **Relationships**         | Links between entities (e.g., A Student *enrolls in* a Course). Represented by a **diamond**.                     |
| **Cardinality**           | Defines the number of entity occurrences related (1:1, 1:M, M:N).                                                 |
| **Weak Entity**           | An entity that depends on another entity (e.g., Order depends on Customer). Represented by **double rectangles**. |
| **Multivalued Attribute** | An attribute that can have multiple values (e.g., Phone Numbers). Represented by **double ellipses**.             |

***

#### Example ER Diagram: University Database

* **Entities**: Student, Course, Instructor
* **Attributes**: Student (ID, Name, Age), Course (Code, Title, Credits), Instructor (ID, Name, Department)
* **Relationships**:
  * Student *enrolls in* Course (Many-to-Many)
  * Instructor *teaches* Course (One-to-Many)

***

![Convert ER into table - Tpoint Tech](https://images.tpointtech.com/dbms/images/dbms-reduction-of-er-diagram-into-table.png)

### Relational Model

The **Relational Model** is the foundation of relational databases and is based on the concept of **tables (relations)** that store data in a structured format.

***

#### Constraints in the Relational Model

Constraints ensure **data integrity** and consistency. The main types of constraints are:

| Constraint Type                      | Description                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Domain Constraint**                | Ensures attribute values are from a predefined domain (e.g., Age must be an integer).      |
| **Key Constraint**                   | Every table must have a **Primary Key**, which uniquely identifies each row.               |
| **Entity Integrity Constraint**      | The **Primary Key** cannot be NULL.                                                        |
| **Referential Integrity Constraint** | A **Foreign Key** in one table must match a **Primary Key** in another table (or be NULL). |
| **Not Null Constraint**              | Ensures an attribute always has a value.                                                   |
| **Unique Constraint**                | Ensures values in a column are unique.                                                     |

***

#### Relational Languages

Relational databases support different query languages:

| Language                             | Purpose                                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **SQL (Structured Query Language)**  | Standard language for managing relational databases (includes DDL, DML, DCL, TCL).                                               |
| **Relational Algebra**               | Procedural query language that uses operations like **Selection (σ), Projection (π), Join (⨝), Union (∪), Difference (-)**, etc. |
| **Tuple Relational Calculus (TRC)**  | Non-procedural query language based on predicate logic.                                                                          |
| **Domain Relational Calculus (DRC)** | Similar to TRC but focuses on domains of attributes.                                                                             |

***

#### Relational Database Design

> Good design ensures data consistency, eliminates redundancy, and improves efficiency.

| Design Principle            | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Normalization**           | Process of organizing tables to minimize redundancy using **Normal Forms (1NF, 2NF, 3NF, BCNF, etc.).**  |
| **Functional Dependencies** | Rules that define relationships between attributes (e.g., A → B means B is functionally dependent on A). |
| **Decomposition**           | Splitting tables into smaller ones to reduce redundancy while preserving dependencies.                   |

***

#### Programming with Relational Databases

Relational databases support various programming techniques:

| Approach              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| **Embedded SQL**      | SQL queries written inside application code (e.g., in Java, C, Python). |
| **Stored Procedures** | Predefined SQL scripts stored in the database to optimize execution.    |
| **Triggers**          | Automated SQL actions that execute when specific conditions are met.    |
| **ODBC/JDBC**         | Interfaces that allow applications to connect to relational databases.  |

***

### Relational Database Schemas

A **Relational Database Schema** defines the structure of a relational database, including:

1. **Relations (Tables)** – A collection of tuples (rows) representing data.
2. **Attributes (Columns)** – Each relation consists of attributes, which have a name and a domain.
3. **Keys** – Identifies unique tuples. This includes:
   * **Primary Key (PK)** – A unique identifier for each row.
   * **Foreign Key (FK)** – A reference to a primary key in another table to establish relationships.
4. **Constraints** – Rules to maintain data integrity (e.g., Not NULL, Unique, Referential Integrity).
5. **Schema Notation** – A formal way to define relations:

   **Example:**

   ```
   Student(SID: INT, Name: VARCHAR(50), Age: INT, Dept: VARCHAR(20), PRIMARY KEY(SID))
   Course(CID: INT, Title: VARCHAR(100), Credits: INT, PRIMARY KEY(CID))
   Enrolled(SID: INT, CID: INT, Grade: CHAR(2), 
            PRIMARY KEY(SID, CID),
            FOREIGN KEY (SID) REFERENCES Student(SID),
            FOREIGN KEY (CID) REFERENCES Course(CID))
   ```

***

### Update Operations in a Relational Database

A relational database supports four key **update operations**:

| **Operation**            | **Description**                                                     |
| ------------------------ | ------------------------------------------------------------------- |
| **Insert**               | Adds a new row to a table.                                          |
| **Delete**               | Removes an existing row.                                            |
| **Update**               | Modifies attribute values of existing rows.                         |
| **Modify (Alter Table)** | Changes the schema (adding/removing columns, changing constraints). |

#### (a) Insert Operation

```sql
INSERT INTO Student (SID, Name, Age, Dept)
VALUES (101, 'Alice', 20, 'CS');
```

* Inserts a new student record.
* May violate **Primary Key, Domain, or Referential Integrity Constraints**.

#### (b) Delete Operation

```sql
DELETE FROM Student WHERE SID = 101;
```

* Removes Alice from the database.
* May violate **Referential Integrity** (if her SID exists in the `Enrolled` table).

#### (c) Update Operation

```sql
UPDATE Student SET Age = 21 WHERE SID = 101;
```

* Updates Alice’s age.
* May violate **Domain Constraints** (if an invalid value is entered).

#### (d) Modify Table Structure

```sql
ALTER TABLE Student ADD COLUMN Email VARCHAR(100);
```

* Adds a new column to store student emails.

***

### Dealing with Constraint Violations

Constraint violations occur when update operations do not satisfy predefined rules. Let’s examine how to handle them:

#### (a) Domain Constraint Violation

Occurs when an attribute value is outside the defined domain.

```sql
INSERT INTO Student (SID, Name, Age, Dept) VALUES (102, 'Bob', 'Twenty', 'CS');
```

* Age should be an **integer**, but 'Twenty' is a string.\
  ✅ **Solution**: Use correct data types.

#### (b) Primary Key Violation

Occurs when a **duplicate key** is inserted.

```sql
INSERT INTO Student (SID, Name, Age, Dept) VALUES (101, 'Charlie', 22, 'EE');
```

* SID `101` already exists.\
  ✅ **Solution**: Ensure unique primary key values or use `ON DUPLICATE KEY UPDATE` (in MySQL).

#### (c) Referential Integrity Violation

Occurs when a foreign key references a **non-existent** primary key.

```sql
INSERT INTO Enrolled (SID, CID, Grade) VALUES (999, 201, 'A');
```

* SID `999` does not exist in the `Student` table.\
  ✅ **Solution**: Ensure referenced values exist before insertion or use `ON DELETE CASCADE` to automatically remove dependent records.

#### (d) Not NULL Constraint Violation

Occurs when a mandatory field is left empty.

```sql
INSERT INTO Student (SID, Name, Age, Dept) VALUES (103, NULL, 23, 'ME');
```

* Name cannot be NULL.\
  ✅ **Solution**: Ensure required fields have values before inserting data.

#### (e) Unique Constraint Violation

Occurs when an attribute marked as **unique** is duplicated.

```sql
ALTER TABLE Student ADD CONSTRAINT unique_name UNIQUE(Name);
INSERT INTO Student (SID, Name, Age, Dept) VALUES (104, 'Alice', 24, 'CS');
```

* If 'Alice' already exists, the insert fails.\
  ✅ **Solution**: Ensure unique values or allow duplicates by removing the constraint.

#### (f) Check Constraint Violation

Occurs when a condition is not met.

```sql
ALTER TABLE Student ADD CONSTRAINT age_check CHECK (Age >= 18);
INSERT INTO Student (SID, Name, Age, Dept) VALUES (105, 'David', 16, 'CS');
```

* Age must be **≥ 18**, but `16` violates the constraint.\
  ✅ **Solution**: Use valid values or remove the check constraint if unnecessary.

***

## **Summary Table: Update Operations & Constraint Handling**

| **Update Operation** | **Possible Constraint Violation**                    | **Solution**                                                 |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **INSERT**           | Primary Key, Domain, Not NULL, Referential Integrity | Ensure valid values, handle foreign key constraints          |
| **DELETE**           | Referential Integrity                                | Use `ON DELETE CASCADE` or manually delete dependent records |
| **UPDATE**           | Domain, Unique, Not NULL                             | Validate new values before updating                          |
| **ALTER TABLE**      | Unique, Domain, Referential Integrity                | Ensure data consistency before modification                  |

***

# **Relational Algebra, Relational Calculus, and Codd's Rules**

***

## **1. Relational Algebra**

Relational Algebra is a **procedural query language** that uses a set of operations to manipulate relations (tables) and retrieve data. It provides a foundation for SQL and other database query languages.

### **Basic Operations in Relational Algebra**

| **Operation**             | **Description**                                          | **Notation**             |
| ------------------------- | -------------------------------------------------------- | ------------------------ |
| **Selection (σ)**         | Retrieves rows that satisfy a condition.                 | `σ_condition(R)`         |
| **Projection (π)**        | Retrieves specific columns (attributes).                 | `π_attribute-list(R)`    |
| **Union (∪)**             | Combines tuples from two relations (duplicates removed). | `R ∪ S`                  |
| **Set Difference (-)**    | Returns tuples in `R` but not in `S`.                    | `R - S`                  |
| **Cartesian Product (×)** | Combines all tuples of `R` with all tuples of `S`.       | `R × S`                  |
| **Rename (ρ)**            | Renames relation or attributes.                          | `ρ_newName(oldRelation)` |

### **Example Queries in Relational Algebra**

#### **(a) Selection (σ)**

Retrieve all students from the "CS" department:

```sql
σ_Dept='CS' (Student)
```

#### **(b) Projection (π)**

Retrieve only student names:

```sql
π_Name (Student)
```

#### **(c) Union (∪)**

Retrieve all students from two different tables (`Student1` and `Student2`):

```sql
Student1 ∪ Student2
```

#### **(d) Set Difference (-)**

Find students enrolled in `Course1` but not in `Course2`:

```sql
Enrolled1 - Enrolled2
```

#### **(e) Cartesian Product (×)**

Pair every student with every course:

```sql
Student × Course
```

***

## **2. Relational Calculus**

Relational Calculus is a **non-procedural query language**, meaning it specifies what data to retrieve **without specifying how**.

### **Types of Relational Calculus**

1. **Tuple Relational Calculus (TRC)**
   * Uses tuple variables and logical conditions.
   * **Notation:** `{t | Condition(t)}`
   * Example: Find students enrolled in course `CS101`:

```sql
{ t | t ∈ Student ∧ ∃ e ∈ Enrolled (e.SID = t.SID ∧ e.CID = 'CS101') }
```

2. **Domain Relational Calculus (DRC)**
   * Uses domain variables instead of tuple variables.
   * **Notation:** `{<d1, d2, ..., dn> | Condition(d1, d2, ..., dn)}`
   * Example: Find student names with age > 20:

```sql
{ <Name> | ∃ Age, Dept ( <Name, Age, Dept> ∈ Student ∧ Age > 20) }
```

### **Key Differences: Relational Algebra vs. Relational Calculus**

| **Feature**        | **Relational Algebra**                 | **Relational Calculus**         |
| ------------------ | -------------------------------------- | ------------------------------- |
| **Type**           | Procedural                             | Non-procedural                  |
| **Focus**          | Specifies how to retrieve data         | Specifies what data to retrieve |
| **Operations**     | Uses selection, projection, join, etc. | Uses logical conditions         |
| **Implementation** | Used in query execution                | Used for query specification    |

***

## **3. Codd's 12 Rules for RDBMS**

Dr. Edgar F. Codd defined **12 rules** (often called **Codd's Rules**) to qualify a system as a **Relational Database Management System (RDBMS)**.

| **Rule**                              | **Description**                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Foundation Rule**                   | The system must manage databases **only through relational capabilities.**                                           |
| **Information Rule**                  | All information must be **stored in tables (relations)**.                                                            |
| **Guaranteed Access**                 | Every data element must be **accessible using a combination of table name, primary key, and column name.**           |
| **Systematic Null Handling**          | **NULL values should be supported** for missing or unknown information.                                              |
| **Active Online Catalog**             | Metadata (schema, structure) must be stored in a relational format and accessible using queries.                     |
| **Comprehensive Data Sublanguage**    | The system must support a language (like SQL) for defining, querying, and modifying data.                            |
| **View Updating**                     | Views should be **updatable when logically possible**.                                                               |
| **High-Level Insert, Update, Delete** | The system must allow row-level and set-level operations, not just record-by-record modifications.                   |
| **Physical Data Independence**        | Changes in **physical storage should not affect queries.**                                                           |
| **Logical Data Independence**         | Changes in schema (e.g., adding a column) should not affect applications using the database.                         |
| **Integrity Independence**            | Integrity constraints must be definable within the database, not the application.                                    |
| **Distribution Independence**         | The database **should work regardless** of whether data is **centralized or distributed** across multiple locations. |
| **Non-Subversion**                    | The system must **prevent bypassing security and integrity** constraints via low-level operations.                   |

### **Significance of Codd’s Rules**

* Ensures ACID compliance (Atomicity, Consistency, Isolation, Durability).
* Enforces relational principles for better scalability and performance.
* SQL-based databases like MySQL, PostgreSQL, and Oracle follow these rules.

***

## **Final Summary**

| **Concept**             | **Description**                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| **Relational Algebra**  | A **procedural** query language using operations like Selection, Projection, Join, and Union.         |
| **Relational Calculus** | A **non-procedural** query language using logical conditions (Tuple and Domain Calculus).             |
| **Codd’s Rules**        | 12 rules defining a proper **Relational DBMS** to ensure data integrity, consistency, and efficiency. |
