---
title: Big Data Systems
editUrl: false
---

## 1. Big Data Characteristics

Big Data is defined by the following characteristics, often referred to as the 5Vs:

* **Volume:** The massive amount of data generated every second from various sources.
* **Velocity:** The speed at which data is generated, processed, and analyzed.
* **Variety:** Different types of data, including structured, semi-structured, and unstructured data.
* **Veracity:** The quality and reliability of data, ensuring data accuracy.
* **Value:** The potential insights and business intelligence derived from Big Data analysis.

## 2. Types of Big Data

Big Data can be categorized into three major types:

1. **Structured Data:** Organized data stored in relational databases, e.g., **SQL tables.**
2. **Semi-Structured Data:** Data that does not fit in traditional databases but has some structure, e.g., **JSON, XML, logs**.
3. **Unstructured Data:** Data without a predefined model, e.g., **videos, images, social media posts, emails.**

## 3. Big Data Architecture

A Big Data architecture consists of multiple layers that handle data collection, storage, processing, and analysis. The key components are:

1. **Data Sources:** Sensors, social media, transactional databases, logs, IoT devices.
2. **Data Ingestion:** Tools like Apache Kafka, Flume, Sqoop, and NiFi for collecting and transferring data.
3. **Storage Layer:**
   * Distributed storage using Hadoop Distributed File System (HDFS) or cloud-based storage.
   * NoSQL databases such as HBase, Cassandra, and MongoDB.
4. **Processing Layer:**
   * **Batch Processing:** Hadoop MapReduce, Apache Spark.
   * **Stream Processing:** Apache Storm, Apache Flink, Spark Streaming.
5. **Analysis & Querying:** Hive, Pig, Presto, Drill for querying large datasets.
6. **Visualization & Reporting:** Tableau, Power BI, Kibana for data visualization.
7. **Security & Governance:** Data encryption, access control, auditing mechanisms.

## 4. Introduction to MapReduce and Hadoop

### **MapReduce**

MapReduce is a programming model for **processing large datasets in parallel** across distributed clusters. It has two main phases:

1. **Map Phase:** Input data is split into key-value pairs and processed in parallel.
2. **Reduce Phase:** The output from the Map phase is aggregated, filtered, and transformed.

Example:

* **Input:** List of words
* **Map:** Convert words into key-value pairs (word, count)
* **Reduce:** Aggregate word counts

### **Hadoop Framework**

Hadoop is an open-source framework designed for distributed storage and processing of large datasets using MapReduce. The core components of Hadoop are:

1. **Hadoop Distributed File System (HDFS)** - A scalable, fault-tolerant storage system.
2. **YARN (Yet Another Resource Negotiator)** - Manages cluster resources and job scheduling.
3. **MapReduce Engine** - Executes data processing tasks in parallel.
4. **Common Utilities** - Provide libraries and utilities for Hadoop.

## 5. Distributed File System & HDFS

### **Distributed File System**

A Distributed File System (DFS) stores data across multiple machines, ensuring fault tolerance and scalability. Examples include Google File System (GFS) and Hadoop Distributed File System (HDFS).

### **Hadoop Distributed File System (HDFS)**

HDFS is a highly fault-tolerant distributed storage system optimized for handling large files. Its key features include:

* **Master-Slave Architecture:**
  * **NameNode:** Maintains metadata and directory structure.
  * **DataNodes:** Store and manage actual data blocks.
* **Block-Based Storage:** Data is split into blocks (default: 128MB or 256MB) and distributed across DataNodes.
* **Replication:** Each block is replicated (default: 3 copies) to ensure fault tolerance.
* **Write Once, Read Many (WORM) Model:** Optimized for batch processing rather than frequent modifications.
* **Fault Tolerance:** If a DataNode fails, data is replicated to another node to maintain integrity.

### **HDFS Operations**

* **File Read Process:**
  1. Client requests file from NameNode.
  2. NameNode provides block locations.
  3. Client retrieves data from DataNodes.

* **File Write Process:**
  1. Client sends data to NameNode.
  2. Data is split into blocks and replicated.
  3. DataNodes store the blocks and acknowledge NameNode.
