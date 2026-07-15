// import React from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
} from "lucide-react";
const Contact = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-5">

                {/* Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
                        Contact Us
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                        We're Here to Help You
                    </h2>

                    <p className="mt-4 text-slate-600">
                        Have questions about appointments, doctors, or our healthcare
                        services? Our team is always ready to assist you.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="space-y-6">

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-red-100 p-3">
                                    <MapPin className="text-red-600" size={24} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Visit Our Hospital
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        SmartCare Medical Center
                                        <br />
                                        Rajbari, Dhaka Division
                                        <br />
                                        Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-red-100 p-3">
                                    <Phone className="text-red-600" size={24} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Phone Number
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        +880 1700-000000
                                        <br />
                                        +880 1800-000000
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-red-100 p-3">
                                    <Mail className="text-red-600" size={24} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Email Address
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        support@smartcare.com
                                        <br />
                                        appointment@smartcare.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-red-100 p-3">
                                    <Clock className="text-red-600" size={24} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Working Hours
                                    </h3>

                                    <div className="mt-2 space-y-1 text-slate-600">
                                        <p>Monday - Friday : 8:00 AM - 8:00 PM</p>
                                        <p>Saturday : 9:00 AM - 6:00 PM</p>
                                        <p>Sunday : Emergency Services Only</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                        <h3 className="text-2xl font-bold text-slate-900">
                            Send us a Message
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Fill out the form below and our team will get back to you as soon
                            as possible.
                        </p>

                        <form className="mt-8 space-y-5">

                            <div className="grid gap-5 md:grid-cols-2">

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-red-500"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-red-500"
                                />

                            </div>

                            <input
                                type="text"
                                placeholder="Subject"
                                className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-red-500"
                            />

                            <textarea
                                rows={6}
                                placeholder="Write your message..."
                                className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-red-500"
                            />

                            <button
                                type="submit"
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
                            >
                                <Send size={18} />
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

                {/* Map */}

                <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">

                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=Rajbari,Bangladesh&output=embed"
                        className="h-[400px] w-full"
                        loading="lazy"
                    />

                </div>

            </div>
        </section>
    );
};

export default Contact;