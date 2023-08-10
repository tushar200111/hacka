# FinMango Calculators
Set of calculators made by FinMango. This project was designed for modularity and reuse.

## FIRE Calculator
Financial Independence calculator. To see it in action, go to <https://mngo.org/fire>.

## Rule of 72 Calculator
Rule of 72 calculator (doubling wealth). To see it in action, go to <https://mngo.org/72>.

## Development

### Components
The modular components are pieced together using the [gulp-mancha][1] templating library. Please
see [its documentation][1] for more details. Generally speaking, components are imported by using
a special `<script>` tag that looks similar to this:
```html
<script data-include src="path/to/component.tpl.html"></script>
```

Variables which are surrounded by double braces are replaced automatically as a pre-compilation
step. They can be passed using the attribute `data-vars='{"var-name": "var-value"}'` in the include
script tag.

### Calculators
There are no limitations in how new calculators can be added into this project. But, if you want to
keep things consistent, here are a few guidelines that were followed in the FIRE and Rule of 72
calculators. In all cases, calculator outputs should be placed in their own subfolder such as
[src/view/fire](./src/view/fire/) and [src/view/72](./src/view/72/).

#### View Output
Calculators are built under the path `{{wwwroot}}/view/<name>`. Components under the `view`
subfolder are considered as potential entrypoints to the calculators.

The code under the `view` subfolder should be kept as simple as possible, essentially piecing
together components where most of the logic lives.

#### User Survey
Each calculator has a survey and result component. The survey consists of a series of screens that
the user steps through to provide data to seed the calculator's computations while explaining the
significance of the different values. For example, a survey may ask user's income, debts,
investments, etc.

Surveys themselves are modularized, so each of the screens can be used across one or more surveys.
For example, the questions regarding prior investments are used in both the FIRE and the Rule of 72
calculators. This is done by placing the different screens in individual `tpl.html` files. Survey
questions that can be expected to be reused are placed under
[src/components/survey](./src/components/survey/) whereas calculator-specific survey screens
are placed under an appropriately named subfolder within the components directory.

It's strongly recommended to use the methods provided by the
[DataHelper](./src/static/data-helper.js) class. It automatically converts to and from query string
parameters and form values using the element id as the key. It's also strongly recommended to use
the [survey navigation component](./src/components/survey/navigation.tpl.html) which employs view
binding and handles user flow throughout the survey.

### Result
After the survey is completed, users are sent to the result component. This is done by passing
all the data via query parameters, which allows for sharing of the results or to seed a calculator
with specific data.

Result components are interactive and use [VueJS](https://vuejs.org) for reactive view binding.

### Building the website
The website is automatically built upon a Git push. To build it manually, run:
```sh
# Install dependencies
npm install
# Build web components
npm run-script build
# Start web server in port 8080
npm run-script start
```

[1]: https://gitlab.com/omtinez/gulp-mancha