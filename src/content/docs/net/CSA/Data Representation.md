---
title: Data Representation
editUrl: false
---

* Data Types
* Number Systems and Conversion
* Complements
* Fixed Point Representation
* Floating Point Representation
* Error Detection Codes
* Computer Arithmetic - Addition
* Subtraction
* Multiplication
* Division Algorithms.

## Data Types

Data types refer to how data is represented in a computer. Basic data types include:

* **Integer**: Whole numbers (e.g., 5, -2)
* **Float**: Numbers with decimal points (e.g., 3.14)
* **Character**: Single text symbols (e.g., 'A', '9') often represented using ASCII
* **Boolean**: True or False (1 or 0)

**Real-world**: In gaming, integers represent scores, floats are used for physics simulations, and booleans for game logic (e.g., isPlayerAlive).

***

## Number Systems and Conversion

Computers use the **binary system (base 2)**.

* **Decimal (base 10)** → what we humans use.
* **Binary (base 2)** → only 0 and 1.
* **Octal (base 8)** → groups of 3 binary digits.
* **Hexadecimal (base 16)** → used to simplify binary, often in debugging.

**Conversion**:

* Decimal to Binary: Divide by 2, write remainders in reverse.
* Binary to Decimal: Multiply each bit by powers of 2.

**Real-world**: RGB color codes in HTML (e.g., '#FF5733') use hexadecimal.

***

## Complements

Used in subtraction and representing negative numbers.

* **1's Complement**: Flip all bits (0 → 1, 1 → 0)
* **2's Complement**: 1's complement + 1

**Example**: To represent -5 in 4 bits:

* +5 = 0101
* 1's complement = 1010
* 2's complement = 1011 → So, -5 = 1011

**Real-world**: Enables fast subtraction using addition circuitry.

***

## Fixed Point Representation

Represents numbers with a fixed number of digits after the point.

* Example: 12.34 might be stored as 1234 and the point is understood to be two digits from the end.

**Real-world**: Used in embedded systems like washing machines or digital clocks.

***

## Floating Point Representation

Represents very large or small numbers using:

* **Sign** bit: Indicates if the number is positive (0) or negative (1).
* **Exponent (with bias)**: Scales the number by powers of 2. The bias allows representation of both positive and negative exponents.
* **Mantissa (fraction)**: Represents the precision part of the number, starting after the leading 1 (which is implied in normalized form).

**IEEE 754 standard:**

* Single precision: 32 bits
  * 1 sign bit, 8 exponent bits, 23 fraction bits

**Example**: 1.5 = 1.1 in binary = 0 01111111 10000000000000000000000

**Real-world**: Used in scientific calculators, games for 3D coordinates, simulations.

***

## Error Detection Codes

Used to detect and sometimes correct errors in data transmission or storage, ensuring data integrity.

* **Parity Bit**: A single bit added to a string of binary data. It makes the total number of 1s either even (even parity) or odd (odd parity). If the expected parity doesn't match the received one, an error is detected.
  * *Example*: Data = 1011 (3 ones). Add parity bit = 1 for even parity → Transmitted: 10111

* **Hamming Code**: A more advanced method that not only detects errors but also corrects single-bit errors. It uses multiple parity bits placed at positions that are powers of 2.
  * *Example*: For 4 bits of data, Hamming code might expand it to 7 bits including 3 parity bits. Can identify and correct which bit is flipped.

**Real-world**: RAM uses ECC (Error Correcting Code), which is based on Hamming code and other techniques, to automatically detect and correct small memory errors that could cause system crashes or data corruption.

***

## Computer Arithmetic

### Addition

* Simple binary addition follows these rules:
  * 0+0=0, 1+0=1, 1+1=10 (0 with carry)

**Real-world**: Addition circuits are used in all CPUs (ALU - Arithmetic Logic Unit).

### Subtraction

* Performed using 2's complement:
  * A - B = A + (2's complement of B)

**Example**: 7 - 5 → 0111 + 1011 = 0010 (2 in 4-bit system)

### Multiplication

* Done via shift-and-add method:
  * Multiply like in decimal, but with binary

**Example**: 3 × 2 = 0011 × 0010 → shift and add → result = 0110

**Real-world**: Used in digital signal processing and graphics.

### Division Algorithms

* Restoring and Non-Restoring Division
  * Similar to long division in decimal
  * Subtract divisor from dividend, shift result

**Real-world**: Used in compilers, calculators, and any system that processes mathematical inputs.

***

Let me know if you'd like visuals, circuit diagrams, or animations for any of these!
