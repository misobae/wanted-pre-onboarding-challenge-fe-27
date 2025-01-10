export interface TodoRequest {
  title: string;
  content: string;
}

export interface TodoResponse<T> {
  data: T;
}

export interface TodoDataContents {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
