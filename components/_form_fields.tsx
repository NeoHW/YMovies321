import Link from 'next/link';
import { Article } from '../types/article';

export default function FormFields({
  article,
  title,
  description,
  content,
}: {
  article: Article | null;
  title: string;
  description: string;
  content: string;
}) {
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
          value={article?.title}
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
          required
        >
          {article?.description}
        </textarea>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="markdown">Content</label>
        <textarea
          name="markdown"
          id="markdown"
          className="form-control"
          ref={content}
          placeholder="Content of your article. You may use markdown for styling"
          required
        >
          {article?.markdown}
        </textarea>
      </div>
      <br />
      <Link href="/">
        <a className="btn btn-secondary">Cancel</a>
      </Link>{' '}
      <button type="submit" className="btn btn-primary">
        {article !== null ? 'Save' : 'Create'}
      </button>
    </>
  );
}
