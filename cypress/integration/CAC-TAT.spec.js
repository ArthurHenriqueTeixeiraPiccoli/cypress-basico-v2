/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verify the title of aplication', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Fill the obrigatories fields', function() {
        const longText = 'Goku, Son, Super, sayajin, 2, indo, aaaaaaaaaaaaaaaa, aaaaaaaa, aaaaa, aaa, aa, a'
        cy.get('#firstName').type('Goku')
        cy.get('#lastName').type('Son')
        cy.get('#email').type('SayajinDelas@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('displays error message when submitting the form with an email with invalid formatting', function() {
        cy.get('#firstName').type('Goku')
        cy.get('#lastName').type('Son')
        cy.get('#email').type('SayajinDelas@guhan')
        cy.get('#open-text-area').type('Super Sayajin 5!')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('displays error message when phone number becomes mandatory but not filled in before form submission', function() {
        cy.get('#phone')
          .type('Superssj5') 
          .should('have.value', '') 
    })

    it('displays error message when phone number becomes mandatory but not filled in before form submission', function() {
        cy.get('#firstName').type('Goku')
        cy.get('#lastName').type('Son')
        cy.get('#email').type('SayajinDelas@guhan')
        cy.get('#open-text-area').type('Super Sayajin 5!')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('fills and clears the name, surname, email and phone fields', function() {
        cy.get('#firstName')
          .type('Goku')
          .should('have.value', 'Goku')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Son')
          .should('have.value', 'Son')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('SayajinDelas@gmail.com')
          .should('have.value', 'SayajinDelas@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('Super Sayajin 5!')
          .should('have.value', 'Super Sayajin 5!')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('51993100245')
          .should('have.value', '51993100245')
          .clear()
          .should('have.value', '')
    })

    it('displays error message when submitting the form without filling the required fields', function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    }) 
    
    it('successfully sends the formuary using a custom command', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })
    it('Select Product Youtube for your text', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('Select Product Mentoria for your value', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('Select Product Blog for your indice', function() {
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('Marks the "Feedback" service type', function() {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })
    it('Marks all types of service', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    it('brand both checkboxes, then uncheck the last', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('displays error message when the phone becomes mandatory but is not filled out before submitting the form', function() {
      cy.get('#firstName').type('Goku')
      cy.get('#lastName').type('Son')
      cy.get('#email').type('SayajinDelas@guhan')
      cy.get('#open-text-area').type('Super Sayajin 5!')
      cy.get('#phone-checkbox').check()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
    it('selects a file from the fixtures folder', function() {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          // console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('selects a file simulating a drag-and-drop', function() {
      cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
      .should(function($input) {
        // console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
       })
     })
     it('selects a file using a fixture for which an alias has been given', function() {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]#file-upload')
         .selectFile('@sampleFile')
         .should(function($input) {
          // console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
         })
     })

     it('checks that the privacy policy opens in another tab without the need for a click', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
     })

     it('accesses the privacy policy page by removing the target and then clicking on the link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
     })
  })