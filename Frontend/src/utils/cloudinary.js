// Cloudinary upload utility
export const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcnlpedau';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio_uploads';

    if (!cloudName || !uploadPreset) {
        console.error("Cloudinary credentials not found in environment variables.");
        throw new Error("Cloudinary setup is incomplete");
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
        }

        const data = await response.json();
        return data.secure_url; // Return the Cloudinary URL
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
