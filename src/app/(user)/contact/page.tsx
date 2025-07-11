"use client";
import React from "react";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[320px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Contact us via Email or WhatsApp, we are ready to serve you according to working hours.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                  <p className="text-gray-600">Senin - Jumat: 08.00 - 16.30</p>
                  <p className="text-gray-500 text-sm">Sabtu - Minggu: Closed</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth={2} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    Jl. Sultan Hadlirin KM.02 Ds. Langon RT.11 RW.05<br />
                    Kec. Tahunan Jepara 59426
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Choose your preferred way to contact us. We'll respond as soon as possible.
                </p>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/6281227444678?text=Halo, saya tertarik dengan produk furniture PT. Life Wood Indonesia. Mohon informasi lebih lanjut." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                  <p className="text-green-100">0812-2744-4678</p>
                  <p className="text-green-100 text-sm">Click to chat directly</p>
                </div>
                <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Email Button */}
              <a 
                href="mailto:lifewoodindonesia@yahoo.co.id?subject=Inquiry%20-%20PT.%20Life%20Wood%20Indonesia&body=Dear%20PT.%20Life%20Wood%20Indonesia,%0A%0AI%20am%20interested%20in%20your%20furniture%20products.%20Please%20provide%20more%20information%20about%20your%20products%20and%20services.%0A%0ABest%20regards," 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                  <p className="text-blue-100">lifewoodindonesia@yahoo.co.id</p>
                  <p className="text-blue-100 text-sm">Click to send email</p>
                </div>
                <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 