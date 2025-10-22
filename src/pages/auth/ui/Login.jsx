// src/pages/auth/ui/Login.jsx
"use client";
import { useState } from 'react';
import { useAuth } from '@/entities/auth';
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import thumbnail from "@/assets/icons/thumbnail.png";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
        } catch (err) {
            console.error('Login error:', err);
        }
    };

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
            </div>
        </div>
    );
}