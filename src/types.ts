export type MessageType = SetTitle;

interface SetTitle {
  type: 'setTitle';
  title: string;
};
