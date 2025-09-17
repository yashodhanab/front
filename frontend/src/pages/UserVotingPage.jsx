// import React, { useState, useEffect } from "react";

// // Dummy voting sections with candidates
// const dummyVotingSections = [
//   {
//     id: 1,
//     name: "Presidential Election 2025",
//     candidates: [
//       { name: "Alice Johnson", party: "Party A" },
//       { name: "Bob Smith", party: "Party B" },
//       { name: "Carol Lee", party: "Party C" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Senate Election 2025",
//     candidates: [
//       { name: "David Brown", party: "Party X" },
//       { name: "Eva Green", party: "Party Y" },
//     ],
//   },
// ];

// const UserVotingPage = () => {
//   const [votingSections, setVotingSections] = useState([]);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [selectedCandidate, setSelectedCandidate] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     // In real scenario, fetch voting sections from backend
//     setVotingSections(dummyVotingSections);
//   }, []);

//   // Update selected candidate when section changes
//   useEffect(() => {
//     setSelectedCandidate("");
//     setSubmitted(false);
//   }, [selectedSection]);

//   const handleVote = () => {
//     if (!selectedCandidate) return alert("Please select a candidate!");
//     setSubmitted(true);

//     // TODO: send vote to backend/blockchain here
//     console.log(`Voted for: ${selectedCandidate} in ${selectedSection.name}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
//       {/* Section Selection */}
//       <div className="mb-6 flex items-center justify-start gap-4">
//         <label className="font-semibold">Select Voting Section:</label>
//         <select
//           className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white"
//           value={selectedSection ? selectedSection.id : ""}
//           onChange={(e) => {
//             const section = votingSections.find(s => s.id === parseInt(e.target.value));
//             setSelectedSection(section);
//           }}
//         >
//           <option value="">--Choose Section--</option>
//           {votingSections.map((s) => (
//             <option key={s.id} value={s.id}>{s.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Candidate Table */}
//       {selectedSection && (
//         <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
//           <h2 className="text-2xl font-bold mb-4">{selectedSection.name}</h2>
//           <table className="w-full text-white border-collapse">
//             <thead>
//               <tr className="border-b border-white/30">
//                 <th className="py-2 text-left">Candidate</th>
//                 <th className="py-2 text-left">Party</th>
//                 <th className="py-2 text-left">Vote</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedSection.candidates.map((c, i) => (
//                 <tr key={i} className="border-b border-white/20">
//                   <td className="py-2">{c.name}</td>
//                   <td className="py-2">{c.party}</td>
//                   <td className="py-2">
//                     <input
//                       type="radio"
//                       name="candidate"
//                       value={c.name}
//                       checked={selectedCandidate === c.name}
//                       onChange={(e) => setSelectedCandidate(e.target.value)}
//                       className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {!submitted ? (
//             <button
//               onClick={handleVote}
//               className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition"
//             >
//               Submit Vote
//             </button>
//           ) : (
//             <p className="text-green-400 text-center font-semibold mt-4">
//               ✅ Your vote has been submitted!
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserVotingPage;


import React, { useState, useEffect } from "react";
import axios from "axios";

// Dummy voting sections with candidates
const dummyVotingSections = [
  {
    id: 1,
    name: "Presidential Election 2025",
    candidates: [
      { name: "Alice Johnson", party: "Party A" },
      { name: "Bob Smith", party: "Party B" },
      { name: "Carol Lee", party: "Party C" },
    ],
  },
  {
    id: 2,
    name: "Provincial Election 2025",
    candidates: [
      { name: "David Brown", party: "Party X" },
      { name: "Eva Green", party: "Party Y" },
    ],
  },
];

const UserVotingPage = () => {
  const [votingSections, setVotingSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // API endpoint for submitting votes
  const API_URL_VOTE = "http://localhost:5000/votes"; 

  useEffect(() => {

    setVotingSections(dummyVotingSections);
  }, []);


  useEffect(() => {
    setSelectedCandidate("");
    setSubmitted(false);
  }, [selectedSection]);

  const handleVote = async () => {
    if (!selectedCandidate) return alert("Please select a candidate!");

    // Find candidate object
    const candidateObj = selectedSection.candidates.find(
      (c) => c.name === selectedCandidate
    );

    if (!candidateObj) return alert("Candidate not found!");

    try {
      // POST vote to backend
      const response = await axios.post(API_URL_VOTE, {
        candidate: candidateObj.name,
        party: candidateObj.party,
        section: selectedSection.name, // optional
      });

      console.log("Vote submitted:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit vote. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      {/* Section Selection */}
      <div className="mb-6 flex items-center justify-start gap-4">
        <label className="font-semibold">Select Voting Section:</label>
        <select
          className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-blue-500"
          value={selectedSection ? selectedSection.id : ""}
          onChange={(e) => {
            const section = votingSections.find(
              (s) => s.id === parseInt(e.target.value)
            );
            setSelectedSection(section);
          }}
        >
          <option value="">--Choose Section--</option>
          {votingSections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Candidate Table */}
      {selectedSection && (
        <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{selectedSection.name}</h2>
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="border-b border-white/30">
                <th className="py-2 text-left">Candidate</th>
                <th className="py-2 text-left">Party</th>
                <th className="py-2 text-left">Vote</th>
              </tr>
            </thead>
            <tbody>
              {selectedSection.candidates.map((c, i) => (
                <tr key={i} className="border-b border-white/20">
                  <td className="py-2">{c.name}</td>
                  <td className="py-2">{c.party}</td>
                  <td className="py-2">
                    <input
                      type="radio"
                      name="candidate"
                      value={c.name}
                      checked={selectedCandidate === c.name}
                      onChange={(e) => setSelectedCandidate(e.target.value)}
                      className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!submitted ? (
            <button
              onClick={handleVote}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition"
            >
              Submit Vote
            </button>
          ) : (
            <p className="text-green-400 text-center font-semibold mt-4">
              ✅ Your vote has been submitted!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserVotingPage;
