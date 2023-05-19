'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';

type Props = {};

export default function CreateNote({}: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const create = async () => {
    const db = new PocketBase('http://127.0.0.1:8090');

    // const record = await pb.collection('notes').create(data);

    await db.collection('notes').create({
      title,
      content,
    });

    // await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title,
    //     content,
    //   }),
    // });

    setContent('');
    setTitle('');

    router.refresh();
  };

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
