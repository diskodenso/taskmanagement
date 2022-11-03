// we can define a model as a class or interface (interface is typescript concept that simply enforces the shape of an object upon compilation - therefore after compilation interfaces are not preserved anymore
// classes will be preserved and are usefull when multiple instances of the same shape following a blue print
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
