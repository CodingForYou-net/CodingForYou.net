describe("browser's language", () => {
  it('uses French when default language is FR', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'fr' });
      },
    });
    cy.contains('h1', 'Bonjour, Claude');
  });

  it('uses French when default language is FR-CA', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'fr-ca' });
      },
    });
    cy.contains('h1', 'Bonjour, Claude');
  });

  it('uses English when default language is EN', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });

  it('uses English when default language is EN-US', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en-us' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });

  it('uses English when default language is nor FR nor EN', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'pt' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });
});

describe('language in url', () => {
  it("uses French when query 'lang' is FR", () => {
    cy.visit('/?lang=fr', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en' });
      },
    });
    cy.contains('h1', 'Bonjour, Claude');
  });

  it("uses French when query 'lang' is FR-CA", () => {
    cy.visit('/?lang=fr-ca', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en' });
      },
    });
    cy.contains('h1', 'Bonjour, Claude');
  });

  it("uses French when query 'lang' is EN", () => {
    cy.visit('/?lang=en', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'fr' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });

  it("uses French when query 'lang' is EN-US", () => {
    cy.visit('/?lang=en-us', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'fr' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });

  it("uses English when query 'lang' is nor FR nor EN", () => {
    cy.visit('/?lang=pt', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'pt' });
      },
    });
    cy.contains('h1', 'Hi, Claude');
  });
});

describe('language switch button', () => {
  it('uses French when button clicked is FR', () => {
    cy.visit('/?lang=en');
    cy.get('a')
      .contains('fr')
      .click();
    cy.url().should('include', '/?lang=fr');
    cy.contains('h1', 'Bonjour, Claude');
  });

  it('uses English when button clicked is EN', () => {
    cy.visit('/?lang=fr');
    cy.get('a')
      .contains('en')
      .click();
    cy.url().should('include', '/?lang=en');
    cy.contains('h1', 'Hi, Claude');
  });
});

describe('language in local storage', () => {
  it('changes local storage language to FR when FR is clicked', () => {
    cy.clearLocalStorage();
    cy.visit('/?lang=en');
    cy.get('a')
      .contains('fr')
      .click()
      .should(() => expect(localStorage.getItem('lang')).to.eq('fr'));
  });

  it('changes local storage language to EN when EN is clicked', () => {
    cy.clearLocalStorage();
    cy.visit('/?lang=fr');
    cy.get('a')
      .contains('en')
      .click()
      .should(() => expect(localStorage.getItem('lang')).to.eq('en'));
  });
});
