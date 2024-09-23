import { Video } from '@/app/ui/video';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';

export default async function Page() {

  return (
    <div className="w-screen h-screen flex flex-col gap-4 text-lg font-semibold justify-center items-center ">
      <h1>Video Player App</h1>
      <Suspense fallback={<CardSkeleton />} >
        <Video videosrc="/videos/720p_2mb.mp4" />
      </Suspense>
    </div>
  );
};