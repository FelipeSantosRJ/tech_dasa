describe('example login', () => {
    beforeEach(() => {

      cy.visit('http://automationpractice.com/index.php')

    })

    it('criar login', () => {

      cy.get('.login').click()

      cy.get('#email_create').type('felipe.da.silva@dasa.com.br') // Digitando um e-mail para criar login
      cy.get('#SubmitCreate > span').click()
      cy.wait(3000) 

      cy.get('#id_gender1').click() //Clicando no sexo masculino

      cy.get('#customer_firstname').type('Felipe') // Digitando nome e senha
      cy.get('#customer_lastname').type('Santos') 
      cy.get('#passwd').type('123456789') 
        
      cy.get('#days').select('26') // Selecionando a data de nascimento
      cy.get('#months').select('1')
      cy.get('#years').select('1997')
      
      cy.get('#company').type('DASA') // Digitando endereço
      cy.get('#address1').type('Avenida das Américas, 3200')
      cy.get('#city').type('Rio de Janeiro')
      cy.get('#id_state').select('New York')
      cy.get('#postcode').type('12345')
      cy.get('#other').type('Endereço da formação Tech DASA')
      cy.get('#phone_mobile').type('111111111')
      cy.get('#alias').type(' is Duque de Caxias')

      cy.get('#submitAccount > span').click()

    })

})