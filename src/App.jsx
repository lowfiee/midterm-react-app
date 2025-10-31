import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  View,
  Card,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs);

/**
 * @type {import('aws-amplify/data').Client}
 */
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [userProfiles, setUserProfiles] = useState([]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const result = await client.models.UserProfile.list();
        setUserProfiles(result.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <View className="app-container">
      <Card className="bunny-card">
        <Heading level={2}>🐰 Welcome, {user?.username || "Guest"}!</Heading>
        <Divider />
        <p>Enjoy your cute bunny-themed Amplify app 💕</p>
        <Button onClick={signOut}>Sign out</Button>

        <Divider />
        <h3>🐇 User Profiles:</h3>
        {userProfiles.length > 0 ? (
          <ul>
            {userProfiles.map((profile, i) => (
              <li key={i}>{profile.name}</li>
            ))}
          </ul>
        ) : (
          <p>No profiles found yet!</p>
        )}
      </Card>
    </View>
  );
}
