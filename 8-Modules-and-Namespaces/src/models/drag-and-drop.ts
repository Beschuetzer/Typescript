//This gets compiled to JS by TS creating an object on which the properties would be Draggable and DragTarget for this example (anything can go inside a namespace)
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void,
    dragEndHandler(event: DragEvent) : void,
  }
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void,
    dropHandler(event: DragEvent): void,
    dragLeaveHandler(event: DragEvent): void,
  }
}