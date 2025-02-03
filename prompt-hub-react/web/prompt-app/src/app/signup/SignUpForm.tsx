//인증 폼 컴포넌트
"use client"; //클라이언트 컴포넌트 선언 12.31 추가

import React from 'react';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import {supabase} from '../supabaseClient'

//Zod를 이용한 회원가입 엽력값 유효성 검사 스키마 정의
const signUpSchema = z.object({
    email: z.string().email("올바른 형식을 입력하세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상 입력해주세요")
});

//ts 인터페이스 정의
type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm(){
    // react-hook-form 설정
    const {
        register, //입력 필드 연결
        handleSubmit, // 폼 제출 함수
        formState: {errors}, //오류 관리
    } = useForm<SignUpFormData>({ 
        resolver: zodResolver(signUpSchema), //유효성 검사 적용
    });

    //회원가입 처리를 위한 함수
    const handleSignUp = async (data: SignUpFormData) => {
        try{
            const {email,password} = data;
            const {error} = await supabase.auth.signUp({email, password});

            if (error) {
                console.error('회원가입 실패:', error.message);
            } else {
                console.log('회원가입 성공');
            }
        } catch (err) {
            console.error('회원가입 중 오류 발생:', err);
        }
    };

    //회원가입 UI 작성
    return (
        <div>
            <h2>회원가입</h2> {/*회원가입 */}
            
            <form onSubmit={handleSubmit(handleSignUp)}>
                {/* 이메일 입력 필드 */}
                <input
                    type="email" //입력 유형: 이메일
                    placeholder="이메일" //사용자에게 표시될 텍스트
                    {...register("email")} // react-hook-form과 연결
                />
                {errors.email && <p>{errors.email.message}</p>} {/*오류 메세지 표시*/}

                {/* 비밀번호 입력 필드 */}
                <input
                    type="password" //입력 유형: 이메일
                    placeholder="비밀번호" //사용자에게 표시될 텍스트
                    {...register("password")} // react-hook-form과 연결
                />
                {errors.email && <p>{errors.email.message}</p>} {/*오류 메세지 표시*/}


                {/*회원가입 버튼 */}
                <button type = "submit"> 회원가입 </button>
            </form>
        </div>
    );
}


