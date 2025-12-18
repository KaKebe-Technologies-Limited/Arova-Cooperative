const AdminLoginModal = ({
  adminPassword,
  setAdminPassword,
  handleAdminLogin,
  setShowAdminLogin,
  primaryColor,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Admin Access</h2>

        <input
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
          placeholder="Password"
        />

        <div className="flex gap-3">
          <button
            onClick={handleAdminLogin}
            style={{ backgroundColor: primaryColor }}
            className="flex-1 text-white py-3 rounded-xl font-bold"
          >
            Login
          </button>
          <button
            onClick={() => setShowAdminLogin(false)}
            className="flex-1 bg-gray-100 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
