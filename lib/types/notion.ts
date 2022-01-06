export const textColor = {
  default: 'text-gray-900',
  gray: 'text-gray-700',
  brown: 'text-gray-700',
  orange: 'text-orange-500',
  yellow: 'text-gray-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  red: 'text-red-500',
};

export interface IText {
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: false;
    italic: true;
    strikethrough: false;
    underline: false;
    code: false;
    color: keyof typeof textColor;
  };
  plain_text: string;
  href: string | null;
}

export type IRichText = IText[];

export interface IINfo {
  name: IRichText;
  headline: IRichText;
  description: IRichText;
  links: { [key: string]: IRichText };
  profile_picture: string;
}
