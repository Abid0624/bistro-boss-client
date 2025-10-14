import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-bold lg:text-4xl mb-8">
        <span>
          Hi, Welcome
          {user?.displayName ? user.displayName : "Back"}
        </span>
      </h2>
    </div>
  );
};

export default UserHome;
