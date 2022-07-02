import Link from 'next/link';
import type { MutableRefObject } from 'react';
import { useState } from 'react';
import { Article } from '../types/article';
import Preview from './preview';

export default function FormFields({
  article,
  title,
  description,
  content,
}: {
  article: Article | null;
  title: MutableRefObject<HTMLInputElement | null>;
  description: MutableRefObject<HTMLTextAreaElement | null>;
  content: MutableRefObject<HTMLTextAreaElement | null>;
}) {
  const [previewForm, setPreviewForm] = useState(false);
  const [previewBtn, setPreviewBtn] = useState(false);
  return (
    <>
      {previewForm ? (
        <Preview />
      ) : (
        <>
          <h1 className="mb-4">
            {article === null ? 'Create New Article' : 'Edit Article'}
          </h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              placeholder="Title of the article"
              defaultValue={article?.title}
              onChange={() => {
                setPreviewBtn(true);
              }}
              ref={title}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="A small description of the article"
              ref={description}
              defaultValue={article?.description}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="markdown">Content</label>
            <textarea
              name="markdown"
              id="markdown"
              className="form-control"
              onChange={() => {
                setPreviewBtn(true);
              }}
              defaultValue={article?.markdown}
              ref={content}
              placeholder="Content of your article. You may use markdown for styling"
              required
            />
          </div>
          <br />
          <Link href="/">
            <a className="btn btn-secondary">Cancel</a>
          </Link>{' '}
          {previewBtn ? (
            <>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => setPreviewForm(true)}
              >
                Preview
              </button>
            </>
          ) : (
            ''
          )}{' '}
          <button type="submit" className="btn btn-primary">
            {article !== null ? 'Save' : 'Create'}
          </button>
        </>
      )}
    </>
  );
}
