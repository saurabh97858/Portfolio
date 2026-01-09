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

            // Parallel Fetch: Text Data + Heavy Images
            // This prevents Vercel Serverless Function timeouts/payload limits on the main request
            const [textRes, imgRes] = await Promise.all([
                fetch(`${apiUrl}/api/portfolio`),
                fetch(`${apiUrl}/api/portfolio/images`)
            ]);

            const textData = await textRes.json();

            let combinedData = { ...textData };

            if (imgRes.ok) {
                const imgData = await imgRes.json();
                // Merge images into main data
                combinedData = {
                    ...combinedData,
                    profileImage: imgData.profileImage,
                    heroImage: imgData.heroImage
                };
            }

            setPortfolioData(combinedData);
        } catch (error) {
            console.error("Failed to fetch portfolio data", error);
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
