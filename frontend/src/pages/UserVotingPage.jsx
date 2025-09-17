import React, { useState } from "react";

const UserVotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const candidates = ["Team A", "Team B", "Team C"];

  const handleVote = () => {
    if (!selectedCandidate) return alert("Please select a candidate!");
    setSubmitted(true);

    // TODO: send vote to backend/blockchain here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white flex items-center justify-center">
      <div className="bg-white/10 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Cast Your Vote 🗳️</h1>

        {!submitted ? (
          <>
            <form className="space-y-4">
              {candidates.map((c, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="candidate"
                    value={c}
                    checked={selectedCandidate === c}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </form>

            <button
              onClick={handleVote}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition"
            >
              Submit Vote
            </button>
          </>
        ) : (
          <p className="text-green-400 text-center font-semibold">
            ✅ Your vote has been submitted!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserVotingPage;
