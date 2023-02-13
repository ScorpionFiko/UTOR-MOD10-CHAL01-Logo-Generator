const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const Circle = require('./circle.js');
const Square = require('./square.js');
const Triangle = require('./triangle');
const Text = require('./text.js');
const SVG = require('./svg');
let showFontPrompts = false;
let fileName = "";


class CLI {
  constructor() {
    const digitRegex = new RegExp('^\\d+$');
    this.logoShape;
    this.logoText;
    this.svgFile;
    this.svgStyle = {};
    this.svgPrompts = [
      {
        type: 'input',
        name: 'background-color',
        message: 'Please enter background colour for the image:',
        default: 'transparent'
      },
      {
        type: 'input',
        name: 'border-color',
        message: 'Please enter border colour for the image:',
        default: 'transparent'
      },
      {
        type: 'list',
        name: 'border-style',
        message: 'Please choose border style for the image:',
        choices: [
          { name: 'dotted', value: 'dotted' },
          { name: 'dashed', value: 'dashed' },
          { name: 'double', value: 'double' },
          { name: 'groove', value: 'groove' },
          { name: 'none', value: 'none' },
          { name: 'outset', value: 'outset' },
          { name: 'solid', value: 'solid' },
        ],
        default: 'none',

      },
      {
        type: 'input',
        name: 'border-width',
        message: 'Please enter border width for the image:',
        default: '3',
        validate: (name) => {
          // validates user input; must strip the px added by filter
          let temp = (name.replace("px", ""));
          if (!digitRegex.test(temp)) {
            return (`Please enter a number`);
          } else {
            return true;
          }
        },
        filter: (name) => {
          // automatically adds the "px" at the end of user input
          // returns user input as the user entered it if validation doesn't pass
          // otherwise it appends "px" to it
          let temp = (name.replace("px", ""));
          if (!digitRegex.test(temp)) {
            return (name);
          } else {
            return name.replace("px", "") + "px";
          }
        }
      },
      {
        type: 'input',
        name: 'border-radius',
        message: 'Please enter border radius for the image (min=0; max=200):',
        default: '0',
        validate: function (name) {
          let temp = (name.replace("px", ""));
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 0) {
            return `Please enter a number between 0 and 200`;
          } else {
            return true;
          }
        },
        filter: (name) => {
          // automatically adds the "px" at the end of user input 
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 0) {
            return (name);
          } else {
            return name.replace("px", "") + "px";;
          }
        }

      },
    ];
    this.shapePrompts = [
      {
        type: 'list',
        name: 'shape',
        message: 'Please choose a shape:',
        choices: [
          { name: 'Triangle', value: 'triangle' },
          { name: 'Square', value: 'square' },
          { name: 'Circle', value: 'circle' },
        ],
      },
      {
        type: 'input',
        name: 'dimension',
        message: 'Please enter a dimension (max 200):',
        default: '200',
        validate: (name) => {
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 1) {
            return `Please enter a number between 1 and 200`;
          } else {
            return true;
          }
        },
        filter: (name) => {
          // automatically adds the "px" at the end of user input
          // returns user input as the user entered it if validation doesn't pass
          // otherwise it appends "px" to it
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 1) {
            return (name);
          } else {
            return name.replace("px", "") + "px";
          }
        }

      },
    ]
    this.textPrompts = [
      {
        type: 'input',
        name: 'text',
        message: 'Please enter logo text (max 3 chars):',
        validate: function (name) {
          if (name.length > 3 || name.length < 1) {
            return `Please enter logo text (max 3 characters)`;
          } else {
            return true;
          }
        }
      },
    ]
    this.stylePrompts = [
      {
        type: 'list',
        name: 'font-family',
        message: 'Please select font family for the logo text:',
        choices: [
          { name: "Verdana", value: "Verdana" },
          { name: "Geneva", value: "Geneva" },
          { name: "Tahoma", value: "Tahoma" },
          { name: "sans-serif", value: "sans-serif" },

        ],
        when: () => { return showFontPrompts }

      },
      {
        type: 'input',
        name: 'font-size',
        message: 'Please enter font size for the logo text (min=1; max=200):',
        default: '100',
        validate: (name) => {
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 1) {
            return `Please enter a number between 1 and 200`;
          } else {
            return true;
          }
        },
        filter: (name) => {
          // automatically adds the "px" at the end of user input
          // returns user input as the user entered it if validation doesn't pass
          // otherwise it appends "px" to it
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) > 200 || parseFloat(temp) < 1) {
            return (name);
          } else {
            return name.replace("px", "") + "px";
          }
        },
        when: () => { return showFontPrompts }
      },
      {
        type: 'list',
        name: 'text-anchor',
        message: 'Please select the text position from the horizontal centreline of the image:',
        choices: [
          { name: '"Start" of the text is at the centreline', value: 'start' },
          { name: '"Middle" of the text is at the centreline', value: 'middle' },
          { name: '"End" of the  text is at centreline', value: 'end' },
        ],
        default: 'middle',
        when: () => { return showFontPrompts }
      },
      {
        type: 'list',
        name: 'dominant-baseline',
        message: 'Please select the text position from the vertical centreline of the image:',
        choices: [
          { name: '"Bottom" of the text is at the centreline', value: 'auto' },
          { name: '"Middle" of the text is at the centreline', value: 'middle' },
          { name: '"Top" of the  text is at centreline', value: 'hanging' },
        ],
        default: 'middle',
        when: () => { return showFontPrompts }
      },
      {
        type: 'input',
        name: 'fill',
        message: () => { return `Please enter background colour for the logo ${((showFontPrompts)? `text`:`shape`)}:`},
        default: 'transparent'
      },
      {
        type: 'input',
        name: 'stroke',
        message: () => { return `Please enter border colour for the logo ${((showFontPrompts)? `text`:`shape`)}:`},
        default: 'transparent'
      },
      {
        type: 'input',
        name: 'stroke-width',
        message: () => { return `Please enter border width for the logo ${((showFontPrompts)? `text`:`shape`)}:`},
        default: '3',
        validate: (name) => {
          // validates user input; must strip the px added by filter
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp) || parseFloat(temp) < 0) {
            return (`Please enter a number`);
          } else {
            return true;
          }
        },
        filter: (name) => {
          // automatically adds the "px" at the end of user input
          // returns user input as the user entered it if validation doesn't pass
          // otherwise it appends "px" to it
          let temp = (name.replace("px", ""));
          
          if (!digitRegex.test(temp)) {
            return (name);
          } else {
            return name.replace("px", "") + "px";
          }
        }
      },
    ]
    this.shapeStyle = {};
    this.textStyle = {};
  }
  run() {
    return inquirer
      .prompt(this.svgPrompts)
      .then((svgProps) => {
        this.svgStyle = svgProps;
      })
      .then(() => {
        return inquirer
          .prompt(this.textPrompts)
          .then(textProps => {
            this.logoText = new Text(textProps.text)
          })
      })
      .then(() => {
        showFontPrompts = true;
        return inquirer
          .prompt(this.stylePrompts)
          .then((styleProps) => {
            this.logoText.addStyle(styleProps);
          });
      })
      .then(() => {
        return inquirer
          .prompt(this.shapePrompts)
          .then(shapeProps => {
            switch (shapeProps.shape) {
              case 'square':
                this.logoShape = new Square(parseFloat(shapeProps.dimension));
                break;
              case 'circle':
                this.logoShape = new Circle(parseFloat(shapeProps.dimension));
                break;
              default:
                this.logoShape = new Triangle(parseFloat(shapeProps.dimension));
                break;
            }

          })
      }).then(() => {
        showFontPrompts = false;
        return inquirer
          .prompt(this.stylePrompts)
          .then((styleProps) => {
            this.logoShape.addStyle(styleProps);
          });
      })
      .then(() => {
        this.svgFile = new SVG({ logoText: this.logoText, logoShape: this.logoShape });
        this.svgFile.addStyle(this.svgStyle);
        fileName = `logo.svg`;
        return writeFile(
          join(__dirname, '..', 'examples', fileName),
          this.svgFile.render());
      })
      .then(() => {
        console.log(`Generated ${fileName}`)
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }
}

module.exports = CLI;
