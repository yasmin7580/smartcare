// import React from 'react';

const AddClinic = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 max-w-3xl w-full">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-red-600">Add Clinic</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Clinic Image (URL)</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="https://..."
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Clinic Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Clinic Name"
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="City, Address"
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Contact Number</label>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="0123456789"
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description (optional)</label>
                        <textarea
                            name="description"
                            placeholder="Short description (optional)"
                            className="w-full border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="button" className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            Add Clinic
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClinic;