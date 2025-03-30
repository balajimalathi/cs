---
title: Database System Concepts and Architecture
editUrl: false
---

### Data Models

> A collection of conceptual tools for describing data, data relationships, data <abbr title="Meaning and interpretation">semantics</abbr>, and consistency constraints.

* **Relational Model**
  * collection of tables to represent both data and the relationships among those data
  * **Tables** are also known as **relations**,  tuples (rows), and attributes (columns)
  * Record-based model
* **Entity-Relationship Model**
  * uses a collection of basic objects, called entities, and relationships among these objects
  * **Graphical representation**
* **Semi-structured Data Model**
  * individual data items of the same type may have different sets of attributes
  * e.g.. JSON (JavaScript Object Notation) and Extensible Markup Language (XML)
* **Object-Based Data Model**
  * instead of just storing **plain data**, we store **objects** with both **data + behavior** (methods).
  * Methods are defined using `CREATE FUNCTION` in database.

```sql
CREATE FUNCTION start_engine(car_id INT) RETURNS TEXT AS $$
BEGIN
	RETURN 'Engine started for Car ID ' || car_id;
END;
$$ LANGUAGE plpgsql;
```

### Data Models Comparison

| **Feature**           | **Relational Model**                                       | **Entity-Relationship Model**                                 | **Semi-structured Data Model**                                 | **Object-Based Data Model**                                                |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Definition**        | Uses tables to store data and relationships.               | Uses entities and relationships to model data conceptually.   | Allows flexible data representation where attributes may vary. | Stores objects with data and methods.                                      |
| **Purpose**           | Organizing structured data efficiently.                    | Conceptual design of data relationships.                      | Handling irregular and hierarchical data.                      | Storing and manipulating complex data with behavior.                       |
| **Structure**         | Tables (relations), rows (tuples), columns (attributes).   | Graphical model with entities, attributes, and relationships. | Tree or graph-like hierarchical structure.                     | Objects containing attributes (data) and methods (behavior).               |
| **Primary Component** | Tables, Rows, Columns.                                     | Entities, Relationships, Attributes.                          | Nodes, Attributes, and Links.                                  | Objects, Classes, Methods.                                                 |
| **Representation**    | Tabular format.                                            | ER diagrams.                                                  | JSON, XML, NoSQL.                                              | Object-oriented structure (like Java/C++ classes).                         |
| **Data Storage**      | Stored in tables with fixed schema.                        | Conceptual, converted into relational or NoSQL structures.    | Flexible schema, supports self-describing formats.             | Stored as objects in relational or NoSQL databases.                        |
| **Keys**              | Primary key, Foreign key.                                  | Entity Identifiers, Relationship Keys.                        | Key-Value pairs, Path-based access.                            | Object ID, References.                                                     |
| **Normalization**     | Ensures minimal redundancy using normalization techniques. | Not applicable directly (converted to relational later).      | Schema-less, normalization not required.                       | Encapsulation reduces redundancy but does not follow strict normalization. |
| **Implementation**    | SQL-based relational databases (MySQL, PostgreSQL).        | Used for conceptual design before implementation.             | NoSQL databases (MongoDB, CouchDB).                            | Object-relational databases (PostgreSQL with JSONB, ObjectDB).             |
| **Use Case**          | Banking, ERP, CRM, Inventory systems.                      | Data modeling before implementation in any database.          | Web data, APIs, logs, XML/JSON document storage.               | Complex applications like CAD, AI/ML models, and multimedia databases.     |

### Data Abstraction

1. **Physical Level**
   * Uses complex **low-level** data structures.
   * Lowest level, describes **how** data is actually stored.
   * Example: Data stored as blocks of bytes, records in files, indexes for retrieval.

2. **Logical Level**
   * Defines **what** data is stored and the **relationships** between data.
   * Uses simpler structures compared to the physical level.
   * Example: Table schema, relationships (e.g., instructor **dept\_name** must exist in **department**).
   * Provides **physical data independence** (changes at physical level do not affect logical level).

3. **View Level**
   * **Highest level**, shows only relevant parts of the database to users.
   * Multiple **views** for different users (e.g., students see course details, but not instructor salaries).
   * Enhances **security** by restricting access to certain data.

### Schema (Structure of the Database)

* The **schema** is the **design or blueprint** of a database.
* It defines **how data is organized** in terms of **tables, columns, data types, relationships, constraints, and indexes**.
* It remains **constant** over time unless modified.

**Example**

```sql
    CREATE TABLE Student (
        ID INT PRIMARY KEY,
        Name VARCHAR(50),
        Age INT,
        Dept VARCHAR(20)
    );
```

This **schema** defines the **structure** of the "Student" table, specifying its columns and their data types.

### Physical Schema vs. Logical Schema in DBMS

| Aspect         | Physical Schema                                                                  | Logical Schema                                                                                     |
| -------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Definition** | Describes how data is physically stored on storage devices (disk, SSD, etc.).    | Describes the logical structure of the database, including tables, relationships, and constraints. |
| **Purpose**    | Focuses on **storage optimization, indexing, and file organization**.            | Focuses on **data organization, relationships, and integrity constraints**.                        |
| **Visibility** | Hidden from users and application developers; handled by the **DBMS internals**. | Used by **database administrators and developers** to define data structure.                       |
| **Changes**    | Changes when storage mechanisms or performance optimizations are updated.        | Changes when database structure or requirements are modified.                                      |
| **Example**    | Data stored as **B-Trees, Hash Indexes, File Structures**.                       | `CREATE TABLE Student (ID INT, Name VARCHAR(50));`                                                 |
| **Analogy:**   |                                                                                  |                                                                                                    |

* **Physical Schema** → Like the **hard disk storage format** (how files are structured internally).
* **Logical Schema** → Like the **table structure in SQL** (how data is logically organized).

### Instance (Actual Data in the Database)

* An **instance** refers to the **actual data stored** in the database at a specific moment.
* It changes **frequently** as data is inserted, updated, or deleted.
* The table now contains **an instance** with actual records.

**Example**

```sql
    INSERT INTO Student VALUES (101, 'John', 21, 'CSE');
    INSERT INTO Student VALUES (102, 'Alice', 22, 'ECE');
```

**Key Differences Between Schema and Instance**

| Aspect      | Schema                        | Instance                           |
| ----------- | ----------------------------- | ---------------------------------- |
| Definition  | Structure of the database     | Actual data stored                 |
| Changes     | Rarely changes                | Changes frequently                 |
| Persistence | Permanent                     | Temporary (data changes over time) |
| Example     | Table design (`CREATE TABLE`) | Records stored in the table        |

### Three-Schema Architecture in DBMS

The **Three-Schema Architecture** separates a database into three levels to achieve **data abstraction and independence**:

1. **Internal Schema (Physical Level)**
   * Defines **how** data is stored physically (file structures, indexing, storage allocation).
   * Deals with **performance optimization** and **hardware-level data organization**.
2. **Conceptual Schema (Logical Level)**
   * Defines **what** data is stored and the relationships between them.
   * Includes tables, attributes, constraints, and integrity rules.
   * Provides **physical data independence** (insulating applications from storage changes).
3. **External Schema (View Level)**
   * Defines **user-specific views** of the database.
   * Users interact with **filtered or restricted** views of the database for security and simplicity.
   * Provides **logical data independence** (insulating users from changes in the logical schema).

***

### Data Independence

> Data independence ensures that changes at one level do not affect other levels. It is divided into:

1. **Physical Data Independence**
   * Changes in **physical storage (e.g., indexing, compression, partitioning)** do not affect the **logical schema**.
   * Example: Changing a database’s storage from **SSD to cloud storage** without altering table definitions.
2. **Logical Data Independence**
   * Changes in the **logical schema (tables, relationships, constraints)** do not affect **external views or applications**.
   * Example: Adding a new column to a table without affecting **existing user queries or views**.

### Database Languages

DBMS uses different languages to interact with and manage databases. These include:

1. **Data Definition Language (DDL)**
   * Used to define and modify database structures.
   * Commands:
     * `CREATE` (creates tables, views, indexes)
     * `ALTER` (modifies existing schema)
     * `DROP` (deletes tables or databases)
     * `TRUNCATE` (removes all records without logging individual row deletions)
2. **Data Manipulation Language (DML)**
   * Used for inserting, updating, deleting, and retrieving data.
   * Types:
     * **Procedural DML** (Requires the user to specify *how* data should be retrieved)
     * **Declarative DML (SQL-based)** (Only specifies *what* data is needed, and DBMS decides how to retrieve it)
   * Commands:
     * `INSERT`, `UPDATE`, `DELETE`, `SELECT`
3. **Data Control Language (DCL)**
   * Used for **access control** and **security**.
   * Commands:
     * `GRANT` (assigns privileges)
     * `REVOKE` (removes privileges)
4. **Transaction Control Language (TCL)**
   * Manages **transactions** to maintain data integrity.
   * Commands:
     * `COMMIT` (saves changes)
     * `ROLLBACK` (undoes changes)
     * `SAVEPOINT` (sets a rollback point within a transaction)

***

### Database Interfaces

DBMS provides different interfaces for users to interact with the database:

1. **Command-Line Interface (CLI)**
   * Uses SQL commands to interact with the database.
   * Example: MySQL CLI, PostgreSQL psql
2. **Graphical User Interface (GUI)**
   * Provides a visual way to interact with the database.
   * Example: phpMyAdmin, pgAdmin
3. **Application Programming Interface (API)**
   * Allows developers to interact with the database using programming languages.
   * Example: JDBC (Java Database Connectivity), ODBC (Open Database Connectivity)
4. **Natural Language Interface**
   * Allows users to interact using human-like language.
   * Example: AI-powered database queries (ChatGPT-based SQL generation)
5. **Web-Based Interfaces**
   * Enables database access through web applications.
   * Example: SQL-based reporting tools, cloud-based database dashboards

### Centralized DBMS Architecture

* A single database system runs on a central server.
* All data is stored in one location, and users access it via terminals or remote connections.
* Example: A mainframe system with multiple dumb terminals.

**Advantages:**\
✅ Easier data management and maintenance.\
✅ Strong security as data is centralized.\
✅ No data redundancy.

**Disadvantages:**\
❌ Performance bottlenecks due to a single server handling all requests.\
❌ If the server fails, the entire system goes down.

#### Single-User vs. Multiuser Systems

| Feature                 | Single-User Systems              | Multiuser Systems                     |
| ----------------------- | -------------------------------- | ------------------------------------- |
| **Devices**             | Mobile, PC                       | Servers, Data Centers                 |
| **Users**               | One user at a time               | Multiple users remotely connected     |
| **Processors**          | Typically **1** CPU (multi-core) | Multiple CPUs                         |
| **Concurrency Control** | Minimal                          | Full transaction support              |
| **Crash Recovery**      | Basic or absent                  | Robust mechanisms                     |
| **Query Support**       | API-based                        | SQL queries & API                     |
| **Example**             | Embedded databases (SQLite)      | Server-based DBMS (PostgreSQL, MySQL) |

***

### Client/Server DBMS Architecture

* The database is stored on a **server**, and users (clients) interact with it via networked applications.
* Clients send requests (SQL queries), and the server processes them and returns results.

#### Types of Client/Server Architectures

1. **Two-Tier Architecture:**
   * Clients directly communicate with the database server using APIs (e.g., JDBC, ODBC).
   * Example: A desktop application connecting to a database server.
2. **Three-Tier Architecture:**
   * Adds an intermediate **application server** between the client and database.
   * The application server processes client requests, handles business logic, and interacts with the database.
   * Example: Web applications with frontend (browser), middleware (API server), and backend (database).

**Advantages:**\
✅ Faster performance with load distribution.\
✅ Scalability—more clients can be added easily.\
✅ Better security since clients don’t directly access the database.

**Disadvantages:**\
❌ Complex setup and maintenance.\
❌ Network latency may affect response times.

### Difference Between Centralized and Client/Server Architectures for DBMS

| Feature                | **Centralized DBMS**                                                | **Client/Server DBMS**                                                   |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Architecture**       | Entire database resides on a **single machine** (server).           | Database is distributed across **client and server**.                    |
| **Data Storage**       | Stored and managed in **one central location**.                     | Data is stored on the **server**, while clients access it remotely.      |
| **Processing**         | The server handles **all processing** (queries, transactions).      | **Clients process requests** and send queries to the server.             |
| **Performance**        | Can become a **bottleneck** if many users access it simultaneously. | More **scalable** as clients handle some processing.                     |
| **Scalability**        | **Limited** (depends on server capacity).                           | **Highly scalable**, as more clients and servers can be added.           |
| **Fault Tolerance**    | **Low** – if the server fails, the entire system stops working.     | **Higher** – server redundancy and replication improve reliability.      |
| **Concurrency**        | **Difficult to manage** due to a single system handling all users.  | **Better** as transactions are distributed among clients and the server. |
| **Network Dependency** | **Not required** (works independently).                             | **Requires a network** for communication between client and server.      |
| **Security**           | Easier to manage but poses a **single point of failure**.           | More **complex security** measures needed due to multiple access points. |
| **Examples**           | Single-user databases like **Microsoft Access**, **SQLite**.        | Enterprise systems like **MySQL**, **PostgreSQL**, **Oracle DB**.        |

### Parallelism in Database Systems

> Parallelism in databases affects performance and scalability:

#### Coarse-Grained Parallelism

* **Few cores (4–8)** share **main memory**.
* Each query runs on a **single processor**, while multiple queries execute **concurrently**.
* Increases **throughput** (more queries per second).
* Example: Traditional server-based databases.

#### Fine-Grained Parallelism

* **Large number of processors** available.
* A **single query is split into multiple tasks** that run in parallel.
* Improves **response time** for individual queries.
* Example: Parallel database systems (Google BigQuery, Amazon Redshift).
