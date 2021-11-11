import { Given, And } from "cypress-cucumber-preprocessor/steps";

Given(`the user see the rubik's cube`, () => {
  cy.visit("/").then(() => {
    cy.wait(2000)
    cy.get("canvas")
      .should("be.visible")
      .toMatchImageSnapshot({
        name: "new cube",
      });
    cy.wait(2000);
  });
});

And(`the user see the rubik's cube completely {string}`, (name) => {
  cy.wait(2000);
  cy.get("canvas").toMatchImageSnapshot({
    name: `${name} cube`,
  });
  cy.wait(5000)
});

And(`the user see the rubik's cube solved`, () => {
  cy.log("solving");
  cy.wait(2000);
  cy.get("canvas").toMatchImageSnapshot({
    name: "solved cube"
  });
  cy.wait(5000)
});

Given(`the user see the rubik's cube in iPad mode`, () => {
  cy.viewport('ipad-2')
  cy.get("body").should("be.visible").toMatchImageSnapshot();
});


Then(`the user see the background changing color to {string}`, (backgroundColor) => {
  cy.get("body").should('have.css', 'background-color', backgroundColor)
})
