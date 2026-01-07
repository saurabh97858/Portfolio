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
            const res = await fetch(`${apiUrl}/api/portfolio`);
            const data = await res.json();
            setPortfolioData(data);
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
