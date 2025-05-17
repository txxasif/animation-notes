type Category = {
  id: string;
  name: string;
  icon: string;
  components: {
    id: string;
    name: string;
    path: string;
    docPath?: string;
  }[];
};
