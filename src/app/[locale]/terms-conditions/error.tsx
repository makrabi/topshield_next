'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-10 text-center text-red-600">
      <h2 className="text-xl font-bold">Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
}
