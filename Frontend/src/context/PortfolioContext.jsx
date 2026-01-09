import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
    return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPortfolioData = async () => {
        try {
            // Using VITE_API_URL or fallback to localhost for safety, though VITE_API_URL should be set
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // Fetch Text Data First (Critical)
            let combinedData = {};
            try {
                const textRes = await fetch(`${apiUrl}/api/portfolio`);
                if (textRes.ok) {
                    combinedData = await textRes.json();
                } else {
                    console.error("Text data fetch failed:", textRes.status);
                }
            } catch (err) {
                console.error("Text fetch network error", err);
            }

            // Fetch Images Separately (Non-Critical, Heavy)
            try {
                const imgRes = await fetch(`${apiUrl}/api/portfolio/images`);
                if (imgRes.ok) {
                    const imgData = await imgRes.json();
                    combinedData = {
                        ...combinedData,
                        profileImage: imgData.profileImage || combinedData.profileImage,
                        heroImage: imgData.heroImage || combinedData.heroImage
                    };
                } else {
                    console.warn("Images fetch failed:", imgRes.status);
                }
            } catch (err) {
                // Non-blocking error for images
                console.warn("Image fetch network error", err);
            }

            setPortfolioData(combinedData);
        } catch (error) {
            console.error("Global fetch error", error);
        } finally {
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
