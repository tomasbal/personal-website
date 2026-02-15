---
title: Stop Defaulting to Microservices
description: Microservices are not a starting point. They are a response to a specific set of scaling and organizational problems. Here is how to decide what actually fits your system.
date: '2026-02-15'
draft: false
slug: '/blog/stop-defaulting-to-microservices'
tags:
  - Architecture
  - Microservices
  - Software Engineering
---

Every architecture conversation in the last decade seems to start the same way: "We are going with microservices." No analysis. No trade-off discussion. Just microservices, because that is what everyone does now.

This is a problem. Not because microservices are bad, but because defaulting to any architecture without understanding the forces driving your system is how you end up with a distributed monolith that is worse than what you started with.

## The confusion

The industry has conflated **microservices** with **good architecture**. They are not the same thing. A well-structured monolith with clear module boundaries, proper separation of concerns, and a clean domain model will outperform a poorly designed microservice system every single time — in development speed, operational cost, and reliability.

The real question is never "should we use microservices?" The real question is: **what problem are we actually solving?**

## When a monolith is the right answer

A monolith is the right starting point when:

- **Your team is small.** If fewer than 15-20 engineers are working on the system, the coordination overhead of microservices almost certainly outweighs the benefits. You are adding network boundaries, distributed tracing, service discovery, and deployment pipelines for each service — all to solve a problem you do not have yet.

- **Your domain is not well understood.** Getting service boundaries wrong in a microservice architecture is extremely expensive. You end up with services that are tightly coupled across the network, which is the worst of both worlds. A monolith lets you refactor freely until the boundaries become clear.

- **You need to move fast.** A single deployable unit with a shared database and in-process function calls is orders of magnitude simpler to develop, test, and debug than a distributed system. If speed to market matters, the monolith wins.

- **Your scaling requirements are uniform.** If every part of your system handles roughly the same load profile, there is no reason to decompose into independently scalable units.

## When microservices earn their complexity

Microservices make sense when you have a specific set of forces pushing you toward decomposition:

- **Independent deployment is a real need.** Multiple teams need to ship changes to different parts of the system on different cadences without coordinating releases.

- **Different scaling profiles exist.** Your search service handles 50x the traffic of your billing service. Scaling them independently saves real money.

- **Technology heterogeneity is required.** Part of your system genuinely benefits from a different language, runtime, or data store. Not because it is interesting, but because it is the right tool for a specific problem.

- **Fault isolation is critical.** A failure in one subsystem must not cascade to others. You need bulkheads, and process boundaries are the strongest bulkhead available.

- **Your organization is structured around it.** Conway's Law is real. If you have autonomous teams aligned to business domains, microservices can mirror that structure effectively. If you do not, you are fighting your own organization.

## The decision framework

Before choosing an architecture style, answer these five questions honestly:

1. **How many engineers will work on this system in the next 12 months?** If the answer is under 20, start with a modular monolith.

2. **Do I understand the domain well enough to draw service boundaries?** If not, keep it in one deployable unit until the boundaries reveal themselves through usage patterns.

3. **Do I have the infrastructure maturity for microservices?** Container orchestration, service mesh, distributed tracing, centralized logging, CI/CD per service — if these are not already in place or budgeted for, the operational cost will eat you alive.

4. **Is independent deployment a real requirement or a theoretical one?** Be honest. If one team ships everything on a weekly cadence, you do not need independent deployment.

5. **Am I solving a current problem or a future one?** Architect for today's constraints. Refactoring a well-structured monolith into services later is straightforward. Merging poorly bounded microservices back together is painful.

## The middle ground most people miss

There is a pattern that gets almost no attention but solves most of the confusion: the **modular monolith**. It is a single deployable unit with strict module boundaries, well-defined interfaces between modules, and no shared mutable state across modules. Each module owns its data. The modules communicate through internal APIs or domain events.

This gives you:

- **Clean boundaries** that can become service boundaries later if needed
- **Simple operations** — one deployment, one database connection pool, one log stream
- **Fast development** — in-process calls, shared tooling, single debug session
- **A migration path** — when a module genuinely needs to scale independently or deploy separately, extract it into a service along its existing boundary

This is not a compromise. For the vast majority of systems, this is the correct architecture.

## The bottom line

Microservices are a tool for specific organizational and technical scaling problems. They are not a default. They are not a best practice. They are a trade-off that exchanges development simplicity and operational ease for deployment independence and scaling flexibility.

Start with a modular monolith. Measure. Identify real bottlenecks. Extract services along proven boundaries when the forces demand it.

The best architecture is the simplest one that solves your actual problems. Not the one that looks best on a conference slide.
