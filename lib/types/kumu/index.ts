
export type Data = {
  elements: Element[];
  connections: Connection[];
}

export type Connection = {
  from: string;
  to: string;
  type: string;
  direction: string;
}

export type Element = {
  id: string;
  label: string;
  type: string;
  description: string;
  reference: string;
  source: string;
  valuetype: string;
}