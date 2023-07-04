class MergeStrategy {
    constructor(greeting, who, width, height, color, size) {
        this.greeting = greeting ;
        this.who = who;
        this.width = width;
        this.height = height;
        this.color = color;
        this.size = size;
      }
  
    async merge() {
      throw new Error('merge() method must be implemented.');
    }
  }
  module.exports = { MergeStrategy };