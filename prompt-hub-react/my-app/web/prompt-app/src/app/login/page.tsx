"use client"; //클라이언트 상태 관리 - 클라이언트 컴포넌트 설정

import AuthForm from "./AuthForm";
import useAuthStore from "../../store/authStore"; //Zustand 상태 관리

export default function LoginPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); //로그인 상태 확인

  return (
    <div>
      <h1>로그인</h1>
      {isLoggedIn ? (
        <p> 로그인 완료 </p>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}