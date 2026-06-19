'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Redirect to the parent module page — lessons are rendered inline there.
export default function LessonRedirect() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  useEffect(() => {
    if (moduleId) router.replace(`/modules/${moduleId}`);
  }, [moduleId, router]);

  return null;
}
