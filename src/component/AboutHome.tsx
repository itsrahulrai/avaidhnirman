import React from "react";
import { Target, Eye, Building, Shield, Scale } from "lucide-react";

const AboutHome = () => {
  return (
    <>
      <div className="bg-white py-12 px-4 mt-1 md:mt-8 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* About Us Card */}
              <div className="bg-white rounded-2xl py-8 transform transition-all duration-300">
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Who We Are
                    </h3>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold text-[#1a4767] italic">
                        Avaidh Nirman Virodhi Morcha (ANVM)
                      </span>{" "}
                      is a non-political, community-driven initiative committed
                      to combating unauthorized construction activities (avaidh
                      nirman) in cities, towns, and rural areas across India. We
                      are a collective of citizens, legal experts, architects,
                      environmentalists, and social activists determined to
                      uphold the law and protect the environment, public spaces,
                      and structural safety of our urban infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission and Vision Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Mission Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-900 leading-relaxed">
                    To identify, challenge, and stop illegal construction
                    activities through legal action, community engagement, and
                    policy advocacy.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-400 p-2 rounded-full mr-3">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-900 leading-relaxed">
                    We envision an India free from illegal constructions, where
                    every building follows due legal process, adheres to
                    structural safety norms, and respects the environmental and
                    civic laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Image Header */}
                <div className="bg-gradient-to-r from-[#216ea5] to-[#18496b] p-6 text-white">
                  <div className="flex items-center">
                    <Building className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Combating Illegal Construction
                      </h3>
                      <p className="text-yellow-100 text-sm">
                        Protecting Our Cities & Environment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Image Container */}
                <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    {/* Building Icons Illustration */}
                    <div className="relative">
                      {/* Legal Building */}
                      <div className="inline-block mx-4 transform hover:scale-110 transition-transform duration-300">
                        <div className="w-16 h-20 bg-green-500 rounded-t-lg relative">
                          <div className="absolute top-2 left-2 right-2 space-y-1">
                            <div className="h-1 bg-green-300 rounded"></div>
                            <div className="h-1 bg-green-300 rounded"></div>
                            <div className="h-1 bg-green-300 rounded"></div>
                          </div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="w-20 h-2 bg-green-600 rounded-b-lg -ml-2"></div>
                        <p className="text-xs text-green-600 font-semibold mt-2">
                          Legal
                        </p>
                      </div>

                      {/* VS Symbol */}
                      <div className="inline-block mx-4 text-2xl font-bold text-gray-500">
                        VS
                      </div>

                      {/* Illegal Building */}
                      <div className="inline-block mx-4 transform hover:scale-110 transition-transform duration-300">
                        <div className="w-16 h-20 bg-red-500 rounded-t-lg relative">
                          <div className="absolute top-2 left-2 right-2 space-y-1">
                            <div className="h-1 bg-red-300 rounded"></div>
                            <div className="h-1 bg-red-300 rounded"></div>
                            <div className="h-1 bg-red-300 rounded"></div>
                          </div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                            <Scale className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="w-20 h-2 bg-red-600 rounded-b-lg -ml-2"></div>
                        <p className="text-xs text-red-600 font-semibold mt-2">
                          Illegal
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <h4 className="text-xl font-bold text-gray-800">
                        Stop Avaidh Nirman
                      </h4>
                      <p className="text-gray-800 max-w-md mx-auto">
                        Working together to ensure every construction follows
                        legal procedures and safety norms
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-blue-100 px-6 py-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#18496b]">
                        500+
                      </div>
                      <div className=" text-gray-900">Cases Filed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#18496b]">
                        50+
                      </div>
                      <div className=" text-gray-900">
                        Cities Covered
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#18496b]">
                        1000+
                      </div>
                      <div className=" text-gray-900">Activists</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
            
    </>
  );
};

export default AboutHome;
