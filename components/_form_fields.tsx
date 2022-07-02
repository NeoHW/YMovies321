import { marked } from 'marked';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
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
  const [previewForm, setPreviewForm] = useState(false);
  const [previewBtn, setPreviewBtn] = useState(false);
  const [title_, setTitle_] = useState('');
  const [content_, setContent_] = useState('');

  return (
    <>
      {previewForm ? (
        <>
          <h1 className="mb-1">{title_}</h1>
          <div className="text-muted mb-2">
            {moment().format('MMM Do [at] h:mmA')}
          </div>
          <Link href="/">
            <a className="btn btn-secondary">All Articles</a>
          </Link>{' '}
          <a href={`#`} className="btn btn-info">
            Edit
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(marked.parse(content_)),
            }}
          ></div>{' '}
          {/* Allow the user to turn preview off */}
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setPreviewForm(false)}
          >
            Turn off preview
          </button>{' '}
        </>
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
              onChange={(event) => {
                title(event.target.value);
                setTitle_(event.target.value);
                setPreviewBtn(true);
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
              onChange={(event) => {
                description(event.target.value);
                // setPreviewBtn(true);
              }}
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
                setPreviewBtn(true);
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
