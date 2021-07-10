export interface ContentGridContent {
  icon: string;
  title: string,
  subTitle: string,
  img: string,
  imgAlt: string,
  content: string,
  actions: ContentGridAction[]
}

export interface ContentGridAction {
  name: string,
  action: string
}
