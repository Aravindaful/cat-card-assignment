export class MergeStrategy {
    constructor(greeting, who, width, height, color, size) {
        this.greeting = greeting ;
        this.who = who;
        this.width = width;
        this.height = height;
        this.color = color;
        this.size = size;
      }
  
    async merge(files) {
      throw new Error('merge() method must be implemented.');
    }
  }