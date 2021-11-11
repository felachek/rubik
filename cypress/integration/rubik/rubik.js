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
  }).then((element) => {
    Object.keys((element)).forEach((i) => cy.log(i))
    Object.values((element)).forEach((i) => cy.log(i))
  })
});

Given(`the user see the rubik's cube scrambled`, () => {
  cy.wait(2000);
  // cy.get("canvas").toMatchImageSnapshot({
  //   name: "shuffled cube",
  // });
});

And(`the user see the rubik's cube solved`, () => {
  cy.log("solving");
  cy.wait(8000);
  cy.get("canvas").toMatchImageSnapshot({
    name: "solved cube"
  });
});

Given(`the user see the rubik's cube in iPad mode`, () => {
  cy.viewport('ipad-2')
  cy.get("body").should("be.visible").toMatchImageSnapshot();
});


Then(`the user see the background changing color to {string}`, (backgroundColor) => {
  cy.get("body").should('have.css', 'background-color', backgroundColor)
})