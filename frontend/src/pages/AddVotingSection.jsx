import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddVotingSection() {
  const [sectionName, setSectionName] = useState("");
  const [votingStart, setVotingStart] = useState("");
  const [votingEnd, setVotingEnd] = useState("");
  const [partyName, setPartyName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [votingSections, setVotingSections] = useState([]);
  
  // Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const addCandidate = () => {
    if (!candidateName || !partyName) return;
    const newCandidate = { id: Date.now(), name: candidateName, party: partyName };
    setCandidates([...candidates, newCandidate]);
    setCandidateName("");
    setPartyName("");
  };

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sectionName || !votingStart || !votingEnd) return;

    const newSection = {
      id: editingSection ? editingSection.id : Date.now(),
      sectionName,
      votingStart,
      votingEnd,
      candidates,
    };

    if (editingSection) {
      // Update existing section
      setVotingSections(votingSections.map(s => s.id === editingSection.id ? newSection : s));
      setIsEditing(false);
      setEditingSection(null);
    } else {
      // Add new section
      setVotingSections([...votingSections, newSection]);
    }

    // Reset form
    setSectionName("");
    setVotingStart("");
    setVotingEnd("");
    setCandidates([]);
  };

  const deleteSection = (id) => {
    setVotingSections(votingSections.filter(s => s.id !== id));
  };

  const openEditModal = (section) => {
    setEditingSection(section);
    setSectionName(section.sectionName);
    setVotingStart(section.votingStart);
    setVotingEnd(section.votingEnd);
    setCandidates(section.candidates);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditingSection(null);
    setSectionName("");
    setVotingStart("");
    setVotingEnd("");
    setCandidates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-8 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
        Add Voting Section
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-white">Section Name</label>
              <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
                placeholder="Enter Section Name"
              />
            </div>
            

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-white">Voting Start</label>
                <input
                  type="datetime-local"
                  value={votingStart}
                  onChange={(e) => setVotingStart(e.target.value)}
                  className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-white">Voting End</label>
                <input
                  type="datetime-local"
                  value={votingEnd}
                  onChange={(e) => setVotingEnd(e.target.value)}
                  className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <hr className="border-white/30" />

            <h2 className="text-2xl font-semibold text-white mb-4">Add Candidate</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
              />
              <input
                type="text"
                placeholder="Party Name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
              />
              <button
                type="button"
                onClick={addCandidate}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
              >
                Add
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg mt-6 transition-all duration-300"
            >
              {isEditing ? "Update Voting Section" : "Save Voting Section"}
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-white hover:text-yellow-300 transition-colors"
            >
              ← Back to Admin Dashboard
            </Link>
          </form>
        </div>

        {/* Right side - Voting Sections Summary */}
        <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Voting Sections</h2>
          {votingSections.length === 0 ? (
            <p className="text-white/80">No voting sections added yet.</p>
          ) : (
            <ul className="space-y-4">
              {votingSections.map((section) => (
                <li
                  key={section.id}
                  className="border border-white/30 p-4 rounded-lg backdrop-blur-md bg-white/10 text-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{section.sectionName}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(section)}
                        className="text-green-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm mb-2">
                    Voting Time: {section.votingStart} → {section.votingEnd}
                  </div>
                  <div className="text-white/90">
                    Candidates: {section.candidates.map(c => `${c.name} (${c.party})`).join(", ")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for editing section */}
{isEditing && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl w-full max-w-2xl relative">
      <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
        Edit Voting Section
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-white">Section Name</label>
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="w-full border border-white/50 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
            placeholder="Enter Section Name"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-white">Voting Start</label>
            <input
              type="datetime-local"
              value={votingStart}
              onChange={(e) => setVotingStart(e.target.value)}
              className="w-full border border-white/50 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-white">Voting End</label>
            <input
              type="datetime-local"
              value={votingEnd}
              onChange={(e) => setVotingEnd(e.target.value)}
              className="w-full border border-white/50 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-white mt-4 mb-3">Candidates</h3>
        <ul className="space-y-2 max-h-48 overflow-y-auto border border-white/30 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white">
          {candidates.map(c => (
            <li key={c.id} className="flex justify-between items-center border border-white/30 p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <span>{c.name} ({c.party})</span>
              <button
                type="button"
                onClick={() => deleteCandidate(c.id)}
                className="text-red-400 hover:text-red-500 font-semibold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="flex-1 border border-white/50 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
          />
          <input
            type="text"
            placeholder="Party Name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            className="flex-1 border border-white/50 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
          />
          <button
            type="button"
            onClick={addCandidate}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
          >
            Add
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 rounded-xl border border-white/50 text-white hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}







// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function AddVotingSection() {
//   // Form states
//   const [sectionName, setSectionName] = useState("");
//   const [description, setDescription] = useState("");
//   const [ageLimit, setAgeLimit] = useState(""); // preferredAge
//   const [votingStart, setVotingStart] = useState("");
//   const [votingEnd, setVotingEnd] = useState("");
//   const [candidateName, setCandidateName] = useState("");
//   const [partyName, setPartyName] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [votingSections, setVotingSections] = useState([]);

//   // Modal state for editing
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);

//   // Dummy backend API URL (replace with your real API endpoint)
//   const API_URL = "http://localhost:5000/votingSections";//api

//   // Add candidate to list
//   const addCandidate = () => {
//     if (!candidateName || !partyName) return;
//     const newCandidate = { name: candidateName, party: partyName };
//     setCandidates([...candidates, newCandidate]);
//     setCandidateName("");
//     setPartyName("");
//   };

//   // Remove candidate
//   const deleteCandidate = (name) => {
//     setCandidates(candidates.filter(c => c.name !== name));
//   };

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!sectionName || !votingStart || !votingEnd || !ageLimit) return;

//     // Prepare payload according to your specified API structure
//     const payload = {
//       name: sectionName,
//       description: description || "No description provided",
//       startTime: votingStart,
//       endTime: votingEnd,
//       preferredAge: parseInt(ageLimit) || 18,
//       candidates: candidates.length > 0 ? candidates : [
//         { name: "Dummy Candidate", party: "Dummy Party" }
//       ],
//     };

//     try {
//       // POST request to backend
//       const response = await axios.post(API_URL, payload);
//       console.log("API Response:", response.data);

//       // Update local preview state
//       setVotingSections([...votingSections, { ...payload, id: Date.now() }]);

//       // Reset form
//       setSectionName("");
//       setDescription("");
//       setAgeLimit("");
//       setVotingStart("");
//       setVotingEnd("");
//       setCandidates([]);
//       setCandidateName("");
//       setPartyName("");
//       setIsEditing(false);
//       setEditingSection(null);
//     } catch (error) {
//       console.error("Error posting to API:", error);
//     }
//   };

//   // Open modal for editing
//   const openEditModal = (section) => {
//     setEditingSection(section);
//     setSectionName(section.name);
//     setDescription(section.description);
//     setAgeLimit(section.preferredAge);
//     setVotingStart(section.startTime);
//     setVotingEnd(section.endTime);
//     setCandidates(section.candidates);
//     setIsEditing(true);
//   };

//   // Delete section locally
//   const deleteSection = (id) => {
//     setVotingSections(votingSections.filter(s => s.id !== id));
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsEditing(false);
//     setEditingSection(null);
//     setSectionName("");
//     setDescription("");
//     setAgeLimit("");
//     setVotingStart("");
//     setVotingEnd("");
//     setCandidates([]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-8 flex flex-col items-center justify-start py-16 px-4">
//       <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
//         Add Voting Section
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
//         {/* Left side - Form */}
//         <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block font-semibold mb-2 text-white">Section Name</label>
//               <input
//                 type="text"
//                 value={sectionName}
//                 onChange={(e) => setSectionName(e.target.value)}
//                 className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
//                 placeholder="Enter Section Name"
//               />
//             </div>

//             <div>
//               <label className="block font-semibold mb-2 text-white">Description</label>
//               <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
//                 placeholder="Enter Description"
//               />
//             </div>

//             <div>
//               <label className="block font-semibold mb-2 text-white">Preferred Age</label>
//               <input
//                 type="number"
//                 value={ageLimit}
//                 onChange={(e) => setAgeLimit(e.target.value)}
//                 className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
//                 placeholder="Enter Minimum Age"
//               />
//             </div>

//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block font-semibold mb-2 text-white">Voting Start</label>
//                 <input
//                   type="datetime-local"
//                   value={votingStart}
//                   onChange={(e) => setVotingStart(e.target.value)}
//                   className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block font-semibold mb-2 text-white">Voting End</label>
//                 <input
//                   type="datetime-local"
//                   value={votingEnd}
//                   onChange={(e) => setVotingEnd(e.target.value)}
//                   className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//               </div>
//             </div>

//             <hr className="border-white/30" />

//             <h2 className="text-2xl font-semibold text-white mb-4">Add Candidate</h2>
//             <div className="flex gap-4">
//               <input
//                 type="text"
//                 placeholder="Candidate Name"
//                 value={candidateName}
//                 onChange={(e) => setCandidateName(e.target.value)}
//                 className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
//               />
//               <input
//                 type="text"
//                 placeholder="Party Name"
//                 value={partyName}
//                 onChange={(e) => setPartyName(e.target.value)}
//                 className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
//               />
//               <button
//                 type="button"
//                 onClick={addCandidate}
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
//               >
//                 Add
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg mt-6 transition-all duration-300"
//             >
//               {isEditing ? "Update Voting Section" : "Save Voting Section"}
//             </button>

//             <Link
//               to="/"
//               className="block text-center mt-4 text-white hover:text-yellow-300 transition-colors"
//             >
//               ← Back to Admin Dashboard
//             </Link>
//           </form>
//         </div>

//         {/* Right side - Voting Sections Summary */}
//         <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6 text-white">Voting Sections</h2>
//           {votingSections.length === 0 ? (
//             <p className="text-white/80">No voting sections added yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {votingSections.map((section) => (
//                 <li
//                   key={section.id}
//                   className="border border-white/30 p-4 rounded-lg backdrop-blur-md bg-white/10 text-white"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold text-lg">{section.name}</span>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => openEditModal(section)}
//                         className="text-green-400 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => deleteSection(section.id)}
//                         className="text-red-400 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-white/80 text-sm mb-2">
//                     Voting Time: {section.startTime} → {section.endTime}
//                   </div>
//                   <div className="text-white/90">
//                     Candidates: {section.candidates.map(c => `${c.name} (${c.party})`).join(", ")}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

