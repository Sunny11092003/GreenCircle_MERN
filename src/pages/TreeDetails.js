// src/pages/TreeDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import ImageGallery from "../components/ImageGallery";

const TreeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tree, setTree] = useState(null);
  const [otherTrees, setOtherTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Anonymous Firebase auth
  useEffect(() => {
    const auth = getAuth();
    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then(() => console.log("✅ Signed in anonymously"))
        .catch((err) => console.error("❌ Anonymous login failed", err));
    }
  }, []);

  // Fetch current tree
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const treeRef = ref(db, `trees/${id}`);
        const snapshot = await get(treeRef);
        if (snapshot.exists()) {
          setTree(snapshot.val());
        } else {
          console.error("Tree not found");
        }
      } catch (err) {
        console.error("Error fetching tree:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, [id]);

  // Fetch other trees (Explore More)
  useEffect(() => {
    const fetchOtherTrees = async () => {
      try {
        const treesRef = ref(db, "trees");
        const snapshot = await get(treesRef);
        if (snapshot.exists()) {
          const allTrees = snapshot.val();
          // Filter out current tree
          const filteredTrees = Object.values(allTrees).filter(
            (t) => t.treenumber !== id
          );
          setOtherTrees(filteredTrees);
        }
      } catch (err) {
        console.error("Error fetching other trees:", err);
      }
    };

    fetchOtherTrees();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading tree details…
        </p>
      </div>
    );

  if (!tree)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg">Tree not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div
        className="w-full h-96 relative bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${tree.images?.[0]?.url})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            {tree.Name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-2 italic drop-shadow">
            {tree.botanical}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-2 space-y-12 text-gray-800">
          <Section title="Description">{tree.description}</Section>
          <Section title="Medicinal Benefits">{tree.medicinalBenefits}</Section>
          <Section title="Environmental Benefits">{tree.environmentalBenefits}</Section>

          {/* Image Gallery */}
          {tree.images?.length > 0 && (
            <Section title="Gallery">
              <ImageGallery images={tree.images} />
            </Section>
          )}

{/* Explore Other Trees */}
{otherTrees.length > 0 && (
  <Section title="Explore Other Trees">
    <div className="flex space-x-4 overflow-x-auto py-4">
      {otherTrees.slice(0, 5).map((t) => (
        <div
          key={t.treenumber}
          className="min-w-[200px] bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300 flex-shrink-0"
          onClick={() => navigate(`/tree/${t.uid}`)}
        >
          {t.images && t.images[0] && (
            <img
              src={t.images[0].url}
              alt={t.Name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.Name}</h3>
            <p className="text-gray-600 text-sm">{t.category || "N/A"}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
)}
        </article>

        {/* Sidebar */}
        <aside className="space-y-8 sticky top-20">
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
            <InfoRow label="Native" value={tree.native || "Unknown"} />
            <InfoRow label="Volunteer" value={tree.volunteerName || "N/A"} />
            <InfoRow label="Tree ID" value={tree.treenumber} />
            <InfoRow label="Published" value={tree.Published ? "Yes" : "No"} />
            <InfoRow label="Category" value={tree.category || "N/A"} />
          </InfoBox>
        </aside>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-green-600 pb-2">
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed text-justify">{children}</div>
  </section>
);

// InfoBox Component
const InfoBox = ({ title, children }) => (
  <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden">
    <h3 className="bg-green-600 text-white font-semibold px-4 py-2">{title}</h3>
    <div className="divide-y divide-gray-200">{children}</div>
  </div>
);

// InfoRow Component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between px-4 py-3 text-sm items-center">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default TreeDetails;
