import { it } from "mocha";

describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');

    cy.get('input[type="search"]').type('a');

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    
    cy.get('[data-testing="add-book"]:not(:disabled)').first().click();
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should see list and remove item', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    
    const title = cy.get('[data-testing="reading-list-item"]').first().find("strong").text;

    cy.get('[data-testing="remove-button"]').first().click();
    
    cy.get("simple-snack-bar").should('be.visible');
    
    cy.get('[data-testing="reading-list-item"]').should('not.contain.text', title);
  });

  it('Then: I should see list and remove item and undo it', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    
    const length = cy.get('[data-testing="reading-list-item"]').length;

    cy.get('[data-testing="remove-button"]').first().click();
    
    cy.get("simple-snack-bar").should('be.visible');
    
   expect(cy.get('[data-testing="reading-list-item"]')).should('have.length.lessThan', length);

    cy.get("simple-snack-bar").find("button").click();
    
    cy.get('[data-testing="reading-list-item"]').should('have.length', length);
  });

  it("Then: Mark Book as Finished", () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    
    const finishedBookCount = cy.get('[data-testing="finished-button"]:not(:disabled)').length;

    cy.get('[data-testing="finished-button"]:not(:disabled)').first().click();

    cy.get("simple-snack-bar").should('be.visible');

    cy.get('[data-testing="finished-button"]:not(:disabled)').should('have.length.greaterThan', finishedBookCount);
  });
});
