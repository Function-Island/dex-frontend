describe('Remove Liquidity', () => {
  it('redirects', () => {
    cy.visit('/remove/0xc778417E063141139Fce010982780140Aa0cD5Ab-0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.url().should(
      'contain',
      '/remove/0xc778417E063141139Fce010982780140Aa0cD5Ab/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85'
    )
  })

  it('pls remove', () => {
    cy.visit('/remove/PLS/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'PLS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })

  it('pls remove swap order', () => {
    cy.visit('/remove/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85/PLS')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MKR')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'PLS')
  })

  it('loads the two correct tokens', () => {
    cy.visit('/remove/0xc778417E063141139Fce010982780140Aa0cD5Ab-0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'WPLS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })

  it('does not crash if PLS is duplicated', () => {
    cy.visit('/remove/0xc778417E063141139Fce010982780140Aa0cD5Ab-0xc778417E063141139Fce010982780140Aa0cD5Ab')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'WPLS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'WPLS')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/remove/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d-0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'SKL')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })
})
