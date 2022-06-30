import { marked } from 'marked';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { Article } from '../types/article';

export default function FormFields({
  article,
  title,
  description,
  content,
}: {
  article: Article | null;
  title: (val: string) => any;
  description: (val: string) => any;
  content: (val: string) => any;
}) {
  const [preview, setPreview] = useState(false);
  const [title_, setTitle_] = useState('');
  const [content_, setContent_] = useState('');

  return (
    <>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          placeholder="Title of the article"
          defaultValue={article?.title}
          onChange={(event) => {
            title(event.target.value);
            setTitle_(event.target.value);
          }}
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
          defaultValue={article?.description}
          onChange={(event) => description(event.target.value)}
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
          onChange={(event) => {
            content(event.target.value);
            setContent_(event.target.value);
          }}
          defaultValue={article?.markdown}
          placeholder="Content of your article. You may use markdown for styling"
          required
        />
      </div>
      <br />
      <Link href="/">
        <a className="btn btn-secondary">Cancel</a>
      </Link>{' '}
      <button
        type="button"
        className="btn btn-info"
        onClick={() => setPreview(true)}
      >
        Preview
      </button>{' '}
      <button type="submit" className="btn btn-primary">
        {article !== null ? 'Save' : 'Create'}
      </button>
      {preview ? (
        <>
          <h1>Preview:</h1>
          <h1 className="mb-1">{title_}</h1>
          <div className="text-muted mb-2">
            {/* Date created */}
            {moment().format('MMM Do [at] h:mmA')}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(marked.parse(content_)),
            }}
          ></div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
