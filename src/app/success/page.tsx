import { Suspense } from 'react';
import SuccessContent from '../../components/Success-Content';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ECEFFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', color: '#1A2365' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}