//Login test scenario
describe('instagram login', () => {
    //Visit page from url base with /accounts/login/ beforeEach() hooks from mocha
    beforeEach(() => {
        cy.visit('/accounts/login/')
    })

    const login_signup_link = 'p._g9ean>a'
    const login_section = 'div._f9sjj'
    const username_input = 'form._3jvtb>div._t296e:nth-child(1)>div._sjplo>div._ev9xl>input._ph6vk._jdqpn._o716c'
    const password_input = 'form._3jvtb>div._t296e:nth-child(2)>div._sjplo>div._ev9xl>input._ph6vk._jdqpn._o716c'
    const login_button_active = 'button._qv64e._gexxb._4tgw8._njrw0'
    const login_button_unactive = 'button._qv64e._gexxb._4tgw8._jfvwv'
    const error_alert = 'div._e9kim'
    const forgot_password_link = 'a._pbd5h'
    const itunes_button = 'a._o7vmf:nth-child(1)'
    const googleplay_button = 'a._o7vmf:nth-child(2)'
    const notification_form = 'div._dzwdj._rga4h'
    const instagram_logo = 'a._giku3._8scx2.coreSpriteDesktopNavLogoAndWordmark._rujh3'
    const profile_icon = 'div._ikq0n'

    //Test case of valid login
    it('valid login', () => {
        //Find an visible element on 'main' that containing 'Log in' text, using should() from chai
        cy.get('main')
            .contains('Log in')
            .should('be.visible')
        
        //Find username input element, focus an a DOM element, type "YOUR VALID USERNAME" into element, then make a focused DOM element blur
        cy.get(username_input)
            .focus()
            .type('YOUR_VALID_USERNAME')
            .blur()
            //aliases
            .as('Username Input')
        
        //Find password input element, focus an a DOM element, type "YOUR VALID PASSWORD" into element, then make a focused DOM element blur
        cy.get(password_input)
            .focus()
            .type('YOUR_VALID_PASSWORD')
            .blur()
            //aliases
            .as('Password Input')
        
        //Find button element that containing 'Log in' text, click it, then is that element not in the DOM after click
        cy.get(login_button_active)
            .contains('Log in')
            .click()
            .and('not.exist')
            //aliases
            .as('Login Button')
        
        //Conditional testing
        //Find body element, then create object from it
        cy.get('body').then(($body) => {
            //If body has 'Notifications' text
            if ($body.text().includes('Notifications')) {
                //Find an visible element that containing 'Notifications' text, using should() from chai
                cy.get(notification_form)
                    .contains('Notifications')
                    .should('be.visible')
                    //aliases
                    .as('Notification Form')
            //Nope
            } else {
                //Find element that containing 'Instagram' text where should have "/" attribute, using should() from chai
                cy.get(instagram_logo)
                    .contains('Instagram')
                    .should('have.attr', 'href', '/')
                    //aliases
                    .as('Instagram Logo')
                //Find an visible element using should() from chai
                cy.get(profile_icon)
                    .should('be.visible')
                    //aliases
                    .as('Profile')
                }
            })
    })

    //Test case of login button
    it('login button when empty username and password', () => {
        //Find button element that containing 'Log in' text and must be disabled, using should() from chai
        cy.get(login_button_unactive)
            .contains('Log in')
            .should('be.disabled')
            //aliases
            .as('Login Button')
    })

    //Test case of invalid login
    it('invalid username or password', () => {
        //Find an visible element that containing 'Instagram' text, using should() from chai
        cy.get(login_section)
            .contains('Instagram')
            .should('be.visible')
        
        //Find username input element, focus an a DOM element, type "YOUR INVALID USERNAME" into element, then make a focused DOM element blur
        cy.get(username_input)
            .focus()
            .type('YOUR_INVALID_USERNAME')
            .blur()
            //aliases
            .as('Username Input')

        //Find password input element, focus an a DOM element, type "YOUR INVALID PASSWORD" into element, then make a focused DOM element blur
        cy.get(password_input)
            .focus()
            .type('YOUR_INVALID_PASSWORD')
            .blur()
            //aliases
            .as('Password Input')
        
        //Find button element that containing 'Log in' text, click it
        cy.get(login_button_active)
            .contains('Log in')
            .click()
            //aliases
            .as('Login Button')

        ////Find an visible element that containing 'Please' text, using should() from chai
        cy.get(error_alert)
            .contains('Please')
            .should('be.visible')
            //aliases
            .as('Error Alert')
    })

    //Test case of sign up navigate
    it('navigates to sign up page', () => {
        //Find element that containing 'Sign up' text where should have "/" href attribute, click it, then is that element not in the DOM after click, using should() from chai
        cy.get(login_signup_link)
            .contains('Sign up')
            .should('have.attr', 'href', '/')
            .click()
            .and('not.exist')
            //aliases
            .as('Sign Up Link')

        //Find an visible element on 'main' that containing 'Sign up' text
        cy.get('main')
            .contains('Sign up')
            .should('be.visible')
    })

    //Test case of forgot password navigate
    it('navigates to forgot password page', () => {
        //Find element that containing 'Forgot password?' text where should have "/accounts/password/reset/" attribute, click it, then is that element not in the DOM after click, using should() from chai
        cy.get(forgot_password_link)
            .contains('Forgot password?')
            .should('have.attr', 'href', '/accounts/password/reset/')
            .click()
            .and('not.exist')
            //aliases
            .as('Forgot Password Link')
        
        //Find an visible element on 'main' that containing 'Reset Password' text, using should() from chai
        cy.get('main')
            .contains('Reset Password')
            .should('be.visible')
    })

    //Test case of get app from apple store navigate
    it('navigates to get app page from apple store', () => {
        //Find the element that has href attribute from itunes.apple.com, then click it, using should() from chai
        cy.get(itunes_button)
            .should('have.attr', 'href', 'https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8')
            .click()
            //aliases
            .as('iTunes Button')
    })

    //Test case of gett app from google play navigate
    it('navigates to get app page from google play', () => {
        //Find the element that has href attribute from play.google.com, then click it, using should() from chai
        cy.get(googleplay_button)
            .should('have.attr', 'href', 'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26utm_medium%3Dbadge')
            .click()
            //aliases
            .as('Google Play Button')
    })
})