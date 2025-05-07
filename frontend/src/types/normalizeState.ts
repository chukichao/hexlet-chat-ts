type Entities<T> = {
  [id: string]: T;
};

export interface INormalizeState<T> {
  entities: Entities<T>;
  ids: string[];
}
