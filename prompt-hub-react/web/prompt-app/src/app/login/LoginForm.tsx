// 로그인 페이지 구성
"use client"; //클라이언트 컴포넌트 선언

import React from "react"; //React
import {useForm} from "react-hook-form"; // react-hook-form 사용
import {z} from "zod"; //zod - 유효성 검사
import {zodResolver} from "@hookform/resolvers/zod"; //react-hook-form에서 zod 사용할 수 있도록 변환
import {supabase} from '../supabaseClient'; //Supabase 클라이언트 가져오기
import useAuthStore from "../../store/authStore"; //Zustand 상태 관리 Store 가져오기

//유효성 검사 스키마 정의
const loginSchema = z.object({
    email: z.string().email("유효한 이메일을 입력하세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

//타입스크립트에서 유효성 검사 타입 생성(폼 입력 값의 타입)
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    //react-hook-form 설정
    const{
        register, // input필드와 react-hook-form 연결
        handleSubmit, // 폼 제출 시 실행되는 함수
        formState: {errors}, //유효성 검사 에러 관리
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema), //zod 스키마 적용
    });

    // Zustand에서 로그인 상태 관리 함수 가져오기
    const {setLoginState} = useAuthStore();
    
    const onSubmit = async (data: LoginFormInputs) => {
        try{
            //supabase를 통한 로그인 시도
            const {error} = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            
            if (error){
                //오류 발생 시 메세지
                alert(`로그인 실패: $(error.message'`);
            } else {
                //로그인 성공 시 메세지 & Zustand 상태 변경
                alert("로그인 성공");
                setLoginState(true);
            }
        } catch (err) {
            alert("로그인 처리 중 오류 발생");
            console.error(err);
        }
    };
    
    return (
        <div>
            <h2> 로그인 </h2> {/* 제목 */}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/*이메일 입력 필드*/}
                <div>
                    <label>이메일:</label>
                    <input type="email" {...register("email")} /> {/* react-hook-form의 register 사용 */}
                    {errors.email && <p>{errors.email.message}</p>} {/*유효성 검사 실패 시 메세지 출력 */}
                </div>
                {/* 비밀번호 입력 필드*/}
                <div>
                    <label>비밀번호:</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                {/* 로그인 버튼 필드*/}
                <button type = "submit">로그인</button>
            </form>  
        </div>
    );
};

export default LoginForm;