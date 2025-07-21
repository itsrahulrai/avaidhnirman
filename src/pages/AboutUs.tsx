import { CheckCircle} from "lucide-react";
import React from "react";

function AboutUs() {
  const points = [
    "Traffic congestion due to encroachments.",
    "Poor drainage systems and increased flooding",
    "Safety hazards like building collapse or fire risk",
    "Loss of green spaces and playgrounds",
    "A rise in corruption and lawlessness",
  ];

  return (
    <>
      <div>
        <div className="bg-white py-5 px-4 md:mt-8 mb-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6">
                {/* About Us Card */}
                <div className="bg-white rounded-2xl py-8 transform transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      Join the Fight Against Illegal Construction
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Avaidh Nirman Virodhi Morcha
                      </h3>
                      <p className="text-gray-900 leading-relaxed">
                        Avaidh Nirman Virodhi Morcha is a citizen-driven
                        movement dedicated to stopping illegal construction
                        (avaidh nirman) that threatens the safety, environment,
                        and planned development of our cities. With rising cases
                        of unauthorized buildings, encroachments on public land,
                        and violations of building by-laws, it&apos;s time we come
                        together to say enough is enough.
                      </p>
                      <p className="mt-3">
                        Illegal construction not only compromises the structural
                        safety of buildings but also creates chaos in urban
                        planning, increases the risk of accidents, reduces green
                        cover, blocks emergency access routes, and causes
                        waterlogging due to unplanned drainage. These activities
                        are often carried out without proper permissions, and in
                        many cases, by exploiting legal loopholes or through
                        corrupt practices.
                      </p>
                      <p className="mt-3">
                        The Avaidh Nirman Virodhi Morcha aims to educate,
                        empower, and engage the public to act against such
                        activities. We believe that public awareness and
                        participation are the strongest tools to fight against
                        illegal construction. Our mission is to:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="lg:sticky lg:top-8 mx-10">
                <img
                  src="/images/about-us-avaidh-nirman.webp"
                  alt="About Us"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-15">
          <div className="bg-white px-6 lg:px-0 border-r-1 border-r-gray-300">
            <div className="mb-5">
              <h2 className="text-2xl font-bold"> Why You Should Join Us</h2>
              <p className="font-semibold mt-3">
                Illegal construction doesn&apos;t just affect someone else – it
                affects all of us. It leads to:
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-left">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                    <span className="">{point}</span>
                  </li>
                ))}
              </ul>
              {/* <p className="mt-4">
                When we choose to stay silent, we indirectly support these
                unlawful activities. By joining Avaidh Nirman Virodhi Morcha,
                you become part of a strong community that refuses to tolerate
                such injustice.
              </p> */}
            </div>
          </div>
          <div className="bg-white px-6 lg:px-0 pl-5">
            <div className="pl-4">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">
                  Your Voice Matters – Raise a Complaint!
                </h2>
              </div>
              <div>
                <p>
                  If you notice any illegal construction in your area – don&apos;t
                  ignore it! Take a picture, note the address, and report it to
                  our helpline or community group. Together, we will bring such
                  activities into the spotlight and demand action.
                </p>
                <p className="mt-4">
                  Be part of the change. Join Avaidh Nirman Virodhi Morcha and
                  stand up against the disorder eating away at our cities. Your
                  small action today can prevent a disaster tomorrow. Let’s
                  build a safer, cleaner, and law-abiding society — brick by
                  brick, voice by voice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
