export interface ContentGridContent<T> {
  icon?: string;
  title?: string,
  subTitle?: string,
  img?: string,
  imgAlt?: string,
  content?: string,
  actions?: T[]
}
