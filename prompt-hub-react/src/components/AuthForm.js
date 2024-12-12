//인증 폼 컴포넌트
import React, {useState} from 'react';
import {supabase} from '../supabaseClient'

function AuthForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');

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
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* 비밀번호 입력 필드 */}
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/*회원가입 버튼 */}
            <button onClick={handleSignUp}> 회원가입 </button>
            {message && <p>{message}</p>} {/* 메시지를 사용자에게 표시 */}
        </div>
    );
}

export default AuthForm;

