// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// export default function ViewList() {
//   const [listDetails, setListDetails] = useState({});
//   const router = useRouter();

//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     viewListDetails(firebaseKey).then(setListDetails);
//   }, [firebaseKey]);

//   return (
//     <>
//       <h1>{listDetails.name}</h1>
//     </>
//   );
// }
