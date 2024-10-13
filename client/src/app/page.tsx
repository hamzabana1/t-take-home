// "use client"

// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [message, setMessage] = useState("Loading");
// useEffect(() => {
//   fetch("http://localhost:8080")
//   .then((response) => response.json())
//   .then((data) => {
//     setMessage(data.message);
//   })
//   .catch(err => console.log(err))
// }, []);

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {message}
//     </div>
//   );
// }
'use client';

import React, { useState, useRef } from 'react';
import ReportBuilder from './components/report_builder';

export default function Home() {
  return (
    <main style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Report Builder</h1>
      <ReportBuilder />
    </main>
  );
}