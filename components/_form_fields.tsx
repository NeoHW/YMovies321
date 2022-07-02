import { marked } from 'marked';
import moment from 'moment';
import Link from 'next/link';
import type { MutableRefObject } from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import { Article } from '../types/article';

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
  const [previewBtn, setPreviewBtn] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Preview:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="mb-1">{title.current?.value}</h1>
          <div className="text-muted mb-2">
            {moment().format('MMM Do [at] h:mmA')}
          </div>
          <Link href="#">
            <a className="btn btn-secondary">All Articles</a>
          </Link>{' '}
          <a href={`#`} className="btn btn-info">
            Edit
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                marked.parse(
                  content.current?.value == undefined
                    ? ''
                    : content.current.value
                )
              ),
            }}
          ></div>
        </Modal.Body>
      </Modal>
      <h1 className="mb-4">
        {article === null ? 'Create New Article' : 'Edit Article'}
      </h1>
      <Form.Group className="form-group" controlId="articleTitle">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
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
      </Form.Group>
      <br />
      <Form.Group className="form-group">
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          id="description"
          className="form-control"
          placeholder="A small description of the article"
          ref={description}
          defaultValue={article?.description}
          required
        />
      </Form.Group>
      <br />
      <Form.Group className="form-group">
        <Form.Label htmlFor="markdown">Content</Form.Label>
        <Form.Control
          as="textarea"
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
      </Form.Group>
      <br />
      <Link href="/">
        <a className="btn btn-secondary">Cancel</a>
      </Link>{' '}
      {previewBtn ? (
        <Button type="button" variant="info" onClick={() => setShow(true)}>
          Preview
        </Button>
      ) : (
        ''
      )}{' '}
      <Button type="submit" variant="primary">
        {article !== null ? 'Save' : 'Create'}
      </Button>
    </>
  );
}
