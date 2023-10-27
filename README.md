Quality Assurance Report | 2023-09-27
=====================================

Website: angular-qa-recruitment-app.netlify.app
-----------------------------------------------

### Instalation

1. `npm ci` to install the cypress and it's dependencies.
2. `npm run test:run` to execute tests.

### Performance Assessment

The performance analysis of the website using PageSpeed Insights reveals the following scores:

*   **Home Page (/):** 80/100
*   **Form Page (/form):** 86/100
*   **Stepper Page (/stepper):** 83/100

**Recommendation:** The website's performance could be improved.

### Universal Observations

These observations apply to all pages on the website:

#### SEO

1.  The absence of a `<meta name="description">` tag on the pages negatively impacts SEO.
2.  The content within the `<title>` tag could be better.
3.  A `robots.txt` file is missing - affecting search engine crawling and indexing.

#### User Experience (UX)

1.  The website lacks responsiveness on mobile devices, where only the `Welcome` and `Form` links visible in navigation. The `Stepper` link, Twitter, and YouTube icons are not visible.
2.  The logo in the top-left of the navigation bar should be a clickable link to the application's home page. (This is standard among websites and users expect it)
3.  An inconsistency in input styles between the /form and /stepper pages is noted.

#### Accessibility

1.  The inclusion of an `aria-label` attribute with the value "Link to the Github repository" is recommended for a specific link.

### Page-specific Observations

#### Home Page (/)

##### User Experience (UX)

1.  Twitter and YouTube social links should offer a minimum clickable area of approximately 48px to ensure easy interaction for mobile users.

#### Form Page (/form)

##### Validation

1.  Implement validation for the maximum character length in the name input to prevent potential database insertion issues.
2.  Review the hidden HTML element with the class "alert alert-danger" to ensure its necessity and visibility is consistent.

#### Stepper Page (/stepper)

##### User Experience (UX)

1.  On mobile devices, the headers within the stepper are not legible, affecting user experience.
2.  When clicking "Next" with empty input fields, such as the name field, the input fields acquire the `.ng-invalid` class indicating an error. However, the error message below remains hidden. It is recommended to display the error message when clicking "Next" without input, aligning with standard user expectations.

* * *
