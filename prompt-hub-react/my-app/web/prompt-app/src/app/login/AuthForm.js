//인증 폼 컴포넌트
"use client"; //클라이언트 컴포넌트 선언 12.31 추가

import React, {useState} from 'react';
import {supabase} from '../supabaseClient'

function AuthForm(){
    //이메일, 비밀번호, 메세지의 입력상태을 관리하기 위한 state 생성
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');

    //회원가입 처리를 위한 함수
    const handleSignUp = async () => {
        try{
            const {data, error} = await supabase.auth.signUp({
                email:email,
                password:password,
            });

            if (error) {
                setMessage(`회원가입 실패: ${error.message}`);
            } else {
                setMessage('회원가입 성공');
                console.log('User data:', data);
            }
        } catch (err) {
            console.error('Error during sign-up:', err);
            setMessage('회원가입 증 오류 발생')
        }
    };

    //회원가입 UI 작성
    return (
        <div>
            <h2>회원가입</h2> {/*회원가입 */}
            
            {/* 이메일 입력 필드 */}
            <input
                type="email" //입력 유형: 이메일
                placeholder="이메일" //사용자에게 표시될 텍스트
                value={email} //입력값은 state로 관리
                onChange={(e) => setEmail(e.target.value)} //사용자가 입력할 때 state 업데이트
            />

            {/* 비밀번호 입력 필드 */}
            <input
                type="password" //입력 유형: 이메일
                placeholder="비밀번호" //사용자에게 표시될 텍스트
                value={password} //입력값은 state로 관리
                onChange={(e) => setPassword(e.target.value)} //사용자가 입력할 때 state 업데이트
            />

            {/*회원가입 버튼 */}
            <button onClick={handleSignUp}> 회원가입 </button>
            {message && <p>{message}</p>} {/* 메시지를 사용자에게 표시 */}
        </div>
    );
}

export default AuthForm; //다른 파일에서 사용할 수 있도록 컴포넌트 내보내기

