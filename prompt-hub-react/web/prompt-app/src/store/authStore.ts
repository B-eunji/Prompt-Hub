//로그인 상태 관리
import {create} from "zustand"; //상태 생성 함수

//인터페이스 'AuthState' 정의: 상태의 구조를 타입으로 명시
interface AuthState {
    isLoggedIn:boolean; //로그인 상태 (T로그인, F로그아웃)
    setLoginState: (state: boolean) => void;
    user: {id:string; name:string} | null; //유저 정보(id, 이름)
    login: (user: {id: string, name: string}) => void; //로그인 함수
    logout: () => void; //로그아웃 함수
}

//Zustand의 상태 관리 로직
const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false, //초기 상태 = 로그아웃
    setLoginState: (state) => set({isLoggedIn: state}),
    user: null, //초기 유저정보 = null
    login: (user) => set({isLoggedIn: true, user}), //로그인 시 상태 업데이트
    logout: () => set({isLoggedIn:false, user:null}), //로그아웃 시 상태 초기화
}));

export default useAuthStore; //내보내기