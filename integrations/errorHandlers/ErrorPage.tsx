import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error | undefined;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-old-lace text-soft-charcoal p-6 text-center">
      <div className="max-w-md w-full bg-warm-beige/60 border border-primary/20 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h1 className="font-heading text-4xl text-primary mb-3">Oops!</h1>
        <p className="font-paragraph text-muted-gray mb-6">
          {error?.message || 'Something went wrong while loading this page.'}
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white font-paragraph px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
