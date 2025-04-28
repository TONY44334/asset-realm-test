import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' }); 
      }, []);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.warn('No user document found.');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        } finally {
          setLoading(false);
          setIsDataLoaded(true); 
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (!currentUser || loading) return null;

  // Defaults & Formatting
  const joinDate = new Date(currentUser.metadata.creationTime!).toLocaleDateString();
  const avatar = userData?.profilePicture || 'https://consciouscraft.uk/cdn/shop/products/vah-eagle-shield-3653.jpg';
  const accountType = userData?.accountType || 'Standard';
  const totalDownloads = userData?.totalDownloads || 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a17] text-white px-4 font-[Orbitron]">
      <div className="w-full max-w-md bg-[#111122] border border-purple-800 rounded-xl shadow-xl p-8 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-28 h-28 object-cover rounded-full border-4 border-cyan-500 shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <h2 className="text-3xl font-bold text-purple-400 mb-1">Your Profile</h2>
        <p className="text-gray-300 text-sm mb-6">{currentUser.email}</p>

        {/* Basic Profile Info (Rendered First) */}
        <div className="text-left space-y-4 mb-6 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-purple-300">Member Since</span>
            <span>{joinDate}</span>
          </div>

          {/* Optimized for quick load */}
          {isDataLoaded ? (
            <>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-purple-300">Total Downloads</span>
                <span>{totalDownloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Account Type</span>
                <span>{accountType}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-purple-300">Loading...</span>
              <span>...</span>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
