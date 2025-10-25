"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/entities/auth';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import thumbnail from "@/assets/icons/thumbnail.png";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mounted, setMounted] = useState(false);
    const { login, isLoading, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login({ email, password });
            
            setTimeout(() => {
                router.push('/projects');
            }, 100);
        } catch (err) {
            console.error('[Login] Login error:', err);
        }
    };

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-body-m text-gray-50">로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="absolute w-full h-18 bg-gray-0 top-0 flex justify-between items-center px-4 border-b-1 border-gray-10 z-50">
                <div className="flex flex-row gap-2 items-center">
                    <Image src={logo} alt="logo" className="rounded-sm max-h-6 w-auto" />
                    <p className="text-body-l"><span className="!font-black">Team</span>Works</p>
                </div>
            </header>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-8 pt-18 px-4">
                <Image src={thumbnail} alt="thumbnail" className="h-30 w-auto" />
                <p className="text-body-l text-gray-70 text-center mb-4">공정한 협업, 효율적인 운영</p>
                
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        required
                        className="w-full px-4 py-3 border border-gray-20 rounded-lg focus:outline-none focus:border-secondary-60"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        required
                        className="w-full px-4 py-3 border border-gray-20 rounded-lg focus:outline-none focus:border-secondary-60"
                    />
                    
                    {error && (
                        <p className="text-warning-100 text-body-s text-center">{error}</p>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-secondary-70 text-gray-0 py-3 rounded-lg hover:bg-secondary-60 disabled:bg-gray-30 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                </form>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary-50 text-body-s">관리자 계정: ID) admin@teamworks.com</p>
                        <p className="text-secondary-50 text-body-s">관리자 계정: PW) admin1234</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary-50 text-body-s">사용자 계정: ID) user@teamworks.com</p>
                        <p className="text-secondary-50 text-body-s">사용자 계정: PW) user1234</p>
                    </div>
                </div>
            </div>
        </div>
    );
}