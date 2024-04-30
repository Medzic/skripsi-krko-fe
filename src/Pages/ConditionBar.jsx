import React, { useEffect, useState } from 'react'
import NavigationBarAdmin from '../Component/NavigationBarAdmin';
import NavigationBar from '../Component/NavigationBar';

const ConditionBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        // ambil token dari cookie
        const cookies = document.cookie.split(';');

        let role = null;

        cookies.forEach(cookie => {
            const cookieParts = cookie.split('=');
            if (cookieParts.length === 2) { 
                const [key, value] = cookieParts;
                const trimmedKey = key.trim();
                const trimmedValue = value.trim();

                if (trimmedKey === 'role') {
                    role = trimmedValue;
                }
            }
        });

        if (role === 'Admin') {
            setIsAdmin(true)
        }
    }, [])

    return (
        <>
            {isAdmin ? (
                <NavigationBarAdmin />
            ) : (
                <NavigationBar />
            )}
            
        </>
    );
}

export default ConditionBar