describe('efetuando login e compra', () => {
    beforeEach(() => {

      cy.visit('http://automationpractice.com/index.php')

    })

    it('efetuar login', () => {

      cy.get('.login').click() // Efetuando login

      cy.get('#email').type('felipe.da.silva@dasa.com.br')
      cy.get('#passwd').type('123456789')
      cy.get('#SubmitLogin > span').click()

      // Comprando os 3 primeiros itens que estão à venda.
      cy.get('.sf-menu > :nth-child(1) > [href="http://automationpractice.com/index.php?id_category=3&controller=category"]').click()
      cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()
      cy.get(':nth-child(2) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()
      cy.get(':nth-child(3) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
      cy.get('.continue > span').click()

      cy.get('[title="View my shopping cart"]').click() // Clicando no resumo da compra e indo para finalizar.
      
      cy.get('#total_price') // Guardando o valor total da compra
        .invoke('val').as("first_value")

      cy.get('.cart_navigation > .button > span').click()

      cy.get('#id_address_delivery').should('contain', 'My address is') // Verificando se tem algum endereço preenchido.
      cy.get('.cart_navigation > .button > span').click()

      cy.get('.cart_navigation > .button > span').click() // Testaremos seguir sem concordar com os termos e vamos verificar se aparece a mensagem de erro.
      cy.get('.fancybox-error')
        .should('have.text', 'You must agree to the terms of service before continuing.')
        .and('have.class', 'fancybox-error')
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

    })

})