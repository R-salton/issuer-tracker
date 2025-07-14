'use client';

export default function ErrorPage({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center mt-10 text-red-600">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
