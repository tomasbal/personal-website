---
title: Event-Driven Architecture Is Not Just Kafka
description: Most teams say they are doing event-driven architecture when they are really just publishing messages to a broker. There is a fundamental difference, and getting it wrong leads to brittle, tightly coupled systems disguised as decoupled ones.
date: '2026-02-14'
draft: false
slug: '/blog/event-driven-is-not-just-kafka'
tags:
  - Architecture
  - Event-Driven
  - Distributed Systems
---

I review a lot of system designs. When I ask "is this event-driven?" the answer is almost always yes. When I ask what that means, the answer is almost always "we use Kafka." Or SQS. Or RabbitMQ. Or EventBridge.

That is not event-driven architecture. That is message passing with extra infrastructure.

## The difference most teams miss

There are three fundamentally different patterns that people conflate under "event-driven," and mixing them up is where systems go wrong.

### 1. Event Notification

A service emits a thin event that says something happened. No payload, or minimal payload. Just enough for consumers to know something changed and decide if they care.

```
OrderPlaced { orderId: "abc-123", timestamp: "2026-02-14T10:30:00Z" }
```

The consumer, if interested, calls back to the source to get the details it needs. This keeps the producer and consumer decoupled in terms of data contracts, but introduces **temporal coupling** — the consumer needs the producer to be available at query time.

**When to use it:** Cross-domain notifications where consumers have different data needs. The producer does not need to know or care what downstream systems do with the event.

### 2. Event-Carried State Transfer

The event carries the full state that consumers need, eliminating the callback.

```
OrderPlaced {
  orderId: "abc-123",
  customerId: "cust-456",
  items: [...],
  total: 299.99,
  shippingAddress: {...},
  timestamp: "2026-02-14T10:30:00Z"
}
```

Consumers store a local copy of the data they need. This eliminates temporal coupling — consumers work even if the producer is down — but introduces **data duplication** and **eventual consistency**.

**When to use it:** When consumers need data from the producer frequently, when availability is more important than immediate consistency, or when you need to eliminate synchronous dependencies between services.

### 3. Event Sourcing

Events are not notifications. They are the **source of truth**. Instead of storing current state in a database and publishing events as a side effect, you store the sequence of events and derive current state from them.

```
Account Events:
  AccountOpened { accountId: "acc-789", owner: "...", timestamp: "..." }
  MoneyDeposited { accountId: "acc-789", amount: 500.00, timestamp: "..." }
  MoneyWithdrawn { accountId: "acc-789", amount: 120.00, timestamp: "..." }

Current balance = replay(events) → 380.00
```

This is a completely different data architecture. You get a full audit trail, temporal queries ("what was the balance on March 1st?"), and the ability to rebuild read models from scratch. But you also get **schema evolution challenges**, **storage growth**, and **replay complexity**.

**When to use it:** Audit-critical domains (finance, healthcare, compliance), systems that need temporal queries, or domains where understanding the full history of state changes provides business value.

## The real problem: command events

The most common anti-pattern I see is what I call **command events** — events that tell a consumer what to do instead of what happened.

```
// This is a command disguised as an event
SendEmailToCustomer { customerId: "cust-456", template: "order-confirmation" }

// This is an actual event
OrderPlaced { orderId: "abc-123", customerId: "cust-456" }
```

The first example is a command routed through a broker. The producer knows about the consumer. It knows the consumer sends emails. It knows which template to use. This is **tight coupling through a message queue**, and it is worse than a direct HTTP call because at least with HTTP you get an immediate error response.

The second example is a fact. Something happened. The email service can subscribe, decide which template to use based on its own logic, and the order service neither knows nor cares that emails are being sent.

This distinction matters because command events make your broker a dumb router. The producer must change every time a new consumer needs something different. You have reintroduced coupling and lost the primary benefit of event-driven architecture.

## Choosing the right pattern

Here is a practical decision tree:

**Start with the question: what is the event representing?**

If it represents a **fact about what happened in a domain** — use Event Notification or Event-Carried State Transfer. Choose between them based on whether consumers can tolerate calling back for data (notification) or whether you need full autonomy and availability (state transfer).

If it represents the **authoritative history of a domain** — consider Event Sourcing. But only if you genuinely need temporal queries, complete audit trails, or the ability to rebuild projections. Event Sourcing is a storage pattern, not a communication pattern. You can absolutely use Event Sourcing internally within a service while using simple Event Notification to communicate with other services.

If it represents an **instruction for another service** — stop. That is a command. Use a command queue or a direct synchronous call. Do not disguise it as an event.

## The schema problem nobody talks about early enough

Events cross service boundaries. Once published, they become a contract. And contracts evolve.

Most teams discover this the hard way at 2 AM when a producer adds a field, changes a field type, or restructures the payload, and three downstream consumers break silently because they were parsing the raw JSON.

Invest in schema management early:

- **Use a schema registry.** Confluent Schema Registry, AWS Glue Schema Registry, or even a Git repository with CI validation. The point is that event schemas are versioned, validated, and discoverable.
- **Design for backward compatibility.** New fields are optional. Fields are never removed, only deprecated. Enum values are never renamed. This is not bureaucracy — it is the only way to evolve a system where producers and consumers deploy independently.
- **Use explicit versioning for breaking changes.** `OrderPlaced.v1` and `OrderPlaced.v2` can coexist. Consumers migrate on their own schedule. The producer supports both versions during the transition window.

## The ordering trap

"Events are processed in order" is one of the most dangerous assumptions in distributed systems.

Kafka guarantees ordering within a partition. SQS FIFO guarantees ordering within a message group. Most other brokers provide no ordering guarantees at all.

But even with Kafka, if your consumer has multiple instances reading from the same partition (which breaks the model), or if you have events from different partitions that relate to the same entity, ordering is not guaranteed.

Design your consumers to be **idempotent** and, where possible, **commutative**. If processing event B before event A produces the same final state as processing A before B, ordering does not matter. If ordering genuinely matters, use a single partition key per entity and accept the throughput constraint.

## The bottom line

Event-driven architecture is a set of patterns for building systems where components react to facts about the world. It is not a technology choice. Kafka, SQS, RabbitMQ, and EventBridge are all tools that can support event-driven patterns, but installing them does not make your architecture event-driven.

Get the pattern right first. Then choose the broker.
