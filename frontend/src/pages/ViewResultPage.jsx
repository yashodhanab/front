// src/pages/ViewResultPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Button } from "../components/Button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewResultPage = () => {
  const [results, setResults] = useState({
    votingSection: "Voting section Name from database", 
    startTime: "Starttime from database", 
    endTime: "endtime from database",
    candidates: [
      { name: "Team A", votes: 50 },//from database
      { name: "Team B", votes: 35 },//from database
      { name: "Team C", votes: 15 },//from database
    ],
  });

  // Calculate total votes and percentage
  const totalVotes = results.candidates.reduce((acc, c) => acc + c.votes, 0);
  const candidatesWithPercentage = results.candidates.map((c) => ({
    ...c,
    percentage: ((c.votes / totalVotes) * 100).toFixed(2),
  }));

  // Chart data//////////////////////////////////////////////////////////////////
  const data = {
  labels: candidatesWithPercentage.map((c) => c.name),
  datasets: [
    {
      label: "Votes",
      data: candidatesWithPercentage.map((c) => c.votes),
      backgroundColor: [
        "rgba(43, 46, 237, 1)",   // Team A
        "rgba(16, 185, 129, 1)",   // Team B
        "rgba(239, 68, 68, 1)",    // Team C
      ],
      borderColor: [
        "rgba(99, 102, 241, 1)",
        "rgba(16, 185, 129, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        "rgba(99, 102, 241, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(239, 68, 68, 0.8)",
      ],
      hoverBorderColor: "rgba(255, 255, 255, 0.9)",
    },
  ],
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-8 flex flex-col items-center justify-start py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">
          {results.votingSection}
        </h1>

        {/* Voting Info */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg flex-1">
            <p className="text-white text-lg mb-2">
              <span className="font-semibold">Voting started:</span> {results.startTime}
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold">Voting ended:</span> {results.endTime}
            </p>
          </div>
        </div>

        {/* Result Table */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Voting Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white/90 border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-white/30 px-4 py-2 text-left">Candidate</th>
                  <th className="border-b border-white/30 px-4 py-2 text-left">Votes</th>
                  <th className="border-b border-white/30 px-4 py-2 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {candidatesWithPercentage.map((c, i) => (
                  <tr key={i} className="hover:bg-white/10">
                    <td className="border-b border-white/30 px-4 py-2">{c.name}</td>
                    <td className="border-b border-white/30 px-4 py-2">{c.votes}</td>
                    <td className="border-b border-white/30 px-4 py-2">{c.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Votes Distribution</h2>
          <div className="h-64">
            <Bar data={data} options={{ responsive: true }} />
          </div>
        </div>

        {/* Winner */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-green-400">
            Winner: {candidatesWithPercentage[0].name}
          </h2>
        </div>

        {/* Back Button */}
        <div className="text-center">
  <Link
    to="/"
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-300 inline-block"
  >
    Back to Dashboard
  </Link>
</div>
      </div>
    </div>
  );
};

export default ViewResultPage;
