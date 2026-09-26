#  CSEE Summer Project Challenge: CompSci Outreach App
An entry in the University Of Surrey's CSEE 2026 Summer Project Challenge

This application acts as the digital aid for a series of "unplugged" classroom activities. It is designed to help academics explain concepts & activities while students participate in physical, hands-on problem-solving exercises at their desks.

---

##  Modules

### 1. AI Decision Tree Sandbox

A visual classification engine that teaches students how Artificial Intelligence categorizes data, and what happens when it encounters edge cases.

* **Sequential Branching:** Users build a full IF/ELSE IF classification tree to categorize a dataset of animals.
* **Live Purity Scoring:** The engine mathematically calculates the accuracy of the data buckets in real-time.
* **The "Real-World" Toggle:** Introduces 10 complex edge cases (e.g., a Shark, a flightless Ostrich) to perfectly demonstrate the Data Science concept of Feature Starvation and model bias.

### 2. Network Routing Simulator

An interactive graph that visualizes how data packets travel across the internet. Designed to be projected while students form a physical "Human Network" with string and paper.

* **Dijkstra's Algorithm:** Calculates and highlights the absolute mathematically shortest path between nodes.
* **Interactive Router Crashes:** Click any node to instantly sever it from the network.
* **Dynamic Detouring:** Watch the algorithm adapt to broken wires and offline routers to teach network redundancy and resilience.

---

## Tech Stack

* **Framework:** React 18
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Custom CSS / Inline React Styles

---

## Getting Started

To run this project locally on your machine, follow these steps:

**1. Clone the repository**

```bash
https://github.com/Alessio-Vigliotta/av-compsci-outreach-app.git
cd av-compsci-outreach-app

```

**2. Install dependencies**

```bash
npm install

```

**3. Start the development server**

```bash
npm run dev

```

## The "Unplugged" Concept

This app is designed to be paired with physical classroom lesson plans:

* **The AI Activity:** Students draw decision trees on paper before testing their logic against the digital engine.
* **The Networking Activity:** Students physically pass paper "data packets" across the room using colored string to represent connections, then compare their human speed against Dijkstra's Algorithm on the projector.
