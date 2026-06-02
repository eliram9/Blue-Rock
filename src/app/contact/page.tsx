import Image from "next/image";
import Container from "@/components/ui/Container";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SITE_CONFIG } from "@/constants/config";

export default function Contact() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Contact" }
                ]}
            />

            {/* Hero Section */}
            <MiniHero
                title="CONTACT US"
                subtitle="Let's Bring Your Vision to Life"
            />

            {/* Contact Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Left Column - Contact Form */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>

                                <form className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                First Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Enter your first name"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-light-blue focus:border-transparent transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                Last Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Enter your last name"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-light-blue focus:border-transparent transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email and Phone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="your.email@example.com"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-light-blue focus:border-transparent transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="(555) 123-4567"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-light-blue focus:border-transparent transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Service Needed */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                            Service Needed
                                        </label>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <label className="flex items-center p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-light-blue dark:hover:border-light-blue transition-colors">
                                                <input type="radio" name="service" value="residential" className="w-4 h-4 text-light-blue" defaultChecked />
                                                <span className="ml-3 text-gray-900 dark:text-white">Residential</span>
                                            </label>
                                            <label className="flex items-center p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-light-blue dark:hover:border-light-blue transition-colors">
                                                <input type="radio" name="service" value="commercial" className="w-4 h-4 text-light-blue" />
                                                <span className="ml-3 text-gray-900 dark:text-white">Commercial</span>
                                            </label>
                                            <label className="flex items-center p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-light-blue dark:hover:border-light-blue transition-colors">
                                                <input type="radio" name="service" value="renovation" className="w-4 h-4 text-light-blue" />
                                                <span className="ml-3 text-gray-900 dark:text-white">Renovation</span>
                                            </label>
                                            <label className="flex items-center p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-light-blue dark:hover:border-light-blue transition-colors">
                                                <input type="radio" name="service" value="other" className="w-4 h-4 text-light-blue" />
                                                <span className="ml-3 text-gray-900 dark:text-white">Other</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Tell us about your project, any specific requirements, or questions you have..."
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-light-blue focus:border-transparent transition-colors resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-main-blue hover:bg-light-blue text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                                    >
                                        Get Your Free Quote
                                    </button>
                                </form>
                            </div>

                            {/* Right Column - Contact Information */}
                            <div className="relative bg-gradient-to-br from-main-blue via-blue-600 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Blueprint House Plan Pattern Overlay */}
                                <div className="absolute inset-0 opacity-8">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="blueprint-house" width="300" height="300" patternUnits="userSpaceOnUse">
                                                {/* Main house outline */}
                                                <rect x="30" y="40" width="240" height="200" fill="none" stroke="white" strokeWidth="1.2"/>

                                                {/* Interior walls */}
                                                <path d="M 30 140 L 270 140" stroke="white" strokeWidth="0.8"/>
                                                <path d="M 150 40 L 150 240" stroke="white" strokeWidth="0.8"/>
                                                <path d="M 90 140 L 90 240" stroke="white" strokeWidth="0.8"/>
                                                <path d="M 210 140 L 210 240" stroke="white" strokeWidth="0.8"/>

                                                {/* Doors */}
                                                <path d="M 140 240 L 140 210 A 20 20 0 0 1 160 210 L 160 240" fill="none" stroke="white" strokeWidth="0.6"/>
                                                <path d="M 90 150 L 90 170 A 15 15 0 0 0 105 170 L 105 150" fill="none" stroke="white" strokeWidth="0.6"/>

                                                {/* Windows */}
                                                <rect x="50" y="60" width="30" height="25" fill="none" stroke="white" strokeWidth="0.5"/>
                                                <path d="M 65 60 L 65 85 M 50 72.5 L 80 72.5" stroke="white" strokeWidth="0.3"/>
                                                <rect x="160" y="60" width="30" height="25" fill="none" stroke="white" strokeWidth="0.5"/>
                                                <path d="M 175 60 L 175 85 M 160 72.5 L 190 72.5" stroke="white" strokeWidth="0.3"/>
                                                <rect x="220" y="80" width="25" height="30" fill="none" stroke="white" strokeWidth="0.5"/>
                                                <path d="M 232.5 80 L 232.5 110 M 220 95 L 245 95" stroke="white" strokeWidth="0.3"/>

                                                {/* Dimension lines */}
                                                <path d="M 20 40 L 20 240" stroke="white" strokeWidth="0.4" strokeDasharray="2,2"/>
                                                <path d="M 18 40 L 22 40 M 18 240 L 22 240" stroke="white" strokeWidth="0.4"/>
                                                <path d="M 30 30 L 270 30" stroke="white" strokeWidth="0.4" strokeDasharray="2,2"/>
                                                <path d="M 30 28 L 30 32 M 270 28 L 270 32" stroke="white" strokeWidth="0.4"/>

                                                {/* Room labels (represented as small rectangles) */}
                                                <rect x="55" y="80" width="25" height="8" fill="white" opacity="0.3"/>
                                                <rect x="165" y="80" width="25" height="8" fill="white" opacity="0.3"/>
                                                <rect x="105" y="175" width="30" height="8" fill="white" opacity="0.3"/>

                                                {/* Grid reference points */}
                                                <circle cx="30" cy="40" r="2" fill="white" opacity="0.5"/>
                                                <circle cx="270" cy="40" r="2" fill="white" opacity="0.5"/>
                                                <circle cx="30" cy="240" r="2" fill="white" opacity="0.5"/>
                                                <circle cx="270" cy="240" r="2" fill="white" opacity="0.5"/>
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#blueprint-house)" />
                                    </svg>
                                </div>

                                {/* Decorative Circles */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-light-blue/20 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

                                {/* Logo Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                                    <Image
                                        src="/logos/BR-logo2.png"
                                        alt="Blue Rock Logo"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 p-8 md:p-10 text-white">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        Need Immediate Help?
                                    </h2>
                                    <p className="text-blue-50 mb-10 text-lg">
                                        Our expert team is ready to assist you with any remodeling emergency or question you may have.
                                    </p>

                                    {/* Call Now */}
                                    <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-gradient-to-br from-light-blue to-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1 text-blue-50">Call Now</h3>
                                                <a href={`tel:${SITE_CONFIG.phone}`} className="text-2xl font-bold hover:text-light-blue transition-colors">
                                                    {SITE_CONFIG.phoneDisplay}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Us */}
                                    <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-gradient-to-br from-light-blue to-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="overflow-hidden">
                                                <h3 className="font-semibold text-lg mb-1 text-blue-50">Email Us</h3>
                                                <a href={`mailto:${SITE_CONFIG.email}`} className="text-base hover:text-light-blue transition-colors break-all">
                                                    {SITE_CONFIG.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                                        <div className="flex items-start gap-5">
                                            <div className="w-14 h-14 bg-gradient-to-br from-light-blue to-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-3 text-blue-50">Business Hours</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-blue-100">Monday - Friday:</span>
                                                        <span className="font-semibold">9:00 AM - 5:00 PM</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-blue-100">Saturday - Sunday:</span>
                                                        <span className="font-semibold">Closed</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                                        <div className="flex items-start gap-5">
                                            <div className="w-14 h-14 bg-gradient-to-br from-light-blue to-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2 text-blue-50">Address</h3>
                                                <address className="not-italic text-blue-50 leading-relaxed">
                                                    {SITE_CONFIG.address}
                                                </address>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
