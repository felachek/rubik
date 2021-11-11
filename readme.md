# Rubik

A rubik's cube made in three.js

## Setup

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run start

# Test with cypress and cucumber
npm run cy:open
```

## Step arguments

### Given

Given steps are used to describe the initial context of the system - the scene of the scenario. It is typically something that happened in the past.

### When

When steps are used to describe an event, or an action. This can be a person interacting with the system, or it can be an event triggered by another system.

### Then

Then steps are used to describe an expected outcome, or result.

### And, But

If you have successive Given’s, When’s, or Then’s, you could write:

```
Example: Multiple Givens
  Given one thing
  Given another thing
  Given yet another thing
  When I open my eyes
  Then I should see something
  Then I shouldn't see something else
```

Or, you could make the example more fluidly structured by replacing the successive Given’s, When’s, or Then’s with And’s and But’s:

```
Example: Multiple Givens
  Given one thing
  And another thing
  And yet another thing
  When I open my eyes
  Then I should see something
  But I shouldn't see something else
```

### Background

Occasionally you’ll find yourself repeating the same Given steps in all of the scenarios in a Feature.

Since it is repeated in every scenario, this is an indication that those steps are not essential to describe the scenarios; they are incidental details. You can literally move such Given steps to the background, by grouping them under a Background section.

A Background allows you to add some context to the scenarios that follow it. It can contain one or more Given steps, which are run before each scenario, but after any Before hooks.

## Docs

[Gherkin](https://cucumber.io/docs/gherkin/reference/#given)
[Cypress](https://docs.cypress.io/guides/overview/why-cypress)
