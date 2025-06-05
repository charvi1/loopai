# Ingestion API

## Description

A rate-limited, priority-aware asynchronous ingestion API built with Express.

## Why Express and Node.js?
Fast & Non-blocking I/O: Node.js is well-suited for asynchronous tasks like batch processing and time-based job scheduling.

 Lightweight and Minimal: Express provides a minimalist web framework that makes it easy to define REST APIs quickly.

Asynchronous Architecture: Using native JavaScript Promises, setInterval, and setTimeout, we were able to build a fully asynchronous worker that respects timing constraints without relying on external job queues.

 In-memory Storage: Node’s persistent memory space during runtime allowed for a simple yet effective in-memory store (store.js) to track ingestion and batch status without a database.

## PACKAGES
EXPRESS
UUID
BODY-PARSER


## Features

- Prioritized batch processing
- Rate limit: 1 batch per 5 seconds
- Status tracking

## SCREENSHOT
--POST

  ![image](https://github.com/user-attachments/assets/92e736bb-eb4d-498c-80b0-a62e19ad75dd)
 
  --GET
  
  ![image](https://github.com/user-attachments/assets/b5fe1731-37e9-402d-8722-2166d70d9240)



## Run Locally

```bash
npm install
npm start
