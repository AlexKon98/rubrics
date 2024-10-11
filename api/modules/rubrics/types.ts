export interface RubricItem {
  id: number,
  count: number,
  title: string,
  url: string,
  children: RubricItem[] | [],
  isAllow?: boolean
  isOpen?: boolean
};
