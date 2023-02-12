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

    // Array of task objects e.g. [{ text: string, priority: bool }, ...]
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
        message: 'Please enter the border colour for the image:',
        default: 'transparent'
      },
      {
        type: 'rawlist',
        name: 'border-style',
        message: 'Please choose border style for the image:',
        choices: [
          { name: 'dotted', value: 'dotted' },
          { name: 'dashed', value: 'dashed' },
          { name: 'double', value: 'double' },
          { name: 'groove', value: 'groove' },
          { name: 'hidden', value: 'hidden' },
          { name: 'none', value: 'none' },
          { name: 'outset', value: 'outset' },
          { name: 'revert', value: 'revert' },
          { name: 'solid', value: 'solid' },
        ],
        default: 'none',

      },
      {
        type: 'input',
        name: 'border-width',
        message: 'Please choose border width for the image:',
        default: '3',
        validate: function (name) {
          if (isNaN(name)) {
            console.log(`\n\n.  Please enter a number`)
            return false;
          } else {
            return true;
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
          { name: 'circle', value: 'circle' },
        ],
      },
      {
        type: 'input',
        name: 'dimension',
        message: 'Please enter a dimension (max 200):',
        validate: function (name) {
          if (isNaN(name) || parseFloat(name) > 200 || parseFloat(name) < 1 || name === "") {
            console.log(`\n\n.  Please enter a number between 1 and 200`)
            return false;
          } else {
            return true;
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
            console.log(`\n\n.  Please enter a text (max 3 characters)`)
            return false;
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
        message: 'Please select a font family:',
        choices: [
          {name: "Verdana", value: "Verdana"},
          {name: "Geneva" , value: "Geneva"},
          {name: "Tahoma" , value: "Tahoma"},
          {name: "sans-serif" , value: "sans-serif"},
     
        ],
        when: () => {return showFontPrompts}
        
      },
      {
        type: 'input',
        name: 'font-size',
        message: 'Please enter a font size (max 200):',
        validate: function (name) {
          if (isNaN(name) || parseFloat(name) > 200 || parseFloat(name) < 1) {
            console.log(`\n\n.  Please enter a number between 1 and 200`)
            return false;
          } else {
            return true;
          }
        },
        when: () => {return showFontPrompts}
      },
      {
        type: 'input',
        name: 'text-anchor',
        message: 'Please select horizontal text position from the horizontal centreline of the image:',
        choices: [
          {name: '"Start" of the text is at the centreline', value: 'start'},
          {name: '"Middle" of the text is at the centreline', value: 'middle'},
          {name: '"End" of the  text is at centreline', value: 'end'},
        ],
        default: 'middle',
        when: () => {return showFontPrompts}
      },
      {
        type: 'input',
        name: 'dominant-baseline',
        message: 'Please select vertical text position from the vertical centreline of the image:',
        choices: [
          {name: '"Bottom" of the text is at the centreline', value: 'auto'},
          {name: '"Middle" of the text is at the centreline', value: 'middle'},
          {name: '"Top" of the  text is at centreline', value: 'hanging'},
        ],
        default: 'middle',
        when: () => {return false}
      },
      {
        type: 'input',
        name: 'fill',
        message: 'Please enter background colour:',
        default: 'transparent'
      },
      {
        type: 'input',
        name: 'stroke',
        message: 'Please enter the border colour:',
        default: 'transparent'
      },
      {
        type: 'input',
        name: 'stroke-width',
        message: 'Please choose border width:',
        default: '3',
        validate: function (name) {
          if (isNaN(name)) {
            console.log(`\n\n.  Please enter a number`)
            return false;
          } else {
            return true;
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
        this.showFontPrompts = false;
        return inquirer
          .prompt(this.stylePrompts)
          .then((styleProps) => {
            this.logoShape.addStyle(styleProps);
          });
      })
      .then(() => {
        return inquirer
          .prompt(this.textPrompts)
          .then(textProps => {
            this.logoText = new Text(textProps.text)
          })
      })
      .then(() => {
        showFontPrompts=true;
        return inquirer
        .prompt(this.stylePrompts)
        .then((styleProps) => {
          this.logoText.addStyle(styleProps);
        });
      })
      .then(() => {
        this.svgFile = new SVG({logoText: this.logoText, logoShape: this.logoShape});
        this.svgFile.addStyle(this.svgStyle);
        // // sort by priority so that priority tasks come before non-priority tasks
        // this.tasks.sort((a, b) =>
        //   a.priority === b.priority ? 0 : a.priority && !b.priority ? -1 : 1
        // );
        fileName = `logo-${Date.now()}.svg`;
        return writeFile(
          join(__dirname, '..' ,'examples', fileName),
        this.svgFile.render());
      })
      .then(() => console.log(`Generated ${fileName}`))
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

}

module.exports = CLI;
