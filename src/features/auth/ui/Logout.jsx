"use client";

export function Logout({ onClick }) {
    return (
        <button 
            onClick={onClick}
            className="bg-white hover:bg-warning-10 rounded-lg px-3 py-1"
        >
            <span className="text-warning-100 text-body-s text-center">
                로그아웃
            </span>
        </button>
    );
}