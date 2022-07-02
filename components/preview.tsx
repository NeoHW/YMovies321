import type { MutableRefObject } from 'react';

export default function Preview({
  title,
  description,
  content,
}: {
  title: MutableRefObject<HTMLInputElement | null>;
  description: MutableRefObject<HTMLTextAreaElement | null>;
  content: MutableRefObject<HTMLTextAreaElement | null>;
}) {
  return <></>;
}
