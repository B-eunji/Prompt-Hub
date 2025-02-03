import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "./login/LoginForm";

export default function Home() {
  return (
        <div>
          <h3>Welcome to Prompt Hub</h3>
          <LoginForm />
          </div>
  );
}
