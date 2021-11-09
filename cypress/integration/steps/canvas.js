import {
    Given,
    And
} from 'cypress-cucumber-preprocessor/steps'

Given(`the user see the rubik's cube`, () => {
    cy.visit('/');
})

And(`the user see the rubik's cube solved`, () => {
    cy.log('test');
})
