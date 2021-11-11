import { Given, And } from "cypress-cucumber-preprocessor/steps";

Given(`the user see the rubik's cube`, () => {
  cy.visit("/").then(() => {
    cy.get("canvas")
      .should("be.visible")
      .toMatchImageSnapshot({
        name: "new cube",
      });
  });
});

And(`the user see the rubik's cube completely {string}`, (name) => {
  cy.wait(2000);
  cy.get("canvas").toMatchImageSnapshot({
    name: `${name} cube`,
  });
});

Given(`the user see the rubik's cube scrambled`, () => {
  cy.wait(2000);
  cy.get("canvas").toMatchImageSnapshot({
    name: "shuffled cube",
  });
});

And(`the user see the rubik's cube solved`, () => {
  cy.log("solving");
  cy.wait(8000);
  cy.get("canvas").toMatchImageSnapshot();
});

Given(`the user see the rubik's cube in iPad mode`, () => {
  cy.viewport('ipad-2')
  cy.get("body").should("be.visible").toMatchImageSnapshot();
});
