const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const Circle = require('./circle.js');
const Square = require('./square.js');
const Triangle = require('./triangle');
const Text = require('./text.js');
const SVG = require('./svg');

class CLI {
  constructor() {

    // Array of task objects e.g. [{ text: string, priority: bool }, ...]
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
          {name: 'dotted', value: 'dotted'},
          {name: 'dashed', value: 'dashed'},
          {name: 'double', value: 'double'},
          {name: 'groove', value: 'groove'},
          {name: 'hidden', value: 'hidden'},
          {name: 'none', value: 'none'},
          {name: 'outset', value: 'outset'},
          {name: 'revert', value: 'revert'},
          {name: 'solid', value: 'solid'},
        ],
        default: 'none',
        
      },
      {
        type: 'input',
        name: 'border-width',
        message: 'Please choose border width for the image:',
        default: '3',
        validate: function(name) {
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
          {name: 'Triangle', value: 'triangle'},
          {name: 'Square', value: 'square'},
          {name: 'circle', value: 'circle'},
        ],
        
      },     
    ]
    this.shapeStyle ={};
    this.textStyle={};
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
          console.log(shapeProps);
        })
      })
      .then(() => {
        // // sort by priority so that priority tasks come before non-priority tasks
        // this.tasks.sort((a, b) =>
        //   a.priority === b.priority ? 0 : a.priority && !b.priority ? -1 : 1
        // );
        // return writeFile(
        //   join(__dirname, '..', 'output', 'tasks.html'),
        //   createDocument(this.title, this.tasks)
        // );
      })
      .then(() => console.log('Created tasks.html'))
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

  addTask() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter task',
        },
        {
          type: 'confirm',
          name: 'priority',
          message: 'Is this a priority task?',
        },
        {
          type: 'confirm',
          name: 'confirmAddTask',
          message: 'Would you like to add another task?',
        },
      ])
      .then(({ text, priority, confirmAddTask }) => {
        this.tasks.push({ text, priority });
        if (confirmAddTask) {
          return this.addTask();
        }
      });
  }
}

module.exports = CLI;
