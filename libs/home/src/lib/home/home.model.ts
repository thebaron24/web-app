export interface HomeGridAction {
  name: string;
  action: string;
}

export interface HomeGridItem {
  icon: string;
    title: string;
    subTitle: string;
    img: string;
    imgAlt: string;
    content: string;
    actions: HomeGridAction[]
}
