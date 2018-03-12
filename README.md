# Chat Events

This page contains a coding challenge for Software Engineering roles at Unibuddy.

## Purpose

The aim of this challenge is to see how you approach a problem and design a solution. The problem will also be a basis to have an interesting discussion about the various approaches and design patterns which could be explored.

The challenge consists of a programming problem described below. After this we will review your solution and then discuss it with you in person or over a call (if done remotely).

We're especially interested in:

- what paradigms (e.g. OOP, FP) you use in your code
- using appropriate data structures
- your approach to testing
- the overall design of your solution
- challenges you faced in your implementation
- areas of your code that you would go back to and improve on

In total the challenge should take about 1 hour to complete. Please don't spend more time on it - we think that amount of time will give us plenty to discuss.

## Before you start

Some quick admin about the challenge:

- you can use any language / libraries you want
- once you have completed the challenge please share a public Github repository URL to tech@unibuddy.co

# Challenge

The challenge consists of modelling and manipulating chat related data in order to calculate statistics about that data. The data is provided as an event stream in a text file, the format of which is described below. In order to do the calculations you will first need to parse the data from the text file.

## Part 1 - Parsing the data

The file `stream.txt` contains a sequence of events that have taken place.

Each line in the file represents an event. An event contains a series of values, separated by a space. The first value is always the **event type**, which tells you the format of the rest of the row.

The table below shows the format of each event.

**Data is separated by the pipe character `|`**:

| Event Type | Format                        |
|------------|-------------------------------|
| User       | name university accountRole   |
| ChatGroup  | id [members]                  |
| Message    | sender chatGroupId text time  |

Once you have parsed the data from the file you are ready to start the next part of the challenge.

## Part 2 - Mean Response Time

Calculate the mean response time for mentors at **Edinburgh** university.

> The response time is the amount of time it takes for a mentor to send a message after an applicant's message.

> For example, if an applicant sends a message at 1pm and a mentor responds at 2pm on the same day, then the mentor's response time is 1 hour.

Messages which do not have a response should be ignored.

Print the result to standard output.
