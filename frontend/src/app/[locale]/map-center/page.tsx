'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MapCenter = () => {
  const searchParams = useSearchParams();
  const entryType = searchParams.get('entryType'); // Get 'entryType' from URL query params

  // Dynamically import the MapCenter component
  const DynamicMapCenter = dynamic(() => import('@/components/shared/map/MapCenter'), {
    ssr: false,
  });

  // Pass entryType as a prop
  return <DynamicMapCenter entryType={entryType as 'search' | 'sell'} />
};

// Must wrap in a Suspense boundary to avoid 500 error on page load
const MapCenterPage = () => (
  <Suspense>
    <MapCenter />
  </Suspense>
);

export default MapCenterPage;
