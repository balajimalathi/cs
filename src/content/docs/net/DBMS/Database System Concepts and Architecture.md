---
title: Database System Concepts and Architecture
editUrl: false
---

Data Models, Schemas, and Instances; Three-Schema Architecture and Data Independence; Database Languages and Interfaces; Centralized and Client/Server Architectures for DBMS

### Data Models

A collection of conceptual tools for describing data, data relationships, data <abbr title="Meaning and interpretation">semantics</abbr>, and consistency constraints.

* **Relational Model**
  * collection of tables to represent both data and the relationships among those data
  * **Tables** are also known as **relations**,  tuples (rows), and attributes (columns)
  * Record-based model
* **Entity-Relationship Model**
  * uses a collection of basic objects, called entities, and relationships among these objects
  * Graphical representation

### Entity-Relationship Model vs. Relational Model

| **Feature**           | **Entity-Relationship Model (ER Model)**                                   | **Relational Model**                                                    |
| --------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Definition**        | A conceptual model that represents real-world entities and relationships.  | A logical model that represents data as tables (relations).             |
| **Purpose**           | Used in database design to visualize data structure before implementation. | Used in database management systems (DBMS) to store and query data.     |
| **Structure**         | Uses **entities, attributes, and relationships**.                          | Uses **tables (relations), tuples (rows), and attributes (columns)**.   |
| **Primary Component** | Entities, attributes, relationships, primary keys, and cardinality.        | Tables, rows (tuples), columns (attributes), primary & foreign keys.    |
| **Representation**    | **Graphical** (ER diagrams with boxes and lines).                          | **Tabular** (tables with rows and columns).                             |
| **Data Storage**      | Abstract, does not store data directly.                                    | Physically stores data in relational databases.                         |
| **Keys**              | **Primary keys** uniquely identify entities.                               | **Primary & foreign keys** establish relationships between tables.      |
| **Normalization**     | Not required, as it's a conceptual design.                                 | Requires normalization to reduce redundancy.                            |
| **Implementation**    | Converted into a relational model before implementation.                   | Directly implemented in relational databases (MySQL, PostgreSQL, etc.). |
| **Use Case**          | Used in the **design phase** of database development.                      | Used in the **implementation and querying phase** in DBMS.              |
