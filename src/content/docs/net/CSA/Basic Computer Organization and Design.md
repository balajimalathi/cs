---
title: Basic Computer Organization and Design
editUrl: false
---

Program Organization and Instruction Codes, Computer Registers, Computer Instructions, Timing and Control, Instruction Cycle, Memory-Reference Instructions, Input-Output, Interrupt

## **1. Program Organization and Instruction Codes**

### **Definition**

* A **program** is a sequence of instructions stored in memory that directs the computer to perform specific tasks.
* **Instruction codes** are binary patterns that define operations to be executed by the CPU.

### **Components of an Instruction**

1. **Opcode (Operation Code)** – Specifies the operation (e.g., ADD, SUB, MOV).
2. **Operand(s)** – Data or memory locations on which the operation is performed.

### **Example**

* **Instruction:** `ADD R1, R2`
  * **Opcode:** `ADD` (Addition)
  * **Operands:** `R1` (Register 1), `R2` (Register 2)

### **Real-World Example**

* In a **calculator program**, instructions like `ADD`, `SUB`, `MUL`, and `DIV` are used to perform arithmetic operations.

### **Model Question (UGC NET)**

**Q:** What is the function of an opcode in an instruction?\
**A:** The opcode specifies the operation to be performed by the CPU (e.g., ADD, SUB, JUMP).

***

## **2. Computer Registers**

### **Definition**

Registers are **small, high-speed storage locations** inside the CPU used to hold data, addresses, and instructions temporarily.

### **Common Registers in a Basic Computer**

| **Register**                      | **Purpose**                                        |
| --------------------------------- | -------------------------------------------------- |
| **Accumulator (AC)**              | Stores results of arithmetic/logic operations      |
| **Program Counter (PC)**          | Holds the address of the next instruction          |
| **Instruction Register (IR)**     | Holds the current instruction being executed       |
| **Memory Address Register (MAR)** | Stores the address of memory to be accessed        |
| **Memory Buffer Register (MBR)**  | Temporarily holds data read from/written to memory |

### **Example**

* **Fetching an Instruction:**
  * PC → MAR → Memory → MBR → IR

### **Real-World Example**

* In a **traffic light controller**, registers store timing values and sequence data.

### **Model Question (UGC NET)**

**Q:** Which register holds the address of the next instruction to be executed?\
**A:** **Program Counter (PC).**

***

## **3. Computer Instructions**

### **Types of Instructions**

1. **Data Transfer Instructions** (e.g., `MOV`, `LOAD`, `STORE`)
2. **Arithmetic Instructions** (e.g., `ADD`, `SUB`, `MUL`)
3. **Logical Instructions** (e.g., `AND`, `OR`, `NOT`)
4. **Control Instructions** (e.g., `JUMP`, `BRANCH`, `HALT`)

### **Example**

* `LOAD R1, [1000]` → Loads data from memory location 1000 into Register R1.
* `ADD R1, R2` → Adds contents of R1 and R2, stores result in R1.

### **Real-World Example**

* In a **banking system**, instructions like `ADD` and `SUB` update account balances.

### **Model Question (UGC NET)**

**Q:** Which instruction is used to transfer data from memory to a CPU register?\
**A:** `LOAD` instruction.

***

## **4. Timing and Control**

### **Definition**

* The **Control Unit (CU)** generates timing signals to synchronize operations.
* **Clock cycles** determine instruction execution speed.

### **Control Signals**

* **Fetch:** PC → MAR → Memory → IR
* **Execute:** Decode instruction → Perform operation

### **Example**

* **Fetch-Decode-Execute Cycle:**
  1. Fetch instruction from memory.
  2. Decode opcode.
  3. Execute operation.

### **Real-World Example**

* A **microwave oven** uses timing signals to control heating duration.

### **Model Question (UGC NET)**

**Q:** What is the role of the Control Unit in a CPU?\
**A:** It generates control signals to coordinate instruction execution.

***

## **5. Instruction Cycle**

### **Phases**

1. **Fetch:** Retrieve instruction from memory.
2. **Decode:** Interpret the instruction.
3. **Execute:** Perform the operation.
4. **Interrupt Check:** Handle interrupts if any.

### **Example**

* **Instruction:** `ADD R1, R2`
  * **Fetch:** Load instruction into IR.
  * **Decode:** Identify `ADD` operation.
  * **Execute:** Add R1 and R2, store result in R1.

### **Real-World Example**

* A **washing machine** follows an instruction cycle (fill → wash → rinse → spin).

### **Model Question (UGC NET)**

**Q:** What are the main phases of the instruction cycle?\
**A:** Fetch, Decode, Execute, and Interrupt Check.

***

## **6. Memory-Reference Instructions**

### **Definition**

* Instructions that refer to memory locations for data (e.g., `LOAD`, `STORE`).

### **Example**

* `STORE [2000], R1` → Stores R1’s content into memory location 2000.

### **Real-World Example**

* **Database systems** use memory-reference instructions to access records.

### **Model Question (UGC NET)**

**Q:** Which instruction stores a register’s value into memory?\
**A:** `STORE` instruction.

***

## **7. Input-Output (I/O) Operations**

### **Definition**

* Transfer of data between CPU and external devices (keyboard, printer, etc.).

### **Methods**

1. **Programmed I/O** (CPU polls devices)
2. **Interrupt-Driven I/O** (Devices interrupt CPU)
3. **DMA (Direct Memory Access)** (Devices access memory directly)

### **Example**

* **Keyboard Input:** When a key is pressed, an interrupt is sent to the CPU.

### **Real-World Example**

* **Printers** use interrupt-driven I/O to notify the CPU when printing is done.

### **Model Question (UGC NET)**

**Q:** What is the advantage of interrupt-driven I/O over programmed I/O?\
**A:** It reduces CPU idle time by allowing the CPU to perform other tasks until an interrupt occurs.

***

## **8. Interrupts**

### **Definition**

* A signal that **pauses** the current process to handle a high-priority task.

### **Types**

1. **Hardware Interrupts** (e.g., keyboard press)
2. **Software Interrupts** (e.g., system calls)

### **Interrupt Handling Steps**

1. **Save context** (PC, registers).
2. **Execute Interrupt Service Routine (ISR).**
3. **Restore context and resume execution.**

### **Real-World Example**

* **Emergency stop button** in industrial machines triggers an interrupt.

### **Model Question (UGC NET)**

**Q:** What happens when an interrupt occurs?\
**A:** The CPU saves its current state, executes the ISR, and then resumes the original program.

***

## **Conclusion**

Understanding **Basic Computer Organization and Design** is crucial for UGC NET aspirants. This guide covers **instruction codes, registers, timing, instruction cycle, I/O, and interrupts** with examples and model questions.

### **Final Model Questions (UGC NET)**

1. **Q:** Which register holds the current instruction being executed?\
   **A:** **Instruction Register (IR).**
2. **Q:** What is DMA in I/O operations?\
   **A:** **Direct Memory Access** allows devices to transfer data directly to memory without CPU intervention.
3. **Q:** Explain the difference between opcode and operand.\
   **A:** The **opcode** defines the operation, while the **operand** specifies the data/memory location.

***

This document provides a **structured and exam-oriented** explanation of **Basic Computer Organization** for UGC NET preparation. 🚀
