
type GetState = () => Object;

type ValidateFunction = (value : mixed) => void|Promise<void>|string|Promise<string>;
type SubmitFunction = (values : Object) => void|Promise<void>;

type Action = {
  type: string,
  meta?: {
    form: string,
    field?: string
  },
  payload?: mixed
}
