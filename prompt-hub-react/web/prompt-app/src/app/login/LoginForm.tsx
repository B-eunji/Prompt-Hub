// 로그인 페이지 구성
"use client"; //클라이언트 컴포넌트 선언

import React, {useState} from "react"; //React, 상태 관리 useState 가져오기
import {supabase} from '../supabaseClient'; //Supabase 클라이언트 가져오기
import useAuthStore from "../../store/authStore"; //Zustand 상태 관리 Store 가져오기

function LoginForm(){
    const[email, setEmail] = useState<string>(""); //이메일 입력값 저장
    const[password, setPassword] = useState<string>(""); //비밀번호 입력값 저장
    const[message, setMessage] = useState<string>(""); //로그인 성공/실패 메세지 저장

    const setLoginState = useAuthStore((state) => state.setLoginState); //Zustand를 통한 로그인 성공/실패 메세지 상태 업데이트 저장
    
    const handleLogin = async () => {
        try{
            //supabase를 통한 로그인 시도
            const {data,error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (error){
                //오류 발생 시 메세지
                setMessage(`로그인 실패: $(error.message'`);
            } else {
                //로그인 성공 시 메세지 & Zustand 상태 변경
                setMessage("로그인 성공");
                setLoginState(true);
            }
        } catch (err) {
            setMessage("로그인 처리 중 오류 발생");
            console.error(err);
        }
    };
    
    return (
        <div>
            <h2> 로그인 </h2> {/* 제목 */}

            {/*이메일 입력 필드*/}
            <input
                type = "email"
                placeholder = "이메일"
                value = {email}
                onChange={(e) => setEmail(e.target.value)} //입력 시 state 업데이트
                
            />
            {/* 비밀번호 입력 필드*/}
            <input
                type="password"
                placeholder = "비밀번호"
                value = {password}
                onChange={(e) => setPassword(e.target.value)} //입력 시 state 업데이트
            >
            </input>
            {/* 로그인 버튼 필드*/}
            <button onClick={handleLogin}>로그인</button>

            {/* 메세지 출력*/}
            {message && <p>{message}</p>}
        </div>
    );
       
};

export default LoginForm;