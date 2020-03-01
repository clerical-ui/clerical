import { Then } from "cypress-cucumber-preprocessor/steps";

Then('I should see the title as {string}', async (title) => {
    cy.title().should('eq', title);
});
