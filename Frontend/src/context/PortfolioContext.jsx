import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
    return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
    // Initialize state from localStorage for instant loading if available
    const [portfolioData, setPortfolioData] = useState(() => {
        const cached = localStorage.getItem('portfolioData');
        return cached ? JSON.parse(cached) : null;
    });
    
    // If we have cached data, we can skip the initial pulse loader
    const [loading, setLoading] = useState(!localStorage.getItem('portfolioData'));

    const fetchPortfolioData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // 1. Fetch Text Data First (Critical & Fast)
            let currentData = portfolioData || {};
            try {
                const textRes = await fetch(`${apiUrl}/api/portfolio`);
                if (textRes.ok) {
                    const freshData = await textRes.json();
                    currentData = { ...currentData, ...freshData };
                    setPortfolioData(currentData);
                    localStorage.setItem('portfolioData', JSON.stringify(currentData));
                } else {
                    console.error("Text data fetch failed:", textRes.status);
                }
            } catch (err) {
                console.error("Text fetch network error", err);
            }

            // Unblock UI immediately after text fetch attempt
            setLoading(false);

            // 2. Fetch Images Separately (Non-Critical, Heavy)
            try {
                const imgRes = await fetch(`${apiUrl}/api/portfolio/images`);
                if (imgRes.ok) {
                    const imgData = await imgRes.json();
                    const finalData = {
                        ...currentData,
                        profileImage: imgData.profileImage,
                        heroImage: imgData.heroImage
                    };
                    setPortfolioData(finalData);
                    localStorage.setItem('portfolioData', JSON.stringify(finalData));
                } else {
                    console.warn("Images fetch failed:", imgRes.status);
                }
            } catch (err) {
                console.warn("Image fetch network error", err);
            }

        } catch (error) {
            console.error("Global fetch error", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const value = {
        portfolioData,
        loading,
        refetch: fetchPortfolioData
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
