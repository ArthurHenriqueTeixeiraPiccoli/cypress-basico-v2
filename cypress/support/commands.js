Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Naruto')
    cy.get('#lastName').type('Uzumaki')
    cy.get('#email').type('resplendorlaranja@gmail.com')
    cy.get('#open-text-area').type('Vamos Juntos Kurama!')
    cy.contains('button', 'Enviar').click()
})