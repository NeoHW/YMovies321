import Link from 'next/link';
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
          onChange={(event) => title(event.target.value)}
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
          value={article?.description}
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
          onChange={(event) => content(event.target.value)}
          value={article?.markdown}
          placeholder="Content of your article. You may use markdown for styling"
          required
        />
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
