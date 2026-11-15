---
title: Deciding what stays with people
seoTitle: Human or AI? Deciding what work stays with people
description: Every workflow has work that should stay with a person, work AI should assist and work AI can take on. A practical way to decide which is which.
standfirst: Most organisations never decide which work stays with a person. The tools decide for them, one team at a time. Here is a way to make the choice on purpose.
published: 2026-11-03
tags: [Operating model, Human judgement]
stage: design
readingMinutes: 7
related: [use-cases/ai-operating-model, teams/operations-customer-service]
---

When a business adopts AI, a decision gets made about every piece of work it touches: who or what does this now?

Usually nobody makes it. A tool arrives, people use it where it seems to help, and the allocation of work between people and machines settles by habit. Two teams doing the same job end up with different answers. Staff are unsure where they stand. And when something goes wrong, it is not clear who was responsible.

I think this allocation is the most important design decision in an AI programme. It is also one of the least often written down.

## Four answers, not two

The debate is usually framed as human or AI. In practice there are four possible answers for any piece of work.

**It stays with a person.** The work needs judgement, carries accountability, or matters to the customer or colleague on the other side because a human is doing it.

**AI assists.** A person still does the work and signs it off. AI makes them faster or better at it: a first draft, a summary, a second opinion.

**AI takes it on, within limits.** The work is delegated to AI inside defined controls. There is a named owner, a boundary it may not cross, and a way to review and reverse what it did.

**It stops.** The work created little value in the first place. This answer is the most often overlooked, and it should be asked first.

## Start by asking what the work is for

Before deciding who does a task, ask what value it is meant to create and for whom.

A surprising amount of work in any organisation exists because of how an earlier system or structure happened to work: a report nobody reads, a check that duplicates another, a hand-off that exists because two teams were once in different buildings.

Automating that work makes it cheaper and keeps it pointless. Automating a poor process preserves the wrong work. So the first pass through a workflow should remove things, before anything is handed to a machine.

## What tends to stay with a person

There is no universal rule, and the line moves as the technology changes. But some questions are useful for placing it.

**Is someone accountable for this decision to a customer, a regulator or a court?** Accountability cannot be delegated to a system. A person can use AI to reach a decision, but a named person has to own it.

**What happens when it is wrong?** If an error is cheap and easy to spot, more can be delegated. If it is costly, hard to detect or hard to undo, a person should stay close.

**Does the person on the other side need a human?** A complaint, a bereavement or a difficult conversation with a colleague are obvious examples. So are moments where trust is being built.

**Does the work need context that is not written down?** Judgement that draws on relationships, history and what was said in the corridor is hard to hand over.

**Is this how people learn the job?** If juniors develop their judgement by doing this work, removing it has a cost that will not show up for some years.

## A worked example

Take a customer complaint. It is one workflow, and it contains all four answers.

Reading and classifying the complaint is something AI can take on, within limits, with a person sampling the results. Gathering the account history is the same.

Drafting the reply is assisted. A person edits and sends it, because the tone and the commitment are theirs.

Deciding the remedy stays with a person. So does approving anything above an agreed limit, and so does answering for the outcome if the customer takes it further.

Spotting a pattern across hundreds of complaints is assisted: AI surfaces it and a person decides what it means.

And somewhere in the old process there was probably a step, a second review or a manual log, that can stop.

What matters is that it was decided, written down, and the same in every team.

## Why writing it down matters

Three things follow once the allocation is explicit.

**People know where they stand.** The question most staff have about AI is what it means for their job. A clear statement of what stays with them answers it better than any reassurance.

**Accountability is visible.** For each decision AI is involved in, there is a named owner and a way to review and reverse it. In a regulated business that is a requirement. In any business it is good practice.

**The rest of the design falls out.** Once you know who does what, you can see which roles change, which skills are needed, which systems have to connect and which measures now matter. That set of consequences is the operating model.

## Review it

The right allocation today will not be right in two years. Capabilities change, your evidence improves and your appetite for risk shifts.

So treat the allocation as something with an owner and a review date. Work moves between the four answers over time. The discipline is that it moves because someone decided, with evidence, and not because a new feature appeared in a tool.

## Where to start

Pick one workflow that matters. List its steps. For each, ask the four questions in order: should this stop, should it stay with a person, should AI assist, can AI take it on within limits? Then name who is accountable for each decision.

You will learn more from one workflow done properly than from a policy that covers them all. If you want help doing it across a function or a business, that is the work of [operating-model design](/use-cases/ai-operating-model/).
