import cn from 'classnames';
import { IRichText, textColor } from '@/lib/types/notion';
import React from 'react';

export function formatRichText(text: IRichText) {
  if (!text) return null;

  const component = text.map((item) => {
    let content = <>{item.text.content}</>;

    if (item.annotations.bold) {
      content = <b className={textColor[item.annotations.color]}>{content}</b>;
    }

    if (item.annotations.italic) {
      content = <em className={textColor[item.annotations.color]}>{content}</em>;
    }

    if (item.annotations.strikethrough) {
      content = <del className={textColor[item.annotations.color]}>{content}</del>;
    }

    if (item.annotations.underline) {
      content = <u className={textColor[item.annotations.color]}>{content}</u>;
    }

    if (item.annotations.code) {
      content = <code className={textColor[item.annotations.color]}>{content}</code>;
    }

    if (item.href?.length) {
      const color = item.annotations.color === 'default'
        ? textColor['gray']
        : textColor[item.annotations.color]

      content = <a href={item.href} target="_blank" rel="noopener noreferrer" className={cn('underline underline-offset-2 cursor-pointer', color)}>{content}</a>;
    }

    if (!item.annotations.bold && !item.annotations.italic && !item.annotations.strikethrough && !item.annotations.underline && !item.annotations.code && !item.href?.length) {
      content = <span className={textColor[item.annotations.color]}>{content}</span>;
    }

    return <React.Fragment key={item.text.content}>{content}</React.Fragment>;
  })

  return <>{component}</>;
}
