import { Given } from "cypress-cucumber-preprocessor/steps";
import "cypress-localstorage-commands"
import * as path from 'path';

Given('I open config {string}', async (config) => {
    cy.visit(path.join(__dirname, '../index.html'));
    await cy.readFile(path.join('cypress/support/configs', config + '.json')).then(c => {
        cy.setLocalStorage("appConfig", JSON.stringify(c));
    });
    
    await cy.window().then((win) => {
        win.start();
    });
});
