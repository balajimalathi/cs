---
title: Programming the Basic Computer
editUrl: false
---

Machine Language, Assembly Language, Assembler, Program Loops, Subroutines, Input-Output Programming.

***

## **1. Machine Language**

### **What is Machine Language?**

* **Definition:** The lowest-level programming language consisting of **binary code (0s and 1s)** directly executable by the CPU.
* **Subtopic:**
  * **Binary Instructions** – Each instruction is represented in machine code (e.g., `0101` for `ADD`).
  * **Hardware-Specific** – Different processors have different machine languages.

### **Example**

* **Instruction:** `ADD R1, R2`
  * **Machine Code:** `0001 0001 0002` (hypothetical encoding)

### **Real-World Example**

* **Embedded Systems** (e.g., microwave controllers) often use machine code for direct hardware control.

### **Model Question (UGC NET)**

**Q:** Why is machine language considered hardware-dependent?\
**A:** Because each CPU architecture has its own unique set of binary instructions.

***

## **2. Assembly Language**

### **What is Assembly Language?**

* **Definition:** A **low-level programming language** that uses **mnemonics** (e.g., `ADD`, `MOV`) instead of binary.
* **Subtopic:**
  * **Symbolic Representation** – Easier to understand than machine code.
  * **Assembler Required** – Needs translation to machine code.

### **Example**

* **Assembly Code:**
  ```assembly
  MOV R1, 5    ; Move value 5 into Register R1
  ADD R1, R2   ; Add R2 to R1
  ```

### **Real-World Example**

* **Device Drivers** are often written in assembly for hardware-level control.

### **Model Question (UGC NET)**

**Q:** What is the advantage of assembly language over machine language?\
**A:** It uses **mnemonics**, making it easier to read and write compared to binary.

***

## **3. Assembler**

### **What is an Assembler?**

* **Definition:** A **translator program** that converts **assembly code** into **machine code**.
* **Subtopic:**
  * **One-to-One Mapping** – Each assembly instruction converts to one machine instruction.
  * **Two-Pass Assembler** – Resolves symbols and generates machine code.

### **Example**

* **Input (Assembly):**
  ```assembly
  MOV R1, 5
  ```
* **Output (Machine Code):**\
  `1010 0001 0101` (hypothetical encoding)

### **Real-World Example**

* **Compiler Toolchains** (e.g., GNU Assembler) convert assembly code for microcontrollers.

### **Model Question (UGC NET)**

**Q:** What is the function of an assembler?\
**A:** It translates **assembly language** into **machine code**.

***

## **4. Program Loops**

### **What are Program Loops?**

* **Definition:** A sequence of instructions **repeated** until a condition is met.
* **Subtopic:**
  * **Loop Structure** – `Initialization`, `Condition`, `Body`, `Update`.
  * **Types of Loops:**
    * **`FOR` Loop** – Fixed iterations.
    * **`WHILE` Loop** – Condition-based.

### **Example (Assembly Loop)**

```assembly
MOV CX, 5     ; Initialize counter (CX = 5)
LOOP_START:
  DEC CX      ; Decrement CX
  JNZ LOOP_START ; Jump if not zero
```

### **Real-World Example**

* **Digital Countdown Timers** use loops to decrement time.

### **Model Question (UGC NET)**

**Q:** What are the three main components of a loop?\
**A:** **Initialization, Condition Check, and Update.**

***

## **5. Subroutines (Functions)**

### **What are Subroutines?**

* **Definition:** Reusable **blocks of code** that perform a specific task.
* **Subtopic:**
  * **Call-Return Mechanism** – `CALL` jumps to subroutine; `RET` returns.
  * **Stack Usage** – Stores return addresses.

### **Example (Assembly Subroutine)**

```assembly
CALL MULTIPLY  ; Jump to MULTIPLY subroutine
...
MULTIPLY:      ; Subroutine definition
  MUL R1, R2
  RET          ; Return to caller
```

### **Real-World Example**

* **Math Libraries** use subroutines for operations like `sin()`, `cos()`.

### **Model Question (UGC NET)**

**Q:** How does a subroutine return control to the calling program?\
**A:** Using the **`RET` (Return)** instruction.

***

## **6. Input-Output (I/O) Programming**

### **What is I/O Programming?**

* **Definition:** Managing data transfer between **CPU and external devices** (keyboard, printer).
* **Subtopic:**
  * **Programmed I/O** – CPU polls devices.
  * **Interrupt-Driven I/O** – Devices interrupt CPU.
  * **DMA (Direct Memory Access)** – Devices access memory directly.

### **Example (Assembly I/O)**

```assembly
IN AL, 60h     ; Read from keyboard port
OUT 80h, AL    ; Send data to display
```

### **Real-World Example**

* **USB Data Transfer** uses interrupt-driven I/O.

### **Model Question (UGC NET)**

**Q:** What is the role of DMA in I/O operations?\
**A:** It allows **devices to transfer data directly to memory** without CPU intervention.

***

| **Factor**               | **Machine Language**                          | **Assembly Language**                             | **Assembler**                                | **Program Loops**                         | **Subroutines**                   | **I/O Programming**                    |
| ------------------------ | --------------------------------------------- | ------------------------------------------------- | -------------------------------------------- | ----------------------------------------- | --------------------------------- | -------------------------------------- |
| **Definition**           | Binary code (0s and 1s) executed by CPU.      | Low-level language using mnemonics (e.g., `ADD`). | Program converting assembly to machine code. | Repeats instructions until condition met. | Reusable code blocks (functions). | Data transfer between CPU and devices. |
| **Level of Abstraction** | Lowest (hardware-specific).                   | Low (human-readable but close to hardware).       | Translates symbolic code to binary.          | Structured control flow.                  | Modular programming.              | Hardware interaction.                  |
| **Example**              | `0101 0001` (hypothetical `ADD` instruction). | `MOV R1, 5`                                       | Converts `MOV R1, 5` → `1010 0001 0101`.     | `LOOP: DEC CX; JNZ LOOP`                  | `CALL MULTIPLY; RET`              | `IN AL, 60h` (keyboard input).         |
| **Hardware Dependency**  | Fully dependent (CPU-specific).               | Dependent (but portable via assemblers).          | Target-specific (generates machine code).    | Independent (logic-based).                | Independent (modular).            | Partially dependent (device-specific). |
| **Real-World Use**       | Firmware, microcontrollers.                   | Device drivers, OS kernels.                       | Compiler toolchains (e.g., GNU Assembler).   | Timers, iterative algorithms.             | Math libraries (e.g., `sqrt()`).  | Printers, USB data transfer.           |
| **Advantages**           | Direct execution, fastest performance.        | Easier than machine code, efficient.              | Enables human-readable programming.          | Reduces code redundancy.                  | Promotes reusability/modularity.  | Efficient device communication.        |
| **Disadvantages**        | Hard to read/write, error-prone.              | Still complex, less portable.                     | Requires translation step.                   | Infinite loops if misused.                | Overhead due to `CALL/RET`.       | Polling wastes CPU cycles.             |
| **UGC NET Focus Area**   | Instruction encoding, CPU execution.          | Mnemonics, symbolic addressing.                   | Two-pass assembler, symbol table.            | Loop optimization, control flow.          | Stack usage, nesting.             | Interrupts vs. polling, DMA.           |

***

### **Key Differentiators for UGC NET**

1. **Machine vs. Assembly Language**
   * Machine: Binary, hardware-specific.
   * Assembly: Mnemonics, requires assembler.

2. **Assembler vs. Compiler**
   * Assembler: 1:1 translation (assembly → machine code).
   * Compiler: High-level → machine code (multi-step).

3. **Loops vs. Subroutines**
   * Loops: Repeats code **sequentially**.
   * Subroutines: Reusable **modular** code blocks.

4. **I/O Methods**
   * Programmed I/O: CPU polls (wastes cycles).
   * Interrupt-Driven: Device notifies CPU.
   * DMA: Bypasses CPU for bulk transfers.

***

### **Model Questions (UGC NET)**

1. **Q:** How does assembly language improve over machine language?\
   **A:** Uses **mnemonics** for readability while retaining hardware control.

2. **Q:** Why is an assembler needed in programming?\
   **A:** To translate **assembly mnemonics** into **executable machine code**.

3. **Q:** Compare programmed I/O and interrupt-driven I/O.\
   **A:** Programmed I/O wastes CPU cycles polling, while interrupts allow async handling.

***
