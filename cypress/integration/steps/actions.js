import { When, Then } from "cypress-cucumber-preprocessor/steps";

When(`the user click on {string}`, (buttonName) => {
  cy.get(`#${buttonName.toLowerCase()}`)
    .should("have.text", buttonName)
    .click();
});

Then(`the user can not click on any button`, () => {
  const buttons = [
    "Y 0",
    "Y 1",
    "Y 2",
    "X 0",
    "X 1",
    "X 2",
    "Z 0",
    "Z 1",
    "Z 2",
  ];
  buttons.forEach((buttonName) => {
    let id = `#move${buttonName.replace(/\s+/g, "")}`;
    cy.get(id)
      .should("have.text", buttonName)
      .click();
    cy.wait(1000)
  });
});


