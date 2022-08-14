describe('Formacao Tech QA', () => {
    beforeEach(() => {

      cy.visit('http://automationpractice.com/index.php')

    })

    it('criar login', () => {

      function userID_Alpha() {
          var email = "felipe_"
          var text = "";
          
          var possible = "qwertyuioplkjhgfdazxcvbnm1234567890";
          
          for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          var email_aleatorio = email + text.concat('@dasa.com.br')
          return email_aleatorio;
          }
      var email_full = userID_Alpha() // Criando um e-mail aleatório
      
      // Etapa 1 - Criando um login.

      cy.get('.login').click()
      cy.get('#email_create').type('formação tech dasa') // Digitando um e-mail sem @ e verificar se mostra erro
      cy.get('#SubmitCreate > span').click()
      cy.get('#create_account_error').should('contain', 'Invalid email address.') // Verificando se tem algum endereço preenchido.
      
      cy.get('#email_create').clear() // Limpando o e-mail digitado erroneamente
      cy.get('#email_create').type(email_full) // Atribuindo um e-mail aleatório
      cy.get('#SubmitCreate > span').click()
      cy.wait(5000) 

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
      cy.get('.logout').click()


      // Etapa 2 - Efetuando login no site

      cy.get('.login').click() // Efetuando login
      cy.get('#email').type(email_full)
      cy.get('#passwd').type('123456789')
      cy.get('#SubmitLogin > span').click()


      // Etapa 3 - Comprando os 3 itens

      cy.get('.sf-menu > :nth-child(1) > [href="http://automationpractice.com/index.php?id_category=3&controller=category"]').click()
      cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()
      cy.get(':nth-child(2) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()
      cy.get(':nth-child(3) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()

      cy.get('[title="View my shopping cart"]').click() // Clicando no resumo da compra e indo para finalizar.
      
      cy.get('#total_price').invoke('val').as("first_value") // Guardando o valor total da compra
      cy.get('.cart_navigation > .button > span').click()

      cy.get('#id_address_delivery').should('contain', 'My address is') // Verificando se tem algum endereço preenchido.
      cy.get('.cart_navigation > .button > span').click()

      cy.get('.cart_navigation > .button > span').click() // Testaremos seguir sem concordar com os termos e vamos verificar se aparece a mensagem de erro.
      cy.get('.fancybox-error').should('have.text', 'You must agree to the terms of service before continuing.')
      cy.get('.fancybox-item').click() // Erro verificado, então seguiremos as etapas.
      
      cy.get('#cgv').click()
      cy.get('.cart_navigation > .button > span').click()

      cy.get('#total_price') // Guardando o valor total da compra na última etapa.
        .invoke('val').as("second_value")

      // Comparando se o valor é o mesmo tanto na primeira etapa da compra até a última. Portanto o cliente está sendo cobrado corretamente.
      cy.get('@first_value').then((first_value) => {
        cy.get('@second_value').then((second_value) => {
          expect(second_value).to.eq(first_value)
        })
      })

      // Finalizando a compra dos 3 itens.
      cy.get('.cheque > span').click()
      cy.get('#cart_navigation > .button > span').click()

      // Verificando se finalizou o processo de compra.
      cy.get('.alert').should('have.text', 'Your order on My Store is complete.') 

    })

})