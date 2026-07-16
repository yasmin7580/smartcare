import { ArrowRight, BadgeCheck, CalendarCheck, HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router";

const About = () => {
    const values = [
        { icon: ShieldCheck, title: "Trusted care", text: "We make it easier to find verified clinics and healthcare professionals." },
        { icon: HeartPulse, title: "People first", text: "Every feature is designed to make the care journey clearer for patients and providers." },
        { icon: CalendarCheck, title: "Simple scheduling", text: "Appointments, updates, and follow-ups stay organized in one place." }
    ];

    return (
        <main className="bg-white text-slate-900">
            <section className="px-5 py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">About SmartCare</span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">Healthcare appointments, made more human.</h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">SmartCare connects people with verified clinics and doctors, bringing appointment booking and healthcare information into one simple experience.</p>
                        <Link to="/find-doctors" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                            Find a doctor <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="rounded-3xl bg-red-50 p-8 md:p-10">
                        <div className="grid gap-5 sm:grid-cols-2">
                            {[{ icon: Users, label: "Patients", text: "Find care with confidence" }, { icon: Stethoscope, label: "Doctors", text: "Share availability clearly" }, { icon: BadgeCheck, label: "Clinics", text: "Build a trusted profile" }, { icon: CalendarCheck, label: "Appointments", text: "Keep every visit organized" }].map(({ icon: Icon, label, text }) => (
                                <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
                                    <Icon className="text-red-600" size={26} />
                                    <h2 className="mt-4 text-lg font-bold">{label}</h2>
                                    <p className="mt-1 text-sm text-slate-600">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-5 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold text-red-600">OUR PROMISE</span>
                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">A calmer path to the care you need.</h2>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {values.map(({ icon: Icon, title, text }) => (
                            <article key={title} className="rounded-2xl bg-white p-7 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"><Icon size={24} /></div>
                                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                                <p className="mt-3 leading-7 text-slate-600">{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
