import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold gradient-text mb-4">Welcome to Your Dashboard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This is where you'll manage your trips and preferences. This page is currently under construction.
        </p>
        <Button asChild>
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;