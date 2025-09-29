// src/pages/TreeDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

const TreeDetails = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const treeRef = ref(db, `trees/${id}`);
    get(treeRef)
      .then((snapshot) => {
        if (snapshot.exists()) setTree(snapshot.val());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse text-lg">Loading tree details…</p>
      </div>
    );

  if (!tree)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg">Tree not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 py-10">
      {/* Page Title */}
      <header className="border-b border-gray-300 pb-6 mb-10">
        <h1 className="text-5xl font-bold text-gray-900">{tree.Name}</h1>
        <p className="text-gray-600 italic text-lg mt-1">{tree.botanical}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Article Section */}
        <article className="lg:col-span-2 space-y-10 text-gray-800 leading-relaxed">
          <Section title="Description">{tree.description}</Section>
          <Section title="Medicinal Benefits">{tree.medicinalBenefits}</Section>
          <Section title="Environmental Benefits">{tree.environmentalBenefits}</Section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <InfoBox title="Scientific Classification">
            <InfoRow label="Kingdom" value={tree.kingdom || "Plantae"} />
            <InfoRow label="Phylum" value={tree.phylum || "Tracheophyta"} />
            <InfoRow label="Class" value={tree.class || "Magnoliopsida"} />
            <InfoRow label="Order" value={tree.order || "Sapindales"} />
            <InfoRow label="Family" value={tree.family || "Meliaceae"} />
            <InfoRow label="Genus" value={tree.genus || "Azadirachta"} />
            <InfoRow label="Species" value={tree.species || "A. indica"} />
          </InfoBox>

          <InfoBox title="Quick Info">
            <InfoRow label="Last Updated" value={tree.lastUpdated} />
            <InfoRow label="Location" value={tree.location?.site || "Unknown"} />
            <InfoRow label="Native" value={tree.native} />
            <InfoRow label="Volunteer" value={tree.volunteerName} />
            <InfoRow label="Tree ID" value={tree.treenumber} />
            <InfoRow label="Published" value={tree.Published ? "Yes" : "No"} />
            <InfoRow label="Category" value={tree.category || "N/A"} />
          </InfoBox>
        </aside>
      </div>
    </div>
  );
};

// Reusable section for main article
const Section = ({ title, children }) => (
  <section>
    <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
      {title}
    </h2>
    <p className="text-gray-800 whitespace-pre-line">{children}</p>
  </section>
);

// Sidebar box (like Wikipedia infobox)
const InfoBox = ({ title, children }) => (
  <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
    <h3 className="bg-gray-100 text-gray-900 font-semibold px-4 py-2 border-b border-gray-300">
      {title}
    </h3>
    <div className="divide-y divide-gray-200">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between px-4 py-2 text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

export default TreeDetails;
